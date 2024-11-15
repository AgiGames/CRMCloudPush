import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegNumber } from './regNumberContext';

function LoginPage() {
  const { regNumber, setRegNumber } = useRegNumber();
  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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
        setRegNumber(formData.regNumber);
        navigate(data.redirectUrl);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Unexpected Error');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.panel}>
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
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isButtonHovered ? styles.buttonHover : {})
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
}

// Updated styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e0f7ff',
    transition: 'background-color 0.5s ease',
  },
  header: {
    fontSize: '28px',
    color: '#0077cc',
    marginBottom: '20px',
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'color 0.3s ease',
  },
  panel: {
    marginTop: '20px',
    border: '1px solid #ccc',
    padding: '20px',
    width: '320px', // Adjusted width to match input field width
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.5s ease',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%', // Ensures input takes up full width of form group
    boxSizing: 'border-box', // Prevents overflow due to padding
    border: '2px solid #0077cc',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: '2px solid #d4af37',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%', // Ensures the button spans the width of the panel
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#d4af37',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default LoginPage;
