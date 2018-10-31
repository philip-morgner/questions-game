package serverPackage;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Collections;
import java.util.LinkedList;

class databaseAccess{//TODO: admin-mode options for webinterface
	
	private static final int MAX_NUM_QUESTIONS = 1024;
	
	/*
	 * Reads custom entries by means of getFromDb and refactors the question strings
	 */
	public String getQuestions(String lang, boolean lflag, boolean oflag, boolean cflag, LinkedList<Player> players) {
		//read values from playerarray
		int maxalc = 0;
		int[] m = new int[3];
		int[] f = new int[3];
		for(int i = 0; i<3; i++) {
			m[i]=0;
			f[i]=0;
		}
		for(Player p : players) {
			if(p.sex.equals("m"))for(int i = p.alc; i>=0; i--)m[i]++;
			if(p.sex.equals("f"))for(int i = p.alc; i>=0; i--)f[i]++;
			if(p.alc>maxalc)maxalc = p.alc;
		}
		
		//read entries and shuffle
		LinkedList<Question> quests = getFromDb(lang, lflag, oflag, cflag, maxalc, m, f);
		Collections.shuffle(quests);
		//build JSON
		String json = "[";
		for(int i = 0; i<MAX_NUM_QUESTIONS&&i<quests.size();i++) {
			Question q = quests.get(i);
			Collections.shuffle(players);
			//refactor question (replace %m, %f and %p)
			for(Player p : players) {
				if(!q.question.contains("%m")&&!q.question.contains("%f")&&!q.question.contains("%p")) {
					break;
				}
				if(p.alc >= q.alc && (q.question.contains("%"+p.sex)||q.question.contains("%p"))) {
					if(q.question.indexOf("%"+p.sex)>-1&&(q.question.indexOf("%"+p.sex)<q.question.indexOf("%p")||q.question.indexOf("%p")==-1)) {
						q.question = q.question.replaceFirst("(%"+p.sex+")", p.name);
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
	 * Store question, could be marked as to-be-reviewed
	 */
	public void storeQuestion(Question quest, boolean marked) {//TODO
		storeInFile(quest);
	}
	
	/*
	 * get custom questions from database
	 */
	private LinkedList<Question> getFromDb(String lang, boolean l, boolean o, boolean c, int maxalc, int[] m, int[] f){//TODO
		LinkedList<Question> list = getFromFile(lang, l, o, c, maxalc, m, f);
		return list;
	}
	
	/*
	 * testing: get custom questions from file
	 */
	private LinkedList<Question> getFromFile(String lang, boolean l, boolean o, boolean c, int maxalc, int[] m, int[] f){
		LinkedList<Question> list = new LinkedList<Question>();
		//read file as LinkedList<String> (lines)
		FileReader fr = null;
		try {
			fr = new FileReader("/home/biermann/.questgame/fakedb.txt");
		} catch (FileNotFoundException e) {
			System.out.println("Fehler im Testfall... na toll");
			return list;
		}
		BufferedReader br = new BufferedReader(fr);
		LinkedList<String> liste = new LinkedList<String>();
		String curr;
		try {
			while((curr = br.readLine())!=null) {
				liste.add(curr);
			}
			br.close();
		} catch (IOException e) {
			System.out.println("Fehler im Testfall... na toll");
			return list;
		}
		
		//parse strings in list to questions
		for(String str: liste) {
			String question = str.substring(str.indexOf("question: ")+10, str.indexOf(", answer:"));
			String answer = str.substring(str.indexOf("answer: ")+8, str.indexOf(", alc:"));
			boolean curroflag = str.substring(str.indexOf("oflag: ")+7, str.indexOf("oflag: ")+8).equals("1");
			boolean currlflag = str.substring(str.indexOf("lflag: ")+7, str.indexOf("lflag: ")+8).equals("1");
			int curralc = Integer.parseInt(str.substring(str.indexOf("alc: ")+5, str.indexOf("alc: ")+6));
			String currlang = str.substring(str.indexOf("lang: ")+6, str.indexOf(", m:"));
			int currm = Integer.parseInt(str.substring(str.indexOf("m: ")+3, str.indexOf(", f:")));
			int currf = Integer.parseInt(str.substring(str.indexOf("f: ")+3, str.indexOf(", p:")));
			int currp = Integer.parseInt(str.substring(str.indexOf("p: ")+3));
			
			
			Question qu = new Question(question, answer, currlang, curralc, curroflag, currlflag);
			
			//add question if according to custom values
			if(currlang.equalsIgnoreCase(lang)&&curralc<=maxalc&&(!currlflag||l)&&(!curroflag||o)&&(c||currlflag||curroflag)&&currm<=m[curralc]&&currf<=f[curralc]&&currp<=m[curralc]+f[curralc]) {
				list.add(qu);
			}
		}
		
		return list;
	}
	
	/*
	 * testing: store Question in file
	 */
	private void storeInFile(Question quest) {
		//read in custom values for storing the question
		int o = 0;
		int l = 0;
		if(quest.outdoor)o=1;
		if(quest.love)l=1;
		int p = (quest.question.length() - quest.question.replace("%p", "").length())/2;
		int f = (quest.question.length() - quest.question.replace("%f", "").length())/2;
		int m = (quest.question.length() - quest.question.replace("%m", "").length())/2;
		//string to write to file
		String write = "question: "+quest.question+", answer: "+quest.answer+", alc: "+quest.alc+", oflag: "+o+", flag: "+l+", lang: "+quest.lang+", m: "+m+", f: "+f+", p: "+p+"\n";
		try {//write
			Files.write(Paths.get("/home/biermann/.questgame/fakedb.txt"), write.getBytes(), StandardOpenOption.APPEND);
		} catch (IOException e) {
			System.out.println("Fehler im Testfall... na toll");
			return;
		}
	}
}