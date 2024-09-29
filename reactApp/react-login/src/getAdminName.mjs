// getAdminName.mjs
async function getAdminUsername(regNumber) {
    const formData = new URLSearchParams();
    formData.append('registrationNumber', regNumber);
  
    try {
      const response = await fetch('http://ec2-34-238-85-84.compute-1.amazonaws.com:3001/api/user-authenticator/get-admin-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData // No need to convert to string explicitly
      });
  
      if (response.ok) {
        const adminUsername = await response.text();
        console.log('Fetched admin username:', adminUsername);
        return adminUsername;
      } else {
        console.error('Error fetching admin username:', response.statusText);
        return ''; // Return empty string on error
      }
    } catch (error) {
      console.error('Error:', error);
      return ''; // Return empty string on error
    }
  }
  
  export default getAdminUsername;
  