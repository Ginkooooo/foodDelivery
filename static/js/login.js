document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.btn-group-justified .btn');
    let userType = "user"; // default login type

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            userType = button.innerText.toLowerCase();
        });
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        handleLogin(event, userType); // Pass the login type
    });
})

async function handleLogin(event, userType) {

    const form = event.target;
    const formData = {
        username: form.elements.username.value,
        password: form.elements.password.value,
        user_type: userType
    };

    try {
        const response = await fetch('/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()  // take Token
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Unexpected response: ${text.slice(0, 100)}`);
        }

        const result = await response.json();

        if (response.ok && result.success) {
            // Jump based on the redirect field returned by the backend
            window.location.href = result.redirect || '/home';
        } else {
            alert(result.error || "Login failed");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || null;
}

document.addEventListener("DOMContentLoaded", function () {
    const accountBox = document.querySelector(".account");

    // Trigger rollover entry on page load
    setTimeout(() => {
        accountBox.classList.add("show");
    }, 200);

    // Listen to the “Create an account” button click event.
    const flipLink = document.querySelector(".flip-trigger");

    if (flipLink) {
        flipLink.addEventListener("click", function (event) {
            event.preventDefault(); // Block Immediate Jump
            const targetUrl = this.href; // Get destination address

            // Add flip away animation
            accountBox.classList.add("flip");

            // Jump after 0.8s of animation execution
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    }
});
