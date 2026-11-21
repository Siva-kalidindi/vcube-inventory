package com.vcube.inventory.dto;

import lombok.Data;

@Data
public class AiRequest {
    private Long productId;      // for demand forecast
    private Integer days;         // forecast period
    private Double budget;        // for purchase recommendations
    private String question;      // for natural language query
}

