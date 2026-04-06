import { useState, useEffect, useCallback } from 'react';

export function useAnomalyStream() {
  const [latest, setLatest] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/predict/stream');

    eventSource.onopen = () => {
      setConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'ping') return;
        
        setLatest(data);
        setHistory((prev) => [data, ...prev].slice(0, 200));
      } catch (err) {
        console.error('SSE Parse Error:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      setConnected(false);
      setError('Connection to sensor stream lost. Reconnecting...');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { latest, history, connected, error };
}
