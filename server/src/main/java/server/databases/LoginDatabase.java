package server.databases;

public class LoginDatabase {
	private static LoginDatabase Instance = null;
	private String path;
	
	private LoginDatabase() {}

	public boolean checkLoginData(String username, String password) {
		// TODO Auto-generated method stub
		return false;
	}
	
	public void setPath(String newPath) {
		this.path = newPath;
	}
	
	public static LoginDatabase GetOrCreate() {
		if(Instance == null) {
			Instance = new LoginDatabase();
		}
		return Instance;
	}
}
