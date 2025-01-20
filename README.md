# Event Management Platform

This repository contains a full-stack event management platform, enabling users to create, manage, and view events with real-time updates and responsive design.

---

## Features

### Frontend:
1. **User Authentication**: Secure registration and login system with an option for "Guest Login."
2. **Event Dashboard**: List of upcoming and past events with filtering capabilities.
3. **Event Creation**: Form for creating events with fields like name, description, date/time, and more.
4. **Real-Time Attendee Count**: Displays the number of attendees for each event.
5. **Responsive Design**: Optimized for all devices.

### Backend:
1. **Authentication API**: Secure authentication using JWT.
2. **Event Management API**: CRUD operations with access control.
3. **Real-Time Updates**: Powered by WebSockets for live attendee updates.
4. **Database**: Efficient storage of event and user data.

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **npm or yarn**: Package manager for handling dependencies.

---

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rahulrangers/event-management-platform.git
   ```

2. Create a `.env` file in both the **eventmanagement** and **server** directories using `.env.example` as a template. Fill in the required credentials.

---

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd eventmanager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be accessible at `http://localhost:5173` (default Vite port).

---

### Running the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npx tsc
   ```

4. Start the server:
   ```bash
   cd dist
   node index.js
   ```

The server will run on the port specified in your `.env` file (default: `http://localhost:3000`).

---
## Technologies Used

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas 
- **Real-Time Communication**: Socket.IO
- **Image Hosting**: Cloudinary

---

## Deployment

- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
