package serverPackage;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.*;

public class serverMain {
	/*
	 * Port which the server should use
	 */
	private final int port = 9000;
	
	/*
	 * Object which implements the databaseAccess interface
	 */
	private final databaseAccess database;
	
	private final HttpServer server;
	
	/*
	 * Constructor which uses an externally initialized databaseAccess object
	 */
	public serverMain() throws IOException {
		database = new databaseAccess();
		server = initialiseServer();
	}
	
	/*
	 * Initializes a HttpServer object with the contexts /getLatest and /getHistorical?startDate=_&endDate=
	 */
	private HttpServer initialiseServer() throws IOException{
		HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
		server.createContext("/", new welcomeHandler());
		server.createContext("/questions", new dataHandler(database));
		server.setExecutor(null);
		return server;
	}
	
	public void start() {
		System.out.println("Starting server on port "+port);
		server.start();
	}
	
	public void stop() {
		server.stop(0);
	}
	
	
	public static void main(String[] args) {//normal way to start
		serverMain server;
		try {
			server = new serverMain();
			server.start();
		} catch (IOException e) {
			System.out.println("Fehler beim Serverstart");
		}
	}
}
