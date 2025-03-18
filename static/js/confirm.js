document.addEventListener("DOMContentLoaded", function () {
    function calculateTotal() {
        let total = 0;
        let deliveryFee = 3;  // 固定配送费

        // 遍历所有商品
        document.querySelectorAll(".list-group-item").forEach(item => {
            let priceElement = item.querySelector(".price");
            if (priceElement) {
                let text = priceElement.textContent.trim(); // 例如："£5.99 x 2"
                let matches = text.match(/£([\d.]+) x (\d+)/);

                if (matches) {
                    let price = parseFloat(matches[1]); // 解析价格
                    let quantity = parseInt(matches[2]); // 解析数量
                    total += price * quantity;  // 计算总价
                }
            }
        });

        total += deliveryFee; // 加上配送费
        document.getElementById("totalAmount").textContent = total.toFixed(2); // 更新总价

        return total; // 返回总金额
    }

    let minOrderPrice = parseFloat(document.querySelector(".checkout-bar").dataset.minOrder);
    let restaurantId = document.querySelector(".checkout-bar").dataset.restaurantId; // 获取商家 ID
    let userId = document.querySelector(".checkout-bar").dataset.userId; // 获取用户 ID

    // **点击"Confirm and Pay"按钮时检查最低订单金额**
    document.querySelector(".pay-button").addEventListener("click", function (event) {
        event.preventDefault(); // 阻止默认跳转
        let totalAmount = calculateTotal(); // 获取当前总价

        if (totalAmount < minOrderPrice) {
            alert("Price below minimum order price!"); // 价格不足，弹出警告
            return;
        }

        // 收集商品项数据
        const items = [];
        document.querySelectorAll('.list-group-item[data-product-id]').forEach(item => {
            const itemId = item.getAttribute('data-product-id');
            const quantity = parseInt(item.querySelector('.quantity-display').textContent.split(': ')[1]);
            items.push({ item_id: itemId, quantity: quantity });
        });

        // **发送 AJAX 请求到后端创建订单**
        fetch("/orders/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken()  // 获取 CSRF Token
                },
            body: JSON.stringify({
                total: totalAmount,
                restaurant_id: restaurantId,
                user_id: userId,
                items: items
            })
        })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               window.location.href = "/pay/" + totalAmount.toFixed(2);
           } else {
               alert("Order creation failed: " + data.error);
           }
       })
       .catch(error => {
           console.error("Error:", error);
           alert("An error occurred while creating the order.");
       });
    });

    function getCSRFToken() {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            document.cookie.split(';').forEach(function(cookie) {
                let trimmedCookie = cookie.trim();
                if (trimmedCookie.startsWith("csrftoken=")) {
                    cookieValue = trimmedCookie.split('=')[1];
                }
            });
        }
        return cookieValue;
    }

    calculateTotal(); // 页面加载时计算一次
});

document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.list-group-item');
  items.forEach((item, index) => {
    // 例如，每个列表项延迟 100ms * index 后触发动画
    setTimeout(function() {
      item.classList.add('slide-in');
    }, index * 100);
  });
});