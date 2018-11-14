package serverPackage;

class Player {//simple interface to ease datahandling in other classes
	
	String name;
	String sex;
	int level;
	
	public Player(String name, String sex, int level) {
		this.name=name;
		this.sex=sex;
		this.level=level;
	}
	
	public String toString() {
		return "Name: "+name+", Sex: "+sex+", Level: "+level;
	}
}
