User Management System

## Project Overview:
The User Management System is a web application designed to manage user data and visualize relationships between users and their hobbies. The system provides functionality to create, edit, and delete users, with a user-friendly interface to manage hobbies. The application consists of two main components:

- Backend (API): Built using Node.js, Express, and TypeScript. Provides endpoints to handle CRUD operations for users and hobbies, as well as error handling and configuration via environment variables.
- Frontend: Built with React, TypeScript, and `react-flow` library. Displays a visualization of users as nodes with draggable hobbies, and allows users to be created, edited, and deleted.

##Features:
- Main Visualization Area: Visualizes users as nodes, each with their username, age, and connected hobbies.
- Sidebar: Allows users to drag and drop hobbies onto the user nodes.
- User Management: Form to create/edit users with validation, success/error notifications, and deletion confirmation dialogs.
- State Management: Manages users and hobbies using React state and ensures synchronization with the backend.

## Installation Instructions
Follow these steps to set up and run the project locally.

### 1. Clone the Repository

Clone the repository to your local machine:

```git clone <repository-url>
cd <project-directory>

###2. Install Dependencies
Install the necessary dependencies for both the frontend and backend.

For Frontend:
Navigate to the frontend folder:

```cd frontend
npm install```

For Backend:
Navigate to the backend folder:
cd backend
npm install

###3. Set Up Environment Variables
Create a .env file in both the frontend and backend directories (if not already present) based on the .env.example file.

For example:

Backend .env:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=mysecretkey

Frontend .env:
VITE_API_URL=http://localhost:5000/api

4. Run the Development Server
For Frontend:
Start the frontend development server:
cd frontend
npm run dev

For Backend:
Start the backend server:
cd backend
npm run dev
The backend will run on http://localhost:5000 by default.
