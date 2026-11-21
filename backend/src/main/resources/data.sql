-- ========================================
-- VCUBE Inventory — Seed Data
-- Run this AFTER the app creates tables
-- ========================================

-- Suppliers
INSERT INTO suppliers (name, email, phone, address) VALUES
('TechParts India', 'sales@techparts.in', '9876543210', '123 MG Road, Bangalore'),
('Global Electronics', 'info@globalelec.com', '9123456789', '45 Park Street, Mumbai'),
('QuickSupply Co', 'orders@quicksupply.in', '9988776655', '78 Anna Salai, Chennai');

-- Products
INSERT INTO products (name, sku, category, price, quantity, reorder_level, supplier_id) VALUES
('Wireless Mouse', 'WM-001', 'Accessories', 599.99, 45, 10, 1),
('USB-C Hub', 'UC-002', 'Accessories', 1299.00, 8, 15, 1),
('Mechanical Keyboard', 'MK-003', 'Peripherals', 2499.00, 25, 10, 2),
('27" Monitor', 'MN-004', 'Displays', 15999.00, 3, 5, 2),
('Laptop Stand', 'LS-005', 'Accessories', 899.00, 60, 20, 3),
('Webcam HD', 'WC-006', 'Peripherals', 1999.00, 12, 10, 3),
('HDMI Cable 2m', 'HC-007', 'Cables', 349.00, 100, 30, 1),
('Power Strip 6-port', 'PS-008', 'Electrical', 799.00, 5, 10, 2),
('Wireless Earbuds', 'WE-009', 'Audio', 1499.00, 2, 8, 3),
('USB Flash Drive 64GB', 'UF-010', 'Storage', 449.00, 35, 15, 1);

-- Stock Transactions (sample history)
INSERT INTO stock_transactions (product_id, type, quantity, notes, created_at) VALUES
(1, 'IN', 50, 'Initial stock', '2026-11-01 09:00:00'),
(1, 'OUT', 5, 'Sold to customer', '2026-11-05 14:30:00'),
(2, 'IN', 20, 'Restocked from TechParts', '2026-11-02 10:00:00'),
(2, 'OUT', 12, 'Bulk order fulfilled', '2026-11-10 11:00:00'),
(3, 'IN', 30, 'New shipment', '2026-11-03 08:00:00'),
(3, 'OUT', 5, 'Office supply order', '2026-11-15 16:00:00'),
(4, 'IN', 10, 'Monitors received', '2026-11-01 09:30:00'),
(4, 'OUT', 7, 'Setup for new employees', '2026-11-12 10:00:00'),
(9, 'IN', 15, 'Earbuds restocked', '2026-11-05 09:00:00'),
(9, 'OUT', 13, 'Holiday sale', '2026-11-18 14:00:00'),
(8, 'IN', 20, 'Power strips from Global', '2026-11-07 09:00:00'),
(8, 'OUT', 15, 'Office distribution', '2026-11-14 11:00:00');

