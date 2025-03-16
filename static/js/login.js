document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.btn-group-justified .btn');
    let userType = "user"; // 默认登录类型

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            userType = button.innerText.toLowerCase();
        });
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        handleLogin(event, userType); // 传递登录类型
    });
})

async function handleLogin(event, userType) {

    const form = event.target;
    const formData = {
        username: form.elements.username.value,
        password: form.elements.password.value,
        user_type: userType
    };

    try {
        const response = await fetch('/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()  // 携带 Token
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Unexpected response: ${text.slice(0, 100)}`);
        }

        const result = await response.json();

        if (response.ok && result.success) {
            // 根据后端返回的 redirect 字段跳转
            window.location.href = result.redirect || '/home';
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

document.addEventListener("DOMContentLoaded", function () {
    const accountBox = document.querySelector(".account");

    // 页面加载时触发翻转进入
    setTimeout(() => {
        accountBox.classList.add("show");
    }, 200);

    // 监听 "Create an account" 按钮点击事件
    const flipLink = document.querySelector(".flip-trigger");

    if (flipLink) {
        flipLink.addEventListener("click", function (event) {
            event.preventDefault(); // 阻止立即跳转
            const targetUrl = this.href; // 获取目标地址

            // 添加翻转离开动画
            accountBox.classList.add("flip");

            // 动画执行 0.8s 后跳转
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    }
});
