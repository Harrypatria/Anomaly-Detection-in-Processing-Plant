<div align="center">

# PetroGuard AI 

### Agentic Process Intelligence & Anomaly Detection Command Center

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Algorithms](https://img.shields.io/badge/Algorithms-iForest_|_LOF_|_COPOD-F7931E?style=flat)](https://github.com/Harrypatria)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Stars](https://img.shields.io/github/stars/Harrypatria/Anomaly-Detection-in-Processing-Plant?style=social)](https://github.com/Harrypatria/Anomaly-Detection-in-Processing-Plant/stargazers)

**Transform petrochemical safety from reactive reporting into predictive intelligence.**

[🚀 Live Demo](#) · [📓 Learning Usecases](#) · [📄 Prompt Engineering](#)
</div>

---

## Table of Contents

1. [Overview](#-overview)
2. [The ITDO Framework](#-the-itdo-framework)
3. [End-to-End ML Lifecycle](#-end-to-end-ml-lifecycle)
   - [Step 1 — Problem Definition](#step-1--problem-definition)
   - [Step 2 — Data Processing](#step-2--data-processing)
   - [Step 3 — Modelling](#step-3--modelling)
   - [Step 4 — Evaluation](#step-4--evaluation)
   - [Step 5 — Deployment](#step-5--deployment)
4. [Building with AI](#-building-with-ai)
5. [Tech Stack](#-tech-stack)
6. [Repository Structure](#-repository-structure)
7. [Setup & Installation](#-setup--installation)
8. [API Reference](#-api-reference)
9. [Contributing](#-contributing)
10. [Author](#-author)

---

## 🌟 Overview

**PetroGuard AI** is a production-grade, full-stack process intelligence platform that bridges the gap between machine learning insights and operational plant execution. Built on the **ITDO Framework** (Insights → Triggers → Decisions → Operations), it enables plant managers to move from asking *"Why did the system fail?"* to *"How do we prevent the impending deviation?"*

> *"The future of energy operations isn't just about reporting sensor triggers. It's about predicting cascading failures — and having the operational command center to stabilize conditions instantaneously."*
> — **Dr. Harry Patria**, Chief Data & AI Officer, Patria & Co.

### Key Capabilities

| Capability | Description |
|---|---|
| 🎯 **Risk Prediction** | Synthetic ensemble models (iForest, LOF, COPOD) compute real-time stability likelihood |
| 🔍 **Streaming Telemetry** | Nanosecond-level processing of multi-variate sensors (Pressure, Temp, Flow Rate) |
| ⚡ **Automated Alerts** | Threshold-based triggers fire when ensemble statistics breach standard control ranges |
| 🧠 **Predictive Engine** | Deep structural analysis tracking anomalies through localized density and multivariate tail distributions |
| 📋 **Operational Incidents** | Real-time incident logs tracking process deviations and operator acknowledgment flows |
| 📊 **High-Performance UI** | Sleek, liquid-responsive glassmorphism front end designed for premium control rooms |

---

## 🛠️ The ITDO Framework

The ITDO Framework is the architectural backbone of this platform. Designed by Dr. Harry Patria, every feature maps to one distinct layer:

```
┌────────────────────────────────────────────────────────────────┐
│                     ITDO FRAMEWORK                             │
├────────────┬──────────────────┬────────────────────────────────┤
│ Layer      │ Tool             │ Function                       │
├────────────┼──────────────────┼────────────────────────────────┤
│ INSIGHTS   │ /engine routing  │ Deep feature explanations from │
│ 🔍         │ AnomalyChart     │ Isolation Forest, LOF, COPOD   │
├────────────┼──────────────────┼────────────────────────────────┤
│ TRIGGERS   │ /alerts webhook  │ Auto-fired threshold breaches  │
│ ⚡         │ Live Feed        │ when parameters trend critical │
├────────────┼──────────────────┼────────────────────────────────┤
│ DECISIONS  │ Threshold Config │ Translates statistical scores  │
│ 🧠         │ Rule mapping     │ into actionable color severities│
├────────────┼──────────────────┼────────────────────────────────┤
│ OPERATIONS │ Incident Log     │ Operational dashboard array    │
│ 📋         │ Dashboard        │ tracking historical incidents  │
└────────────┴──────────────────┴────────────────────────────────┘
```

---

## 🔄 End-to-End ML Lifecycle

This project demonstrates a rigorous pipeline for processing continuous high-velocity variables within a petrochemical plant setting—all embedded directly inside a TypeScript engine.

---

### Step 1 — Problem Definition

**Business Problem:**
Operations lose millions in unplanned downtime or safety hazards due to isolated sensor failures cascading into major breaches. Independent alarm systems capture data *too late*. We need an integrated engine that:
- Predicts **when** instability is building across multiple dimensions.
- Estimates **where** the statistical center rests (density).
- Highlights **what** operators should monitor.
- Tracks **historical** deviations for deep audits.

**Framing the Task:**
```
Type:      Multivariate Continuous Anomaly Detection
Target:    Status Severity Level (Stable, Warning, High, Critical)
Unit:      Aggregated Timestamp Point
Output:    P(Ensemble Deviation) ∈ [0,1]
Model:     Hybrid iForest/LOF/COPOD Heuristic Simulator
```

---

### Step 2 — Data Processing

**Sensor Landscape:**
Generates high-frequency multivariate telemetry pipelines targeting crucial petrochemical dynamics:

```
┌─────────────────────┬──────────────────────────────────────────────────┐
│ Parameter Group     │ Features                                         │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Reactor Core        │ Ethylene Reactor Temperature (C), Pressure (bar) │
│ Coolant Loop        │ Propylene Coolant Flow (m3/h)                    │
│ Feed System         │ Naphtha Feed Rate (tons/h)                       │
│ Distillation        │ Column Reflux Ratio (L/min)                      │
│ Extractor           │ Compressor Vibration Level (mm/s)                │
└─────────────────────┴──────────────────────────────────────────────────┘
```

**Real-time Preprocessing (`server/ingest/preprocessor.ts`)**:
Telemetry undergoes continuous normalisation using flowing rolling-window standardisations before ingestion into the scoring backend.

---

### Step 3 — Modelling

The backend leverages a synthetic triple-ensemble engine computing simultaneous multivariate deviations:

1. **Isolation Forest (iForest):** Evaluates distance-based deviations tracking variables simultaneously drifting into out-of-control margins via sum of squares geometry.
2. **Local Outlier Factor (LOF):** Focuses on local density drops predicting sudden extreme single-sensor failures.
3. **COPOD (Copula):** Utilises absolute mean deviations predicting structurally heavy tails without requiring complex dimensionality reduction.

---

### Step 4 — Evaluation

Outputs are visually evaluated and presented dynamically on the dashboard leveraging Recharts, calculating unified probabilities translated to the end-user.

```
┌──────────────────┬──────────────────────────────────────────────────┐
│ Severity         │ Mapped Threshold Parameter Response              │
├──────────────────┼──────────────────────────────────────────────────┤
│ STABLE           │ 0.00 – 0.40 range                                │
│ WARNING          │ 0.40 – 0.70 range                                │
│ HIGH RISK        │ 0.70 – 0.90 range                                │
│ CRITICAL         │ > 0.90 range                                     │
└──────────────────┴──────────────────────────────────────────────────┘
```

---

### Step 5 — Deployment

**System Architecture:**

```
┌───────────────────────────────────────────────────────────────┐
│                        PRODUCTION ARCHITECTURE                │
├──────────────────┬────────────────────────────────────────────┤
│  USER BROWSER    │  React 18 + Vite                           │
│                  │  → /login → /dashboard → /archive          │
├──────────────────┼────────────────────────────────────────────┤
│  API LAYER       │  Express.js / Node                         │
│                  │  Socket.io Stream Feed | POST /ingest      │
├──────────────────┼────────────────────────────────────────────┤
│  ML ENGINE       │  TypeScript Ensemble Engine (`ensemble.ts`)│
│                  │  Real-time data generation & heuristic scoring│
└──────────────────┴────────────────────────────────────────────┘
```

---

## 🤖 Building with AI

This repository represents the synthesis of **Agentic AI code-generation** capabilities mapped against robust domain knowledge. Code architectures, state management systems, UI glassmorphisms, and statistical simulation pipelines were iterated efficiently using structured generation paths bridging Advanced Software Engineering and Data Science.

---

## 📦 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Core** | React 18 + TypeScript | SPA Framework |
| **Tooling** | Vite v6 | Ultra-fast HMR and compilation |
| **Styling** | Tailwind CSS 4 | Atomic design system (Premium Light mode) |
| **Charts** | Recharts | Live responsive anomaly visualizations |
| **Animation** | Framer Motion | Smooth state/route transitions & physics |
| **Server Backend** | Express.js (Node) | API and Live Streaming Host |
| **ML Engine** | Local TS Simulated Ensembles | Real-time score generation mimicking industry workflows |
| **Icons** | Lucide React | Precision visual metrics |

---

## 📁 Repository Structure

```
Anomaly-Detection-in-Processing-Plant/
│
├── 🐍 server/                     # Backend API & Simulation
│   ├── main.py                    # Placeholder backend architecture
│   ├── ingest/                    # Telemetry ingestion routes
│   │   ├── ingest.ts              # Live HTTP intake
│   │   └── preprocessor.ts        # Normalisation & pipeline standardisation
│   ├── models/                    # ML Simulation Logic
│   │   ├── ensemble.ts            # Core logic (IForest / LOF / COPOD weights)
│   │   └── predictor.ts           # Route handler
│   └── simulation/
│       └── engine.ts              # Live streaming mock loop generator
│
├── ⚛️ src/                        # Frontend Application
│   ├── components/                # Modular React Elements
│   │   ├── Dashboard.tsx          # Realtime KPI Hub
│   │   ├── LandingPage.tsx        # High-conversion Product entry
│   │   ├── LoginPage.tsx          # Secure local-storage auth gate
│   │   ├── AnomalyChart.tsx       # Live area-graphs with custom Tooltips
│   │   ├── ParameterCard.tsx      # Sensor specific component
│   │   └── ...                    
│   ├── lib/                       # Utility helpers (e.g. `utils.ts` tailwind merges)
│   ├── styles/                    
│   │   └── index.css              # Setup theme properties, variables
│   ├── App.tsx                    # Root Route map
│   └── main.tsx                   # React DOM Entry
│
├── ⚙️ package.json                 # Dependency manifests
└── 📖 README.md
```

---

## ⚙️ Setup & Installation

### Option A — Local Development 

```bash
# 1. Clone the repository
git clone https://github.com/Harrypatria/Anomaly-Detection-in-Processing-Plant.git
cd Anomaly-Detection-in-Processing-Plant

# 2. Install Dependencies
npm install

# 3. Start the application
# This spins up both the Vite frontend & live simulation Express backend
npm run dev

# 4. Open in Browser
# Navigate to http://localhost:3000
```

---

## 📡 API Reference

Endpoints are maintained on the backend Express layer during `npm run dev`.

### `POST /api/predict`
Calculate threshold anomalies for a discrete parameter batch.

### `POST /api/ingest`
Manually trigger anomalous payloads toward the internal tracker system.

### `GET /api/alerts`
Returns current threshold breaches.

---

## 🤝 Contributing

Contributions are welcome! Please align PRs against strict typing frameworks (no native `any` casting where preventable) and maintain the premium Light-Mode design aesthetic across Tailwind configurations.

```bash
# 1. Fork the repository
# 2. Checkout your feature branch
git checkout -b feature/predictive-maintenance
# 3. Commit your changes
git commit -m "feat: adding pipeline vibrations model"
# 4. Push to branch
git push origin feature/predictive-maintenance
# 5. Open Pull Request
```

---

## 📄 License

Distributed under the **Apache-2.0 License**. 

---

## 👤 Author

<div align="center">

**Dr. Harry Patria**  
*Chief Data & AI Officer | Patria & Co. | Principal AI Engineer | i-Vigilant Technologies*

[![GitHub](https://img.shields.io/badge/GitHub-Harrypatria-181717?logo=github)](https://github.com/Harrypatria)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-harrypatria-0077B5?logo=linkedin)](https://www.linkedin.com/in/harrypatria/)
[![Patria & Co.](https://img.shields.io/badge/Patria%20%26%20Co.-patriaco.co.uk-FF6B35)](https://www.patriaco.co.uk)

*Indonesia's first AI consultancy. Building production-grade AI systems for energy, finance, and public sector.*

---

**If this project helped you, please give it a ⭐ — it helps others discover it.**

[![GitHub Follow](https://img.shields.io/github/followers/Harrypatria?style=social)](https://github.com/Harrypatria?tab=followers)

</div>
