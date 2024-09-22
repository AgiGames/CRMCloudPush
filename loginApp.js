const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

function capitalize(str) {
  if (!str) return ''; // handle empty string or null
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// middleware to parse JSON bodies
app.use(express.json()); 

// serve static files from the React app
app.use(express.static(path.join(__dirname, "reactApp/react-login/build")));

let username = "";
let registrationNumber = "";
// route to handle POST requests from the login react app
app.post('/login', async (req, res) => {
  const { name, regNumber, password } = req.body;
  const formData = new URLSearchParams();
  formData.append('username', name);
  formData.append('registrationNumber', regNumber);
  formData.append('password', password);

  username = name;
  registrationNumber = regNumber;

  const response = await fetch('http://localhost:443/api/user-authenticator/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "https://www.example.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: formData.toString()
  });

  const data = await response.json();
  console.log(data);

  if (data == 0) {
    res.json({ status: 'error', message: 'Bad Credentials' });
  } else if (data == 1) {
    res.json({ status: 'success', redirectUrl: '/user' });
  } else {
    res.json({ status: 'success', redirectUrl: '/admin' });
  }
});

// catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "reactApp/react-login/build", 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});