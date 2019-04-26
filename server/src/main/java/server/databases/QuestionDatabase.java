package server.databases;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import server.pom.GetParams;
import server.pom.Player;
import server.pom.Question;

public class QuestionDatabase {
	private static QuestionDatabase Instance = null;
	private String path;
	
	private static final int MAX_NUM_QUESTIONS = 1024;
	
	private QuestionDatabase() {
		
	}
	
	/*
	 * Reads custom entries by means of getFromDb and refactors the question strings
	 */
	public String getQuestions(GetParams params) {
		if(params.lang.equals("all"))params.lang = "";
		//read values from playerarray
		int maxlevel = 0;
		int[] m = new int[3];
		int[] f = new int[3];
		for(int i = 0; i<3; i++) {
			m[i]=0;
			f[i]=0;
		}
		for(Player p : params.players) {
			if(p.gender.equals("m"))for(int i = p.level; i>=0; i--)m[i]++;
			if(p.gender.equals("f"))for(int i = p.level; i>=0; i--)f[i]++;
			if(p.level>maxlevel)maxlevel = p.level;
		}
		
		//read entries and shuffle
		LinkedList<Question> quests = getFromDb(params.lang, params.love, params.outdoor, params.classic, maxlevel, m, f);
		Collections.shuffle(quests);
		
		if(quests.size() == 0)return "[]";
		
		//build JSON
		String json = "[";
		for(int i = 0; i<MAX_NUM_QUESTIONS&&i<quests.size();i++) {
			Question q = quests.get(i);
			List<Player> tempList = Arrays.asList(params.players);
			Collections.shuffle(tempList);
			params.players = (Player[]) tempList.toArray();
			//refactor question (replace %m, %f and %p)
			for(Player p : params.players) {
				if(!q.question.contains("%m")&&!q.question.contains("%f")&&!q.question.contains("%p")) {
					break;
				}
				if(p.level >= q.level && (q.question.contains("%"+p.gender)||q.question.contains("%p"))) {
					if(q.question.indexOf("%"+p.gender)>-1&&(q.question.indexOf("%"+p.gender)<q.question.indexOf("%p")||q.question.indexOf("%p")==-1)) {
						q.question = q.question.replaceFirst("(%"+p.gender+")", p.name);
					}
					else {
						q.question = q.question.replaceFirst("(%p)", p.name);
					}
				}
			}
			json = json+q.toJSON()+", ";
		}
		json=json.substring(0, json.length()-2)+"]";
		
		return json;
	}
	
	/*
	 * Store question
	 */
	public void storeQuestion(Question toStore, boolean toMark) {
		//read in custom values for storing the question
		int o = 0;
		int l = 0;
		if(toStore.outdoor)o=1;
		if(toStore.love)l=1;
		int p = (toStore.question.length() - toStore.question.replace("%p", "").length())/2;
		int f = (toStore.question.length() - toStore.question.replace("%f", "").length())/2;
		int m = (toStore.question.length() - toStore.question.replace("%m", "").length())/2;
		this.storeInDB(o, l, p, f, m, toStore.question, toStore.answer, toStore.level, toStore.lang, toMark);;
	}
	
	public void setPath(String newPath) {
		this.path = newPath;
	}
	
	public static QuestionDatabase GetOrCreate() {
		if(Instance == null) {
			Instance = new QuestionDatabase();
		}
		return Instance;
	}
}
