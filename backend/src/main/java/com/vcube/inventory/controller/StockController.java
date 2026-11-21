package com.vcube.inventory.controller;

import com.vcube.inventory.entity.Product;
import com.vcube.inventory.entity.StockTransaction;
import com.vcube.inventory.repository.ProductRepository;
import com.vcube.inventory.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stock-transactions")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;
    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<StockTransaction>> getAllTransactions() {
        return ResponseEntity.ok(stockService.getAllTransactions());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<StockTransaction>> getByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(stockService.getTransactionsByProduct(productId));
    }

    @PostMapping
    public ResponseEntity<StockTransaction> createTransaction(@RequestBody Map<String, Object> body) {
        Long productId = Long.valueOf(body.get("productId").toString());
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        StockTransaction transaction = new StockTransaction();
        transaction.setProduct(product);
        transaction.setType(StockTransaction.TransactionType.valueOf(
                body.get("type").toString().toUpperCase()));
        transaction.setQuantity(Integer.valueOf(body.get("quantity").toString()));
        transaction.setNotes((String) body.get("notes"));

        return ResponseEntity.ok(stockService.createTransaction(transaction));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<StockTransaction>> getRecentTransactions(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(stockService.getRecentTransactions(limit));
    }
}

