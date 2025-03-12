# Full-Stack Authentication and CRUD Application

This project is a **Full-Stack Developer Technical Task** for a home assignment, including both server (Node.js & MySQL) and client (React) implementations. It covers user authentication, CRUD operations, and secure handling of JWT tokens.

## 📌 Features
### **Server (Node.js & MySQL)**
- MySQL database setup with a `users` table
- Secure user authentication with JWT
- CRUD operations for users (protected with JWT)
- Password hashing for security
- HTTP-only cookie for authentication

### **Client (React)**
- User registration and login forms
- Authentication using JWT tokens
- Displaying a list of users (protected route)
- User logoff functionality

---

## 🛠 Setup & Installation
### **Prerequisites**
- Node.js & npm
- MySQL
- Docker (Recommended for containerization)

### **Running with Docker (Recommended)**
1. Ensure Docker is installed and running.
2. Navigate to the project root and run:
   ```sh
   docker-compose up --build
   ```
3. Access the client at `http://localhost:3000` and server at `http://localhost:5000`.

### **Running Without Docker**
If running locally without Docker but using MySQL in Docker, follow these steps:
1. Ensure Docker is installed and running.
2. Start the MySQL container using:
   ```sh
   npm run db:up
   ```
   (Make sure to configure the `.env` file in the server package according to the database settings. You can find an example configuration in `server/package.json` under `db:up`.)

### **Server Setup**
1. Navigate to the server folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=userdb
   JWT_SECRET=your_secret_key
   ```
4. Run the server:
   ```sh
   npm run dev
   ```

### **Client Setup**
1. Navigate to the client folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

---

## 📌 API Endpoints
### **Authentication Routes**
- `POST /api/register` → Register a new user (No authentication required)
- `POST /api/login` → Authenticate user and set JWT cookie
- `POST /api/logout` → Clear authentication cookie

### **User Routes (Protected with JWT)**
- `GET /api/users` → Get a list of users
- `POST /api/users` → Create a new user
- `PUT /api/users/:id` → Update user details
- `DELETE /api/users/:id` → Delete a user

---

## 🖥 Client Features
- **User Registration:** Form for new users to sign up.
- **User Login:** Form for authentication.
- **User Logoff:** Logout button to clear JWT.
- **User List:** Protected page that displays all registered users.

---

## 🔐 Security Measures
- **Password Hashing**: Uses bcrypt to hash passwords before storing them.
- **JWT Authentication**: Uses HTTP-only cookies for secure authentication.
- **Protected Routes**: Ensures only authenticated users can access protected API endpoints.

---



