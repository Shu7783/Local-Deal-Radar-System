package com.LocalDealRadar.Backend.controller;

import com.LocalDealRadar.Backend.model.User;
import com.LocalDealRadar.Backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository repo;

    public AuthController(UserRepository repo){
        this.repo = repo;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        String email = user.getEmail();

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("EMAIL REQUIRED ❌");
        }

        email = email.trim().toLowerCase();
        user.setEmail(email);

        try {

            if (repo.findByEmailIgnoreCase(email).isPresent()) {
                return ResponseEntity.badRequest().body("EMAIL ALREADY EXISTS ❌");
            }

            User saved = repo.save(user);

            return ResponseEntity.ok("REGISTERED SUCCESSFULLY ✅");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("REGISTRATION FAILED 🚨");
        }
    }
}