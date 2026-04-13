package com.LocalDealRadar.Backend.repository;

import com.LocalDealRadar.Backend.Entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByEmail(String email);
}