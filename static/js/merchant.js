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

    // **订单确认按钮，收集 item ID 和 数量**
    document.querySelector(".pay-button").addEventListener("click", function(e) {
        e.preventDefault();

        const restaurantId = document.querySelector('.panel-heading').dataset.restaurantId;
        if (!restaurantId) {
            alert('Invalid restaurant selection');
            return;
        }

        let selectedItems = [];
        quantitySelects.forEach(select => {
            let quantity = parseInt(select.value);
            if (quantity > 0) {  // 只提交数量 > 0 的商品
                let itemId = select.closest('.thumbnail').dataset.itemId; // 获取 item ID
                selectedItems.push({ id: itemId, quantity: quantity });
            }
        });

        if (selectedItems.length === 0) {
            alert("Please select at least one item.");
            return;
        }

        console.log("Selected Items Data:", selectedItems);

        // **构造 URL 参数**
        let params = new URLSearchParams();
        params.append("restaurant_id", restaurantId);
        console.log(restaurantId);
        selectedItems.forEach(item => {
            params.append("items", `${item.id}:${item.quantity}`);  // 以 "id:数量" 方式传递
        });

        const targetUrl = `/confirm?${params.toString()}`;
        console.log("Redirecting to:", targetUrl);

        // **跳转到确认页面，并附带选中的商品数据**
        window.location.href = `/confirm?${params.toString()}`;
    });

    // **初始化计算**
    calculateTotal();
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all product modules
    const thumbnails = document.querySelectorAll('.thumbnail.equal-height');

    // Animation parameter configuration
    const config = {
        baseDelay: 0,
        stagger: 0.15,
    };

    thumbnails.forEach((thumbnail, index) => {
        // Calculate time
        const delay = config.baseDelay + (index * config.stagger);

        thumbnail.style.animationDelay = `${delay}s`;
        thumbnail.classList.add('thumbnail-animation');

        // Animation end processing
        thumbnail.addEventListener('animationend', () => {
            thumbnail.style.opacity = '1';
            thumbnail.classList.remove('thumbnail-animation');
        });
    });

});