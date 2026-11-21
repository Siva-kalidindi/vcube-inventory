# 🎨 Complete Frontend Prompt & API Contract for Design Person

Give this entire document to your teammate working on the frontend. She can copy and paste the prompt directly into her Antigravity / Claude / ChatGPT session.

---

## 📋 Prompt to Copy & Paste into Antigravity on Frontend Laptop

```markdown
You are a senior React developer building the UI for an "AI-Powered Smart Inventory & Supply Chain Management System" (VCUBE Hack Quest 1.0).

🚨 CRITICAL RULE:
- You ONLY work inside the `frontend/` directory.
- NEVER modify, touch, or delete any files in `backend/`, `pom.xml`, `application.yml`, or the project root.
- All backend APIs are already built, tested, and running live on `http://localhost:8080`.

### Tech Stack to Use:
- React (Vite or Create React App)
- Tailwind CSS or Material-UI (@mui/material @mui/icons-material)
- Lucide React icons
- Recharts (for stock & demand visual charts)
- Axios for API calls

---

### What You Must Build:

1. **Authentication Flow**:
   - `/login` and `/register` pages.
   - On successful login, save `token`, `name`, and `role` to `localStorage`.
   - Setup an Axios interceptor or auth header helper that attaches `Authorization: Bearer <token>` to every subsequent request.
   - Protected layout with a sleek Sidebar / Navigation bar.

2. **Dashboard Overview (Home)**:
   - Metric Cards: Total Products, Low Stock Count (highlighted in RED), Total Suppliers, Total Purchase Orders.
   - Stock Level Distribution Chart (using Recharts bar chart).
   - Low-Stock Alerts Banner showing urgent items that need restocking.
   - Recent Stock Movement Activity list.

3. **Product Management Page**:
   - Clean data table listing: Name, SKU, Category, Price, Quantity, Reorder Level, Supplier Name.
   - "Add Product" Modal/Dialog (POST /api/products).
   - Low-stock indicator badges on rows where `quantity <= reorderLevel`.
   - Delete product action.

4. **Supplier Management Page**:
   - Table of suppliers with Name, Contact Email, Phone, Address.
   - "Add Supplier" modal form (POST /api/suppliers).

5. **Purchase Orders & Stock Movement**:
   - Purchase Orders list with status badges (`PENDING`, `APPROVED`, `RECEIVED`, `CANCELLED`).
   - "Create Purchase Order" form.
   - Quick Stock-In / Stock-Out buttons/modal to record warehouse adjustments.

6. **🤖 AI Intelligence Hub (Judges' Favorite)**:
   - **Tab 1: Natural Language Analytics Chat**: User types queries like *"Which products are running low?"* or *"What items should I restock?"* and gets formatted data responses from the AI.
   - **Tab 2: Demand Forecasting Card**: Dropdown to select a product + number of days (e.g., 30 days) -> click "Generate Forecast" -> displays AI projected demand and safety reorder recommendation.
   - **Tab 3: AI Purchase Recommendation Generator**: Input budget (e.g. $25,000) -> click "Generate Order Allocation" -> displays priority-ranked supplier orders within budget.
   - **Tab 4: Stock Optimization Assistant**: 1-click button to analyze warehouse health and recommend cost savings.

---

### Exact Backend API Contract (Base URL: http://localhost:8080)

#### 1. Auth APIs
- `POST /api/auth/register`
  - Body: `{"name": "Alice", "email": "alice@example.com", "password": "password123", "role": "ADMIN"}`
  - Response: `{"token": "jwt_token_here", "name": "Alice", "email": "alice@example.com", "role": "ADMIN"}`
- `POST /api/auth/login`
  - Body: `{"email": "alice@example.com", "password": "password123"}`
  - Response: `{"token": "jwt_token_here", "name": "Alice", "email": "alice@example.com", "role": "ADMIN"}`

#### 2. Dashboard API
- `GET /api/dashboard/summary` (Headers: `Authorization: Bearer <token>`)
  - Response:
    ```json
    {
      "totalProducts": 10,
      "totalSuppliers": 3,
      "lowStockCount": 5,
      "totalOrders": 0,
      "recentTransactions": [
        {
          "id": 1,
          "product": {"name": "USB-C Hub"},
          "type": "IN",
          "quantity": 20,
          "notes": "Restocked",
          "createdAt": "2026-11-21T10:00:00"
        }
      ]
    }
    ```

#### 3. Products APIs
- `GET /api/products` -> Array of products
  - Example Item:
    ```json
    {
      "id": 1,
      "name": "Wireless Mouse",
      "sku": "WM-001",
      "category": "Accessories",
      "price": 599.99,
      "quantity": 45,
      "reorderLevel": 10,
      "supplier": {"id": 1, "name": "TechParts India"}
    }
    ```
- `GET /api/products/low-stock` -> Array of items where quantity < reorderLevel
- `POST /api/products`
  - Body: `{"name": "...", "sku": "...", "category": "...", "price": 499.0, "quantity": 25, "reorderLevel": 10, "supplierId": 1}`
- `DELETE /api/products/{id}`

#### 4. Suppliers APIs
- `GET /api/suppliers` -> Array of suppliers `[{"id": 1, "name": "TechParts India", "email": "sales@techparts.in", "phone": "9876543210", "address": "Bangalore"}]`
- `POST /api/suppliers`
  - Body: `{"name": "Global Electronics", "email": "info@global.com", "phone": "9123456789", "address": "Mumbai"}`

#### 5. Purchase Orders & Stock
- `GET /api/purchase-orders`
- `POST /api/purchase-orders`
  - Body: `{"supplierId": 1, "totalAmount": 12000.0, "notes": "Q4 Restock"}`
- `PUT /api/purchase-orders/{id}/status`
  - Body: `{"status": "APPROVED"}` (Statuses: PENDING, APPROVED, RECEIVED, CANCELLED)
- `POST /api/stock-transactions`
  - Body: `{"productId": 1, "type": "IN", "quantity": 10, "notes": "Received shipment"}` (type: IN or OUT)
- `GET /api/stock-transactions/recent?limit=10`

#### 6. AI Features APIs
- `POST /api/ai/query`
  - Body: `{"question": "Which products should I restock immediately?"}`
  - Response: `{"result": "[AI Inventory Analytics] Found 5 items requiring attention..."}`
- `POST /api/ai/demand-forecast`
  - Body: `{"productId": 1, "days": 30}`
  - Response: `{"result": "[AI Demand Forecast Analysis - Next 30 Days]..."}`
- `POST /api/ai/stock-optimization`
  - Body: `{}`
  - Response: `{"result": "[AI Stock Optimization & Supply Chain Health Report]..."}`
- `POST /api/ai/purchase-recommendation`
  - Body: `{"budget": 25000.0}`
  - Response: `{"result": "[AI Purchase Order Recommendation (Budget: $25,000)]..."}`

---

### Step-by-Step Instructions to Scaffold:
1. Inside `c:\Users\sivak\OneDrive\Desktop\Inventory\`:
   ```bash
   npm create vite@latest frontend -- --template react
   cd frontend
   npm install axios lucide-react recharts react-router-dom
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Build the app with clean, responsive, dark/light modern UI.
3. Start dev server: `npm run dev` (Runs on `http://localhost:5173`).
```
