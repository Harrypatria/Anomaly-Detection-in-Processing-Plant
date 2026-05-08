# PetroGuard AI — Enterprise Anomaly Detection Platform

Advanced petrochemical process monitoring and anomaly detection platform using AI-driven ensemble models and real-time sensor analytics.

## Architecture

```ascii
[ Sensors ] -> [ Ingestion API ] -> [ SQLite DB ]
                                     |
                                     v
[ Dashboard ] <- [ Prediction API ] <- [ Gemini AI / Statistical Models ]
      |                               |
      v                               v
[ Grafana/Monitoring ] <------- [ Prometheus Metrics ]
```

## Prerequisites

- Node.js 18+
- npm

## Quick Start

1. Install dependencies: `npm install`
2. Set up environment: `cp .env.example .env`
3. Start the application: `npm run dev`

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ingest` | POST | Ingest raw sensor data |
| `/api/predict` | POST | Get anomaly prediction for a payload |
| `/api/alerts` | GET | List active alerts |
| `/api/history` | GET | Get historical parameter data |
| `/api/model/info` | GET | Get current model status |

## Credits

- **Author**: Harry Patria
- **Organization**: Patria & Co.
- **Website**: [www.patriaco.co.uk](https://www.patriaco.co.uk)
- **Refs**: PyOD (yzhao062), Anomaly Detection Platform (koushikvikram)
