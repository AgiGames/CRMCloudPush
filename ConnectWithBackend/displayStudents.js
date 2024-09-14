const formData = new URLSearchParams();
formData.append('adminName', 'AGI');
formData.append('adminRegistrationNumber', 'RA01');

fetch('http://localhost:8080/api/data-visualization/display-students', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));