import React, { useState } from 'react';
import { useRegNumber } from './regNumberContext';
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
    margin: '10px',import React, { useState } from 'react';
import { useRegNumber } from './regNumberContext';
import getUsername from './getUsername.mjs';

// Inline styles (optional, for quick styling)
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
  button: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: '2px solid #d4af37',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#d4af37',
    color: '#fff',
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
    padding: '15px',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 0.5s ease',
  },
  input: {
    padding: '10px',
    margin: '5px',
    fontSize: '16px',
    width: '200px',
    border: '2px solid #0077cc',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease',
  },
  listItemButton: {
    background: 'none',
    border: 'none',
    color: '#0077cc',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
  },
  listItemButtonHover: {
    color: '#d4af37',
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
  const [buttonHover, setButtonHover] = useState(null);
  const [isViewingStudents, setIsViewingStudents] = useState(false);

  const getAdminUsername = async () => {
    try {
      const adminUsername = await getUsername(regNumber);
      return adminUsername;
    } catch (error) {
      console.error('Error fetching admin username:', error);
      return '';
    }
  };

  const handleViewStudents = async () => {
    const adminName = await getAdminUsername();

    const formData = new FormData();
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/data-visualization/display-students', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStudentFolders(data);
        setShowPanel(true);
        setShowDirectoryForm(false);
        setIsViewingStudents(true);
      } else {
        alert('Failed to fetch student directories');
      }
    } catch (error) {
      console.error('Error fetching student directories:', error);
      alert('An error occurred while fetching student directories.');
    }
  };

  const handleViewStudentDirectory = () => {
    setShowDirectoryForm(true);
    setShowRemovalForm(false);
    setShowPanel(false);
    setIsViewingStudents(false);
  };

  const handleSubmitViewDirectory = async () => {
    const adminName = await getAdminUsername();

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/data-visualization/display-student-folder-from-admin', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStudentFolders(data);
        setShowPanel(true);
        setShowDirectoryForm(false);
        setIsViewingStudents(false);
      } else {
        alert('Failed to fetch student directory');
      }
    } catch (error) {
      console.error('Error fetching student directory:', error);
      alert('An error occurred while fetching student directory.');
    }
  };

  const handleRegisterStudent = () => {
    setShowRegistrationForm(true);
    setShowRemovalForm(false);
    setShowDirectoryForm(false);
    setShowPanel(true);
  };

  const handleSubmitRegistration = async () => {
    const adminName = await getAdminUsername();

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('password', password);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/user-inputs/register-student', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Student registered successfully');
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

  const handleRemoveStudent = () => {
    setShowRemovalForm(true);
    setShowRegistrationForm(false);
    setShowDirectoryForm(false);
    setShowPanel(true);
  };

  const handleSubmitRemoval = async () => {
    const adminName = await getAdminUsername();

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://localhost:3001/api/user-inputs/remove-student', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Student removed successfully');
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

  const handleFileClick = async (fileName) => {
    const adminName = await getAdminUsername();

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);
    formData.append('fileName', fileName);

    try {
      const response = await fetch('http://localhost:3001/api/user-inputs/get-file-from-directory', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
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
      alert("An error occurred while downloading the file.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      <button
        style={{ ...styles.button, ...(buttonHover === 'viewStudents' && styles.buttonHover) }}
        onClick={handleViewStudents}
        onMouseEnter={() => setButtonHover('viewStudents')}
        onMouseLeave={() => setButtonHover(null)}
      >
        View Students
      </button>
      <button
        style={{ ...styles.button, ...(buttonHover === 'viewStudentDirectory' && styles.buttonHover) }}
        onClick={handleViewStudentDirectory}
        onMouseEnter={() => setButtonHover('viewStudentDirectory')}
        onMouseLeave={() => setButtonHover(null)}
      >
        View Specific Student Directory
      </button>
      <button
        style={{ ...styles.button, ...(buttonHover === 'registerStudent' && styles.buttonHover) }}
        onClick={handleRegisterStudent}
        onMouseEnter={() => setButtonHover('registerStudent')}
        onMouseLeave={() => setButtonHover(null)}
      >
        Register Student
      </button>
      <button
        style={{ ...styles.button, ...(buttonHover === 'removeStudent' && styles.buttonHover) }}
        onClick={handleRemoveStudent}
        onMouseEnter={() => setButtonHover('removeStudent')}
        onMouseLeave={() => setButtonHover(null)}
      >
        Remove Student
      </button>
      {showPanel && (
        <div style={styles.panel}>
          {isViewingStudents ? (
            <ul>
              {studentFolders.map((folder, index) => (
                <li key={index}>
                  {folder}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {studentFolders.map((file, index) => (
                <li key={index}>
                  <button
                    style={{
                      ...styles.listItemButton,
                      ...(buttonHover === index && styles.listItemButtonHover),
                    }}
                    onClick={() => handleFileClick(file)}
                    onMouseEnter={() => setButtonHover(index)}
                    onMouseLeave={() => setButtonHover(null)}
                  >
                    {file}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {showDirectoryForm && (
        <div style={styles.panel}>
          <h2>View Student Directory</h2>
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
          <button style={styles.button} onClick={handleSubmitViewDirectory}>Submit</button>
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
          <button style={styles.button} onClick={handleSubmitRegistration}>Submit</button>
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
          <button style={styles.button} onClick={handleSubmitRemoval}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

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
  const { regNumber } = useRegNumber(); // Ensure regNumber context is properly accessed
  const [studentFolders, setStudentFolders] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [showDirectoryForm, setShowDirectoryForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showRemovalForm, setShowRemovalForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentRegNumber, setStudentRegNumber] = useState('');
  const [password, setPassword] = useState('');

  // Function to fetch the admin username
  const getAdminUsername = async () => {
    try {
      const adminUsername = await getUsername(regNumber);
      return adminUsername;
    } catch (error) {
      console.error('Error fetching admin username:', error);
      return '';
    }
  };

  // View Students and fetch directory names
  const handleViewStudents = async () => {
    const adminName = await getAdminUsername(); // Use async properly

    const formData = new FormData();
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://34.238.85.84:3001/api/data-visualization/display-students', {
        method: 'POST',
        body: formData,
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
    const adminName = await getAdminUsername(); // Use async properly

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://34.238.85.84:3001/api/data-visualization/display-student-folder-from-admin', {
        method: 'POST',
        body: formData,
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
    const adminName = await getAdminUsername(); // Use async properly

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('password', password);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://34.238.85.84:3001/api/user-inputs/register-student', {
        method: 'POST',
        body: formData,
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
    const adminName = await getAdminUsername(); // Use async properly

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);

    try {
      const response = await fetch('http://34.238.85.84:3001/api/user-inputs/remove-student', {
        method: 'POST',
        body: formData,
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
    const adminName = await getAdminUsername(); // Use async properly

    const formData = new FormData();
    formData.append('nameOfStudent', studentName);
    formData.append('registrationNumberOfStudent', studentRegNumber);
    formData.append('adminName', adminName);
    formData.append('adminRegistrationNumber', regNumber);
    formData.append('fileName', fileName);

    try {
      const response = await fetch('http://34.238.85.84:3001/api/user-inputs/get-file-from-directory', {
        method: 'POST',
        body: formData,
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

      {showRegistrationForm && (
        <div style={styles.panel}>
          <h2>Register New Student</h2>
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
    </div>
  );
}

export default AdminDashboard;
