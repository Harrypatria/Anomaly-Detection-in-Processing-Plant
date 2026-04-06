import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const ingestPayload = (payload: any) => api.post('/ingest', payload);
export const getPrediction = (payload: any) => api.post('/predict', payload);
export const getLatestPrediction = () => api.get('/predict/latest');
export const getAlerts = (params?: any) => api.get('/alerts', { params });
export const acknowledgeAlert = (id: number) => api.patch(`/alerts/${id}/acknowledge`);
export const getHistory = (parameter: string, params?: any) => api.get(`/history/${parameter}`, { params });
export const getModelInfo = () => api.get('/model/info');
export const getModelHistory = () => api.get('/model/history');
export const triggerRetrain = (config: any) => api.post('/model/retrain', config);
export const getRetrainStatus = () => api.get('/model/retrain/status');
export const getHealthStatus = () => api.get('/health');

export default api;
