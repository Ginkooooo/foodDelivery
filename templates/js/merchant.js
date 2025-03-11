document.addEventListener('DOMContentLoaded', function() {
    const quantitySelects = document.querySelectorAll('.quantity-select');
    
    function calculateTotal() {
        let total = 0;
        quantitySelects.forEach(select => {
            const quantity = parseInt(select.value);
            const price = parseFloat(select.closest('.thumbnail').querySelector('.price').dataset.price);
            total += quantity * price;
        });
        document.getElementById('totalAmount').textContent = total.toFixed(2);
    }

    quantitySelects.forEach(select => {
        select.addEventListener('change', calculateTotal);
    });

    // 初始化计算
    calculateTotal();
});