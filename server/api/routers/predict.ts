import express from 'express';
import { predictSingle, predictBatch } from '../../models/predictor';
import { saveAnomalyResult, saveAlert, getLatestPrediction } from '../../db/crud';
import { evaluateAndGenerate } from '../../alerts/alert_manager';
import { dispatch } from '../../alerts/notifier';
import { simulationEvents } from '../../simulation/engine';

const router = express.Router();

router.get('/latest', async (req, res) => {
  try {
    const latest = await getLatestPrediction();
    if (!latest) {
      return res.status(404).json({ status: 'error', message: 'No predictions found' });
    }
    res.status(200).json(latest);
  } catch (error) {
    console.error('Latest Predict Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const payload = req.body;
  try {
    const prediction = await predictSingle(payload);
    const result = await saveAnomalyResult({
      readingId: payload.readingId || 0, // In real app, we'd have the readingId from ingest
      ensembleScore: prediction.ensemble_score,
      iforestScore: prediction.iforest_score,
      lofScore: prediction.lof_score,
      copodScore: prediction.copod_score,
      isAnomaly: prediction.is_anomaly,
      severity: prediction.severity,
      timestamp: prediction.timestamp,
    });

    if (prediction.is_anomaly) {
      const alerts = evaluateAndGenerate(prediction);
      for (const alert of alerts) {
        const savedAlert = await saveAlert({
          anomalyResultId: result.id,
          ...alert,
        });
        await dispatch(savedAlert);
      }
    }

    res.status(200).json(prediction);
  } catch (error) {
    console.error('Predict Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.post('/batch', async (req, res) => {
  const payloads = req.body;
  try {
    const results = await predictBatch(payloads);
    res.status(200).json(results);
  } catch (error) {
    console.error('Batch Predict Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// SSE for streaming predictions
router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const onPrediction = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  simulationEvents.on('prediction', onPrediction);

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'ping', timestamp: new Date().toISOString() })}\n\n`);
  }, 15000);

  req.on('close', () => {
    simulationEvents.off('prediction', onPrediction);
    clearInterval(interval);
  });
});

export default router;
