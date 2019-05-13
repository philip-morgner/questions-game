package server.databases;

import java.io.*;
import java.util.Collections;
import java.util.LinkedList;

import server.pom.ReadParams;
import server.pom.Task;

public class QuestionDatabase {
	private static QuestionDatabase Instance = null;
	private File dbFile = null;
	
	private static final int MAX_NUM_QUESTIONS = 1024;
	
	private QuestionDatabase(){}
	
	/*
	 * Reads custom entries by means of getFromDb and refactors the question strings
	 */
	public LinkedList<Task> getQuestions(ReadParams params) throws Exception {
		//read entries and shuffle and cap
		LinkedList<Task> result = getFromDb(params);
		
		Collections.shuffle(result);
		
		while(result.size() > MAX_NUM_QUESTIONS)
			result.removeLast();
		
		return result;
	}
	
	/*
	 * Store question
	 */
	public void storeQuestion(Task toStore) throws Exception {
		FileOutputStream temp = new FileOutputStream(dbFile, true);
		ObjectOutputStream stream = new ObjectOutputStream(temp);
		stream.writeObject(toStore);
		stream.close();
		temp.close();
	}

	private LinkedList<Task> getFromDb(ReadParams params) throws Exception {
		LinkedList<Task> res = new LinkedList<Task>();
		
		try (ObjectInputStream stream = new ObjectInputStream(new FileInputStream(dbFile))) {
			while(true) {
				Task currentQuestion = (Task) stream.readObject();
				//add question if according to custom values
				if(currentQuestion.fitsIntoParams(params)) {
					res.add(currentQuestion);
				}
			}
		} catch(EOFException ex) {}
		
		return res;
	}
	
	public void setPath(String newPath) {
		this.dbFile = new File(newPath);
	}
	
	public static QuestionDatabase GetOrCreate() {
		if(Instance == null) {
			Instance = new QuestionDatabase();
		}
		return Instance;
	}
}
