package com.LocalDealRadar.Backend.controller;
import com.LocalDealRadar.Backend.Entity.Favorite;
import com.LocalDealRadar.Backend.repository.FavoriteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/favorite")
@CrossOrigin("*")
public class FavoriteController {

    private final FavoriteRepository repo;

    public FavoriteController(FavoriteRepository repo){
        this.repo = repo;
    }

    // ❤️ ADD FAVORITE
    @PostMapping
    public String addFavorite(@RequestBody Favorite fav){

        fav.setEmail(fav.getEmail().trim().toLowerCase());

        repo.save(fav);

        return "ADDED TO WISHLIST ❤️";
    }
    @DeleteMapping("/{id}")
    public String deleteFav(@PathVariable Long id){
        repo.deleteById(id);
        return "REMOVED ❌";
    }

    // 📦 GET FAVORITES
    @GetMapping("/{email}")
    public List<Favorite> getFav(@PathVariable String email){

        email = email.trim().toLowerCase();

        return repo.findByEmail(email);
    }
}