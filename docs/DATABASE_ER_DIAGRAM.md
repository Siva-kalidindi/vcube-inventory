# 🗄️ Database Architecture & Entity-Relationship (ER) Diagram

**Platform**: Aiven MySQL 8.0 Cloud Database  
**Engine**: InnoDB (Row-Level Locking & ACID Compliance)  
**Schema Model**: Normalized 5-Table Relational Inventory Model  

---

## 📊 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ STOCK_TRANSACTIONS : "logs (optional)"
    SUPPLIERS ||--o{ PRODUCTS : "supplies"
    SUPPLIERS ||--o{ PURCHASE_ORDERS : "receives"
    PRODUCTS ||--o{ STOCK_TRANSACTIONS : "tracks movement"

    USERS {
        bigint id PK
        varchar email UK
        varchar password "BCrypt Hash"
        varchar name
        varchar role "ADMIN, STAFF"
        datetime created_at
    }

    SUPPLIERS {
        bigint id PK
        varchar name
        varchar contact_person
        varchar email
        varchar phone
        varchar address
    }

    PRODUCTS {
        bigint id PK
        varchar sku UK
        varchar name
        varchar category
        int quantity
        decimal unit_price
        int reorder_level
        bigint supplier_id FK
    }

    PURCHASE_ORDERS {
        bigint id PK
        varchar order_number UK
        bigint supplier_id FK
        decimal total_amount
        varchar status "PENDING, APPROVED, REJECTED"
        datetime created_at
    }

    STOCK_TRANSACTIONS {
        bigint id PK
        bigint product_id FK
        varchar type "IN, OUT"
        int quantity
        varchar reason
        datetime timestamp
    }
```

---

## 🔑 Key Schema Design Principles
1. **Financial Integrity & Stock Movement Separation**:
   - `purchase_orders` handles financial procurement contracts (`PENDING` -> `APPROVED`).
   - `stock_transactions` handles physical warehouse movements (`IN`, `OUT`).
   - Decoupling enables partial shipments, audit traceability, and prevents premature inventory inflation before physical receipt.
2. **ACID Transactional Isolation**:
   - Every stock transaction (`IN` or `OUT`) executes inside `@Transactional` with InnoDB row-level locking on `products.quantity`, preventing race conditions during concurrent warehouse operations.
3. **Enterprise Security & Identity**:
   - Passwords stored strictly as 60-character BCrypt hashes.
   - Role privileges strictly partitioned between `ADMIN` (mutations, approvals, deletions) and `STAFF` (read-only telemetry, inventory audits).
