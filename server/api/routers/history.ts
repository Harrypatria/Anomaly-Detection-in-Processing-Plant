import express from 'express';
import { getHistory } from '../../db/crud';

const router = express.Router();

router.get('/:parameter', async (req, res) => {
  const parameter = req.params.parameter;
  const start = req.query.start ? new Date(req.query.start as string) : new Date(Date.now() - 24 * 60 * 60 * 1000);
  const end = req.query.end ? new Date(req.query.end as string) : new Date();

  try {
    const history = await getHistory(parameter, start, end);
    res.status(200).json(history);
  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.get('/export/:parameter', async (req, res) => {
  const parameter = req.params.parameter;
  const start = req.query.start ? new Date(req.query.start as string) : new Date(Date.now() - 24 * 60 * 60 * 1000);
  const end = req.query.end ? new Date(req.query.end as string) : new Date();

  try {
    const history = await getHistory(parameter, start, end);
    const csv = 'timestamp,value,anomaly_score,is_anomaly\n' + history.map(h => `${h.timestamp},${h.value},${h.anomalyScore},${h.isAnomaly}`).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${parameter}_history.csv`);
    res.status(200).send(csv);
  } catch (error) {
    console.error('Export History Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

export default router;
