package server.pom;

import java.util.LinkedList;

import server.databases.QuestionDatabase;

public class ReadParams {
	public Player[] players;
	public boolean love = false;
	public boolean outdoor = false;
	public boolean classic = true;
	public String lang = "de-DE";
	
	//calulated
	public int[] m = new int[3];
	public int[] f = new int[3];
	public int maxLevel = 0;
	
	public LinkedList<Task> execute() throws Exception{
		//minimal query: one player and one flag true
		if((!love&&!outdoor&&!classic)||players.length < 1) {
			System.out.println("Query was formatted wrong, sending error");
			throw new CustomException("Query has wrong format.", 2, 400);
		}
		
		//read values from playerarray
		for(int i = 0; i<3; i++) {
			m[i]=0;
			f[i]=0;
		}
		for(Player p : players) {
			if(p.gender == 'm')
				for(int i = p.level; i>=0; i--)
					m[i]++;
			
			if(p.gender == 'f')
				for(int i = p.level; i>=0; i--)
					f[i]++;
			
			if(p.level > maxLevel)
				maxLevel = p.level;
		}
		return QuestionDatabase.GetOrCreate().getQuestions(this);
	}
	
	public String toString() {
		String res = "Players: ";
		for(Player p : this.players)
			res += "(" + p + ")";
		return res + "love: "+this.love+" outdoor: "+this.outdoor+" classic: "+this.classic+" lang: "+this.lang;
	}
}
