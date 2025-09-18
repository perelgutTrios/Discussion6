package com.example.discussionboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String text;
    private String subjectId; // Reference to Subject
    private String userId;    // Reference to User
    private Date timestamp = new Date();

    // Getters and setters
}