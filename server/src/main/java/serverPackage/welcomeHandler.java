package serverPackage;

import java.io.*;
import java.nio.charset.StandardCharsets;

import com.sun.net.httpserver.*;

public class welcomeHandler implements HttpHandler{
	
	public welcomeHandler() {
		
	}
	
	public void handle(HttpExchange he) throws IOException {
		//status message
		String ipAddress = he.getRequestHeaders().getFirst("X-FORWARDED-FOR");  
		   if (ipAddress == null) {  
		       ipAddress = he.getRemoteAddress().getAddress().toString();  
		   }
		System.out.println("Incoming query from: "+ipAddress);
		
		if(he.getRequestMethod().equalsIgnoreCase("GET"))echoGet(he);
		else {
			System.out.println("Wrong request method was used, sending error message");
			Headers head = he.getResponseHeaders();
			head.set("Content-Type", String.format("application/json; charset=%s", StandardCharsets.UTF_8));
			String response = "{ \"Error\": \"Http method not supported. Please use GET\" }";
			byte[] rawResponse = response.getBytes(StandardCharsets.UTF_8);
			he.sendResponseHeaders(405, rawResponse.length);
			he.getResponseBody().close();
		}
	}
	
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
			Headers head = he.getResponseHeaders();
			head.set("Content-Type", String.format("application/json; charset=%s", StandardCharsets.UTF_8));
			String response = "{ \"Error\": \"Failed to read the corresponding HTML File.\" }";
			byte[] rawResponse = response.getBytes(StandardCharsets.UTF_8);
			he.sendResponseHeaders(400, rawResponse.length);
			he.getResponseBody().close();
			return;
		}
		
		//prepare response string representing a html file
		String response = buildhtml.toString();
		
		//send response with the right headers
		Headers head = he.getResponseHeaders();
		head.set("Content-Type", String.format("text/HTML; charset=%s", StandardCharsets.UTF_8));
		byte[] rawResponse = response.getBytes(StandardCharsets.UTF_8);
		he.sendResponseHeaders(200, rawResponse.length);
		he.getResponseBody().write(rawResponse);
		System.out.println("Response was sent");
		
		//close stream
		he.getResponseBody().close();		
	}
}
