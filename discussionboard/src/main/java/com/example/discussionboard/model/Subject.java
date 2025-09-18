package com.example.discussionboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "subjects")
public class Subject {
    @Id
    private String id;
    private String title;
    private String description;
    private String userId; // Reference to User
    private Date timestamp = new Date();

    // Getters and setters
}