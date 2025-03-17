$(document).ready(function () {
    $(".back-button").click(function () {
        let orderId = $(this).data("order-id");  // 获取订单ID
        $.ajax({
            url: "/update-order-status/",  // 你的后端API接口
            type: "POST",
            data: {
                order_id: orderId,
                status: "P",
                csrfmiddlewaretoken: "{{ csrf_token }}"
            },
            success: function (response) {
                if (response.success) {
                    alert("Order status updated to Preparing!");
                    window.location.href = "/merchant/orders/{{ restaurant_id }}";  // 返回订单页面
                } else {
                    alert("Failed to update order status.");
                }
            },
            error: function () {
                alert("Error occurred while updating order status.");
            }
        });
    });
});

