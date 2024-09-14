fetch('http://localhost:8080/api/user-authenticator/get-registration-number', {
    method: 'GET'
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));