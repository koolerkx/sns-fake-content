English | [日本語](README_ja.md)

# Data‑Driven Characterization of Fake Content in Social Media

A concise summary of an end‑to‑end system that detects and analyses misinformation on social networks using modern NLP and cloud‑native engineering.

---

## Quick View

| Layer        | Key Technologies                                                  |
| ------------ | ----------------------------------------------------------------- |
| **Frontend** | React (TypeScript), Ant Design, Chrome Extension API              |
| **Backend**  | FastAPI (Python) for inference, Express (Node + TS) for REST APIs |
| **Database** | MongoDB Atlas (NoSQL)                                             |
| **Cloud**    | AWS EC2 / ECS / ECR, SageMaker, S3, GitHub Pages                  |

---

## Project Highlights

* **Multiple Models Implemented** – classic ML, RNN, and Transformers (BERT / XLNet) to compare detection strategies.
* **Chrome Extension** – one‑click credibility check inside the browser.
* **Web Dashboard** – instant verification plus rich dataset analytics.
* **Fully Containerised & Cloud‑Deployed** – scalable, cost‑aware architecture on AWS.

> *Note:* Some experimental runs showed over‑fitting; absolute accuracy figures are therefore omitted.

---

## Architecture Overview

```
GitHub Pages (UI) ──► Browser │ Chrome Ext
                         │
                         ▼
             Express API (Node)  ◄─► MongoDB Atlas
                         │
                         ▼
                FastAPI Model Server
                         │
                         ▼
                 AWS SageMaker (BERT / XLNet)
```

## Deployment Diagrams

### Standalone

<p align="center">
  <img src="https://github.com/user-attachments/assets/a5b21765-da2a-4d4e-bd2b-e0cf3569902e" width="800">
</p>

### Cloud

Now is offline
<p align="center">
  <img src="https://github.com/user-attachments/assets/785594cd-dbbc-418a-9367-f7c749b4f0b6" width="800">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/9c7598a9-3f9f-401a-bccf-fca83176e75f" width="800">
</p>

## Transformer Model Flow

<p align="center">
  <img src="https://github.com/user-attachments/assets/d4c52528-aabc-4678-85a9-e7bd6b59da31" width="800">
</p>

---

### Demo Video (placeholder)

[Youtube](https://youtu.be/hDCRd132Nxo)

https://github.com/user-attachments/assets/711df831-1f29-4d1e-8f67-4b315f3c20a2

---

## Project Members

* **[Kooler Fan](https://github.com/koolerkx)** (Project Owner) — Backend‑server development, model training, frontend components; project management and code review.
* **[JohnDoeAntler](https://github.com/koolerkx/sns-fake-content/commits?author=JohnDoeAntler)** (Special Thanks) — Contributed targeted web‑development components.
