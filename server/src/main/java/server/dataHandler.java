package server;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.LinkedList;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.sun.net.httpserver.*;

import server.pom.GetParams;
import server.pom.PostParams;
import server.pom.Question;

public class dataHandler implements HttpHandler{

	private final databaseAccess database;
	
	private final String homepath;
	
	public dataHandler(databaseAccess data, String homepath) {//uses the same databaseAccess as serverMain
		database = data;
		this.homepath = homepath;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sun.net.httpserver.HttpHandler#handle(com.sun.net.httpserver.HttpExchange)
	 */
	public void handle(HttpExchange he) throws IOException {
		//status message
		String ipAddress = he.getRequestHeaders().getFirst("X-FORWARDED-FOR");  
		   if (ipAddress == null) {  
		       ipAddress = he.getRemoteAddress().getAddress().toString();
		   }
		System.out.println("Incoming query from: "+ipAddress+"\nMethod: "+he.getRequestMethod()+"\nTime: "+new Date());
		
		if(he.getRequestMethod().equalsIgnoreCase("GET"))echoGet(he);
		else if(he.getRequestMethod().equalsIgnoreCase("POST"))echoPost(he);
		else {
			System.out.println("Wrong request method was used, sending error message\nUsed method: "+he.getRequestMethod());
			send(he, "\"error\": { \"message\": \"Http method not supported. Please use GET or POST\", \"code\": 0 }", "application/json", 405);
		}
	}
	
	/*
	 * Responses to a GET request with a JSON-Array of {"question", "array"}
	 */
	private void echoGet(HttpExchange he) throws IOException {
		Gson gson = new Gson();
		String body = IOUtils.toString(he.getRequestBody(), "UTF-8");
		GetParams params = gson.fromJson(body, GetParams.class);	
		
		//minimal query: one player and one flag true
		if((!params.love&&!params.outdoor&&!params.classic)||params.players.length < 1) {
			System.out.println("Query was formatted wrong, sending error\nQuery: "+body);
			send(he, "\"error\": { \"message\": \"Query has wrong format.\", \"code\": 2 }", "application/json", 400);
			return;
		}
		
		String response = this.database.getQuestions(params);//TODO: Exception handling
		
		send(he, response, "application/json", 200);
	}
	
	/*
	 * Reads request body of a POST request and stores a sent Question
	 */
	private void echoPost(HttpExchange he) throws IOException {
		Gson gson = new Gson();
		String body = IOUtils.toString(he.getRequestBody(), "UTF-8");
		PostParams params = gson.fromJson(body, PostParams.class);
		if(params.username.equals("")) {//store question in non-admin-mode
			this.database.storeQuestion(params.question, true);//TODO: Exception handling
			send(he, "OK", "text/plain", 200);
		}
		else {
			//read logindata and compare with entered stuff
			String loginpath = homepath+"/.questgame/login.txt";
			FileReader fr = new FileReader(loginpath);
			BufferedReader in = new BufferedReader(fr);
			String data = in.readLine();
			String[] napw = data.split(";");
			String [][] logindata = new String[napw.length][2];
			boolean success = false;
			for (int i = 0; i< napw.length; i++) {
				logindata[i] = napw[i].split(":");
				if(logindata[i][0].equals(params.username)&&logindata[i][1].equals(params.password))success=true;
			}
			
			in.close();
			
			if(success) {
				this.database.storeQuestion(params.question, false);//TODO: Exception handling
				send(he, "OK", "text/plain", 200);
			}else {
				System.out.println("Wrong logindata, sending error message");
				send(he, "\"error\": { \"message\": \"Login failed\", \"code\": 5 }", "application/json", 403);
			}
		}
	}
	
	/*
	 * Sends a response via an HttpExchange of a type with a status code
	 */
	private void send(HttpExchange he, String response, String type, int status) throws IOException {
		//set headers
		Headers head = he.getResponseHeaders();
		head.set("Content-Type", String.format(type+"; charset=utf-8"));
		
		//prepare response
		byte[] rawResponse = response.getBytes();
		he.sendResponseHeaders(status, rawResponse.length);
		
		//send response
		he.getResponseBody().write(rawResponse);
		System.out.println("Response was sent:\n"+response);
		
		//close stream
		he.getResponseBody().close();	
	}
}
