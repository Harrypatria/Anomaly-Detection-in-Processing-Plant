import express from 'express';
import { getActiveModel, registerModel, getModelHistory } from '../../db/crud';

const router = express.Router();

router.get('/info', async (req, res) => {
  try {
    const activeModel = await getActiveModel();
    if (!activeModel) {
      return res.status(200).json({
        is_ready: false,
        algorithms: ['iforest', 'lof', 'copod', 'ensemble'],
        trained_at: null,
        training_samples: 0,
        contamination_rate: 0.05,
      });
    }

    res.status(200).json({
      is_ready: true,
      algorithms: ['iforest', 'lof', 'copod', 'ensemble'],
      trained_at: activeModel.trainedAt.toISOString(),
      training_samples: activeModel.trainingSamples,
      contamination_rate: activeModel.contaminationRate,
    });
  } catch (error) {
    console.error('Get Model Info Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.post('/retrain', async (req, res) => {
  const { contamination, notes } = req.body;
  try {
    // In real app, we'd trigger a background job
    // For demo, we'll just register a new model
    const model = await registerModel({
      modelName: 'Ensemble-V1',
      algorithm: 'ensemble',
      trainingSamples: 1000,
      contaminationRate: contamination || 0.05,
      isActive: true,
      notes: notes || 'Manual retrain',
    });

    res.status(200).json({ status: 'training_started', job_id: model.id });
  } catch (error) {
    console.error('Retrain Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.get('/retrain/status', (req, res) => {
  res.status(200).json({ status: 'idle', started_at: null, completed_at: null, error: null });
});

router.get('/history', async (req, res) => {
  try {
    const history = await getModelHistory(20);
    res.status(200).json({ status: 'success', data: history });
  } catch (error) {
    console.error('Get Model History Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

export default router;
