// getAdminRegistrationNumber.mjs
async function getAdminRegistrationNumber(regNumber) {
    const formData = new URLSearchParams();
    formData.append('registrationNumber', regNumber);
  
    try {
      const response = await fetch('http://localhost:3001/api/user-authenticator/get-admin-registration-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData, // Use formData directly
      });
  
      if (response.ok) {
        const adminRegistrationNumber = await response.text();
        console.log('Fetched admin registration number:', adminRegistrationNumber);
        return adminRegistrationNumber;
      } else {
        console.error('Error fetching admin registration number:', response.statusText);
        return ''; // Return empty string on error
      }
    } catch (error) {
      console.error('Error:', error);
      return ''; // Return empty string on error
    }
  }
  
  export default getAdminRegistrationNumber;
  