package com.vcube.inventory.controller;

import com.vcube.inventory.dto.AiRequest;
import com.vcube.inventory.dto.AiResponse;
import com.vcube.inventory.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/demand-forecast")
    public ResponseEntity<AiResponse> demandForecast(@RequestBody AiRequest request) {
        String result = aiService.demandForecast(
                request.getProductId(),
                request.getDays() != null ? request.getDays() : 30
        );
        return ResponseEntity.ok(new AiResponse(result));
    }

    @PostMapping("/stock-optimization")
    public ResponseEntity<AiResponse> stockOptimization() {
        String result = aiService.stockOptimization();
        return ResponseEntity.ok(new AiResponse(result));
    }

    @PostMapping("/purchase-recommendation")
    public ResponseEntity<AiResponse> purchaseRecommendation(@RequestBody AiRequest request) {
        String result = aiService.purchaseRecommendation(
                request.getBudget() != null ? request.getBudget() : 10000.0
        );
        return ResponseEntity.ok(new AiResponse(result));
    }

    @PostMapping("/query")
    public ResponseEntity<AiResponse> naturalLanguageQuery(@RequestBody AiRequest request) {
        String result = aiService.naturalLanguageQuery(request.getQuestion());
        return ResponseEntity.ok(new AiResponse(result));
    }
}

