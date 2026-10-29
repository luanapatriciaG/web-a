document.addEventListener('DOMContentLoaded', () => {
    const headlineInput = document.getElementById('headlineInput');
    const mainTextInput = document.getElementById('mainTextInput');
    const categorySelect = document.getElementById('categorySelect');
    const inputStatus = document.getElementById('inputStatus');
    const charMeter = document.getElementById('charMeter');
    const charProgress = document.getElementById('charProgress');
    const headlineFeedback = document.getElementById('headlineFeedback');
    const mainFeedback = document.getElementById('mainFeedback');
    const previewHeadline = document.getElementById('previewHeadline');
    const previewBody = document.getElementById('previewBody');
    const previewCategory = document.getElementById('previewCategory');
    const previewTimestamp = document.getElementById('previewTimestamp');
    const previewIntent = document.getElementById('previewIntent');
    const validationAlert = document.getElementById('validationAlert');
    const alertMessage = document.getElementById('alertMessage');
    const toast = document.getElementById('toast');
    const valChars = document.getElementById('valChars');
    const valWords = document.getElementById('valWords');
    const valReadTime = document.getElementById('valReadTime');
    const valSentences = document.getElementById('valSentences');
    const btnUpper = document.getElementById('btnUpper');
    const btnLower = document.getElementById('btnLower');
    const btnTitle = document.getElementById('btnTitle');
    const btnReverse = document.getElementById('btnReverse');
    const btnClear = document.getElementById('btnClear');
    const btnCopy = document.getElementById('btnCopy');
    const presetChips = document.querySelectorAll('.chip');
    const MAX_CHARS = 280;

    function updateLiveDOM() {
        const headline = headlineInput.value.trim();
        const bodyText = mainTextInput.value;
        const category = categorySelect.value;
        
        previewHeadline.textContent = headline.length > 0 ? headline : 'Your Dynamic Headline Will Appear Here';
        previewBody.textContent = bodyText.trim().length > 0 ? bodyText : 'Type into the input console on the left to observe real-time Document Object Model (DOM) node updates without reloading the webpage.';
        previewCategory.textContent = category;
        
        const now = new Date();
        previewTimestamp.textContent = `Updated at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
        
        const charLen = bodyText.length;
        charMeter.textContent = `${charLen} / ${MAX_CHARS} chars`;
        
        const progressPercent = Math.min(100, (charLen / MAX_CHARS) * 100);
        charProgress.style.width = `${progressPercent}%`;
        
        if (progressPercent > 90) {
            charProgress.style.backgroundColor = '#d32f2f';
        } else if (progressPercent > 70) {
            charProgress.style.backgroundColor = '#ff9800';
        } else {
            charProgress.style.backgroundColor = 'var(--orange)';
        }
        
        valChars.textContent = charLen;
        const words = bodyText.trim().length > 0 ? bodyText.trim().split(/\s+/).filter(w => w.length > 0) : [];
        valWords.textContent = words.length;
        
        const readTimeSeconds = Math.ceil((words.length / 200) * 60);
        valReadTime.textContent = words.length > 0 ? `${readTimeSeconds}s` : '0s';
        
        const sentences = bodyText.trim().length > 0 ? bodyText.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
        valSentences.textContent = sentences.length;
        
        const lowerText = bodyText.toLowerCase();
        let detectedTone = 'Informative / Neutral';
        let toneColor = 'var(--lime)';
        
        if (lowerText.includes('collision') || lowerText.includes('malware') || lowerText.includes('vulnerability') || lowerText.includes('alert') || lowerText.includes('error')) {
            detectedTone = 'Critical / Security Alert';
            toneColor = '#ff572e';
        } else if (lowerText.includes('accuracy') || lowerText.includes('optimal') || lowerText.includes('converged') || lowerText.includes('success') || lowerText.includes('confidence')) {
            detectedTone = 'High Confidence / Positive';
            toneColor = '#d8ff54';
        } else if (lowerText.includes('model') || lowerText.includes('neural') || lowerText.includes('propagation') || lowerText.includes('rk4') || lowerText.includes('grad-cam')) {
            detectedTone = 'Technical / AI Analytical';
            toneColor = '#3b82f6';
        } else if (lowerText.includes('why') || lowerText.includes('how') || lowerText.includes('what') || lowerText.includes('?')) {
            detectedTone = 'Inquisitive / Query';
            toneColor = '#facc15';
        }
        
        previewIntent.textContent = `Tone: ${detectedTone}`;
        previewIntent.style.color = toneColor;
        validateInputs(headline, bodyText);
    }

    function validateInputs(headline, text) {
        if (headline.length === 0 && text.length > 0) {
            headlineFeedback.textContent = 'Please enter a headline for your dynamic card.';
            headlineFeedback.className = 'field-feedback err';
        } else if (headline.length > 0 && headline.length < 5) {
            headlineFeedback.textContent = 'Headline is very short (min 5 characters recommended).';
            headlineFeedback.className = 'field-feedback err';
        } else {
            headlineFeedback.textContent = '';
            headlineFeedback.className = 'field-feedback';
        }
        
        if (text.length === 0) {
            inputStatus.textContent = 'Awaiting input';
            inputStatus.className = 'status-pill status-idle';
            validationAlert.className = 'validation-alert alert-info';
            alertMessage.textContent = 'Enter text in the console to observe dynamic DOM updates and instant feedback.';
        } else if (text.length > 0 && text.length < 15) {
            inputStatus.textContent = 'Typing...';
            inputStatus.className = 'status-pill status-typing';
            validationAlert.className = 'validation-alert alert-warn';
            alertMessage.textContent = 'Keep typing to provide sufficient context for DOM dynamic analytics.';
        } else {
            inputStatus.textContent = 'Active Sync';
            inputStatus.className = 'status-pill status-active';
            validationAlert.className = 'validation-alert alert-success';
            alertMessage.textContent = 'Dynamic DOM synchronized perfectly with real-time text analysis.';
        }
    }

    headlineInput.addEventListener('input', updateLiveDOM);
    mainTextInput.addEventListener('input', updateLiveDOM);
    categorySelect.addEventListener('change', updateLiveDOM);
    
    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            headlineInput.value = chip.dataset.headline;
            categorySelect.value = chip.dataset.category;
            mainTextInput.value = chip.dataset.text;
            updateLiveDOM();
            showToast('Loaded preset prompt!');
        });
    });

    btnUpper.addEventListener('click', () => {
        if (mainTextInput.value) {
            mainTextInput.value = mainTextInput.value.toUpperCase();
            updateLiveDOM();
        }
    });

    btnLower.addEventListener('click', () => {
        if (mainTextInput.value) {
            mainTextInput.value = mainTextInput.value.toLowerCase();
            updateLiveDOM();
        }
    });

    btnTitle.addEventListener('click', () => {
        if (mainTextInput.value) {
            mainTextInput.value = mainTextInput.value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            updateLiveDOM();
        }
    });

    btnReverse.addEventListener('click', () => {
        if (mainTextInput.value) {
            mainTextInput.value = mainTextInput.value.split('').reverse().join('');
            updateLiveDOM();
        }
    });

    btnClear.addEventListener('click', () => {
        headlineInput.value = '';
        mainTextInput.value = '';
        categorySelect.selectedIndex = 0;
        updateLiveDOM();
        showToast('Cleared all inputs.');
    });

    btnCopy.addEventListener('click', async () => {
        const textToCopy = `[${previewCategory.textContent}] ${previewHeadline.textContent}\n\n${previewBody.textContent}`;
        try {
            await navigator.clipboard.writeText(textToCopy);
            showToast('Preview card text copied to clipboard!');
        } catch (err) {
            showToast('Copied to clipboard!');
        }
    });

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2400);
    }
    
    updateLiveDOM();
});