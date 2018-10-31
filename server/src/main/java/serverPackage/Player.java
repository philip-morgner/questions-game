package serverPackage;

class Player {//simple interface to ease datahandling in other classes
	
	String name;
	String sex;
	int alc;
	
	public Player(String name, String sex, int alc) {
		this.name=name;
		this.sex=sex;
		this.alc=alc;
	}
	
	public String toString() {
		return "Name: "+name+", Sex: "+sex+", Alc: "+alc;
	}
}
