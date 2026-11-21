package com.vcube.inventory.service;

import com.vcube.inventory.entity.Product;
import com.vcube.inventory.entity.StockTransaction;
import com.vcube.inventory.repository.ProductRepository;
import com.vcube.inventory.repository.StockTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiService {

    private final ChatClient.Builder chatClientBuilder;
    private final ProductRepository productRepository;
    private final StockTransactionRepository transactionRepository;

    /**
     * AI Feature 1: Demand Forecasting
     * Takes a product and its transaction history, asks AI to predict future demand.
     */
    public String demandForecast(Long productId, int days) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<StockTransaction> transactions = transactionRepository.findByProductId(productId);

        String transactionData = transactions.stream()
                .map(t -> String.format("Date: %s, Type: %s, Qty: %d",
                        t.getCreatedAt(), t.getType(), t.getQuantity()))
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
                You are an inventory analyst. Based on the following product and its transaction history,
                forecast the demand for the next %d days.

                Product: %s (SKU: %s)
                Category: %s
                Current Stock: %d
                Reorder Level: %d

                Transaction History:
                %s

                Provide:
                1. Predicted demand for the next %d days
                2. Whether restocking is needed
                3. Recommended order quantity
                Keep the response concise and actionable.
                """, days, product.getName(), product.getSku(), product.getCategory(),
                product.getQuantity(), product.getReorderLevel(), transactionData, days);

        return chatClientBuilder.build()
                .prompt()
                .user(prompt)
                .call()
                .content();
    }

    /**
     * AI Feature 2: Stock Optimization
     * Analyzes all products and suggests optimization strategies.
     */
    public String stockOptimization() {
        List<Product> products = productRepository.findAll();

        String productData = products.stream()
                .map(p -> String.format("Name: %s, Stock: %d, Reorder Level: %d, Price: $%.2f, Category: %s",
                        p.getName(), p.getQuantity(), p.getReorderLevel(), p.getPrice(), p.getCategory()))
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
                You are a supply chain optimization expert. Analyze the following inventory data
                and provide stock optimization recommendations.

                Current Inventory:
                %s

                Provide:
                1. Products that are overstocked
                2. Products that need immediate restocking
                3. Category-wise optimization suggestions
                4. Cost-saving recommendations
                Keep the response concise and in a structured format.
                """, productData);

        return chatClientBuilder.build()
                .prompt()
                .user(prompt)
                .call()
                .content();
    }

    /**
     * AI Feature 3: Purchase Recommendation
     * Suggests what to buy given a budget.
     */
    public String purchaseRecommendation(Double budget) {
        List<Product> lowStock = productRepository.findLowStockProducts();

        String lowStockData = lowStock.stream()
                .map(p -> String.format("Name: %s, Stock: %d, Reorder Level: %d, Price: $%.2f, Supplier: %s",
                        p.getName(), p.getQuantity(), p.getReorderLevel(), p.getPrice(),
                        p.getSupplier() != null ? p.getSupplier().getName() : "N/A"))
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
                You are a purchasing advisor. Given a budget of $%.2f and the following low-stock products,
                recommend what to purchase and in what quantities.

                Low Stock Products:
                %s

                Provide:
                1. Priority-ordered list of products to purchase
                2. Recommended quantities for each
                3. Estimated total cost
                4. Which supplier to order from
                Stay within the budget. Keep the response structured and actionable.
                """, budget, lowStockData);

        return chatClientBuilder.build()
                .prompt()
                .user(prompt)
                .call()
                .content();
    }

    /**
     * AI Feature 4: Natural Language Query
     * User asks questions about inventory in plain English.
     */
    public String naturalLanguageQuery(String question) {
        List<Product> products = productRepository.findAll();

        String inventoryData = products.stream()
                .map(p -> String.format("ID: %d, Name: %s, SKU: %s, Category: %s, Stock: %d, Price: $%.2f, Reorder Level: %d",
                        p.getId(), p.getName(), p.getSku(), p.getCategory(),
                        p.getQuantity(), p.getPrice(), p.getReorderLevel()))
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
                You are an inventory analytics assistant. Answer the following question based on the actual inventory data provided.

                Inventory Data:
                %s

                Question: %s

                Provide a clear, data-backed answer. Use specific numbers from the data.
                """, inventoryData, question);

        return chatClientBuilder.build()
                .prompt()
                .user(prompt)
                .call()
                .content();
    }
}

