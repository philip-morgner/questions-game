package server;

import java.io.IOException;
import java.util.Date;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;

import server.databases.LoginDatabase;
import server.databases.QuestionDatabase;
import server.pom.PostParams;

public class WriteHandler extends Handler {

	@Override
	public void handle(HttpExchange he) throws IOException {
		//status message
		String ipAddress = he.getRequestHeaders().getFirst("X-FORWARDED-FOR");  
	   if (ipAddress == null) {  
	       ipAddress = he.getRemoteAddress().getAddress().toString();
	   }
		System.out.println("Incoming write-query from: "+ipAddress+"\nMethod: "+he.getRequestMethod()+"\nTime: "+new Date());
		
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
		PostParams params = gson.fromJson(body, PostParams.class);
		if(params.username.equals("")) {//store question in non-admin-mode
			QuestionDatabase.GetOrCreate().storeQuestion(params.question, true);//TODO: Exception handling
			send(he, "OK", "text/plain", 200);
		}
		else {
			if(LoginDatabase.GetOrCreate().checkLoginData(params.username, params.password)) {
				QuestionDatabase.GetOrCreate().storeQuestion(params.question, false);//TODO: Exception handling
				send(he, "OK", "text/plain", 200);
			}else {
				System.out.println("Wrong logindata, sending error message");
				send(he, "\"error\": { \"message\": \"Login failed\", \"code\": 5 }", "application/json", 403);
			}
		}
	}

}
