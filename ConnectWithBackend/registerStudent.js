const formData = new URLSearchParams();
formData.append('nameOfStudent', 'Madhesh');
formData.append('registrationNumberOfStudent', 'RA39');
formData.append('password', '123');
formData.append('adminName', 'agi');
formData.append('adminRegistrationNumber', 'RA01')

fetch('http://localhost:8080/api/user-inputs/register-student', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));