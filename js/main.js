document.getElementById('year').textContent = new Date().getFullYear();

(function () {
const emailEl = document.getElementById('emailText');
const toastEl = document.getElementById('copyToast');
let bsToast = null;
try {
    bsToast = bootstrap.Toast.getOrCreateInstance(toastEl);
} catch (e) {
    bsToast = null;
}

async function copyAndSaveEmail(email) {
    try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    const record = { email, savedAt: new Date().toISOString() };
    localStorage.setItem('savedEmail', JSON.stringify(record));
    if (bsToast) {
        bsToast.show();
    } else {
        alert('Email copié et sauvegardé ✓');
    }
    } catch (err) { alert("Impossible de copier l'email. Copiez-le manuellement : " + email);
    }
}

emailEl.addEventListener('click', () => {
    copyAndSaveEmail(emailEl.textContent.trim());
});

emailEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    copyAndSaveEmail(emailEl.textContent.trim());
    }
});

emailEl.style.cursor = 'pointer';
emailEl.style.userSelect = 'all';
})();
