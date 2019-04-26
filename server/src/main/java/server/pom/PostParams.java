package server.pom;

public class PostParams {
	public Question question;
	public String username;
	public String password;
	
	public String toString() {
		return "Question: " + this.question + " Username: " + this.username + " Password: " + this.password;
	}
}
