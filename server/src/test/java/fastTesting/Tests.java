package fastTesting;
import com.google.gson.Gson;

import server.pom.*;

public class Tests {

	public static void main(String[] args) {
		Gson gson = new Gson();
		String json = "{players: [{name:\"Name\", \"gender\": \"m\", \"level\": 2},{name:\"Name\", \"gender\": \"m\", \"level\": 2}]}";
		ReadParams temp = gson.fromJson(json, ReadParams.class);
		System.out.println(temp);
	}

}
