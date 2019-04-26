package server.pom;

public class GetParams {
	public Player[] players;
	public boolean love = false;
	public boolean outdoor = false;
	public boolean classic = true;
	public String lang = "de-DE";
	
	public String toString() {
		String res = "Players: ";
		for(Player p : this.players)
			res += "(" + p + ")";
		return res + "love: "+this.love+" outdoor: "+this.outdoor+" classic: "+this.classic+" lang: "+this.lang;
	}
}
