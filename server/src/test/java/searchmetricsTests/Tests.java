package searchmetricsTests;
import com.google.gson.Gson;

import server.pom.*;

public class Tests {

	public static void main(String[] args) {
		Gson gson = new Gson();
		String json = "{players: [{name:\"Name\", \"gender\": \"m\", \"level\": 2},{name:\"Name\", \"gender\": \"m\", \"level\": 2}]}";
		GetParams temp = gson.fromJson(json, GetParams.class);
		System.out.println(temp);
	}

}
