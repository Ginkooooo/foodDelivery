// 初始化表单提交事件 (修复重复提交版本)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const accountBox = document.querySelector(".account");

    // 页面加载动画保持不变
    setTimeout(() => {
        accountBox.classList.add("show");
    }, 500);

    if (form) {
        // 先移除旧监听器避免重复绑定
        form.removeEventListener('submit', handleSubmit);

        // 使用防抖函数包装处理器
        form.addEventListener('submit', debounceSubmit(handleSubmit, 2000));
    }
});

// 防抖函数：2秒内只允许提交一次
function debounceSubmit(fn, delay) {
    let timer = null;
    return function(...args) {
        const context = this;
        const form = args[0].target;

        if (timer) {
            console.log('快速点击被阻止');
            return;
        }

        // 添加视觉反馈
        form.querySelector('button[type="submit"]').disabled = true;
        form.querySelector('button[type="submit"]').textContent = 'Submitting...';

        timer = setTimeout(() => {
            timer = null;
        }, delay);

        // 执行原始提交
        const result = fn.apply(context, args);

        // 恢复按钮状态
        if (result && result.finally) {
            result.finally(() => {
                form.querySelector('button[type="submit"]').disabled = false;
                form.querySelector('button[type="submit"]').textContent = 'Register now';
            });
        }

        return result;
    };
}

// CSRF Token 获取函数（保持不变）
function getCSRFToken() { /* 原内容不变 */ }

// 提交处理函数（优化版本）
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        // 获取表单数据（优化版）
        const formData = {
            username: form.querySelector('#InputName').value,
            gender: form.querySelector('#InputGender').value,
            phone: form.querySelector('#InputPhonenumber').value,
            email: form.querySelector('#InputEmail').value,
            password: form.querySelector('#exampleInputPassword1').value
        };

        // 添加请求中止控制器
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8秒超时

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

        // 处理响应（优化错误提示）
        const result = await response.json();

        if (!response.ok) throw result; // 统一错误处理

        alert('Register Success');
        window.location.href = '/login';

    } catch (error) {
        // 增强错误处理
        const errorMessage = error.errors
            ? Object.entries(error.errors).map(([k,v]) => `${k}: ${v}`).join('\n')
            : (error.message || 'Unknown error');

        alert(`注册失败：\n${errorMessage}`);
    } finally {
        // 确保恢复按钮状态
        submitButton.disabled = false;
        submitButton.textContent = 'Register now';
    }
}