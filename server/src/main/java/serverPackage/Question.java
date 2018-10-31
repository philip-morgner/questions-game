package serverPackage;

public class Question {

	String question;
	String answer;
	String lang;
	int alc;
	boolean outdoor;
	boolean love;
	
	public Question(String q, String answer, String lang, int a, boolean o, boolean l) {
		this.question = q;
		this.answer = answer;
		this.lang=lang;
		this.alc=a;
		this.outdoor=o;
		this.love=l;
	}
	
	public String toString() {
		return "question: "+question+", answer: "+answer+", language: "+lang+", alc: "+alc+", outdoor: "+outdoor+", love: "+love;
	}
	
	public String toJSON() {
		return "{ \"question\": \""+question+"\", \"answer\": \""+answer+"\" }";
	}
}
