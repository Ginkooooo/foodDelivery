document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.btn-group-justified .btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        username: document.getElementById('exampleInputName1').value,
        password: document.getElementById('exampleInputPassword1').value
    };

    var username = document.getElementById('exampleInputName1').value;
    var password = document.getElementById('exampleInputPassword1').value;
    if (username === 'admin' && password === 'password123') {
        window.location.href = 'mainpage_operator.html';
    } else if(username === 'manager' && password === 'password123'){
        window.location.href = 'generatereport.html';
    } else {
        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    if (data.group==="customer") {
                        alert('Login successful!');
                        localStorage.setItem('username', formData.username); // Store username in localStorage
                        localStorage.setItem('verify', data.sessionId); // Store sessionId in localStorage under 'verify'
                        window.location.href = 'homepage.html'; // Redirect to mainpage.html
                    }else if(data.group==="operator") {
                        alert('Login successful!');
                        localStorage.setItem('username', formData.username); // Store username in localStorage
                        localStorage.setItem('verify', data.sessionId); // Store sessionId in localStorage under 'verify'
                        window.location.href = 'mainpage_operator.html'; // Redirect to mainpage.html
                    }else if(data.group==="manager") {
                        alert('Login successful!');
                        localStorage.setItem('username', formData.username); // Store username in localStorage
                        localStorage.setItem('verify', data.sessionId); // Store sessionId in localStorage under 'verify'
                        window.location.href = 'generatereport.html'; // Redirect to mainpage.html
                    }else {
                        alert('Login failed: ' + data.message);
                    }

                }
                else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred during login.');
            });
    }
});