// 初始化表单提交事件
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

// CSRF Token 获取函数
function getCSRFToken() {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
    return cookie ? cookie.split('=')[1] : null;
}

// 提交处理函数
async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
        username: document.getElementById('InputName').value,
        gender: document.getElementById('InputGender').value,
        phone: document.getElementById('InputPhonenumber').value,
        email: document.getElementById('InputEmail').value,
        password: document.getElementById('exampleInputPassword1').value
    };

    try {
        const response = await fetch('/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = '/login';
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}