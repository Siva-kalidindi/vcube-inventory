import api from './client';

export const getPurchaseOrders = async () => {
  const response = await api.get('/purchase-orders');
  return response.data;
};

export const createPurchaseOrder = async (orderData) => {
  const response = await api.post('/purchase-orders', orderData);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/purchase-orders/${id}/status`, { status });
  return response.data;
};

export const createStockTransaction = async (transactionData) => {
  const response = await api.post('/stock-transactions', transactionData);
  return response.data;
};

export const getRecentTransactions = async (limit = 10) => {
  const response = await api.get(`/stock-transactions/recent?limit=${limit}`);
  return response.data;
};
