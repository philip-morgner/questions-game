package server.pom;

import server.databases.LoginDatabase;

public class WriteParams {
	public Task task = null;
	public String username = "";
	public String password = "";
	
	public void execute() throws Exception{
		if(task == null) {
			System.out.println("Couldn't read question from params");
			throw new CustomException("Query has wrong format.", 2, 400);
		}
		if(!username.isEmpty()) {
			//store question in admin-mode
			if(LoginDatabase.GetOrCreate().checkLoginData(this.username, this.password)) {
				task.store(false);
			} else {
				System.out.println("Wrong logindata, sending error message");
				throw new CustomException("Login failed", 5, 403);
			}
		}
		else {
			task.store(true);
		}
	}
	
	public String toString() {
		return "Question: " + this.task + " Username: " + this.username + " Password: " + this.password;
	}
}
