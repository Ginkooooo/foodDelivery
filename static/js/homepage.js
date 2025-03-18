
document.addEventListener('DOMContentLoaded', function() {
    // Calculate Distribution Distance
    document.querySelectorAll('.delivery-distance').forEach(span => {
        // Get restaurant coordinates (use parseFloat conversion and handle invalid values)
        const lat = parseFloat(span.dataset.latitude) || 0;
        const lng = parseFloat(span.dataset.longitude) || 0;
        
        // User fixed coordinates
        const userLat = 0;
        const userLng = 0;
        
        // Calculate the Euclidean distanceCalculate the Euclidean distance
        const distance = (Math.sqrt(
            Math.pow(lat - userLat, 2) + 
            Math.pow(lng - userLng, 2)
        ))/50;
        
        // Display results (retain two decimals, add units)
        span.textContent = `${distance.toFixed(2)} km`;
        span.dataset.distance = distance.toFixed(2);

    });

    document.querySelectorAll('.delivery-time').forEach(span => {

        const distanceSpan = span.closest('.thumbnail').querySelector('.delivery-distance');
        const distance = parseFloat(distanceSpan.dataset.distance) || 0;  // Fetch value from data

        const time = distance * 25;

        span.textContent = `${time.toFixed(0)} min`;

    });

    document.querySelectorAll('.heart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
        });
    });
});