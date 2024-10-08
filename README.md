# CRMCloudPush

This repository contains the front-end and back-end server for a CRM (Customer Relationship Management) application hosted on AWS.

## Project Overview
CRMCloudPush integrates cloud services to streamline CRM operations. It features a React-based front-end, a Node.js back-end, and configurations for AWS deployment.

## Features
- **User Authentication**: Secure login and session management.
- **Cloud Integration**: Uses AWS services for data storage and processing.
- **Admin Dashboard**: Manage users and data from a centralized location.

## Technologies Used
- **Front-End**: React, HTML, CSS
- **Back-End**: Node.js, SpringBoot
- **Cloud**: AWS (EC2)

## Setup Instructions

1. **Install Java 21 Amazon Corretto**:  
   Run the following command to install Java:
   ```bash
   sudo yum install java-21-amazon-corretto-devel
   ```
   
2. **Install React**:  
   Navigate to the React project directory and install dependencies:
   ```bash
   cd reactApp/react-login
   npm install
   ```
   
3. **Install Node**: 
   curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
   sudo yum install -y nodejs

4. **Start the frontend Server**:  
   Run the following command to start the Node.js server:
   ```bash
   node loginApp.js
   ```
   
5. **Start the backend Server**:  
   Run the following command to start the spring-boot server:
   ```bash
   java -jar demo-0.0.1-SNAPSHOT.jar
   ```
## Screenshots

### AWS Linux Terminal
![AWS Linux Terminal](https://github.com/madddx/CRMCloudPush/blob/bc0a0eb99a92ccab2dc9bada30bd97ba2239453c/AWS%20Linus%20Terminal.png)

### Admin Dashboard
![Admin Dashboard](Admin%20Dashboard.png)

### Landing Page
![Landing Page](Landing%20Page.png)

## License
This project is licensed under the MIT License.

---
