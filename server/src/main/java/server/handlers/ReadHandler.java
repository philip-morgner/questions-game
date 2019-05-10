package server.handlers;

import java.io.IOException;
import java.util.Date;
import java.util.LinkedList;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;

import server.pom.CustomException;
import server.pom.ReadParams;
import server.pom.Question;

public class ReadHandler extends Handler {

	@Override
	public void handle(HttpExchange he) throws IOException {
		//status message
		String ipAddress = he.getRequestHeaders().getFirst("X-FORWARDED-FOR");  
	   if (ipAddress == null) {  
	       ipAddress = he.getRemoteAddress().getAddress().toString();
	   }
		System.out.println("Incoming read-query from: "+ipAddress+"; Method: "+he.getRequestMethod()+"; Time: "+new Date());
		try {
			if(he.getRequestMethod().equalsIgnoreCase("POST")) {
				handler(he);
			}else {
				System.out.println("Wrong request method was used, sending error message\nUsed method: "+he.getRequestMethod());
				throw new CustomException("Http method not supported. Please use POST", 0, 405);
			}
		} catch(Exception ex) {
			send(he, ex);
		}
	}

	private void handler(HttpExchange he) throws Exception {
		Gson gson = new Gson();
		String body = IOUtils.toString(he.getRequestBody(), "UTF-8");
		ReadParams params = gson.fromJson(body, ReadParams.class);	
		
		//minimal query: one player and one flag true
		if((!params.love&&!params.outdoor&&!params.classic)||params.players.length < 1) {
			System.out.println("Query was formatted wrong, sending error; Query: "+body);
			throw new CustomException("Query has wrong format.", 2, 400);
		}
		
		LinkedList<Question> questions = params.execute();
		
		String response = "[";
		boolean first = true;
		for(Question q : questions) {
			if(!first)
				response = response + ", ";
			response = response + q.toJSON(params.players);
			first = false;
		}
		response = response + "]";
		
		send(he, response, "application/json", 200);
	}
}