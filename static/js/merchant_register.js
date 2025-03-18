document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

// CSRF Token get function
function getCSRFToken() {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken='));
    return cookie ? cookie.split('=')[1] : null;
}

// Submit Handler Functions
async function handleSubmit(e) {
    e.preventDefault();

    // Get form fields
    const formData = {
        name: document.getElementById('InputName').value,
        latitude: parseFloat(document.getElementById('InputLoc1').value),  // convert to floating point
        longitude: parseFloat(document.getElementById('InputLoc2').value),
        minimum_order: parseFloat(document.getElementById('Minimum').value),
        category: document.getElementById('category').value, // Getting Categorical Selection Values
        username: document.getElementById('InputUser').value,
        password: document.getElementById('exampleInputPassword1').value
    };

    // categorical value mapping
    const categoryMapping = {
        'Fast Food': 'fastFood',
        'Chinese Food': 'chineseFood',
        'Sushi': 'sushi',
        'Drink And Coffee': 'drinkAndCoffee',
        'Groceries': 'groceries'
    };
    formData.category = categoryMapping[formData.category];  // transform categorical value

    try {
        const response = await fetch('/register/merchant/', {  // Note the interface address
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Merchant registration successful!');
            window.location.href = '/login';  // Jump to login page
        } else {
            if (result.errors) {
                let errorMessages = Object.entries(result.errors)
                    .map(([field, msg]) => `${field}: ${msg}`)
                    .join('\n');
                alert('Fail to register\n:\n' + errorMessages);
            } else {
                alert('Fail to register\n: ' + (result.error || 'Unknow error'));
            }
        }
    } catch (error) {
        alert('Network Error: ' + error.message);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const accountBox = document.querySelector(".account");

    // Flip to on page load
    setTimeout(() => {
        accountBox.classList.add("show");
    }, 300);
});