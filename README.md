# GoMindz Notes App

GoMindz is a full-stack application for managing notes and tasks. It provides a highly visual and organized interface with support for multiple view modes and real-time task management.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Lucide React.
- Backend: Node.js, Express.js.
- Database: MySQL (managed via mysql2).
- Security: JWT (JSON Web Tokens) for session management, bcrypt for password hashing.

## Key Features
- Authentication: User registration and login with secure session handling.
- Multiple Views: Support for Board (Kanban), Grid, Row, and List views.
- Drag and Drop: Native drag and drop functionality to update task status between To Do, In Progress, and Done.
- Organization: Search notes by title, filter by status, and sort by date or alphabetical order.
- Profile Management: Circular profile icons and initials generation for users and team members.
- Data Export: Export all notes as a JSON file.
- Responsive Design: Fully optimized for desktop and mobile screens.

## Environment Variables

Create a .env file in the backend directory with the following content:

```env
PORT=5000
DB_HOST=your_mysql_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=gomindz
JWT_SECRET=your_jwt_secret_key
```

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Note: The server will automatically create the required database tables on the first run.

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Project Structure
- /backend: Contains the Express server, API routes, database configuration, and controllers.
- /frontend: Contains the React application, components, utility functions, and styling.
- /frontend/src/components: Core UI elements like Sidebar, TopBar, and View components.
- /frontend/src/lib: Constants and helper functions used across the application.

## Database Schema
- users: id, username, password, created_at.
- notes: id, user_id, title, description, status (todo, inprogress, done), created_at, updated_at.
