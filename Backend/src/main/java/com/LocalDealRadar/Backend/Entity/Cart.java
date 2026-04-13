package com.LocalDealRadar.Backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private Long dealId;
    private String title;
    private double price;

    public Long getId(){ return id; }

    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }

    public Long getDealId(){ return dealId; }
    public void setDealId(Long dealId){ this.dealId = dealId; }

    public String getTitle(){ return title; }
    public void setTitle(String title){ this.title = title; }

    public double getPrice(){ return price; }
    public void setPrice(double price){ this.price = price; }
}