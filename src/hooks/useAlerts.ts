import { useState, useEffect, useCallback } from 'react';
import { getAlerts, acknowledgeAlert as apiAcknowledgeAlert } from '../api/client';

export function useAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAlerts({ acknowledged: false });
      const data = Array.isArray(response.data) ? response.data : [];
      setAlerts(data);
      setCount(data.length);
      setError(null);
    } catch (err) {
      console.error('Fetch Alerts Error:', err);
      setError('Failed to fetch alerts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const acknowledgeAlert = useCallback(async (id: number) => {
    try {
      await apiAcknowledgeAlert(id);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
      setCount((prev) => prev - 1);
    } catch (err) {
      console.error('Acknowledge Alert Error:', err);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  return { alerts, count, loading, error, acknowledgeAlert };
}
