package serverPackage;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.LinkedList;

class databaseAccess{//TODO: admin-mode options for webinterface
	
	private static final int MAX_NUM_QUESTIONS = 1024;
	
	/*
	 * Reads custom entries by means of getFromDb and refactors the question strings
	 */
	public String getQuestions(String lang, boolean lflag, boolean oflag, boolean cflag, LinkedList<Player> players) {
		//read values from playerarray
		int maxlevel = 0;
		int[] m = new int[3];
		int[] f = new int[3];
		for(int i = 0; i<3; i++) {
			m[i]=0;
			f[i]=0;
		}
		for(Player p : players) {
			if(p.sex.equals("m"))for(int i = p.level; i>=0; i--)m[i]++;
			if(p.sex.equals("f"))for(int i = p.level; i>=0; i--)f[i]++;
			if(p.level>maxlevel)maxlevel = p.level;
		}
		
		//read entries and shuffle
		LinkedList<Question> quests = getFromDb(lang, lflag, oflag, cflag, maxlevel, m, f);
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
				if(p.level >= q.level && (q.question.contains("%"+p.sex)||q.question.contains("%p"))) {
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
	private LinkedList<Question> getFromDb(String lang, boolean l, boolean o, boolean c, int maxlevel, int[] m, int[] f){//TODO
		LinkedList<Question> list = getFromFile(lang, l, o, c, maxlevel, m, f);
		return list;
	}
	
	/*
	 * testing: get custom questions from file
	 */
	private LinkedList<Question> getFromFile(String lang, boolean l, boolean o, boolean c, int maxlevel, int[] m, int[] f){
		LinkedList<Question> list = new LinkedList<Question>();
		//read file as LinkedList<String> (lines)
		FileReader fr = null;
		try {
			fr = new FileReader("/home/biermann/.questgame/fakedb.txt");
		} catch (FileNotFoundException e) {
			System.out.println("Fehler im Testfall... na toll");
			return list;
		}
		
		System.out.println("hi");
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
			String answer = str.substring(str.indexOf("answer: ")+8, str.indexOf(", level:"));
			boolean curroflag = str.substring(str.indexOf("oflag: ")+7, str.indexOf("oflag: ")+8).equals("1");
			boolean currlflag = str.substring(str.indexOf("lflag: ")+7, str.indexOf("lflag: ")+8).equals("1");
			int currlevel = Integer.parseInt(str.substring(str.indexOf("level: ")+7, str.indexOf("level: ")+8));
			String currlang = str.substring(str.indexOf("lang: ")+6, str.indexOf(", m:"));
			int currm = Integer.parseInt(str.substring(str.indexOf("m: ")+3, str.indexOf(", f:")));
			int currf = Integer.parseInt(str.substring(str.indexOf("f: ")+3, str.indexOf(", p:")));
			int currp = Integer.parseInt(str.substring(str.indexOf("p: ")+3));
			
			
			Question qu = new Question(question, answer, currlang, currlevel, curroflag, currlflag);
			
			//add question if according to custom values
			if(currlang.equalsIgnoreCase(lang)&&currlevel<=maxlevel&&(!currlflag||l)&&(!curroflag||o)&&(c||currlflag||curroflag)&&currm<=m[currlevel]&&currf<=f[currlevel]&&currp<=m[currlevel]+f[currlevel]) {
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
		String write = "question: "+quest.question+", answer: "+quest.answer+", level: "+quest.level+", oflag: "+o+", flag: "+l+", lang: "+quest.lang+", m: "+m+", f: "+f+", p: "+p+"\n";
		FileWriter fw;
		try {
			fw = new FileWriter("/home/max/.questgame/fakedb.txt", true);
		} catch (IOException e) {
			System.out.println("Fehler im Testfall... na toll");
			return;
		}
	    BufferedWriter bw = new BufferedWriter(fw);
	    PrintWriter out = new PrintWriter(bw);
	    out.print(write);
	    out.close();
	}
}