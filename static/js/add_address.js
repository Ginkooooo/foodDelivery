document.getElementById('addressForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        tel: document.getElementById('tel').value,
        address: document.getElementById('address').value
    };

    try {
        const response = await fetch('/address/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = result.redirect;
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
});