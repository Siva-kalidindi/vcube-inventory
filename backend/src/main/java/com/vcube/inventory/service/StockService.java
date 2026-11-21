package com.vcube.inventory.service;

import com.vcube.inventory.entity.Product;
import com.vcube.inventory.entity.StockTransaction;
import com.vcube.inventory.repository.ProductRepository;
import com.vcube.inventory.repository.StockTransactionRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class StockService {

    private final StockTransactionRepository transactionRepository;
    private final ProductRepository productRepository;

    public StockService(StockTransactionRepository transactionRepository, ProductRepository productRepository) {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
    }

    public List<StockTransaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<StockTransaction> getTransactionsByProduct(Long productId) {
        return transactionRepository.findByProductId(productId);
    }

    @Transactional
    public StockTransaction createTransaction(StockTransaction transaction) {
        Product product = transaction.getProduct();
        if (transaction.getType() == StockTransaction.TransactionType.IN) {
            product.setQuantity(product.getQuantity() + transaction.getQuantity());
        } else {
            product.setQuantity(product.getQuantity() - transaction.getQuantity());
        }
        productRepository.save(product);
        return transactionRepository.save(transaction);
    }

    public List<StockTransaction> getRecentTransactions(int limit) {
        return transactionRepository.findRecentTransactions(PageRequest.of(0, limit));
    }
}
