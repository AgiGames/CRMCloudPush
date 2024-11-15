import React, { useState } from 'react';
import { useRegNumber } from './regNumberContext';
import getUsername from './getUsername.mjs';
import getAdminUsername from './getAdminName.mjs';
import getAdminRegistrationNumber from './getAdminRegistrationNumber.mjs';

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

function UserDashboard() {
  const { regNumber } = useRegNumber();

  const [file, setFile] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  // Separate hover states for each button
  const [uploadButtonHover, setUploadButtonHover] = useState(false);
  const [viewButtonHover, setViewButtonHover] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleViewDirectory = async () => {
    try {
      const formData = new FormData();
      formData.append('adminName', await getAdminUsername(regNumber));
      formData.append('adminRegistrationNumber', await getAdminRegistrationNumber(regNumber));
      formData.append('nameOfStudent', await getUsername(regNumber));
      formData.append('registrationNumberOfStudent', regNumber);

      const response = await fetch('http://localhost:3001/api/data-visualization/display-student-folder-from-admin', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFileNames(data);
        setShowPanel(true);
      } else {
        alert('Failed to fetch files.');
      }
    } catch (error) {
      console.error('Error occurred while fetching files:', error);
      alert('An error occurred while fetching files.');
    }
  };

  const handleUploadToDirectory = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const [username, adminUsername, adminRegistrationNumber] = await Promise.all([
        getUsername(regNumber),
        getAdminUsername(regNumber),
        getAdminRegistrationNumber(regNumber),
      ]);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1]; 

        const formData = new FormData();
        formData.append('nameOfStudent', username);
        formData.append('registrationNumberOfStudent', regNumber);
        formData.append('adminName', adminUsername);
        formData.append('adminRegistrationNumber', adminRegistrationNumber);
        formData.append('fileName', file.name);
        formData.append('fileContentAsString', base64String);

        const response = await fetch('http://localhost:3001/api/user-inputs/upload-to-directory', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('File uploaded successfully');
          handleViewDirectory();
        } else {
          alert('Failed to upload file');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  const handleFileClick = async (fileName) => {
    try {
      const formData = new FormData();
      formData.append('nameOfStudent', await getUsername(regNumber));
      formData.append('registrationNumberOfStudent', regNumber);
      formData.append('adminName', await getAdminUsername(regNumber));
      formData.append('adminRegistrationNumber', await getAdminRegistrationNumber(regNumber));
      formData.append('fileName', fileName);

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
        alert('Downloaded file successfully!');
      } else {
        alert('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('An error occurred while downloading the file.');
    }
  };

  const handleDeleteFile = async (fileName) => {
    try {
      const formData = new FormData();
      formData.append('nameOfStudent', await getUsername(regNumber));
      formData.append('registrationNumberOfStudent', regNumber);
      formData.append('adminName', await getAdminUsername(regNumber));
      formData.append('adminRegistrationNumber', await getAdminRegistrationNumber(regNumber));
      formData.append('fileName', fileName);

      const response = await fetch('http://localhost:3001/api/user-inputs/delete-file-from-directory', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File deleted successfully');
        setFileNames((prev) => prev.filter((file) => file !== fileName));
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('An error occurred while deleting the file.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Dashboard</h1>

      <div>
        <input type="file" onChange={handleFileChange} />
        
        {/* Upload button with individual hover handling */}
        <button
          style={uploadButtonHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setUploadButtonHover(true)}
          onMouseLeave={() => setUploadButtonHover(false)}
          onClick={handleUploadToDirectory}
        >
          Upload to Directory
        </button>

        {/* View directory button with individual hover handling */}
        <button
          style={viewButtonHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setViewButtonHover(true)}
          onMouseLeave={() => setViewButtonHover(false)}
          onClick={handleViewDirectory}
        >
          View Your Directory
        </button>

        {showPanel && (
          <div style={styles.panel}>
            <h2>Files in Student Folder:</h2>
            <ul>
              {fileNames.map((fileName, index) => (
                <li key={index} style={styles.fileItem}>
                  <button
                    style={styles.listItemButton}
                    onClick={() => handleFileClick(fileName)}
                  >
                    {fileName}
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteFile(fileName)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
