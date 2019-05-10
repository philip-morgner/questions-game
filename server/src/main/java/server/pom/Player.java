package server.pom;

public class Player {//simple interface to ease datahandling in other classes
	
	public String name;
	public String gender;
	public int level;
	
	public String toString() {
		return "Name: "+name+", Sex: "+gender+", Level: "+level;
	}
}
