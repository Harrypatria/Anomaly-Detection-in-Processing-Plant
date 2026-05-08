import { EventEmitter } from 'events';
import { PARAMETERS } from '../ingest/ingest';
import { predictSingle } from '../models/predictor';
import { saveReading, saveAnomalyResult, saveAlert } from '../db/crud';
import { evaluateAndGenerate } from '../alerts/alert_manager';
import { dispatch } from '../alerts/notifier';

export const simulationEvents = new EventEmitter();

let simulationTimeout: NodeJS.Timeout | null = null;
let isSimulationRunning = false;

export function startSimulation() {
  if (isSimulationRunning) return;

  console.log('Starting PetroGuard AI Simulation Engine...');
  isSimulationRunning = true;

  async function runStep() {
    if (!isSimulationRunning) return;

    const payload = generateMockPayload();
    
    try {
      // 1. Ingest
      const reading = await saveReading(payload);
      
      // 2. Predict
      const prediction = await predictSingle(payload);
      
      // 3. Save Result
      const result = await saveAnomalyResult({
        readingId: reading.id,
        ensembleScore: prediction.ensemble_score,
        iforestScore: prediction.iforest_score,
        lofScore: prediction.lof_score,
        copodScore: prediction.copod_score,
        isAnomaly: prediction.is_anomaly,
        severity: prediction.severity,
        timestamp: prediction.timestamp,
      });

      // 4. Handle Alerts
      if (prediction.is_anomaly) {
        const alerts = evaluateAndGenerate(prediction);
        for (const alert of alerts) {
          try {
            const savedAlert = await saveAlert({
              anomalyResultId: result.id,
              ...alert,
            });
            await dispatch(savedAlert);
          } catch (alertErr) {
            console.error('Failed to save simulation alert:', alertErr);
          }
        }
      }

      // 5. Broadcast
      simulationEvents.emit('prediction', prediction);
      
    } catch (err: any) {
      console.error('Simulation Step Error:', {
        message: err.message,
        code: err.code,
        meta: err.meta,
        stack: err.stack,
      });
    }

    if (isSimulationRunning) {
      simulationTimeout = setTimeout(runStep, 2000);
    }
  }

  runStep();
}

export function stopSimulation() {
  isSimulationRunning = false;
  if (simulationTimeout) {
    clearTimeout(simulationTimeout);
    simulationTimeout = null;
  }
}

function generateMockPayload() {
  const parameters: Record<string, number> = {};
  
  // Random walk with occasional spikes
  PARAMETERS.forEach(p => {
    const [min, max] = p.range;
    const mid = (min + max) / 2;
    const range = max - min;
    
    // Base value
    let val = mid + (Math.random() - 0.5) * range * 0.2;
    
    // Occasional anomaly (5% chance per parameter)
    if (Math.random() > 0.95) {
      const direction = Math.random() > 0.5 ? 1 : -1;
      val += direction * range * (0.5 + Math.random() * 0.5);
    }
    
    parameters[p.name] = val;
  });

  return {
    timestamp: new Date().toISOString(),
    source: 'SIMULATOR_01',
    parameters,
  };
}
