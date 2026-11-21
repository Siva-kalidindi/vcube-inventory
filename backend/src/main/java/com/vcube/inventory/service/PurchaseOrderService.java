package com.vcube.inventory.service;

import com.vcube.inventory.entity.PurchaseOrder;
import com.vcube.inventory.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;

    public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
    }

    public List<PurchaseOrder> getAllOrders() {
        return purchaseOrderRepository.findAll();
    }

    public PurchaseOrder getOrderById(Long id) {
        return purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase order not found with id: " + id));
    }

    public PurchaseOrder createOrder(PurchaseOrder order) {
        return purchaseOrderRepository.save(order);
    }

    public PurchaseOrder updateOrderStatus(Long id, PurchaseOrder.OrderStatus status) {
        PurchaseOrder order = getOrderById(id);
        order.setStatus(status);
        return purchaseOrderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        purchaseOrderRepository.deleteById(id);
    }

    public List<PurchaseOrder> getOrdersBySupplier(Long supplierId) {
        return purchaseOrderRepository.findBySupplierId(supplierId);
    }
}
