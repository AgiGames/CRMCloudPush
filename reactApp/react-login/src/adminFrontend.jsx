import React, { useState } from 'react';
import { useRegNumber } from './regNumberContext';
import getAdminUsername from './getAdminName.mjs';
import getAdminRegistrationNumber from './getAdminRegistrationNumber.mjs';
import getUsername from './getUsername.mjs';

// Inline styles (optional, for quick styling)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  panel: {
    marginTop: '20px',
    border: '1px solid #ccc',
    padding: '10px',
    width: '80%',
  },
  input: {
    padding: '10px',
    margin: '5px',
    fontSize: '16px',
    width: '200px',
  },
};

// Functional Component
function AdminDashboard() {
  const { regNumber } = useRegNumber();
  const [studentFolders, setStudentFolders] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [showDirectoryForm, setShowDirectoryForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showRemovalForm, setShowRemovalForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentRegNumber, setStudentRegNumber] = useState('');
  const [password, setPassword] = useState('');

  // View Students and fetch directory names
  const handleViewStudents = async () => {
    const formData = new FormData();
    formData.append('adminName', await getUsername(regNumber));
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/data-visualization/display-students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        const data = await response.json(); // Expecting a string array in the response
        setStudentFolders(data);
        setShowPanel(true);
        setShowDirectoryForm(false);
      } else {
        alert('Failed to fetch student directories');
      }
    } catch (error) {
      console.error('Error fetching student directories:', error);
      alert('An error occurred while fetching student directories.');
    }
  };

  // Show form for entering student details
  const handleViewStudentDirectory = () => {
    setShowDirectoryForm(true);
    setShowRemovalForm(false);
    setShowPanel(false);  // Hide panel when showing the form
  };

  // Fetch student directory
  const handleSubmitViewDirectory = async () => {
    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', await getUsername(regNumber));
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/data-visualization/display-student-folder-from-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        const data = await response.json(); // Expecting a string array in the response
        setStudentFolders(data);
        setShowPanel(true);  // Show the panel with the results
        setShowDirectoryForm(false);  // Hide the form after submitting
      } else {
        alert('Failed to fetch student directory');
      }
    } catch (error) {
      console.error('Error fetching student directory:', error);
      alert('An error occurred while fetching student directory.');
    }
  };

  // Register Student functionality
  const handleRegisterStudent = () => {
    setShowRegistrationForm(true);
    setShowRemovalForm(false);
    setShowDirectoryForm(false);
    setShowPanel(false);
  };

  const handleSubmitRegistration = async () => {
    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('password', password);
    formData.append('adminName', await getUsername(regNumber));
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/user-inputs/register-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        alert('Student registered successfully');
        // Clear the form
        setStudentName('');
        setStudentRegNumber('');
        setPassword('');
        setShowRegistrationForm(false);
      } else {
        alert('Failed to register student');
      }
    } catch (error) {
      console.error('Error registering student:', error);
      alert('An error occurred while registering the student.');
    }
  };

  // Remove Student functionality
  const handleRemoveStudent = () => {
    setShowRemovalForm(true);
    setShowRegistrationForm(false);
    setShowDirectoryForm(false);
    setShowPanel(false);
  };

  const handleSubmitRemoval = async () => {
    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', await getUsername(regNumber));
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/user-inputs/remove-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        alert('Student removed successfully');
        // Clear the form
        setStudentName('');
        setStudentRegNumber('');
        setShowRemovalForm(false);
      } else {
        alert('Failed to remove student');
      }
    } catch (error) {
      console.error('Error removing student:', error);
      alert('An error occurred while removing the student.');
    }
  };

  // Handle file download
  const handleFileClick = async (fileName) => {
    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', await getUsername(regNumber));
    formData.append('adminRegistrationNumber', regNumber);
    formData.append('fileName', fileName);

    try {
      const response = await fetch('http://localhost:3001/api/user-inputs/get-file-from-directory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        // Create a URL for the file and trigger a download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        alert("Downloaded file successfully!");
      } else {
        alert("Failed to download file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("An error occurred while downloading file.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>

      <button style={styles.button} onClick={handleViewStudents}>
        View Students
      </button>

      <button style={styles.button} onClick={handleRegisterStudent}>
        Register Student
      </button>

      <button style={styles.button} onClick={handleRemoveStudent}>
        Remove Student
      </button>

      <button style={styles.button} onClick={handleViewStudentDirectory}>
        View Student Directory
      </button>

      {showDirectoryForm && (
        <div style={styles.panel}>
          <h2>Enter Student Details To View Their Directory</h2>
          <input
            style={styles.input}
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Student Registration Number"
            value={studentRegNumber}
            onChange={(e) => setStudentRegNumber(e.target.value)}
          />
          <button style={styles.button} onClick={handleSubmitViewDirectory}>
            View Directory
          </button>
        </div>
      )}

      {showPanel && (
        <div style={styles.panel}>
          <h2>Files in {studentName}-{studentRegNumber}'s Directory:</h2>
          <ul>
            {studentFolders.map((fileName, index) => (
              <li key={index}>
                <button
                  style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                  onClick={() => handleFileClick(fileName)}
                >
                  {fileName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showRegistrationForm && (
        <div style={styles.panel}>
          <h2>Register Student</h2>
          <input
            style={styles.input}
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Student Registration Number"
            value={studentRegNumber}
            onChange={(e) => setStudentRegNumber(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} onClick={handleSubmitRegistration}>
            Register Student
          </button>
        </div>
      )}

      {showRemovalForm && (
        <div style={styles.panel}>
          <h2>Remove Student</h2>
          <input
            style={styles.input}
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Student Registration Number"
            value={studentRegNumber}
            onChange={(e) => setStudentRegNumber(e.target.value)}
          />
          <button style={styles.button} onClick={handleSubmitRemoval}>
            Remove Student
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
