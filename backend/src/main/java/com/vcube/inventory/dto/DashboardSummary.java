package com.vcube.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class DashboardSummary {
    private long totalProducts;
    private long totalSuppliers;
    private long lowStockCount;
    private long totalOrders;
    private Object recentTransactions; // List of recent transactions
}

