import logging
from flask import Flask, render_template, request, jsonify
from transformers import pipeline
from PIL import Image
import torch

# Setup
logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

# Load Model Pipeline once
MODEL_ID = "nickmuchi/vit-finetuned-chest-xray-pneumonia"
device = 0 if torch.cuda.is_available() else -1
classifier = pipeline("image-classification", model=MODEL_ID, device=device)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({"error": "No file uploaded"}), 400
        
        # Load and convert image
        img = Image.open(file.stream).convert("RGB")
        
        # Single Inference
        results = classifier(img)
        
        # Process labels (ensure they match frontend expectations: 'Pneumonia' / 'Normal')
        scores = {res['label'].capitalize(): round(res['score'] * 100, 2) for res in results}
        
        # Ensure keys exist (model might use 'Pneumonia' or 'Pneumonia' variants)
        # The specific model usually returns 'PNEUMONIA' and 'NORMAL'
        p_score = scores.get('Pneumonia', 0.0)
        n_score = scores.get('Normal', 0.0)
        
        verdict = "Pneumonia" if p_score > n_score else "Normal"
        confidence = max(p_score, n_score)
        
        logging.info(f"Prediction: {verdict} ({confidence}%)")
        
        return jsonify({
            "prediction": verdict,
            "confidence": confidence,
            "probabilities": {"Pneumonia": p_score, "Normal": n_score}
        })
    except Exception as e:
        logging.error(f"Prediction failed: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=False)