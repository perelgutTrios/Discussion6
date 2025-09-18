package com.example.discussionboard.repository;

import com.example.discussionboard.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findBySubjectId(String subjectId);
    List<Comment> findByUserId(String userId);
}