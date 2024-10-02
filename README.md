# SecureMe

> SecureMe is a robust application designed to provide secure and efficient user authentication mechanisms for web applications.

## Table of Contents

- [Author](#author)
- [Demo](#demo)
- [Requirements](#requirements)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)

## Author

[Asmaa Hamid](https://linktr.ee/asmaahamid02)

## Demo

## Requirements

- Nodejs v18.x : [Installation guide](https://nodejs.org/en/download/package-manager/current)
- MongoDB : [Installation guide](https://www.mongodb.com/docs/atlas/getting-started/)
- Google console project: [From here](https://console.cloud.google.com/projectcreate)

## Features

- User registration and login
- Password encryption
- Google login
- Session management
- Role-based access control

## Technologies

- **Backend/Frontend:** Next.js with Typescript
- **Database:** MongoDB
- **Authentication:** NextAuth
- **Styling:** TailwindCSS

## Installation

1. **Clone the repository:**

   ```bash
   #http
   git clone https://github.com/asmaahamid02/PRODIGY_FS_01.git
   #ssh
   git clone git@github.com:asmaahamid02/PRODIGY_FS_01.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Register for a MongoDB account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
     - Create a new project and set up a cluster.
   - Setup a GOOGLE project and generate client id and client secret
   - Copy the `.env.example` file and rename it to `.env.local` then update the variables:

     ```bash
     cp .env.example .env.local
     ```

4. **Run the application:**

   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`
