package com.LocalDealRadar.Backend.controller;

import com.LocalDealRadar.Backend.model.User;
import com.LocalDealRadar.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/forgot")
@CrossOrigin("*")
public class ForgetPasswordController {

    @Autowired
    private UserRepository userRepository;
    @PostMapping("/reset")
    public String resetPassword(@RequestParam String email,
                                @RequestParam String newPassword){

        email = email.trim().toLowerCase();   // 🔥 ADD THIS LINE

        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElse(null);

        if(user == null){
            return "USER NOT FOUND";
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        return "SUCCESS";
    }
}