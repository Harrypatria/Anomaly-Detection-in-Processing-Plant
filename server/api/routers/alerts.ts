import express from 'express';
import { getAlerts, acknowledgeAlert } from '../../db/crud';

const router = express.Router();

router.get('/', async (req, res) => {
  const acknowledged = req.query.acknowledged === 'true';
  const limit = parseInt(req.query.limit as string) || 50;

  try {
    const alerts = await getAlerts(acknowledged, limit);
    res.status(200).json(alerts);
  } catch (error) {
    console.error('Get Alerts Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.patch('/:id/acknowledge', async (req, res) => {
  const alertId = parseInt(req.params.id);
  try {
    const updatedAlert = await acknowledgeAlert(alertId);
    res.status(200).json(updatedAlert);
  } catch (error) {
    console.error('Acknowledge Alert Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.delete('/clear-acknowledged', async (req, res) => {
  // In a real app, we'd delete from DB
  res.status(200).json({ status: 'success', count: 0 });
});

export default router;
