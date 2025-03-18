$(document).ready(function () {
    $(".back-button").click(function () {
        let orderId = $(this).data("order-id");  // 获取订单ID
        $.ajax({
            url: "/update-order-status/",  // 你的后端API接口
            type: "POST",
            data: {
                order_id: orderId,
                status: "C",
                csrfmiddlewaretoken: "{{ csrf_token }}"
            },
            success: function (response) {
                if (response.success) {
                    alert("Order status updated!");
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

document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.list-group-item');
  items.forEach((item, index) => {
    // 例如，每个列表项延迟 100ms * index 后触发动画
    setTimeout(function() {
      item.classList.add('slide-in');
    }, index * 100);
  });
});

