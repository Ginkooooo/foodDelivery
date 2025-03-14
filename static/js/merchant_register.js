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

    // 获取表单字段
    const formData = {
        name: document.getElementById('InputName').value,
        latitude: parseFloat(document.getElementById('InputLoc1').value),  // 转换为浮点数
        longitude: parseFloat(document.getElementById('InputLoc2').value),
        minimum_order: parseFloat(document.getElementById('Minimum').value),
        category: document.getElementById('category').value, // 获取分类选择值
        username: document.getElementById('InputUser').value,
        password: document.getElementById('exampleInputPassword1').value
    };

    // 分类值映射
    const categoryMapping = {
        'Fast Food': 'fastFood',
        'Chinese Food': 'chineseFood',
        'Sushi': 'sushi',
        'Drink And Coffee': 'drinkAndCoffee',
        'Groceries': 'groceries'
    };
    formData.category = categoryMapping[formData.category];  // 转换分类值

    try {
        const response = await fetch('/register/merchant/', {  // 注意接口地址
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Merchant registration successful!');
            window.location.href = '/login';  // 跳转到登录页
        } else {
            if (result.errors) {
                let errorMessages = Object.entries(result.errors)
                    .map(([field, msg]) => `${field}: ${msg}`)
                    .join('\n');
                alert('Fail to register\n:\n' + errorMessages);
            } else {
                alert('Fail to register\n: ' + (result.error || 'Unknow error'));
            }
        }
    } catch (error) {
        alert('Network Error: ' + error.message);
    }
}