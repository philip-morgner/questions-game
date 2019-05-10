package server.databases;

import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;

import org.apache.commons.io.IOUtils;

public class LoginDatabase {
	private static LoginDatabase Instance = null;
	private String path;
	
	private LoginDatabase() {}

	public boolean checkLoginData(String username, String password) {
		try (FileInputStream reader = new FileInputStream(path + "/" + username + ".bin")){
			byte[] buffer = IOUtils.toByteArray(reader);
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(password.getBytes(StandardCharsets.UTF_8));
			return Arrays.equals(buffer, md.digest());
		}catch(Exception ex) {
			return false;
		}
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
