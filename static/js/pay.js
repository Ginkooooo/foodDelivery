
document.addEventListener("DOMContentLoaded", function () {
    // Initializing Bindings
    function init() {
        // bind confirm button
        document.getElementById('confirmButton').addEventListener('click', handleConfirm);

        // bind cancel button
        document.getElementById('cancelButton').addEventListener('click', handleCancel);

        // bind modal box confirmation button
        document.querySelector('.modal-confirm-btn').addEventListener('click', closeModal);
    }

    // Payment confirmation processing
    function handleConfirm() {

        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('restaurant_id');
        const items = urlParams.getAll('items');
        const totalAmount = parseFloat(window.location.pathname.split('/')[2]);
        const confirmButton = document.getElementById("confirmButton");
const   userId = confirmButton.dataset.userId;


        // Converting the format of the items parameter
        const orderItems = items.map(item => {
            const decoded = decodeURIComponent(item).replace(/\s+/g, '');
            const [id, quantity] = decoded.split(':');
            return {
                item_id: parseInt(id, 10),
                quantity: parseInt(quantity, 10)
            };
        });

        // Send a request to create an order
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

    // Cancellation of payment processing
    function handleCancel() {
        showModal('failure');
    }

    // response processing
    function handleResponse(response) {
        return response.json().then(data => {
            if (response.ok && data.success) {
                showModal('success');
            } else {
                throw new Error(data.error || 'Payment failed');
            }
        });
    }

    // error handling
    function handleError(error) {
        showModal('failure');
        alert(`failure of an operation: ${error.message}`);
    }

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

    // Return to Confirmation Page Logic
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


    // Get CSRF Token
    function getCSRFToken() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1] || '';
    }

    init();
});









