package com.vcube.inventory.service;

import com.vcube.inventory.entity.Product;
import com.vcube.inventory.entity.StockTransaction;
import com.vcube.inventory.repository.ProductRepository;
import com.vcube.inventory.repository.StockTransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final StockTransactionRepository transactionRepository;

    public ProductService(ProductRepository productRepository, StockTransactionRepository transactionRepository) {
        this.productRepository = productRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        Product product = getProductById(id);
        product.setName(updated.getName());
        product.setSku(updated.getSku());
        product.setCategory(updated.getCategory());
        product.setPrice(updated.getPrice());
        product.setQuantity(updated.getQuantity());
        product.setReorderLevel(updated.getReorderLevel());
        product.setSupplier(updated.getSupplier());
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        // Delete related stock transactions first to avoid SQL Foreign Key constraint failure
        List<StockTransaction> relatedTransactions = transactionRepository.findByProductId(id);
        if (!relatedTransactions.isEmpty()) {
            transactionRepository.deleteAll(relatedTransactions);
        }
        productRepository.deleteById(id);
    }

    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }
}
