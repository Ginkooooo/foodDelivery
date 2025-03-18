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

    // Order Acknowledgement button to collect item ID and quantity
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
            if (quantity > 0) {  // Submit only items with quantity > 0
                let itemId = select.closest('.thumbnail').dataset.itemId; // Get item ID
                selectedItems.push({ id: itemId, quantity: quantity });
            }
        });

        if (selectedItems.length === 0) {
            alert("Please select at least one item.");
            return;
        }


        // Constructed URL parameters
        let params = new URLSearchParams();
        params.append("restaurant_id", restaurantId);
        selectedItems.forEach(item => {
            params.append("items", `${item.id}:${item.quantity}`);  // Passed as “id:number”
        });

        const targetUrl = `/confirm?${params.toString()}`;

        // Jumps to a confirmation page with data on the selected product
        window.location.href = `/confirm?${params.toString()}`;
    });

    // Initialization calculations
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