import { z } from 'zod';

export const PARAMETERS = [
  { name: 'furnace_exit_temp', unit: '°C', range: [750, 870], desc: 'Cracking furnace outlet temperature' },
  { name: 'steam_oil_ratio', unit: 'ratio', range: [0.3, 0.6], desc: 'Dilution steam to hydrocarbon feed ratio' },
  { name: 'quench_tower_level', unit: '%', range: [45, 55], desc: 'Liquid level in the primary quench tower' },
  { name: 'compressor_discharge_p', unit: 'bar', range: [30, 35], desc: 'Final stage charge gas compressor pressure' },
  { name: 'demethanizer_overhead_t', unit: '°C', range: [-100, -90], desc: 'Top temperature of the demethanizer column' },
  { name: 'deethanizer_reboiler_p', unit: 'bar', range: [22, 26], desc: 'Bottom pressure of the deethanizer column' },
  { name: 'ethylene_product_purity', unit: '%', range: [99.9, 99.99], desc: 'Final polymer-grade ethylene purity' },
  { name: 'propylene_yield_rate', unit: 'wt%', range: [12, 18], desc: 'Weight percentage of propylene in cracked gas' },
  { name: 'methane_leak_detection', unit: 'ppm', range: [0, 50], desc: 'Methane concentration in flare header' },
  { name: 'cooling_water_return_t', unit: '°C', range: [32, 42], desc: 'Return temperature of the main cooling loop' },
];

const PARAM_NAMES = PARAMETERS.map(p => p.name);

const SensorPayloadSchema = z.object({
  timestamp: z.string().datetime().optional(),
  source: z.string().optional(),
  parameters: z.record(z.string(), z.number()),
});

let lastReadings: any[] = [];

export function validatePayload(payload: any) {
  const result = SensorPayloadSchema.safeParse(payload);
  if (!result.success) {
    return { isValid: false, errors: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`) };
  }

  const missing = PARAM_NAMES.filter(name => !(name in payload.parameters));
  if (missing.length > 0) {
    return { isValid: false, errors: missing.map(m => `Missing parameter: ${m}`) };
  }

  return { isValid: true, errors: [] };
}

export function streamPayload(payload: any) {
  // Simple LRU cache of last 100 readings
  lastReadings.unshift(payload);
  if (lastReadings.length > 100) {
    lastReadings.pop();
  }

  // Align parameters to PARAM_NAMES order
  const aligned: number[] = PARAM_NAMES.map(name => payload.parameters[name] || 0);
  return aligned;
}

export function loadHistoricalCsv(csvContent: string) {
  // Simple CSV parser for demo
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj: any = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i]?.trim();
    });
    return obj;
  });
  return data;
}
