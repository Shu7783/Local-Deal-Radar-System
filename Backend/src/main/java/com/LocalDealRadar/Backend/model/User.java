package com.LocalDealRadar.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="users")

public class User {
    @Column(unique = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String role;
    private String shopName;

    // 🔥 NEW FIELDS ADDED
    private String mobile;
    private String address;
    private String image;

    public User() {}

    public Long getId(){ return id; }

    public String getName(){ return name; }
    public void setName(String name){ this.name = name; }

    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }

    public String getPassword(){ return password; }
    public void setPassword(String password){ this.password = password; }

    public String getRole(){ return role; }
    public void setRole(String role){ this.role = role; }

    public String getShopName(){ return shopName; }
    public void setShopName(String shopName){ this.shopName = shopName; }

    // 🔥 MOBILE
    public String getMobile(){ return mobile; }
    public void setMobile(String mobile){ this.mobile = mobile; }

    // 🔥 ADDRESS
    public String getAddress(){ return address; }
    public void setAddress(String address){ this.address = address; }

    // 🔥 IMAGE PATH
    public String getImage(){ return image; }
    public void setImage(String image){ this.image = image; }
}