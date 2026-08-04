// Form Submission Handler
function showToast(message, type) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-notification toast-' + type;
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);padding:1rem 2rem;border-radius:0.5rem;color:white;font-size:0.875rem;z-index:9999;animation:toastIn 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);' +
        (type === 'success' ? 'background:#4CAF50;' : 'background:#f44336;');
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'toastOut 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    if (field.required && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email';
        }
    } else if (field.minLength && value.length < field.minLength) {
        isValid = false;
        message = `Minimum ${field.minLength} characters required`;
    }

    // Show/hide error
    let errorEl = field.parentElement.querySelector('.field-error');
    if (!isValid) {
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'field-error';
            errorEl.style.cssText = 'color:#f44336;font-size:0.75rem;margin-top:0.25rem;display:block;';
            field.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
        field.style.borderColor = '#f44336';
    } else {
        if (errorEl) errorEl.remove();
        field.style.borderColor = '';
    }
    return isValid;
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Validate all fields
    const fields = this.querySelectorAll('input[required], textarea[required]');
    let allValid = true;
    fields.forEach(field => {
        if (!validateField(field)) allValid = false;
    });
    
    if (!allValid) return;

    const formData = new FormData(this);
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending... <i class="ri-loader-4-line" aria-hidden="true"></i>';
    btn.disabled = true;

    fetch('https://formsubmit.co/ajax/fadm94202@gmail.com', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            showToast('Message sent successfully!', 'success');
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        })
        .catch(error => {
            showToast('Failed to send message. Please try again.', 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            console.error('Error:', error);
        });
});

// Real-time validation on blur
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
    field.addEventListener('blur', function() {
        validateField(this);
    });
});
