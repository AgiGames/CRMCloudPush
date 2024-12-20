// getUsername.mjs
async function getUsername(regNumber) {
    const formData = new URLSearchParams();
    formData.append('registrationNumber', regNumber);
  
    try {
      const response = await fetch('http://localhost:3001/api/user-authenticator/get-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData, // Directly use formData instead of converting it to a string
      });
  
      if (response.ok) {
        const username = await response.text();
        console.log('Fetched username:', username);
        return username;
      } else {
        console.error('Error fetching username:', response.statusText);
        return ''; // Return empty string on error
      }
    } catch (error) {
      console.error('Error:', error);
      return ''; // Return empty string on error
    }
  }
  
  export default getUsername;
  