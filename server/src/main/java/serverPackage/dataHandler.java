package serverPackage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.*;

public class dataHandler implements HttpHandler{

	private final databaseAccess database;
	
	public dataHandler(databaseAccess data) {
		database = data;
	}
	
	public void handle(HttpExchange he) throws IOException {
		//status message
		String ipAddress = he.getRequestHeaders().getFirst("X-FORWARDED-FOR");  
		   if (ipAddress == null) {  
		       ipAddress = he.getRemoteAddress().getAddress().toString();  
		   }
		System.out.println("Incoming query from: "+ipAddress);
		
		if(he.getRequestMethod().equalsIgnoreCase("GET"))echoGet(he);
		else if(he.getRequestMethod().equalsIgnoreCase("POST"))echoPost(he);
	}
	
	private void echoGet(HttpExchange he) throws IOException {//questions were asked for
		String query = he.getRequestURI().getRawQuery();
		//read params from query
		String [] params = query.split("&");
		String param[][] = new String[params.length][2];
		for(int i=0;i<params.length;i++)param[i]=params[i].split("=");
		boolean l=false;
		boolean o=false;
		boolean c=false;
		String lang = "ger";
		for(String[] par : param) {
			if(par[0].equalsIgnoreCase("l"))l=par[1].equals("1");
			if(par[0].equalsIgnoreCase("o"))o=par[1].equals("1");
			if(par[0].equalsIgnoreCase("c"))c=par[1].equals("1");
			if(par[0].equalsIgnoreCase("lang"))lang=par[1];
		}
		
		//Parse request body to String
		InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
		BufferedReader br = new BufferedReader(isr);
		int b;
		StringBuilder buf = new StringBuilder();
		while((b=br.read()) != -1)buf.append((char)b);
		String obj = buf.toString();
		System.out.println("obj: "+obj);
		
		Gson gson = new Gson();
		Player[] players = gson.fromJson(obj, Player[].class);
		
		String response = this.database.getQuestions(lang, l, o, c, players);
		
		//send response with the right headers
		Headers head = he.getResponseHeaders();
		head.set("Content-Type", String.format("application/json; charset=%s", StandardCharsets.UTF_8));
		byte[] rawResponse = response.getBytes(StandardCharsets.UTF_8);
		he.sendResponseHeaders(200, rawResponse.length);
		he.getResponseBody().write(rawResponse);
		System.out.println("Response was sent");
		
		//close stream
		he.getResponseBody().close();	
	}
	
	private void echoPost(HttpExchange he) {
		System.out.println("POST");
		String query = he.getRequestURI().getRawQuery();
		if(query==null) {
			//TODO: add new question to db, marked as to be checked
		}
		else {
			String [] params = query.split("&");
			String param[][] = new String[params.length][2];
			for(int i=0;i<params.length;i++)param[i]=params[i].split("=");
			String n;
			String p;
			for(String[] par : param) {
				if(par[0].equalsIgnoreCase("name"))n=par[1];
				if(par[0].equalsIgnoreCase("password"))p=par[1];
			}
			//TODO: check name and pw
			//TODO: add new question to db
		}
	}
}
