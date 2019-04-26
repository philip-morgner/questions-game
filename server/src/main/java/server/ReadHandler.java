package server;

import java.io.IOException;
import java.util.Date;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;

import server.databases.QuestionDatabase;
import server.pom.GetParams;

public class ReadHandler extends Handler {

	@Override
	public void handle(HttpExchange he) throws IOException {
		//status message
		String ipAddress = he.getRequestHeaders().getFirst("X-FORWARDED-FOR");  
	   if (ipAddress == null) {  
	       ipAddress = he.getRemoteAddress().getAddress().toString();
	   }
		System.out.println("Incoming read-query from: "+ipAddress+"\nMethod: "+he.getRequestMethod()+"\nTime: "+new Date());
		
		if(he.getRequestMethod().equalsIgnoreCase("POST")) {
			try {
				handler(he);
			} catch(Exception ex) {
				send(he, ex);
			}
		}else {
			System.out.println("Wrong request method was used, sending error message\nUsed method: "+he.getRequestMethod());
			send(he, "\"error\": { \"message\": \"Http method not supported. Please use GET or POST\", \"code\": 0 }", "application/json", 405);
		}

	}

	private void handler(HttpExchange he) throws Exception {
		Gson gson = new Gson();
		String body = IOUtils.toString(he.getRequestBody(), "UTF-8");
		GetParams params = gson.fromJson(body, GetParams.class);	
		
		//minimal query: one player and one flag true
		if((!params.love&&!params.outdoor&&!params.classic)||params.players.length < 1) {
			System.out.println("Query was formatted wrong, sending error\nQuery: "+body);
			send(he, "\"error\": { \"message\": \"Query has wrong format.\", \"code\": 2 }", "application/json", 400);
			return;
		}
		
		String response = QuestionDatabase.GetOrCreate().getQuestions(params);//TODO: Exception handling
		
		send(he, response, "application/json", 200);
	}
}