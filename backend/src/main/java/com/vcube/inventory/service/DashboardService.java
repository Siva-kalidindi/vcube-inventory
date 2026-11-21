package com.vcube.inventory.service;

import com.vcube.inventory.dto.DashboardSummary;
import com.vcube.inventory.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final StockTransactionRepository transactionRepository;

    public DashboardSummary getSummary() {
        return DashboardSummary.builder()
                .totalProducts(productRepository.count())
                .totalSuppliers(supplierRepository.count())
                .lowStockCount(productRepository.findLowStockProducts().size())
                .totalOrders(purchaseOrderRepository.count())
                .recentTransactions(transactionRepository.findRecentTransactions(PageRequest.of(0, 10)))
                .build();
    }
}

