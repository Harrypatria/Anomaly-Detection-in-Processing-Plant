import express from 'express';
import { validatePayload } from '../../ingest/ingest';
import { saveReading } from '../../db/crud';

const router = express.Router();

router.post('/', async (req, res) => {
  const payload = req.body;
  const { isValid, errors } = validatePayload(payload);
  if (!isValid) {
    return res.status(422).json({ status: 'error', errors });
  }

  try {
    const reading = await saveReading(payload);
    res.status(201).json({ status: 'accepted', reading_id: reading.id, timestamp: reading.timestamp });
  } catch (error) {
    console.error('Ingest Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

export default router;
