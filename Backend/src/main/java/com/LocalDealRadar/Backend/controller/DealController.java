package com.LocalDealRadar.Backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/deals")
@CrossOrigin(origins = "*")
public class DealController {

    private final List<Map<String, Object>> deals = new ArrayList<>();

    // ✅ GET ALL DEALS
    @GetMapping
    public List<Map<String, Object>> getDeals() {
        return deals;
    }

    // ✅ ADD DEAL
    @PostMapping
    public Map<String, Object> addDeal(@RequestBody Map<String, Object> deal) {

        Map<String, Object> response = new HashMap<>();

        try {

            // 🔥 TITLE VALIDATION
            String title = deal.get("title") != null ? deal.get("title").toString().trim() : "";
            if (title.isEmpty()) {
                throw new RuntimeException("Title is required");
            }

            // 🔥 PRICE VALIDATION
            double originalPrice = Double.parseDouble(deal.get("originalPrice").toString());
            double offerPrice = Double.parseDouble(deal.get("offerPrice").toString());

            if (originalPrice <= 0 || offerPrice <= 0) {
                throw new RuntimeException("Price must be greater than 0");
            }

            if (offerPrice > originalPrice) {
                throw new RuntimeException("Offer price cannot be greater than original price");
            }

            deal.put("originalPrice", originalPrice);
            deal.put("offerPrice", offerPrice);

            // 🔥 TIME VALIDATION
            long finalTime = 0;
            Object timeObj = deal.get("offerEndTime");

            if (timeObj != null) {
                String timeStr = timeObj.toString().trim();
                if (!timeStr.equals("") && !timeStr.equalsIgnoreCase("NaN")) {
                    finalTime = Long.parseLong(timeStr);
                }
            }

            if (finalTime <= System.currentTimeMillis()) {
                throw new RuntimeException("Offer time must be in the future");
            }

            deal.put("offerEndTime", finalTime);

            // 🔥 IMAGE FIX (FINAL — NO DELETION)
            String image = deal.get("image") != null
                    ? deal.get("image").toString()
                    : "";

            deal.put("image", image);

            // 🔥 LOCATION SAFE
            double lat = deal.get("latitude") != null
                    ? Double.parseDouble(deal.get("latitude").toString())
                    : 0;

            double lng = deal.get("longitude") != null
                    ? Double.parseDouble(deal.get("longitude").toString())
                    : 0;

            deal.put("latitude", lat);
            deal.put("longitude", lng);

            // 🔥 ID GENERATION
            deal.put("id", System.currentTimeMillis());

            deals.add(deal);

            System.out.println("✅ SAVED DEAL: " + deal);

            response.put("status", "SUCCESS");
            response.put("data", deal);

        } catch (Exception e) {

            e.printStackTrace();

            response.put("status", "ERROR");
            response.put("message", e.getMessage());
        }

        return response;
    }

    // 🔥 NEARBY DEALS (basic filter)
    @GetMapping("/nearby")
    public List<Map<String, Object>> getNearbyDeals(
            @RequestParam double lat,
            @RequestParam double lng
    ) {

        List<Map<String, Object>> nearby = new ArrayList<>();

        for (Map<String, Object> deal : deals) {

            double dLat = Double.parseDouble(deal.get("latitude").toString());
            double dLng = Double.parseDouble(deal.get("longitude").toString());

            double distance = Math.sqrt(
                    Math.pow(lat - dLat, 2) +
                            Math.pow(lng - dLng, 2)
            );

            if (distance < 0.1) {
                nearby.add(deal);
            }
        }

        return nearby;
    }
}