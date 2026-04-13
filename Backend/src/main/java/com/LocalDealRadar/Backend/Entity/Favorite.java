package com.LocalDealRadar.Backend.Entity;

import jakarta.persistence.*;

@Entity
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private Long dealId;
    private String title;
    private double price;

    // 🔥 IMPORTANT FIX (IMAGE ADD)
    @Column(columnDefinition = "TEXT")
    private String image;

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getDealId() { return dealId; }
    public void setDealId(Long dealId) { this.dealId = dealId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    // 🔥 IMAGE GETTER SETTER
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}