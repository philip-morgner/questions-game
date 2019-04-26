package server.pom;

public class Player {//simple interface to ease datahandling in other classes
	
	public String name;
	public String gender;
	public int level;
	
	public Player(String name, String sex, int level) {
		this.name=name;
		this.gender=sex;
		this.level=level;
	}
	
	public Player(String json) {
		if(json.startsWith("{"))
			json = json.substring(1);
		if(json.endsWith("}"))
			json = json.substring(0, json.length()-1);
		String[] paramss = json
				.split(",");
		for(int index = 0; index < paramss.length; index++) {
			String[] temp = paramss[index]
					.trim()
					.split(":");
			temp[0] = trimParam(temp[0]);
			if(temp[0].equalsIgnoreCase("name"))
				this.name = trimParam(temp[1]);
			if(temp[0].equalsIgnoreCase("gender"))
				this.gender = trimParam(temp[1]);
			if(temp[0].equalsIgnoreCase("level")){
				try{
					this.level = Integer.parseInt(trimParam(temp[1]));
				}catch(NumberFormatException e) {
					this.level = 0;
				}
			}
		}
	}

	private String trimParam(String param) {
		param = param.trim();
		if(param.startsWith("\""))
			param = param.substring(1);
		if(param.endsWith("\""))
			param = param.substring(0, param.length()-1);
		return param;
	}
	
	public String toString() {
		return "Name: "+name+", Sex: "+gender+", Level: "+level;
	}
}
