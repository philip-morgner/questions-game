package serverPackage;

public class Player {
	
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
