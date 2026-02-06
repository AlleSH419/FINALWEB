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
