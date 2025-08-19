const url = 'http://localhost:5000/api/users/register';
document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userName = document.getElementById('userName').value;
   
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;
    console.log(userName);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, email, fullName, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('message').textContent = 'User registered!';
            document.getElementById('message').style.color = 'green';
        } else {
            document.getElementById('message').textContent = data.message || 'Login failed!';
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('message').textContent = 'An error occurred!';
        document.getElementById('message').style.color = 'red';
    }
});