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
    }

    calculateTotal(); // 页面加载时计算一次
});