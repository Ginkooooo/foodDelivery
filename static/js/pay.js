let currentModalType = 'success';

function confirmPayment() {
    showModal('success');
}

function cancelPayment() {
    showModal('failure');
}

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

    // 从URL获取参数
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('restaurant_id');
    const items = urlParams.get('items');

    // 构建返回URL
    let backUrl = '/confirm?';
    if (restaurantId) backUrl += `restaurant_id=${restaurantId}&`;
    if (items) {
        items.split(',').forEach(pair => {
            backUrl += `items=${decodeURIComponent(pair)}&`;
        });
    }
    backUrl = backUrl.slice(0, -1); // 移除最后一个&

    setTimeout(() => {
        modal.classList.remove('show', 'closing');
        modal.classList.add('hidden');

        if(currentModalType === 'success') {
            window.location.href = '/orders';
        } else {
            window.location.href = backUrl; // 使用带参数的URL
        }
    }, 600);
}