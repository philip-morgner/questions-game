package serverPackage;

import java.io.*;
import java.nio.charset.StandardCharsets;

import com.sun.net.httpserver.*;

class welcomeHandler implements HttpHandler{
	
	public welcomeHandler() {
		
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
		System.out.println("Incoming query from: "+ipAddress);
		
		if(he.getRequestMethod().equalsIgnoreCase("GET"))echoGet(he);
		else {
			System.out.println("Wrong request method was used, sending error message\nMethod: "+he.getRequestMethod());
			send(he, "{ \"Error\": \"Http method not supported. Please use GET\" }", "application/json", 405);
		}
	}
	
	/*
	 * Responses to a GET request with a simple HTML document (Game server is online.)
	 */
	private void echoGet(HttpExchange he) throws IOException {
		//read html-file
		String htmlfile ="/home/biermann/Dokumente/Etc./qgame/questions-game/server/src/main/java/serverPackage/welcome.html";
		StringBuilder buildhtml = new StringBuilder();
		try {
			BufferedReader in = new BufferedReader(new FileReader(htmlfile));
			String str;
			while((str=in.readLine())!=null) {
				buildhtml.append(str);
			}
			in.close();
		} catch(IOException ex) {
			System.out.println("Reading HTML File failed, sending error message");
			send(he, "{ \"Error\": \"Failed to read the corresponding HTML File.\" }", "application/json", 500);
			return;
		}
		
		//prepare response string representing a html file
		String response = buildhtml.toString();
		
		send(he, response, "text/HTML", 200);
	}
	
	/*
	 * Sends a response via an HttpExchange of a type with a status code
	 */
	private void send(HttpExchange he, String response, String type, int status) throws IOException {
		//set headers
		Headers head = he.getResponseHeaders();
		head.set("Content-Type", String.format(type+"; charset=%s", StandardCharsets.UTF_8));
		
		//prepare response
		byte[] rawResponse = response.getBytes(StandardCharsets.UTF_8);
		he.sendResponseHeaders(status, rawResponse.length);
		
		//send response
		he.getResponseBody().write(rawResponse);
		System.out.println("Response was sent:\n"+response);
		
		//close stream
		he.getResponseBody().close();	
	}
}
