package serverPackage;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;

import com.sun.net.httpserver.*;

public class dataHandler implements HttpHandler{

	private final databaseAccess database;
	
	public dataHandler(databaseAccess data) {
		database = data;
	}
	
	public void handle(HttpExchange he) throws IOException {
		//status message
		System.out.println("Incoming query from: "+he.getRemoteAddress().getAddress());
		
	}
}
