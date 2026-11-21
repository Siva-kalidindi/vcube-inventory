package com.vcube.inventory.service;

import com.vcube.inventory.entity.Product;
import com.vcube.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
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

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }
}
