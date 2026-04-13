package com.LocalDealRadar.Backend.controller;

import com.LocalDealRadar.Backend.model.User;
import com.LocalDealRadar.Backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class ProfileController {

    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/update")
    public String updateProfile(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String shopName,
            @RequestParam(required = false) String mobile,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) MultipartFile image
    ){

        email = email.trim().toLowerCase();

        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElse(null);

        if(user == null){
            return "USER NOT FOUND";
        }

        user.setName(name);
        user.setShopName(shopName);
        user.setMobile(mobile);
        user.setAddress(address);

        // 🔥 IMAGE SAVE (LOCAL)
        if(image != null && !image.isEmpty()){
            try {

                String folder = "uploads/";
                new File(folder).mkdirs();

                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                String path = folder + fileName;

                image.transferTo(new File(path));

                user.setImage(path);

            } catch (IOException e){
                e.printStackTrace();
                return "IMAGE UPLOAD FAILED";
            }
        }

        userRepository.save(user);

        return "UPDATED SUCCESSFULLY";
    }
}