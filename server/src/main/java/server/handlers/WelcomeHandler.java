package server.handlers;

import java.io.*;

import com.sun.net.httpserver.*;

import server.pom.CustomException;

public class WelcomeHandler extends Handler{
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
		try {
			if(he.getRequestMethod().equalsIgnoreCase("GET"))
				handler(he);
			else {
				System.out.println("Wrong request method was used, sending error message\nMethod: "+he.getRequestMethod());
				throw new CustomException("Http method not supported. Please use GET", 0, 405);
			}
		}catch(Exception ex) {
			send(he, ex);
		}
	}
	
	/*
	 * Responses to a GET request with a simple HTML document (Game server is online.)
	 */
	private void handler(HttpExchange he) throws Exception {
		//read html-file
		String htmlfile =System.getProperty("user.dir")+"/welcome.html";
		
		StringBuilder buildhtml = new StringBuilder();
		BufferedReader in = new BufferedReader(new FileReader(htmlfile));
		String str;
		while((str=in.readLine())!=null) {
			buildhtml.append(str);
		}
		in.close();
		
		//prepare response string representing a html file
		String response = buildhtml.toString();
		
		send(he, response, "text/HTML", 200);
	}
}
