package com.vcube.inventory.controller;

import com.vcube.inventory.entity.PurchaseOrder;
import com.vcube.inventory.entity.Supplier;
import com.vcube.inventory.repository.SupplierRepository;
import com.vcube.inventory.service.PurchaseOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/purchase-orders")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;
    private final SupplierRepository supplierRepository;

    public PurchaseOrderController(PurchaseOrderService purchaseOrderService, SupplierRepository supplierRepository) {
        this.purchaseOrderService = purchaseOrderService;
        this.supplierRepository = supplierRepository;
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrder>> getAllOrders() {
        return ResponseEntity.ok(purchaseOrderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrder> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(purchaseOrderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<PurchaseOrder> createOrder(@RequestBody Map<String, Object> body) {
        Long supplierId = Long.valueOf(body.get("supplierId").toString());
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        PurchaseOrder order = new PurchaseOrder();
        order.setSupplier(supplier);
        order.setTotalAmount(body.get("totalAmount") != null ?
                new BigDecimal(body.get("totalAmount").toString()) : BigDecimal.ZERO);
        order.setNotes((String) body.get("notes"));

        return ResponseEntity.ok(purchaseOrderService.createOrder(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PurchaseOrder> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        PurchaseOrder.OrderStatus status =
                PurchaseOrder.OrderStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(purchaseOrderService.updateOrderStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        purchaseOrderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
