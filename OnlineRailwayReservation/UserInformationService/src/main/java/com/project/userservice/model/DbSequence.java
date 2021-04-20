package com.project.userservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection="db_sequence")
public class DbSequence {
	
	@Id
	private String id;
	private int seq;
	public DbSequence(String id, int seq) {
		super();
		this.id = id;
		this.seq = seq;
	}
	public DbSequence() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}

}
