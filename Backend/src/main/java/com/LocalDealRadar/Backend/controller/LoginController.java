package com.LocalDealRadar.Backend.controller;
import com.LocalDealRadar.Backend.model.User;
import com.LocalDealRadar.Backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class LoginController {

    private final UserRepository repo;

    public LoginController(UserRepository repo){
        this.repo = repo;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){

        User existing = repo.findByEmail(user.getEmail()).orElse(null);

        if(existing == null){
            return "FAIL";
        }

        if(existing.getPassword().equals(user.getPassword())){
            return "SUCCESS";
        }

        return "FAIL";
    }
}