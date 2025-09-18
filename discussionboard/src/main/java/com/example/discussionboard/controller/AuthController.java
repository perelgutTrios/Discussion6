package com.example.discussionboard.controller;

import com.example.discussionboard.model.User;
import com.example.discussionboard.repository.UserRepository;
import com.example.discussionboard.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("Registration successful.");
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User login) {
        Optional<User> userOpt = userRepository.findByEmail(login.getEmail());
        if (userOpt.isEmpty() || !passwordEncoder.matches(login.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials.");
        }
        String token = jwtUtil.generateToken(userOpt.get().getId(), userOpt.get().getEmail());
        // You can return user info and token as a map or DTO
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", userOpt.get());
        return ResponseEntity.ok(response);
    }
}