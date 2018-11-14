package serverPackage;

class Question {//simple interface to ease datahandling in other classes

	String question;
	String answer;
	String lang;
	int level;
	boolean outdoor;
	boolean love;
	
	public Question(String q, String answer, String lang, int a, boolean o, boolean l) {
		this.question = q;
		this.answer = answer;
		this.lang=lang;
		this.level=a;
		this.outdoor=o;
		this.love=l;
	}
	
	public String toString() {
		return "question: "+question+", answer: "+answer+", language: "+lang+", level: "+level+", outdoor: "+outdoor+", love: "+love;
	}
	
	public String toJSON() {
		return "{ \"question\": \""+question+"\", \"answer\": \""+answer+"\" }";
	}
}
