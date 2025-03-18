document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addressForm');
    const preserveParams = document.getElementById('preserveParams').value;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(`${window.location.pathname}?${preserveParams}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                tel: document.getElementById('tel').value,
                address: document.getElementById('address').value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function getCSRFToken() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1] || '';
    }
});