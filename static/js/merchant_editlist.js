// JavaScript 代码
document.getElementById('save-item').addEventListener('click', function() {
    const formData = new FormData();
    const imageFile = document.getElementById('image-upload').files[0];
    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);

    // 验证输入
    if (!itemName || !itemPrice || itemPrice < 0) {
        alert('Please fill all required fields correctly');
        return;
    }

    formData.append('name', itemName);
    formData.append('price', itemPrice);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    // 添加CSRF token
    const csrftoken = getCookie('csrftoken');

    fetch('/merchant/edit/create/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Item saved successfully');
            window.location.reload();
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});

// 获取CSRF Cookie的辅助函数
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}