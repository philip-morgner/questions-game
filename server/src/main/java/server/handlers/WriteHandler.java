package server.handlers;

import java.io.IOException;
import java.util.Date;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;

import server.pom.CustomException;
import server.pom.WriteParams;

public class WriteHandler extends Handler {

	@Override
	public void handle(HttpExchange he) throws IOException {
		//status message
		String ipAddress = he.getRequestHeaders().getFirst("X-FORWARDED-FOR");
		if (ipAddress == null) {
			ipAddress = he.getRemoteAddress().getAddress().toString();
		}
		System.out.println("Incoming write-query from: "+ipAddress);
		System.out.println("Method: "+he.getRequestMethod());
		System.out.println("Time: "+new Date());
		
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
		WriteParams params = gson.fromJson(body, WriteParams.class);
		params.execute();
		System.out.println("Request done.");
		send(he, "OK", "text/plain", 200);
	}
}
