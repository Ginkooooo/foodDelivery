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
    
    // 等待动画完成
    setTimeout(() => {
        modal.classList.remove('show', 'closing');
        modal.classList.add('hidden');
        
        // todolist
        if(currentModalType === 'success') {
            window.location.href = '/orders';
        } else {
            window.location.href = '/confirm';
        }
    }, 600);
}