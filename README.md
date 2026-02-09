# WEB_Ass4 - Posts & Comments API

REST API built with Node.js, Express and MongoDB.

## Features

- User registration & login
- Password hashing (bcrypt)
- JWT authentication
- Role-based access control (admin / user)
- Posts & Comments (related via postId)
- Full CRUD operations

## Installation

1. Clone the repository
2. Install dependencies:

npm install

3. Create .env file:

PORT=3000  
MONGO_URI=mongodb://127.0.0.1:27017/assignment4  
JWT_SECRET=your_secret_key  

4. Run:

npm run dev

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Posts
- GET /api/posts
- POST /api/posts (admin only)
- PUT /api/posts/:id (admin only)
- DELETE /api/posts/:id (admin only)

### Comments
- GET /api/comments
- POST /api/comments (admin only)
- PUT /api/comments/:id (admin only)
- DELETE /api/comments/:id (admin only)


---

## Postman Test Results

### 1️⃣ Register (Admin)
![Register](screenshots/01-register.png)

### 2️⃣ Login
![Login](screenshots/02-login.png)

### 3️⃣ Create Post
![Create Post](screenshots/03-create-post.png)

### 4️⃣ Get Posts
![Get Posts](screenshots/04-get-posts.png)

### 5️⃣ Create Comment
![Create Comment](screenshots/05-create-comment.png)

### 6️⃣ Get Comments
![Get Comments](screenshots/06-get-comments.png)

In the final version of my project, I transformed my previous API-based application into a complete full-stack blog system. The backend was already built using Node.js, Express, and MongoDB, but for the final stage, I added a working frontend interface, implemented role-based access control, and deployed the application to production using Render and MongoDB Atlas.

First, I integrated a frontend interface that is served directly from the Express server. I created a user interface that allows users to register, log in, and interact with the application. The frontend communicates with the backend API using the Fetch API. After a successful login, the server generates a JWT token, which is stored in the browser’s localStorage. This token is then sent in the Authorization header for protected requests. This ensures that only authenticated users can access certain routes.

Second, I implemented role-based access control (RBAC). I created middleware that checks the user’s role before allowing access to sensitive actions. In my application, regular users can register, log in, and view posts, but only users with the role "admin" can create new posts. If a normal user attempts to create a post, the server returns a 403 Forbidden response. This demonstrates proper access control and security implementation.

Finally, I deployed the backend to Render and connected it to a cloud-hosted MongoDB Atlas database. I configured environment variables for the MongoDB connection string and JWT secret to ensure security in production. The application is now accessible via a public URL and functions as a real production-ready full-stack web application.

This final version demonstrates full-stack integration, authentication, authorization, database connectivity, and deployment in a real-world environment.
