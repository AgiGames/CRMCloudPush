const formData = new URLSearchParams();
formData.append('username', 'AGI');
formData.append('registrationNumber', 'RA01');
formData.append('password', '123');

fetch('http://localhost:8080/api/user-authenticator/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));