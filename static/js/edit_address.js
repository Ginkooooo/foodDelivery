document.getElementById('addressForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get address ID
    const form = e.target;
    const addressId = form.dataset.addressId;

    const formData = {
        name: document.getElementById('name').value,
        tel: document.getElementById('tel').value,
        address: document.getElementById('address').value
    };

    try {
        // Using Dynamic Addresses ID
        const response = await fetch(`/address/editcon/${addressId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = '/address/';  // Directly jump
        } else {
            alert('Error: ' + (result.error || 'Failed to update address'));
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
});