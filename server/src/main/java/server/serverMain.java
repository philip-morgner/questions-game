package server;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.*;

import server.databases.*;
import server.handlers.*;

//TODO:
	//BACKEND:
		//HTTPS
		//ADD USER
		//ADMIN FUNCTIONS
	//WEBINTERFACE:
		//SEE ALL QUESTIONS/ EDIT THEM
		//EDIT ADMINS -> SUPERADMIN ROLE
		//REMOVE MARKED ATTRIBUTE FROM QUESTIONS
public class serverMain {
	/*
	 * Port which the server should use
	 */
	private static final int port = 9000;
	
	private static final String homepath = System.getProperty("user.home");
	
	private final HttpServer server;
	
	/*
	 * Constructor which uses an externally initialized databaseAccess object
	 */
	public serverMain() throws IOException {
		QuestionDatabase.GetOrCreate().setPath(homepath + "/.questgame/questDB");
		LoginDatabase.GetOrCreate().setPath(homepath + "/.questgame/loginDB");
		server = initialiseServer();
	}
	
	/*
	 * Initializes a HttpServer object with the contexts /getLatest and /getHistorical?startDate=_&endDate=
	 */
	private HttpServer initialiseServer() throws IOException{
		HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
		server.createContext("/", new WelcomeHandler());
		server.createContext("/data/read", new ReadHandler());
		server.createContext("/data/write", new WriteHandler());
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
		} catch (Exception e) {
			System.out.println("Error when starting server:");
			e.printStackTrace();
		}
	}
}
