// getUsername.mjs
async function getUsername(regNumber) {
    const formData = new URLSearchParams();
    formData.append('registrationNumber', regNumber);

    try {
        const response = await fetch('http://localhost:443/api/user-authenticator/get-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "https://www.example.com",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: formData.toString()
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
