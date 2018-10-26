package serverPackage;

public class databaseAccess{
	
	private static final int MAX_NUM_QUESTIONS = 1024;
	
	public String getQuestions(String lang, boolean lflag, boolean oflag, boolean cflag, Player[] players) {
		return "[ { \"question\": \"testing question; lang = "+lang+"; cflag = "+cflag+"; lflag = "+lflag+"; oflag = "+oflag+"\" }]";
	}
}