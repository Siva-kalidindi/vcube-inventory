import api from './client';

export const queryAiAnalytics = async (question) => {
  const response = await api.post('/ai/query', { question });
  return response.data;
};

export const getDemandForecast = async (productId, days = 30) => {
  const response = await api.post('/ai/demand-forecast', { productId, days });
  return response.data;
};

export const getStockOptimization = async () => {
  const response = await api.post('/ai/stock-optimization', {});
  return response.data;
};

export const getPurchaseRecommendation = async (budget) => {
  const response = await api.post('/ai/purchase-recommendation', { budget });
  return response.data;
};
