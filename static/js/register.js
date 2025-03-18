// Initialize form submission events
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const accountBox = document.querySelector(".account");

    // Page load animations remain unchanged
    setTimeout(() => {
        accountBox.classList.add("show");
    }, 500);

    if (form) {
        // Remove old listeners to avoid duplicate bindings
        form.removeEventListener('submit', handleSubmit);

        // Wrapping the processor with an anti-shake function
        form.addEventListener('submit', debounceSubmit(handleSubmit, 2000));
    }
});

// Anti-flicker function: only one submission allowed within 2 seconds
function debounceSubmit(fn, delay) {
    let timer = null;
    return function(...args) {
        const context = this;
        const form = args[0].target;

        if (timer) {
            return;
        }

        // Adding Visual Feedback
        form.querySelector('button[type="submit"]').disabled = true;
        form.querySelector('button[type="submit"]').textContent = 'Submitting...';

        timer = setTimeout(() => {
            timer = null;
        }, delay);

        // Execute the original submission
        const result = fn.apply(context, args);

        // Restore button status
        if (result && result.finally) {
            result.finally(() => {
                form.querySelector('button[type="submit"]').disabled = false;
                form.querySelector('button[type="submit"]').textContent = 'Register now';
            });
        }

        return result;
    };
}

// CSRF Token Get function (keep it the same)
function getCSRFToken() { /* Original content unchanged */ }

// Commit handler (optimized version)
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        // Get form data (optimized version)
        const formData = {
            username: form.querySelector('#InputName').value,
            gender: form.querySelector('#InputGender').value,
            phone: form.querySelector('#InputPhonenumber').value,
            email: form.querySelector('#InputEmail').value,
            password: form.querySelector('#exampleInputPassword1').value
        };

        // Adding a Request Abort Controller
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

        const response = await fetch('/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(formData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Handling responses (optimizing error alerts)
        const result = await response.json();

        if (!response.ok) throw result; // Uniform error handling

        alert('Register Success');
        window.location.href = '/login';

    } catch (error) {
        // Enhanced error handling
        const errorMessage = error.errors
            ? Object.entries(error.errors).map(([k,v]) => `${k}: ${v}`).join('\n')
            : (error.message || 'Unknown error');

        alert(`Failed to register：\n${errorMessage}`);
    } finally {
        // Ensure recovery button status
        submitButton.disabled = false;
        submitButton.textContent = 'Register now';
    }
}