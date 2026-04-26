---
title: PneumoDetect
emoji: 🩻
colorFrom: indigo
colorTo: blue
sdk: docker
pinned: false
app_port: 7860
---

# PneumoDetect | Smart Radiography ✨

A premium, high-performance web application designed for rapid Pneumonia detection from Chest X-Rays. Powered by state-of-the-art Vision Transformers (ViT) and a modern, clinical-grade interface.

## Core Features 🚀

- **ViT-Powered Inference:** Utilizes the `nickmuchi/vit-finetuned-chest-xray-pneumonia` model, a Vision Transformer fine-tuned specifically for radiographic analysis.
- **Clinical Grade UI:** A "Clean Clinical Light" theme designed for medical environments, featuring glassmorphism, fluid animations, and high-tech scanning effects.
- **Instant Diagnostics:** Real-time analysis with confidence metrics and probability distribution visualizations.
- **Streamlined Performance:** Optimized backend logic that removes redundant preprocessing and ensembles for faster, more efficient execution.
- **Drag-and-Drop Workflow:** Supports effortless file uploads and instant scan previews.

## Tech Stack 🛠️

- **Backend:** Flask (Python)
- **AI Core:** Hugging Face Transformers, PyTorch
- **Frontend:** Vanilla HTML5, CSS3 (Modern Glassmorphism), Javascript (ES6+)
- **Models:** Vision Transformer (ViT)

## Setup Instructions 💻

### 1. Environment Setup
Clone the repository and install the optimized dependency list:
```bash
pip install -r requirements.txt
```

### 2. Launch the Suite
Initialize the Flask server:
```bash
python app.py
```
Access the dashboard at `http://localhost:5000`

## Architecture Highlights 🏗️

- **Simplified Pipeline:** Replaced heavy ensemble logic with a single, high-accuracy ViT backbone to reduce latency and memory footprint.
- **Transformer-First Design:** Leveraging the global attention mechanisms of ViTs to handle raw radiographic data without needing traditional contrast enhancement (CLAHE).
- **Responsive Aesthetics:** A fully responsive, "sharp" design that adapts to all devices while maintaining a premium medical feel.
- **Micro-Interactions:** Custom scanning animations and interactive progress bars for enhanced user feedback.

---
Built by **Azhar Ahmed**

*Disclaimer: This tool is intended for educational and demonstrative purposes only. Always consult a qualified medical professional for clinical diagnosis.*