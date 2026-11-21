package com.vcube.inventory.repository;

import com.vcube.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByQuantityLessThan(int quantity);

    @Query("SELECT p FROM Product p WHERE p.quantity < p.reorderLevel")
    List<Product> findLowStockProducts();
}
