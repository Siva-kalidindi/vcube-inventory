package com.vcube.inventory.dto;

public class AiRequest {
    private Long productId;
    private Integer days;
    private Double budget;
    private String question;

    public AiRequest() {}

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Integer getDays() { return days; }
    public void setDays(Integer days) { this.days = days; }

    public Double getBudget() { return budget; }
    public void setBudget(Double budget) { this.budget = budget; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
}
