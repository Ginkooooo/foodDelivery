document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.btn-group-justified .btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});

async function handleLogin(event) {
    event.preventDefault();

    const form = event.target;
    const formData = {
        username: form.elements.username.value,
        password: form.elements.password.value
    };

    try {
        const response = await fetch('/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()  // 携带 Token
            },
            body: JSON.stringify(formData)
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Unexpected response: ${text.slice(0, 100)}`);
        }

        const result = await response.json();

        if (response.ok && result.success) {
            window.location.href = '/home';  // 直接跳转
        } else {
            alert(result.error || "Login failed");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Login error:', error);  // 调试输出
    }
}

function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || null;
}