package server.pom;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import server.databases.QuestionDatabase;

public class Task implements Serializable {//simple interface to ease datahandling in other classes
	private static final long serialVersionUID = 1L;
	//client-side values
	private String type = "";
	private String format = "";
	private String answer = "";
	private int time = 0;
	private int penalty = 0;
	private int reward = 0;
	
	//server-side values, set by client-side
	private int level = 0;
	private String lang = "de-DE";
	private boolean outdoor = false;
	private boolean love = false;
	
	//pure server-side params, calulated from other vals
	private int p;
	private int m;
	private int f;
	
	//special pure server-side value, question wont be sent when true
	private boolean marked;
	
	public void store(boolean toMark) throws Exception{
		if(type.isEmpty() || format.isEmpty()) {
			System.out.println("Faulty question string");
			throw new CustomException("Faulty question string.", 10, 400);
		}
		
		this.marked = toMark;
		
		//read in custom values for storing the question
		this.p = (this.format.length() - this.format.replace("%p", "").length())/2;
		this.f = (this.format.length() - this.format.replace("%f", "").length())/2;
		this.m = (this.format.length() - this.format.replace("%m", "").length())/2;
		
		QuestionDatabase.GetOrCreate().storeQuestion(this);
	}
	
	public String toString() {
		return "type: " + type + ", format: "+format+", answer: "+answer+", language: "+lang+", level: "+level+", outdoor: "+outdoor+", love: "+love;
	}
	
	public boolean fitsIntoParams(ReadParams params) {
		return (!marked &&
				params.lang.equals("all") || params.lang.isEmpty() || this.lang.equalsIgnoreCase(params.lang)) &&
				this.level <= params.maxLevel &&
				(!this.love || params.love) &&
				(!this.outdoor || params.outdoor) &&
				(params.classic || this.love || this.outdoor) &&
				this.m <= params.m[this.level] &&
				this.f <= params.f[this.level] &&
				this.p <= params.m[this.level] + params.f[this.level];
	}
	
	public String toJSON(Player[] players) {
		List<Player> tempList = Arrays.asList(players);
		Collections.shuffle(tempList);
		//refactor question (replace %m, %f and %p)
		for(Player p : tempList) {
			if(!this.format.contains("%m")&&!this.format.contains("%f")&&!this.format.contains("%p")) {
				break;
			}
			if(p.level >= this.level && (this.format.contains("%"+p.gender)||this.format.contains("%p"))) {
				if(this.format.indexOf("%"+p.gender)>this.format.indexOf("%p")) {
					this.format = this.format.replaceFirst("(%"+p.gender+")", p.name);
				}
				else {
					this.format = this.format.replaceFirst("(%p)", p.name);
				}
			}
		}
		StringBuilder sb = new StringBuilder();
		sb.append("{ \"type\": \"" + type + "\", \"data\": {\"" + type + "\": \""+format+"\"");
		if(!answer.isEmpty())
			sb.append(", \"answer\": \"" + answer + "\"");
		if(time > 0)
			sb.append(", \"time\": " + time);
		if(penalty > 0)
			sb.append(", \"penalty\": " + penalty);
		if(reward > 0)
			sb.append(", \"reward\": " + reward);
		sb.append("}}");
		return sb.toString();
	}
}
