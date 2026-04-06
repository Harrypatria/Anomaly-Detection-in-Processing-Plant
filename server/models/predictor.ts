import { streamPayload, validatePayload, PARAMETERS } from '../ingest/ingest';
import { transform } from '../ingest/preprocessor';
import { ensembleScore } from './ensemble';

const PARAM_NAMES = PARAMETERS.map(p => p.name);

export async function predictSingle(payload: any) {
  const { isValid, errors } = validatePayload(payload);
  if (!isValid) {
    throw new Error(`Invalid payload: ${errors.join(', ')}`);
  }

  const rawRow = streamPayload(payload);
  const scaledRow = transform(rawRow);

  const ensembleResult = await ensembleScore(scaledRow, rawRow, PARAM_NAMES);

  const parameterResults: any = {};
  PARAM_NAMES.forEach((name, i) => {
    parameterResults[name] = {
      value: rawRow[i],
      scaled_value: scaledRow[i],
      anomaly_score: Math.abs(scaledRow[i]) / 3.0, // Individual Z-score
      severity: ensembleResult.severity, // Using ensemble severity for now
    };
  });

  return {
    timestamp: payload.timestamp || new Date().toISOString(),
    source: payload.source || 'unknown',
    parameters: parameterResults,
    ensemble_score: ensembleResult.ensembleScore,
    iforest_score: ensembleResult.iforestScore,
    lof_score: ensembleResult.lofScore,
    copod_score: ensembleResult.copodScore,
    is_anomaly: ensembleResult.isAnomaly,
    severity: ensembleResult.severity,
    model_version: '1.0.0',
  };
}

export async function predictBatch(payloads: any[]) {
  const results = [];
  for (const payload of payloads) {
    results.push(await predictSingle(payload));
  }
  return results;
}
