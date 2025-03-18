document.getElementById('addressForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get address ID
    const form = e.target;
    const addressId = form.dataset.addressId;

    const formData = {
        name: document.getElementById('name').value,
        tel: document.getElementById('tel').value,
        address: document.getElementById('address').value
    };

    try {
        // Using Dynamic Addresses ID
        const response = await fetch(`/address/editcon/${addressId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = '/address/';  // Directly jump
        } else {
            alert('Error: ' + (result.error || 'Failed to update address'));
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const panel = document.querySelector('.panel-success');
    const form = document.getElementById('addressForm');
    const cancelBtn = document.querySelector('a.btn-danger');

    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleAction(this, 'submit');
    });

    // 取消按钮处理
    cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleAction(this, 'redirect');
    });

    function handleAction(element, actionType) {
        // 添加面板退出动画
        panel.style.animation = 'panelExit 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards';

        // 动画完成后执行操作
        panel.addEventListener('animationend', function handler() {
            panel.removeEventListener('animationend', handler);

            if(actionType === 'submit') {
                // 实际提交逻辑
                const formData = new FormData(form);
                fetch(`/api/address/${form.dataset.addressId}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                    }
                }).then(() => window.location.reload());
            } else {
                window.location.href = '/address';
            }
        }, { once: true }); // 使用一次性事件监听
    }
});