export async function ensembleScore(scaledRow: number[], rawRow: number[], parameterNames: string[]) {
  // 1. Statistical Score (Z-score based)
  // We take the max absolute Z-score as a baseline
  const statisticalScore = Math.max(...scaledRow.map(Math.abs)) / 3.0; // Normalize roughly (Z=3 is high)

  // 2. Simplified Ensemble (Backend only uses statistical models)
  // Gemini calls are moved to the frontend per system instructions.
  const finalScore = statisticalScore; 

  return {
    ensembleScore: finalScore,
    iforestScore: statisticalScore, 
    lofScore: statisticalScore * 0.9, // Proxy values for backend simulation
    copodScore: statisticalScore * 1.1, 
    isAnomaly: finalScore > 0.55,
    severity: scoreToSeverity(finalScore),
  };
}

export function scoreToSeverity(score: number): string {
  if (score < 0.4) return 'normal';
  if (score < 0.55) return 'low';
  if (score < 0.7) return 'medium';
  if (score < 0.85) return 'high';
  return 'critical';
}
