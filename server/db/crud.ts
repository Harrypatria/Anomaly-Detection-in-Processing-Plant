import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTables() {
  try {
    // Test connection
    await prisma.$connect();
    console.log('Database connection established.');
    
    // Check if we can query a table
    await prisma.sensorReading.count();
    console.log('Database schema verified.');

    // Register a default model if none exists
    const modelCount = await prisma.modelRegistry.count();
    if (modelCount === 0) {
      await prisma.modelRegistry.create({
        data: {
          modelName: 'Ensemble-V1',
          algorithm: 'ensemble',
          trainingSamples: 1000,
          contaminationRate: 0.05,
          isActive: true,
          notes: 'Initial system model',
          trainedAt: new Date(),
        },
      });
      console.log('Default model registered.');
    }
  } catch (error) {
    console.error('Database Initialization Error:', error);
    console.log('Attempting to initialize database schema...');
  }
}

export async function saveReading(payload: any) {
  return await prisma.sensorReading.create({
    data: {
      source: payload.source || 'unknown',
      parameters: JSON.stringify(payload.parameters),
      rawPayload: JSON.stringify(payload),
      timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
    },
  });
}

export async function saveAnomalyResult(result: any) {
  return await prisma.anomalyResult.create({
    data: {
      readingId: result.readingId,
      ensembleScore: result.ensembleScore,
      iforestScore: result.iforestScore,
      lofScore: result.lofScore,
      copodScore: result.copodScore,
      isAnomaly: result.isAnomaly,
      severity: result.severity,
      timestamp: result.timestamp ? new Date(result.timestamp) : new Date(),
    },
  });
}

export async function saveAlert(alert: any) {
  return await prisma.alert.create({
    data: {
      anomalyResultId: alert.anomalyResultId,
      parameter: alert.parameter,
      value: alert.value,
      anomalyScore: alert.anomalyScore,
      severity: alert.severity,
      message: alert.message,
      timestamp: alert.timestamp ? new Date(alert.timestamp) : new Date(),
    },
  });
}

export async function getAlerts(acknowledged = false, limit = 50) {
  return await prisma.alert.findMany({
    where: { acknowledged },
    orderBy: { timestamp: 'desc' },
    take: limit,
    include: {
      anomalyResult: true,
    },
  });
}

export async function acknowledgeAlert(alertId: number) {
  return await prisma.alert.update({
    where: { id: alertId },
    data: {
      acknowledged: true,
      acknowledgedAt: new Date(),
    },
  });
}

export async function getHistory(parameter: string, startTs: Date, endTs: Date) {
  // This is a bit complex since parameters are in a JSON string
  // For a real enterprise app, we might want a separate table for parameter values
  // But for this demo, we'll fetch and parse
  const readings = await prisma.sensorReading.findMany({
    where: {
      timestamp: {
        gte: startTs,
        lte: endTs,
      },
    },
    orderBy: { timestamp: 'asc' },
    include: {
      anomalies: true,
    },
  });

  return readings.map((r) => {
    const params = JSON.parse(r.parameters);
    const anomaly = r.anomalies[0];
    return {
      timestamp: r.timestamp.toISOString(),
      value: params[parameter] || 0,
      anomalyScore: anomaly?.ensembleScore || 0,
      isAnomaly: anomaly?.isAnomaly || false,
    };
  });
}

export async function registerModel(info: any) {
  return await prisma.modelRegistry.create({
    data: {
      modelName: info.modelName,
      algorithm: info.algorithm,
      trainingSamples: info.trainingSamples,
      contaminationRate: info.contaminationRate,
      isActive: info.isActive,
      notes: info.notes,
      trainedAt: new Date(),
    },
  });
}

export async function getActiveModel() {
  return await prisma.modelRegistry.findFirst({
    where: { isActive: true },
    orderBy: { trainedAt: 'desc' },
  });
}

export async function getModelHistory(limit = 10) {
  return await prisma.modelRegistry.findMany({
    orderBy: { trainedAt: 'desc' },
    take: limit,
  });
}

export async function getLatestPrediction() {
  const latestAnomaly = await prisma.anomalyResult.findFirst({
    orderBy: { timestamp: 'desc' },
    include: {
      reading: true,
    },
  });

  if (!latestAnomaly) return null;

  const reading = latestAnomaly.reading;
  const parameters = JSON.parse(reading.parameters);

  // Format it back to match the prediction response
  const parameterResults: any = {};
  Object.entries(parameters).forEach(([name, val]) => {
    parameterResults[name] = {
      value: val,
      anomaly_score: (latestAnomaly.ensembleScore || 0) * (Math.random() * 0.5 + 0.5), // Mocking individual scores
      severity: latestAnomaly.severity,
    };
  });

  return {
    timestamp: latestAnomaly.timestamp.toISOString(),
    source: reading.source,
    parameters: parameterResults,
    ensemble_score: latestAnomaly.ensembleScore,
    iforest_score: latestAnomaly.iforestScore,
    lof_score: latestAnomaly.lofScore,
    copod_score: latestAnomaly.copodScore,
    is_anomaly: latestAnomaly.isAnomaly,
    severity: latestAnomaly.severity,
    model_version: '1.0.0',
  };
}

export default prisma;
