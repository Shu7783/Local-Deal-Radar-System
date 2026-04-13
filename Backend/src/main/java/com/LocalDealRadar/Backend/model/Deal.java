package com.LocalDealRadar.Backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "deals")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String category;

    @Column(nullable = false)
    private double originalPrice;

    @Column(nullable = false)
    private double offerPrice;

    @Column(nullable = false)
    private long offerEndTime;

    // 🔥 FIXED (BIG IMAGES SAFE)
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private String address;

    // ✅ NULL SAFE
    private Double latitude;
    private Double longitude;

    // 🔥 AUTO TIMESTAMP (BONUS)
    private long createdAt = System.currentTimeMillis();

    // ================= GETTERS / SETTERS =================

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) {
        this.title = title != null ? title.trim() : "";
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(double originalPrice) {
        this.originalPrice = Math.max(0, originalPrice);
    }

    public double getOfferPrice() { return offerPrice; }
    public void setOfferPrice(double offerPrice) {
        this.offerPrice = Math.max(0, offerPrice);
    }

    public long getOfferEndTime() { return offerEndTime; }
    public void setOfferEndTime(long offerEndTime) {
        this.offerEndTime = offerEndTime;
    }

    public String getImage() { return image; }
    public void setImage(String image) {
        if (image != null && image.startsWith("data:image")) {
            this.image = image;
        } else {
            this.image = "";
        }
    }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) {
        this.latitude = latitude != null ? latitude : 0.0;
    }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) {
        this.longitude = longitude != null ? longitude : 0.0;
    }

    public long getCreatedAt() { return createdAt; }
}