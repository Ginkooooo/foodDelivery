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

    // **点击"Confirm and Pay"按钮时检查最低订单金额**
    document.querySelector(".pay-button").addEventListener("click", function (event) {
        event.preventDefault(); // 阻止默认跳转
        let totalAmount = calculateTotal(); // 获取当前总价

        if (totalAmount < minOrderPrice) {
            alert("Price below minimum order price!"); // 价格不足，弹出警告
        } else {
            window.location.href = "/pay"; // 价格满足，跳转支付
        }
    });

    calculateTotal(); // 页面加载时计算一次
});