import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import AiHub from './pages/AiHub';

// Layout wrapper for authenticated pages
const AppLayout = () => {
  const location = useLocation();

  const getPageMeta = (pathname) => {
    switch (pathname) {
      case '/':
        return {
          title: 'Inventory & Operations Dashboard',
          subtitle: 'Real-time telemetry and overview'
        };
      case '/products':
        return {
          title: 'Products & Warehouse Catalog',
          subtitle: 'Active SKUs, quantities, and safety margins'
        };
      case '/suppliers':
        return {
          title: 'Supplier Partner Network',
          subtitle: 'Vendor contact information and directory'
        };
      case '/orders':
        return {
          title: 'Purchase Orders & Stock Movement',
          subtitle: 'Manage supplier orders and record inventory adjustments'
        };
      case '/ai-hub':
        return {
          title: 'AI Intelligence & Predictive Analytics Hub',
          subtitle: 'Judges\' favorite: demand forecasting, allocation & NL chat'
        };
      default:
        return {
          title: 'Smart Inventory Management',
          subtitle: 'Supply chain control center'
        };
    }
  };

  const meta = getPageMeta(location.pathname);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar (fixed left) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Navbar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/ai-hub" element={<AiHub />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<AppLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
