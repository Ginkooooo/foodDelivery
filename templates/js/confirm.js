document.addEventListener('DOMContentLoaded', function() {
    const calculateTotal = () => {
        let total = 0;
        
        // 计算商品总价
        document.querySelectorAll('[data-product-id]').forEach(item => {
            const price = parseFloat(
                item.querySelector('.price').textContent.replace(/[^0-9.]/g, '')
            );
            const quantity = parseInt(
                item.querySelector('.quantity-select').value || 0
            );
            total += price * quantity;
        });

        // 获取配送费
        const deliveryElement = [...document.querySelectorAll('.list-group-item')]
            .find(el => el.textContent.includes('Delivery Fee'));
            
        const deliveryFee = deliveryElement ? 
            parseFloat(deliveryElement.textContent.match(/\d+\.?\d*/)[0]) : 0;

        // 计算最终总价
        const grandTotal = total + deliveryFee;

        // 更新显示
        document.getElementById('totalAmount').textContent = grandTotal.toFixed(2);
    };

    // 事件监听
    document.querySelectorAll('.quantity-select').forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    calculateTotal(); // 初始计算
});