import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegNumber } from './regNumberContext';

function LoginPage() {
  // Access regNumber and setRegNumber from context
  const { regNumber, setRegNumber } = useRegNumber();

  // State to store form inputs
  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    password: ''
  });

  // State to store error messages
  const [error, setError] = useState('');

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Set regNumber in context
        setRegNumber(formData.regNumber);
        // Redirect based on the server's response
        navigate(data.redirectUrl);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Unexpected Error');
    }

    console.log('Form Data:', formData);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Registration Number</label>
          <input
            type="text"
            name="regNumber"
            value={formData.regNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

// Basic inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0'
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: '300px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center'
  }
};

export default LoginPage;
