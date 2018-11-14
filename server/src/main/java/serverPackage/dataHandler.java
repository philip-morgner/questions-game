package serverPackage;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;

import com.sun.net.httpserver.*;

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
		System.out.println("Incoming query from: "+ipAddress);
		
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
		//standard
		boolean l=false;
		boolean o=false;
		boolean c=true;
		String lang = "ger";
		String playerjson = "";
		
		//read params from query
		String query = he.getRequestURI().getRawQuery();
		if(query != null && !query.equals("")) {
			String [] params = query.split("&");
			String param[][] = new String[params.length][];
			for(int i=0;i<params.length;i++) {
				param[i]=params[i].split("=");
				if(param[i].length!=2) {
					System.out.println("Query was formatted wrong, sending error\nQuery: "+query);
					send(he, "\"error\": { \"message\": \"Query has wrong format.\", \"code\": 2 }", "application/json", 400);
					return;
				}
			}
			for(String[] par : param) {
				if(par[0].equalsIgnoreCase("l"))l=par[1].equals("1");
				if(par[0].equalsIgnoreCase("o"))o=par[1].equals("1");
				if(par[0].equalsIgnoreCase("c"))c=par[1].equals("1");
				if(par[0].equalsIgnoreCase("lang"))lang=par[1].toLowerCase();
				if(par[0].equalsIgnoreCase("players"))playerjson=par[1];
			}
		}
		
		
		//minimal query: one player and one flag true
		if((!l&&!o&&!c)||playerjson.equals("")||playerjson==null||playerjson.equals("\0")) {
			System.out.println("Query was formatted wrong, sending error\nQuery: "+query);
			send(he, "\"error\": { \"message\": \"Query has wrong format.\", \"code\": 2 }", "application/json", 400);
			return;
		}
		
		//Parse playerjson to List of Player
		LinkedList<Player> players = null;
		try {
			players = readPlayers(playerjson);
		} catch (IOException ex) {
			System.out.println("Playerarray couldn't be read, sending error msg\nString: "+playerjson);
			send(he, "\"error\": { \"message\": \"Couldn't read players from query.\", \"code\": 3 }", "application/json", 400);
			return;
		}
		
		String response = this.database.getQuestions(lang, l, o, c, players);//TODO: Exception handling
		send(he, response, "application/json", 200);
	}
	
	/*
	 * Reads request body of a POST request and stores a sent Question
	 */
	private void echoPost(HttpExchange he) throws IOException {
		Question q;
		String[] npw= new String[2];
		try {//read Question and name/ password
			q = readQuestion(he, npw);
		}catch (IOException ex) {
			System.out.println("Request body couldn't be read, sending error msg");
			send(he, "\"error\": { \"message\": \"Couldn't read request body.\", \"code\": 4 }", "application/json", 400);
			return;
		}
		if(npw[0].equals("")) {//store question in non-admin-mode
			this.database.storeQuestion(q, true);//TODO: Exception handling
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
				if(logindata[i][0].equals(npw[0])&&logindata[i][1].equals(npw[1]))success=true;
			}
			
			in.close();
			
			if(success) {
				this.database.storeQuestion(q, false);//TODO: Exception handling
				send(he, "OK", "text/plain", 200);
			}else {
				System.out.println("Wrong logindata, sending error message");
				send(he, "\"error\": { \"message\": \"Login failed\", \"code\": 5 }", "application/json", 403);
			}
		}
	}
	
	/*
	 * Read question and name and password from the request body
	 */
	private Question readQuestion(HttpExchange he, String[] npw) throws IOException {
		//read body as string
		InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
		BufferedReader br = new BufferedReader(isr);
		int b;
		StringBuilder buf = new StringBuilder();
		while((b=br.read()) != -1)buf.append((char)b);
		String obj = buf.toString();
		if(obj.equals(""))throw new IOException();

		//standard
		npw[0]="";
		npw[1]="";
		int level = 2;
		String question = "";
		String answer = "";
		boolean l=false;
		boolean o=false;
		String lang = "ger";
		
		//translate string to params
		String [] params = obj.replaceAll("[\"{}]", "").split(",");//remove structural chars
		String[][] param = new String[params.length][2];
		for(int i = 0;i < params.length; i++) {
			param[i] = params[i].split(":");
		}
		for(int i = 0; i<param.length; i++) {
			param[i][0] = param[i][0].replace(" ", "");
			if(i>0)param[i][1] = param[i][1].replace(" ", "");
			else if(param[i][1].charAt(0)==' ')param[i][1]=param[i][1].substring(1);
		}
		for(String[] par : param) {
			if(par[0].equalsIgnoreCase("question")) {
				par[0]=par[1];
				par[1]=par[2];
			}
			if(par[0].equalsIgnoreCase("lflag"))l=par[1].equals("1");
			if(par[0].equalsIgnoreCase("oflag"))o=par[1].equals("1");
			if(par[0].equalsIgnoreCase("lang"))lang=par[1];
			if(par[0].equalsIgnoreCase("level"))level=Integer.parseInt(par[1]);
			if(par[0].equalsIgnoreCase("str"))question=par[1];
			if(par[0].equalsIgnoreCase("answer"))answer=par[1];
			if(par[0].equalsIgnoreCase("name"))npw[0]=par[1];
			if(par[0].equalsIgnoreCase("password"))npw[1]=par[1];
		}
		
		//requirement to pass: question must not be standard
		if(question.equals(""))throw new IOException();
		
		Question newone = new Question(question,answer,lang,level,o,l);
		
		//create and return new question with params
		return newone;
	}
	
	/*
	 * Reads players from JSON- String to LinkedList<Player>
	 */
	private LinkedList<Player> readPlayers(String json) throws IOException {
		//decode uri-encoding
		json = json.replace("%5B", "");//remove " and [ and ] and { and " "
		json = json.replace("%5D", "");
		json=json.replace("%22", "");
		json=json.replace("%7B", "");
		json=json.replace("%20", "");
		json=json.replace("%7D", "}");//decode
		//translate json-array-string to array of json-strings
		int count = json.length() - json.replace("}", "").length();
		String[] playerarr;
		if(count > 1) {
			playerarr = json.split("}");//removes }
			for(int i = 1; i<playerarr.length; i++) {
				playerarr[i] = playerarr[i].replaceFirst(",", "");
			}
		}
		else {
			playerarr = new String[1];
			playerarr[0] = json.replace("}", "");
		}
		
		//add players to list of Player
		LinkedList<Player> list = new LinkedList<Player>();
		for(String curr : playerarr) {
			list.addLast(readPlayer(curr));
		}
		
		return list;
	}
	
	/*
	 * Translates JSON- String of a player to Player Object
	 */
	private Player readPlayer(String json) throws IOException {
		//standard
		int level = -1;
		String name = "";
		String sex = "";
		
		//translate string to params
		String [] params = json.split(",");//remove structural chars
		String[][] param = new String[params.length][2];
		for(int i = 0;i < params.length; i++) {
			param[i] = params[i].split(":");
		}
		for(String[] par : param) {
			if(par[0].equalsIgnoreCase("level"))level=Integer.parseInt(par[1]);
			if(par[0].equalsIgnoreCase("name"))name=par[1];
			if(par[0].equalsIgnoreCase("sex"))sex=par[1];
		}
		
		//requirements to pass: name/ sex must not be standard, level must be 0 to 2
		if(name.equals("")||(!sex.equalsIgnoreCase("m")&&!sex.equalsIgnoreCase("f"))||level<0||level>2)throw new IOException();
		
		Player newone = new Player(name, sex, level);
		
		return newone;
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
