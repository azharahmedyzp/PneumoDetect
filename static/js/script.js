document.addEventListener('DOMContentLoaded', () => {
    // UI Selectors
    const $ = (id) => document.getElementById(id);
    const elements = {
        dropZone: $('drop-zone'),
        fileInput: $('file-input'),
        previewImg: $('preview-img'),
        uploadState: $('upload-state'),
        analysisState: $('analysis-state'),
        resultState: $('result-state'),
        resetBtn: $('reset-btn'),
        results: {
            text: $('prediction-text'),
            conf: $('confidence-text'),
            fillP: $('fill-p'),
            fillN: $('fill-n'),
            valP: $('val-p'),
            valN: $('val-n'),
            icon: $('result-icon')
        }
    };

    const showState = (state) => {
        const states = [elements.uploadState, elements.analysisState, elements.resultState];
        states.forEach(s => s.style.display = 'none');

        if (state === 'upload') elements.uploadState.style.display = 'block';
        if (state === 'analysis') elements.analysisState.style.display = 'block';
        if (state === 'result') elements.resultState.style.display = 'block';
    };

    const updateUI = (data) => {
        const isP = data.prediction === 'Pneumonia';
        const color = isP ? 'var(--danger)' : 'var(--success)';
        const icon = isP ? 'fa-triangle-exclamation' : 'fa-check-circle';

        elements.results.text.innerText = data.prediction;
        elements.results.text.style.color = color;
        elements.results.conf.innerText = `${data.confidence}% Confidence`;
        elements.results.icon.innerHTML = `<i class="fa-solid ${icon}"></i>`;
        elements.results.icon.style.color = color;

        // Progress Bars
        elements.results.fillP.style.width = `${data.probabilities.Pneumonia}%`;
        elements.results.fillN.style.width = `${data.probabilities.Normal}%`;
        elements.results.valP.innerText = `${data.probabilities.Pneumonia}%`;
        elements.results.valN.innerText = `${data.probabilities.Normal}%`;
    };

    const handleInference = async (file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            elements.previewImg.src = e.target.result;
            showState('analysis');

            try {
                const fd = new FormData();
                fd.append('file', file);

                // Add a small artificial delay for better UX
                const [res] = await Promise.all([
                    fetch('/predict', { method: 'POST', body: fd }),
                    new Promise(r => setTimeout(r, 2000))
                ]);

                const data = await res.json();
                if (data.error) throw new Error(data.error);

                updateUI(data);
                showState('result');
            } catch (err) {
                alert(`Error: ${err.message}`);
                showState('upload');
            }
        };
        reader.readAsDataURL(file);
    };

    // Events
    elements.fileInput.onchange = (e) => handleInference(e.target.files[0]);
    elements.resetBtn.onclick = () => showState('upload');

    // Drag-Drop
    elements.dropZone.onclick = () => elements.fileInput.click();
    elements.dropZone.ondragover = (e) => {
        e.preventDefault();
        elements.dropZone.style.borderColor = 'var(--primary)';
    };
    elements.dropZone.ondragleave = () => {
        elements.dropZone.style.borderColor = 'var(--border)';
    };
    elements.dropZone.ondrop = (e) => {
        e.preventDefault();
        handleInference(e.dataTransfer.files[0]);
    };
});