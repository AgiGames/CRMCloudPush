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
  fileContainer: {
    marginTop: '20px',
    border: '1px solid #ccc',
    padding: '10px',
  },
  fileItem: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: '5px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

function UserDashboard() {
  const { regNumber } = useRegNumber();

  const [file, setFile] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // View files in the user's directory
  const handleViewDirectory = async () => {
    try {
      const formData = new FormData();
      formData.append('adminName', await getAdminUsername(regNumber));
      formData.append('adminRegistrationNumber', await getAdminRegistrationNumber(regNumber));
      formData.append('nameOfStudent', await getUsername(regNumber));
      formData.append('registrationNumberOfStudent', regNumber);

      const response = await fetch('http://ec2-34-238-85-84.compute-1.amazonaws.com:3001/api/data-visualization/display-student-folder-from-admin', {
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

  // Upload file to user's directory
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
        const base64String = reader.result.split(',')[1]; // Get base64 string without the prefix

        const formData = new FormData();
        formData.append('nameOfStudent', username);
        formData.append('registrationNumberOfStudent', regNumber);
        formData.append('adminName', adminUsername);
        formData.append('adminRegistrationNumber', adminRegistrationNumber);
        formData.append('fileName', file.name);
        formData.append('fileContentAsString', base64String);

        const response = await fetch('http://ec2-34-238-85-84.compute-1.amazonaws.com:3001/api/user-inputs/upload-to-directory', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('File uploaded successfully');
          handleViewDirectory(); // Refresh the directory view after uploading
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

  // Download file from directory
  const handleFileClick = async (fileName) => {
    try {
      const formData = new FormData();
      formData.append('nameOfStudent', await getUsername(regNumber));
      formData.append('registrationNumberOfStudent', regNumber);
      formData.append('adminName', await getAdminUsername(regNumber));
      formData.append('adminRegistrationNumber', await getAdminRegistrationNumber(regNumber));
      formData.append('fileName', fileName);

      const response = await fetch('http://ec2-34-238-85-84.compute-1.amazonaws.com:3001/api/user-inputs/get-file-from-directory', {
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

  // Delete file from directory
  const handleDeleteFile = async (fileName) => {
    try {
      const formData = new FormData();
      formData.append('nameOfStudent', await getUsername(regNumber));
      formData.append('registrationNumberOfStudent', regNumber);
      formData.append('adminName', await getAdminUsername(regNumber));
      formData.append('adminRegistrationNumber', await getAdminRegistrationNumber(regNumber));
      formData.append('fileName', fileName);

      const response = await fetch('http://ec2-34-238-85-84.compute-1.amazonaws.com:3001/api/user-inputs/delete-file-from-directory', {
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
        {/* File input and upload button */}
        <input type="file" onChange={handleFileChange} />
        <button style={styles.button} onClick={handleUploadToDirectory}>
          Upload to Directory
        </button>

        {/* View directory button */}
        <button style={styles.button} onClick={handleViewDirectory}>
          View Your Directory
        </button>

        {/* Display file names in the directory */}
        {showPanel && (
          <div style={styles.fileContainer}>
            <h2>Files in Student Folder:</h2>
            <ul>
              {fileNames.map((fileName, index) => (
                <li key={index} style={styles.fileItem}>
                  <button
                    style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
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

export default UserDashboard;
