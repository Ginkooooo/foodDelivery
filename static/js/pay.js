
document.addEventListener("DOMContentLoaded", function () {
    // 初始化绑定
    function init() {
        // 绑定确认按钮
        document.getElementById('confirmButton').addEventListener('click', handleConfirm);

        // 绑定取消按钮
        document.getElementById('cancelButton').addEventListener('click', handleCancel);

        // 绑定模态框确认按钮
        document.querySelector('.modal-confirm-btn').addEventListener('click', closeModal);
    }

    // 支付确认处理
    function handleConfirm() {

        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('restaurant_id');
        const items = urlParams.getAll('items');
        const totalAmount = parseFloat(window.location.pathname.split('/')[2]);
        const confirmButton = document.getElementById("confirmButton");
const   userId = confirmButton.dataset.userId;


        // 转换items参数格式
        const orderItems = items.map(item => {
            const decoded = decodeURIComponent(item).replace(/\s+/g, ''); // 清除所有空格
            const [id, quantity] = decoded.split(':');
            return {
                item_id: parseInt(id, 10),
                quantity: parseInt(quantity, 10)
            };
        });

        // 发送创建订单请求
        fetch("/orders/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken()
            },
            body: JSON.stringify({
                total: totalAmount,
                restaurant_id: parseInt(restaurantId, 10),
                items: orderItems,
                user_id: userId
            })
        })
        .then(handleResponse)
        .catch(handleError)
    }

    // 取消支付处理
    function handleCancel() {
        showModal('failure');
    }

    // 响应处理
    function handleResponse(response) {
        return response.json().then(data => {
            if (response.ok && data.success) {
                showModal('success');
            } else {
                throw new Error(data.error || 'Payment failed');
            }
        });
    }

    // 错误处理
    function handleError(error) {
        showModal('failure');
        alert(`操作失败: ${error.message}`);
    }

    // 模态框逻辑
    let currentModalType = 'success';

    function showModal(type) {
        const modal = document.querySelector('.modal-overlay');
        const icon = modal.querySelector('.modal-icon');
        const title = modal.querySelector('.modal-title');

        currentModalType = type;

        // Update pop-up content
        if(type === 'success') {
            icon.className = 'modal-icon success';
            icon.textContent = '✓';
            title.textContent = 'Payment Successful!';
            modal.querySelector('.modal-confirm-btn').style.background = '#00b894';
        } else {
            icon.className = 'modal-icon failure';
            icon.textContent = '✕';
            title.textContent = 'Payment Failed!';
            modal.querySelector('.modal-confirm-btn').style.background = '#ff7675';
        }

        // Display pop-up content
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
    }

    function closeModal() {
        const modal = document.querySelector('.modal-overlay');
        modal.classList.add('closing');

        setTimeout(() => {
            modal.classList.remove('show', 'closing');
            modal.classList.add('hidden');

            if(currentModalType === 'success') {
                window.location.href = '/orders';
            } else {
                navigateBackToConfirm();
            }
        }, 300);
    }

    // 返回确认页逻辑
    function navigateBackToConfirm() {
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('restaurant_id');
        const items = urlParams.getAll('items');

        let backUrl = '/confirm?';
        if (restaurantId) backUrl += `restaurant_id=${restaurantId}&`;
        items.forEach(item => {
            backUrl += `items=${encodeURIComponent(item)}&`;
        });

        window.location.href = backUrl.replace(/&$/, '');
    }


    // CSRF Token获取
    function getCSRFToken() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1] || '';
    }

    init();
});









