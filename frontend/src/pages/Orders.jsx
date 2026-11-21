import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  Boxes,
  FileText
} from 'lucide-react';
import Modal from '../components/Modal';
import {
  getPurchaseOrders,
  createPurchaseOrder,
  updateOrderStatus,
  createStockTransaction,
  getRecentTransactions
} from '../api/orders';
import { getSuppliers } from '../api/suppliers';
import { getProducts } from '../api/products';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ORDERS'); // 'ORDERS' or 'TRANSACTIONS'

  // Modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockType, setStockType] = useState('IN'); // 'IN' or 'OUT'
  const [submitLoading, setSubmitLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Forms
  const [orderForm, setOrderForm] = useState({
    supplierId: '',
    totalAmount: '',
    notes: '',
  });

  const [stockForm, setStockForm] = useState({
    productId: '',
    quantity: '',
    notes: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordData, txData, supData, prodData] = await Promise.all([
        getPurchaseOrders().catch(() => []),
        getRecentTransactions(20).catch(() => []),
        getSuppliers().catch(() => []),
        getProducts().catch(() => [])
      ]);

      setOrders(ordData || []);
      setTransactions(txData || []);
      setSuppliers(supData || []);
      setProducts(prodData || []);

      if (supData?.length > 0 && !orderForm.supplierId) {
        setOrderForm((prev) => ({ ...prev, supplierId: supData[0].id }));
      }
      if (prodData?.length > 0 && !stockForm.productId) {
        setStockForm((prev) => ({ ...prev, productId: prodData[0].id }));
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (text, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await createPurchaseOrder({
        supplierId: parseInt(orderForm.supplierId, 10),
        totalAmount: parseFloat(orderForm.totalAmount) || 0,
        notes: orderForm.notes || 'Procurement Order',
      });
      showToast('Purchase Order created successfully!');
      setIsOrderModalOpen(false);
      setOrderForm({
        supplierId: suppliers[0]?.id || '',
        totalAmount: '',
        notes: '',
      });
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create purchase order', true);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      showToast(`Order #${orderId} marked as ${newStatus}`);
      fetchData();
    } catch (err) {
      showToast('Failed to update order status', true);
    }
  };

  const handleStockAdjustment = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await createStockTransaction({
        productId: parseInt(stockForm.productId, 10),
        type: stockType,
        quantity: parseInt(stockForm.quantity, 10),
        notes: stockForm.notes || (stockType === 'IN' ? 'Warehouse Inflow' : 'Dispatched to customer'),
      });
      showToast(`Stock ${stockType === 'IN' ? 'In' : 'Out'} recorded successfully!`);
      setIsStockModalOpen(false);
      setStockForm({
        productId: products[0]?.id || '',
        quantity: '',
        notes: '',
      });
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to record stock transaction', true);
    } finally {
      setSubmitLoading(false);
    }
  };

  const openStockModal = (type) => {
    setStockType(type);
    setIsStockModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        );
      case 'RECEIVED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Received
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold ${
            toastMessage.isError
              ? 'bg-rose-900 border border-rose-700 text-rose-200'
              : 'bg-emerald-900 border border-emerald-700 text-emerald-200'
          }`}
        >
          {toastMessage.isError ? (
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Procurement & Stock Movement
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate supplier purchase orders and execute instant warehouse stock adjustments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openStockModal('IN')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
          >
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span>+ Quick Stock-In</span>
          </button>

          <button
            onClick={() => openStockModal('OUT')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
          >
            <ArrowDownRight className="w-4 h-4 text-rose-400" />
            <span>- Quick Stock-Out</span>
          </button>

          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all border border-indigo-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Purchase Order</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'ORDERS'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Purchase Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('TRANSACTIONS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'TRANSACTIONS'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Warehouse Movements Log ({transactions.length})</span>
        </button>
      </div>

      {/* View 1: Purchase Orders Table */}
      {activeTab === 'ORDERS' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">PO Reference</th>
                  <th className="px-6 py-4">Supplier Partner</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Fulfillment Status</th>
                  <th className="px-6 py-4">Notes</th>
                  <th className="px-6 py-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <span className="inline-block w-5 h-5 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-2" />
                      <p>Loading purchase orders...</p>
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No purchase orders initiated yet.</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((po) => (
                    <tr key={po.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        PO-{String(po.id).padStart(4, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                          <Truck className="w-3.5 h-3.5 text-slate-500" />
                          <span>{po.supplier?.name || `Supplier #${po.supplierId || 1}`}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-emerald-400 text-sm">
                        ${Number(po.totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(po.status || 'PENDING')}</td>
                      <td className="px-6 py-4 text-slate-400 text-[11px] max-w-xs truncate">
                        {po.notes || 'Standard procurement order'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select
                          value={po.status || 'PENDING'}
                          onChange={(e) => handleStatusChange(po.id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="RECEIVED">RECEIVED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Recent Transactions Log */}
      {activeTab === 'TRANSACTIONS' && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Movement Type</th>
                  <th className="px-6 py-4">Quantity Units</th>
                  <th className="px-6 py-4">Notes / Purpose</th>
                  <th className="px-6 py-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No transactions recorded yet.</p>
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => {
                    const isIn = tx.type === 'IN';
                    return (
                      <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-500">TX-{tx.id}</td>
                        <td className="px-6 py-4 font-bold text-white">
                          {tx.product?.name || `Product #${tx.productId || ''}`}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                              isIn
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {isIn ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            <span>{isIn ? 'STOCK IN (Restock)' : 'STOCK OUT (Dispatched)'}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-sm">
                          <span className={isIn ? 'text-emerald-400' : 'text-rose-400'}>
                            {isIn ? '+' : '-'}{tx.quantity} units
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-[11px]">{tx.notes || '—'}</td>
                        <td className="px-6 py-4 text-right font-mono text-slate-500 text-[11px]">
                          {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : 'Just now'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create Purchase Order */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title="Draft New Purchase Order"
      >
        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select Supplier</label>
            <select
              required
              value={orderForm.supplierId}
              onChange={(e) => setOrderForm({ ...orderForm, supplierId: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.address})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Total Procurement Amount ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={orderForm.totalAmount}
              onChange={(e) => setOrderForm({ ...orderForm, totalAmount: e.target.value })}
              placeholder="e.g. 15000.00"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Order Notes / Justification</label>
            <textarea
              rows="3"
              value={orderForm.notes}
              onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
              placeholder="e.g. Q4 safety stock replenishment for high-demand peripherals"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsOrderModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {submitLoading ? 'Submitting...' : 'Dispatch PO'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Quick Stock-In / Stock-Out */}
      <Modal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        title={stockType === 'IN' ? 'Warehouse Stock-In (Receive Inventory)' : 'Warehouse Stock-Out (Dispatch)'}
      >
        <form onSubmit={handleStockAdjustment} className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                stockType === 'IN'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {stockType === 'IN' ? (
                <ArrowUpRight className="w-5 h-5" />
              ) : (
                <ArrowDownRight className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {stockType === 'IN' ? 'Inward Shipment Receiving' : 'Outward Dispatch / Write-off'}
              </p>
              <p className="text-[11px] text-slate-400">
                {stockType === 'IN'
                  ? 'Adds items directly to on-hand inventory'
                  : 'Deducts items from current available stock'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Product</label>
            <select
              required
              value={stockForm.productId}
              onChange={(e) => setStockForm({ ...stockForm, productId: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Current Stock: {p.quantity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity of Units</label>
            <input
              type="number"
              min="1"
              required
              value={stockForm.quantity}
              onChange={(e) => setStockForm({ ...stockForm, quantity: e.target.value })}
              placeholder="e.g. 25"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Movement Notes</label>
            <input
              type="text"
              value={stockForm.notes}
              onChange={(e) => setStockForm({ ...stockForm, notes: e.target.value })}
              placeholder={stockType === 'IN' ? 'e.g. Received shipment container #12' : 'e.g. Order dispatch #882'}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsStockModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all disabled:opacity-50 ${
                stockType === 'IN'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                  : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
              }`}
            >
              {submitLoading ? 'Recording...' : `Execute ${stockType === 'IN' ? 'Stock-In' : 'Stock-Out'}`}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Orders;
