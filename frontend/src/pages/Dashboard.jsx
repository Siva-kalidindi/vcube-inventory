import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  AlertTriangle,
  Truck,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Sparkles,
  Layers,
  Clock,
  ExternalLink
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import MetricCard from '../components/MetricCard';
import { getDashboardSummary } from '../api/dashboard';
import { getProducts, getLowStockProducts } from '../api/products';

export const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [products, setProducts] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sumData, prodData, lowData] = await Promise.all([
        getDashboardSummary().catch(() => null),
        getProducts().catch(() => []),
        getLowStockProducts().catch(() => [])
      ]);

      setSummary(sumData);
      setProducts(prodData || []);
      setLowStockItems(lowData || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Could not connect to backend server. Make sure Spring Boot is running on localhost:8080.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare chart data (Top 8 products by quantity vs reorder level)
  const chartData = (products || []).slice(0, 8).map((p) => ({
    name: p.name.length > 14 ? p.name.substring(0, 12) + '...' : p.name,
    quantity: p.quantity,
    reorderLevel: p.reorderLevel,
    isLow: p.quantity <= p.reorderLevel,
  }));

  const totalProducts = summary?.totalProducts ?? products.length;
  const lowStockCount = summary?.lowStockCount ?? lowStockItems.length;
  const totalSuppliers = summary?.totalSuppliers ?? 0;
  const totalOrders = summary?.totalOrders ?? 0;
  const recentTransactions = summary?.recentTransactions || [];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner / Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Supply Chain Command Center
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Live Monitor
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Real-time inventory levels, automated restocking & predictive telemetry</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/ai-hub"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 border border-indigo-400/30 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>Run AI Optimizer</span>
          </Link>
        </div>
      </div>

      {/* Error alert if backend is offline */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-300">Backend Communication Warning</p>
              <p className="text-slate-400 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 font-semibold text-amber-200 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Products"
          value={loading ? '...' : totalProducts}
          subtitle="Active SKUs in catalog"
          icon={Package}
          variant="indigo"
          trend={{ value: '+12%', label: 'vs last month', positive: true }}
        />

        <MetricCard
          title="Low Stock Alert"
          value={loading ? '...' : lowStockCount}
          subtitle="Below safety threshold"
          icon={AlertTriangle}
          variant="rose"
          isAlert={lowStockCount > 0}
          trend={{ value: `${lowStockCount} items`, label: 'action required', positive: false }}
        />

        <MetricCard
          title="Active Suppliers"
          value={loading ? '...' : totalSuppliers}
          subtitle="Verified procurement partners"
          icon={Truck}
          variant="emerald"
        />

        <MetricCard
          title="Purchase Orders"
          value={loading ? '...' : totalOrders}
          subtitle="Total POs dispatched"
          icon={ShoppingCart}
          variant="amber"
        />
      </div>

      {/* Low Stock Urgent Alert Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-800/40 shadow-xl shadow-rose-950/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex-shrink-0">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Immediate Restock Required
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {lowStockItems.length} Critical Items
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  The following items have reached or dropped below safety threshold:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {lowStockItems.slice(0, 5).map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/50 text-xs font-mono text-rose-300"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-900 text-rose-200">
                        {item.quantity} / {item.reorderLevel}
                      </span>
                    </span>
                  ))}
                  {lowStockItems.length > 5 && (
                    <span className="text-xs text-slate-400 self-center">
                      +{lowStockItems.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <Link
                to="/orders"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Create Purchase Order</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Chart & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recharts Stock Level Distribution (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800/80 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Stock Level vs Reorder Threshold
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Inventory distribution across top warehouse products</p>
            </div>
            <Link
              to="/products"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View All Products</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-72 w-full">
            {chartData.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                <Package className="w-8 h-8 mb-2 opacity-50" />
                <span>No product data available yet</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#f8fafc',
                    }}
                    formatter={(value, name) => [
                      value,
                      name === 'quantity' ? 'Current Quantity' : 'Safety Reorder Level',
                    ]}
                  />
                  <Bar dataKey="quantity" radius={[6, 6, 0, 0]} name="quantity">
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isLow ? '#f43f5e' : '#6366f1'}
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="reorderLevel"
                    fill="#38bdf8"
                    radius={[6, 6, 0, 0]}
                    opacity={0.35}
                    name="reorderLevel"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-indigo-500" />
              <span className="text-slate-300">Adequate Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-rose-500" />
              <span className="text-slate-300">Low Stock Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-sky-400 opacity-50" />
              <span className="text-slate-400">Reorder Threshold</span>
            </div>
          </div>
        </div>

        {/* Recent Stock Movement Feed (1 col) */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Recent Stock Activity
              </h3>
              <Link
                to="/orders"
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Details
              </Link>
            </div>
            <p className="text-xs text-slate-400 mb-4">Latest warehouse inflow and outflow records</p>

            <div className="space-y-3 overflow-y-auto max-h-80 pr-1">
              {recentTransactions.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <span>No recent stock movements recorded.</span>
                </div>
              ) : (
                recentTransactions.map((tx) => {
                  const isIn = tx.type === 'IN';
                  return (
                    <div
                      key={tx.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isIn
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {isIn ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-200 truncate">
                            {tx.product?.name || 'Warehouse Stock'}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">{tx.notes || (isIn ? 'Stock In' : 'Dispatched')}</p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 ml-2">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isIn ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isIn ? '+' : '-'}{tx.quantity}
                        </span>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <Link
              to="/orders"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Record Stock Adjustment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
