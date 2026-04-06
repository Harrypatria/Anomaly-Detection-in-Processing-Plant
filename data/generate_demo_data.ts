import { PrismaClient } from '@prisma/client';
import { PARAMETERS } from '../server/ingest/ingest';

const prisma = new PrismaClient();

async function generateDemoData() {
  console.log('Generating demo data...');

  const numRows = 1000;
  const now = Date.now();
  const interval = 60 * 1000; // 1 minute

  for (let i = 0; i < numRows; i++) {
    const timestamp = new Date(now - (numRows - i) * interval);
    const parameters: any = {};

    PARAMETERS.forEach(p => {
      const [min, max] = p.range;
      const base = min + (max - min) / 2;
      const noise = (Math.random() - 0.5) * (max - min) * 0.05;
      
      // Add some sinusoidal drift (daily cycle)
      const drift = Math.sin(i / 100) * (max - min) * 0.1;
      
      parameters[p.name] = base + noise + drift;
    });

    // Inject some realistic anomalies
    if (i > 750 && i < 770) {
      // Furnace trip simulation
      parameters['furnace_exit_temp'] -= 100;
      parameters['steam_oil_ratio'] += 0.2;
    }
    if (i > 850 && i < 865) {
      // Compressor surge simulation
      parameters['compressor_discharge_p'] -= 10;
      parameters['quench_tower_level'] += 20;
    }

    await prisma.sensorReading.create({
      data: {
        source: 'reactor_A',
        parameters: JSON.stringify(parameters),
        rawPayload: JSON.stringify({ timestamp, source: 'reactor_A', parameters }),
        timestamp,
      },
    });

    if (i % 100 === 0) console.log(`Generated ${i} rows...`);
  }

  console.log('Demo data generation complete.');
  process.exit(0);
}

generateDemoData().catch(e => {
  console.error(e);
  process.exit(1);
});
