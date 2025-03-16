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
        } else {
            // 处理验证错误
            if (result.errors) {
                let errorMessages = [];
                for (const [field, message] of Object.entries(result.errors)) {
                    errorMessages.push(`${field}: ${message}`);
                }
                alert('Registration failed:\n' + errorMessages.join('\n'));
            } else {
                alert('Registration failed: ' + (result.error || 'Unknown error'));
            }
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const accountBox = document.querySelector(".account");

    // 页面加载时触发翻转进入动画
    setTimeout(() => {
        accountBox.classList.add("show");
    }, 500);
});