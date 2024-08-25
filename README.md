# OAuth Authentication with Google

## Overview

This project demonstrates OAuth authentication with Google using Node.js and Express.js. Users can log in using their Google accounts, and the application handles the OAuth flow to authenticate users and manage sessions.

## Technologies

- **Backend:** Node.js, Express.js
- **Authentication:** OAuth with Google
- **Database:** Monogo DB

## Getting Started

### Prerequisites

- Node.js and npm installed
- Google OAuth credentials (Client ID and Secret)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://https://github.com/vaishnaviparabkar90/OAuth_Demo.git
   cd oauth-google-auth

2.**Create a .env file in the root directory and add the following:**

env
 ```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-session-secret
