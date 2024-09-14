const formData = new URLSearchParams();
formData.append('directoryPath', "D:\\Education\\Java\\APP-Project-CRM\\database\\AGI-RA01\\students\\MADHESH-RA39");

fetch('http://localhost:8080/api/data-visualization/display-student-folder-from-path', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));