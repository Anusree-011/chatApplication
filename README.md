# Chat Application

A real-time chat application built with React frontend and Node.js backend, containerized with Docker.

## Features

- User registration and authentication
- Real-time messaging
- User list and chat interface
- Responsive design with Tailwind CSS
- Docker containerization

## Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system

### Running with Docker

1. Clone the repository and navigate to the project directory:
   ```bash
   cd chatApplication
   ```

2. Build and start all services:
   ```bash
   docker-compose up --build
   ```

3. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

### Running without Docker

#### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/chatapp
   PORT=3000
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd client/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Messages
- `POST /api/message/send/:id` - Send message to user
- `GET /api/message/:id` - Get messages with user

### Users
- `GET /api/user/currentchatters` - Get all users for chat

## Docker Commands

- Start services: `docker-compose up`
- Start in background: `docker-compose up -d`
- Rebuild and start: `docker-compose up --build`
- Stop services: `docker-compose down`
- View logs: `docker-compose logs`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://admin:password@mongodb:27017/chatapp?authSource=admin
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

## Usage

1. Open http://localhost:5173 in your browser
2. Register a new account or login with existing credentials
3. Select a user from the sidebar to start chatting
4. Type messages and press Send or Enter to send

## Development

- Frontend runs on port 5173 with hot reload
- Backend runs on port 3000 with nodemon
- MongoDB runs on port 27017

## Troubleshooting

- If containers fail to start, ensure ports 3000, 5173, and 27017 are not in use
- Check Docker logs: `docker-compose logs [service-name]`
- Rebuild containers if needed: `docker-compose up --build --force-recreate`