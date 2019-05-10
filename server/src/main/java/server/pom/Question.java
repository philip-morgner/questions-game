package server.pom;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import server.databases.QuestionDatabase;

public class Question implements Serializable {//simple interface to ease datahandling in other classes
	private static final long serialVersionUID = 1L;
	
	private String question;
	private String answer;
	private String lang;
	private int level;
	private boolean outdoor;
	private boolean love;
	private int p;
	private int m;
	private int f;
	private boolean marked;
	
	public void store(boolean toMark) throws Exception{
		this.marked = toMark;
		
		//read in custom values for storing the question
		this.p = (this.question.length() - this.question.replace("%p", "").length())/2;
		this.f = (this.question.length() - this.question.replace("%f", "").length())/2;
		this.m = (this.question.length() - this.question.replace("%m", "").length())/2;
		
		QuestionDatabase.GetOrCreate().storeQuestion(this);
	}
	
	public String toString() {
		return "question: "+question+", answer: "+answer+", language: "+lang+", level: "+level+", outdoor: "+outdoor+", love: "+love;
	}
	
	public String toSaveableString() {
		return question + "|" + answer + "|" + lang + "|" + level + "|" + outdoor + "|" + love + "|" + p + "|" + m + "|" + f + "|" + marked;
	}
	
	public boolean fitsIntoParams(ReadParams params) {
		return (params.lang.equals("all")||params.lang.isEmpty()||this.lang.equalsIgnoreCase(params.lang))
				&&this.level<=params.maxLevel&&
				(!this.love||params.love)&&
				(!this.outdoor||params.outdoor)&&
				(params.classic||this.love||this.outdoor)&&
				this.m<=params.m[this.level]&&
				this.f<=params.f[this.level]&&
				this.p<=params.m[this.level]+params.f[this.level];
	}
	
	public String toJSON(Player[] players) {
		List<Player> tempList = Arrays.asList(players);
		Collections.shuffle(tempList);
		//refactor question (replace %m, %f and %p)
		for(Player p : tempList) {
			if(!this.question.contains("%m")&&!this.question.contains("%f")&&!this.question.contains("%p")) {
				break;
			}
			if(p.level >= this.level && (this.question.contains("%"+p.gender)||this.question.contains("%p"))) {
				if(this.question.indexOf("%"+p.gender)>this.question.indexOf("%p")) {
					this.question = this.question.replaceFirst("(%"+p.gender+")", p.name);
				}
				else {
					this.question = this.question.replaceFirst("(%p)", p.name);
				}
			}
		}
		return "{ \"question\": \""+question+"\", \"answer\": \""+answer+"\" }";
	}
}
