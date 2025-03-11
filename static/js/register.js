document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('InputName').value,
        gender: document.getElementById('InputGender').value,
        phoneNumber: document.getElementById('InputPhonenumber').value,
        email: document.getElementById('InputEmail').value,
        password: document.getElementById('exampleInputPassword1').value
    };

    fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Registration successful!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Registration failed!');
        });
});