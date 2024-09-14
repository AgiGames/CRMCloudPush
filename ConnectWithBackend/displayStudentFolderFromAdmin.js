const formData = new URLSearchParams();
formData.append('adminName', 'agi');
formData.append('adminRegistrationNumber', 'RA01');
formData.append('nameOfStudent', 'Madhesh');
formData.append('registrationNumberOfStudent', 'RA39');

fetch('http://localhost:8080/api/data-visualization/display-student-folder-from-admin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));