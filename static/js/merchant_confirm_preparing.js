$(document).ready(function () {
    $(".back-button").click(function () {
        let orderId = $(this).data("order-id");  // Get order ID
        $.ajax({
            url: "/update-order-status/",
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
    // For example, the animation is triggered after a delay of 100ms * index for each list item.
    setTimeout(function() {
      item.classList.add('slide-in');
    }, index * 100);
  });
});

