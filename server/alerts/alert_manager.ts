import { PARAMETERS } from '../ingest/ingest';

const _lastAlertTime: Record<string, number> = {};

export function evaluateAndGenerate(prediction: any, cooldownMinutes = 5) {
  const alerts: any[] = [];
  const now = Date.now();
  const cooldownMs = cooldownMinutes * 60 * 1000;

  // Check each parameter
  for (const [paramName, result] of Object.entries(prediction.parameters)) {
    const res = result as any;
    if (res.anomaly_score > 0.55) {
      const lastTime = _lastAlertTime[paramName] || 0;
      if (now - lastTime > cooldownMs) {
        alerts.push(buildAlert(paramName, res.value, res.anomaly_score, prediction.severity, prediction.timestamp));
        _lastAlertTime[paramName] = now;
      }
    }
  }

  // Check overall ensemble score
  if (prediction.ensemble_score > 0.7) {
    const lastTime = _lastAlertTime['SYSTEM'] || 0;
    if (now - lastTime > cooldownMs) {
      alerts.push(buildAlert('SYSTEM', prediction.ensemble_score, prediction.ensemble_score, prediction.severity, prediction.timestamp));
      _lastAlertTime['SYSTEM'] = now;
    }
  }

  return alerts;
}

function buildAlert(parameter: string, value: number, score: number, severity: string, timestamp: string) {
  let message = '';
  let recommendedAction = '';

  switch (severity) {
    case 'low':
      message = `Minor deviation detected in ${parameter}.`;
      recommendedAction = 'Monitor closely. No immediate action required.';
      break;
    case 'medium':
      message = `Significant deviation detected in ${parameter}.`;
      recommendedAction = 'Verify reading. Check upstream parameters.';
      break;
    case 'high':
      message = `High anomaly detected in ${parameter}!`;
      recommendedAction = 'Investigate immediately. Notify shift supervisor.';
      break;
    case 'critical':
      message = `CRITICAL ANOMALY DETECTED IN ${parameter}!!!`;
      recommendedAction = 'IMMEDIATE ACTION REQUIRED. Initiate safe operating procedure.';
      break;
    default:
      message = `Normal reading for ${parameter}.`;
      recommendedAction = 'No action required.';
  }

  return {
    timestamp,
    parameter,
    value,
    anomalyScore: score,
    severity,
    message,
    recommendedAction,
  };
}
