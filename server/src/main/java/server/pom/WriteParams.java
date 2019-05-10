package server.pom;

import server.databases.LoginDatabase;

public class WriteParams {
	public Question question = null;
	public String username = "";
	public String password = "";
	
	public void execute() throws Exception{
		if(question != null) {
			System.out.println("Couldn't read question from params");
			throw new CustomException("Query has wrong format.", 2, 400);
		}
		if(!username.isEmpty()) {
			//store question in admin-mode
			if(LoginDatabase.GetOrCreate().checkLoginData(this.username, this.password)) {
				question.store(false);
			} else {
				System.out.println("Wrong logindata, sending error message");
				throw new CustomException("Login failed", 5, 403);
			}
		}
		else {
			question.store(true);
		}
	}
	
	public String toString() {
		return "Question: " + this.question + " Username: " + this.username + " Password: " + this.password;
	}
}
