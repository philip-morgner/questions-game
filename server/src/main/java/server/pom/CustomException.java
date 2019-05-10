package server.pom;

import java.io.PrintWriter;
import java.io.StringWriter;

public class CustomException extends Exception {
	private int errorCode;
	public int httpErrorCode;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CustomException(String message, int errorCode, int httpErrorCode) {
		super(message);
		this.errorCode = errorCode;
		this.httpErrorCode = httpErrorCode;
	}
	
	@Override
	public String getMessage() {
		StringWriter tempSW = new StringWriter();
		PrintWriter tempPW = new PrintWriter(tempSW);
		this.printStackTrace(tempPW);
		String stackTrace = tempSW.toString();
		return "\"error\": { \"message\": \""+ this.getMessage() +"\", \"code\": "+ this.errorCode +", \"stackTrace\": "+ stackTrace +" }";
	}
}
