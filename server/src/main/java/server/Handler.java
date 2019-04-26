package server;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import server.pom.CustomException;

public abstract  class Handler implements HttpHandler {

	@Override
	public abstract void handle(HttpExchange arg0) throws IOException;
	
	/*
	 * Sends a response via an HttpExchange of a type with a status code
	 */
	protected void send(HttpExchange he, String response, String type, int status) throws IOException {
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
	
	protected void send(HttpExchange he, Exception ex) throws IOException {
		String response;
		String type;
		int status;
		if(ex instanceof CustomException) {
			type = "application/json";
			status = ((CustomException) ex).httpErrorCode;
			response = ((CustomException) ex).getMessage();
		}
		else {
			StringWriter tempSW = new StringWriter();
			PrintWriter tempPW = new PrintWriter(tempSW);
			ex.printStackTrace(tempPW);
			String stackTrace = tempSW.toString();
			type = "text/plain";
			status = 400;
			response = "Message: " + ex.getMessage() + "; Stacktrace: " + stackTrace;
		}
		send(he, response, type, status);
	}
}
