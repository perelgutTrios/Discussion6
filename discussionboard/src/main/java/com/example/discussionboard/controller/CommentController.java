package com.example.discussionboard.controller;

import com.example.discussionboard.model.Comment;
import com.example.discussionboard.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/subject/{subjectId}")
    public List<Comment> getCommentsBySubject(@PathVariable String subjectId) {
        return commentRepository.findBySubjectId(subjectId);
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Comment comment) {
        commentRepository.save(comment);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getComment(@PathVariable String id) {
        return commentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}