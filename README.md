# 🚀 AI-Powered Smart Inventory Management System

**VCUBE Hack Quest 1.0**

---

## 🖥️ What Everyone Needs Installed

### Step 1: Java 17 (Everyone)
- Download from [Adoptium](https://adoptium.net/) → pick **Windows x64 .msi**
- Run the installer, click Next until done
- Check it works: open Antigravity terminal (Ctrl + `) and type `java -version`

### Step 2: Maven (Everyone)
- Download from [maven.apache.org](https://maven.apache.org/download.cgi) → pick the **Binary zip archive**
- Unzip it to `C:\maven`
- Add to PATH: Search "Environment Variables" in Windows → System Variables → find `Path` → click Edit → Add `C:\maven\bin`
- Check it works: open a NEW terminal and type `mvn -version`

### Step 3: Node.js (Only Design Person)
- Download from [nodejs.org](https://nodejs.org/) → pick **LTS**
- Run installer
- Check: `node -v`

### That's it! No Docker, no MySQL, no Postman install needed.

---

## ⚡ How to Run the App

Open Antigravity terminal (Ctrl + `) and type:
```
cd backend
mvn spring-boot:run
```
Wait until you see `Started InventoryApplication` — the app is running at http://localhost:8080

---

## 🔀 Git — Dead Simple (Read This!)

### Setup Person does this ONCE:
1. Go to [github.com](https://github.com) → click **+** → **New Repository**
2. Name it `vcube-inventory`, make it **Public**, click **Create**
3. Copy the repo URL (looks like `https://github.com/yourname/vcube-inventory.git`)
4. Open Antigravity terminal and run these exact commands:
```
cd "c:\Users\sivak\OneDrive\Desktop\Inventory"
git init
git add .
git commit -m "initial project"
git branch -M main
git remote add origin https://github.com/YOURNAME/vcube-inventory.git
git push -u origin main
```
5. Tell everyone the repo URL

### Everyone else does this ONCE:
1. Open a terminal OUTSIDE Antigravity (Windows Terminal or Command Prompt)
2. Run:
```
cd Desktop
git clone https://github.com/YOURNAME/vcube-inventory.git Inventory-MyName
```
3. Open that folder in Antigravity

### To SAVE your work (everyone):
Just double-click **SAVE-MY-WORK.bat** in the project folder. It asks what you did, then saves.

### To GET others' work (everyone):
Just double-click **GET-LATEST.bat** in the project folder.

### If anything goes wrong with Git:
Tell Setup Person. Don't try to fix it yourself.

---

## 👥 Team

| Role | Name |
|------|------|
| 🔧 Backend Person | _____ |
| 🔐 Login Person | _____ |
| 🤖 AI Person | _____ |
| 🎨 Design Person | _____ |
| 🚀 Setup Person | _____ |

---

## 🌐 API Endpoints

Base URL: `http://localhost:8080/api`

| Feature | Method | URL |
|---------|--------|-----|
| Register | POST | `/auth/register` |
| Login | POST | `/auth/login` |
| Products | GET/POST/PUT/DELETE | `/products` |
| Low Stock | GET | `/products/low-stock` |
| Suppliers | GET/POST/PUT/DELETE | `/suppliers` |
| Purchase Orders | GET/POST | `/purchase-orders` |
| Stock In/Out | POST | `/stock-transactions` |
| Dashboard | GET | `/dashboard/summary` |
| AI Forecast | POST | `/ai/demand-forecast` |
| AI Optimize | POST | `/ai/stock-optimization` |
| AI Purchase Advice | POST | `/ai/purchase-recommendation` |
| AI Chat | POST | `/ai/query` |

---

## 🔗 Live URLs
- **Frontend:** _[add after deployment]_
- **Backend:** _[add after deployment]_
