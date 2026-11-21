package com.vcube.inventory.dto;

public class DashboardSummary {
    private long totalProducts;
    private long totalSuppliers;
    private long lowStockCount;
    private long totalOrders;
    private Object recentTransactions;

    public DashboardSummary() {}
    public DashboardSummary(long totalProducts, long totalSuppliers, long lowStockCount, long totalOrders, Object recentTransactions) {
        this.totalProducts = totalProducts;
        this.totalSuppliers = totalSuppliers;
        this.lowStockCount = lowStockCount;
        this.totalOrders = totalOrders;
        this.recentTransactions = recentTransactions;
    }

    public static DashboardSummaryBuilder builder() {
        return new DashboardSummaryBuilder();
    }

    public static class DashboardSummaryBuilder {
        private long totalProducts;
        private long totalSuppliers;
        private long lowStockCount;
        private long totalOrders;
        private Object recentTransactions;

        public DashboardSummaryBuilder totalProducts(long totalProducts) { this.totalProducts = totalProducts; return this; }
        public DashboardSummaryBuilder totalSuppliers(long totalSuppliers) { this.totalSuppliers = totalSuppliers; return this; }
        public DashboardSummaryBuilder lowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; return this; }
        public DashboardSummaryBuilder totalOrders(long totalOrders) { this.totalOrders = totalOrders; return this; }
        public DashboardSummaryBuilder recentTransactions(Object recentTransactions) { this.recentTransactions = recentTransactions; return this; }

        public DashboardSummary build() {
            return new DashboardSummary(totalProducts, totalSuppliers, lowStockCount, totalOrders, recentTransactions);
        }
    }

    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

    public long getTotalSuppliers() { return totalSuppliers; }
    public void setTotalSuppliers(long totalSuppliers) { this.totalSuppliers = totalSuppliers; }

    public long getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public Object getRecentTransactions() { return recentTransactions; }
    public void setRecentTransactions(Object recentTransactions) { this.recentTransactions = recentTransactions; }
}
