document.addEventListener("DOMContentLoaded", function () {
    function calculateTotal() {
        let total = 0;
        let deliveryFee = 3;  // Fixed Distribution Fee

        // Iterate over all products
        document.querySelectorAll(".list-group-item").forEach(item => {
            let priceElement = item.querySelector(".price");
            if (priceElement) {
                let text = priceElement.textContent.trim(); // e.g. "£5.99 x 2"
                let matches = text.match(/£([\d.]+) x (\d+)/);

                if (matches) {
                    let price = parseFloat(matches[1]); // Analyzing Prices
                    let quantity = parseInt(matches[2]); // Analyzing Quantities
                    total += price * quantity;  // Calculate Total price
                }
            }
        });

        total += deliveryFee; // add delivery fee
        document.getElementById("totalAmount").textContent = total.toFixed(2); // update total price

        return total; // return total price
    }

    let minOrderPrice = parseFloat(document.querySelector(".checkout-bar").dataset.minOrder);
    let restaurantId = document.querySelector(".checkout-bar").dataset.restaurantId; // Get Merchant ID
    let userId = document.querySelector(".checkout-bar").dataset.userId; // Get User ID

    // Check minimum order amount when clicking on the “Confirm and Pay” button
    document.querySelector(".pay-button").addEventListener("click", function (event) {
        event.preventDefault(); // Blocking default jumps
        let totalAmount = calculateTotal(); // Get in facing total price

        if (totalAmount < minOrderPrice) {
            alert("Price below minimum order price!"); // Insufficient price, pop-up warning
            return;
        }

        // Collecting parameters
        const restaurantId = document.querySelector(".checkout-bar").dataset.restaurantId;
        const itemsParams = Array.from(document.querySelectorAll('.list-group-item[data-product-id]'))
            .map(item => {
                const id = item.dataset.productId;
                const quantity = item.querySelector('.quantity-display').textContent.split(': ')[1];
                return `items=${encodeURIComponent(id)}%3A${encodeURIComponent(quantity)}`;
            }).join('&');

        // Jump to payment page (with all parameters)
        window.location.href = `/pay/${totalAmount.toFixed(2)}/?restaurant_id=${restaurantId}&${itemsParams}`;
    });

    calculateTotal(); // Calculated once on page load
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