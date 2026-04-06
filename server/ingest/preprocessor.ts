import { PARAMETERS } from './ingest';

export interface Scaler {
  means: number[];
  stds: number[];
}

// Initialize with default values based on parameter ranges
const defaultMeans = PARAMETERS.map(p => (p.range[0] + p.range[1]) / 2);
const defaultStds = PARAMETERS.map(p => (p.range[1] - p.range[0]) / 4); // Roughly 2 stds per side

let currentScaler: Scaler | null = { means: defaultMeans, stds: defaultStds };

export function fitScaler(data: number[][]) {
  const numParams = PARAMETERS.length;
  const means = new Array(numParams).fill(0);
  const stds = new Array(numParams).fill(0);

  for (let i = 0; i < numParams; i++) {
    const values = data.map(row => row[i]);
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    means[i] = mean;

    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
    stds[i] = Math.sqrt(variance) || 1; // Avoid division by zero
  }

  currentScaler = { means, stds };
  return currentScaler;
}

export function transform(row: number[]) {
  if (!currentScaler) {
    throw new Error('Scaler not fitted yet. Model not trained.');
  }

  return row.map((v, i) => (v - currentScaler!.means[i]) / currentScaler!.stds[i]);
}

export function inverseTransform(scaledRow: number[]) {
  if (!currentScaler) {
    throw new Error('Scaler not fitted yet. Model not trained.');
  }

  return scaledRow.map((v, i) => (v * currentScaler!.stds[i]) + currentScaler!.means[i]);
}

export function computeRollingStats(data: number[][], window = 60) {
  // Simple rolling mean and std for each parameter
  const numParams = PARAMETERS.length;
  const rollingStats = data.map((_, idx) => {
    if (idx < window) return null;
    const slice = data.slice(idx - window, idx);
    const means = new Array(numParams).fill(0);
    const stds = new Array(numParams).fill(0);

    for (let i = 0; i < numParams; i++) {
      const values = slice.map(row => row[i]);
      const sum = values.reduce((a, b) => a + b, 0);
      const mean = sum / values.length;
      means[i] = mean;

      const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
      const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
      stds[i] = Math.sqrt(variance) || 1;
    }
    return { means, stds };
  });
  return rollingStats;
}
