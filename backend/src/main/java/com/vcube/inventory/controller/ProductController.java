package com.vcube.inventory.controller;

import com.vcube.inventory.entity.Product;
import com.vcube.inventory.entity.Supplier;
import com.vcube.inventory.repository.SupplierRepository;
import com.vcube.inventory.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final SupplierRepository supplierRepository;

    public ProductController(ProductService productService, SupplierRepository supplierRepository) {
        this.productService = productService;
        this.supplierRepository = supplierRepository;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct(@RequestBody Map<String, Object> body) {
        Product product = new Product();
        product.setName((String) body.get("name"));
        product.setSku((String) body.get("sku"));
        product.setCategory((String) body.get("category"));
        product.setPrice(new java.math.BigDecimal(body.get("price").toString()));
        product.setQuantity((Integer) body.getOrDefault("quantity", 0));
        product.setReorderLevel((Integer) body.getOrDefault("reorderLevel", 10));

        if (body.get("supplierId") != null) {
            Long supplierId = Long.valueOf(body.get("supplierId").toString());
            Supplier supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            product.setSupplier(supplier);
        }

        return ResponseEntity.ok(productService.createProduct(product));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>> getLowStockProducts() {
        return ResponseEntity.ok(productService.getLowStockProducts());
    }
}
