# Final BLOG - API Documentation

A Node.js Express-based blog API with user authentication, blog management, and admin controls.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [API Routes](#api-routes)
- [Authentication](#authentication)

## Installation

```bash
npm install
```

## Project Structure

```
├── Config/
│   └── database.config.js          # Database configuration
├── Controller/
│   ├── admin.controller.js         # Admin operations
│   ├── blog.controller.js          # Blog operations
│   └── index.controller.js         # Authentication & health checks
├── Middleware/
│   ├── auth.js                     # Authentication middleware
│   └── blog.multer.js              # File upload middleware
├── Model/
│   ├── blog.model.js               # Blog schema
│   └── user.model.js               # User schema
├── public/
│   └── uploads/                    # Uploaded files storage
├── Routes/
│   ├── admin.routes.js             # Admin routes
│   ├── blog.routes.js              # Blog routes
│   └── index.routes.js             # Authentication routes
├── server.js                       # Main server file
└── package.json
```

## Environment Setup

Create a `.env` file in the root directory:

```
PORT=<your_port>
DB_URI=<your_database_uri>
JWT_SECRET=<your_jwt_secret>
```

## API Routes

### Base URL
The application runs on the configured PORT with the following route prefixes:
- Root: `/`
- Admin: `/admin`
- Blog: `/blog`

---

## Authentication Routes

**Base Path:** `/`

### 1. Health Check
- **Endpoint:** `GET /health`
- **Description:** Check if the server is running
- **Authentication:** None
- **Request Body:** None
- **Response:** Server health status

### 2. Status Check
- **Endpoint:** `GET /status`
- **Description:** Get server status information
- **Authentication:** None
- **Request Body:** None
- **Response:** Server status

### 3. User Registration
- **Endpoint:** `POST /register`
- **Description:** Create a new user account
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** User object with authentication token

### 4. User Login
- **Endpoint:** `POST /login`
- **Description:** Authenticate user and generate JWT token
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** JWT token and user information

---

## Blog Routes

**Base Path:** `/blog`

### 1. Fetch All Blogs
- **Endpoint:** `GET /blog/`
- **Description:** Retrieve all published blogs
- **Authentication:** ✅ Required (JWT Token)
- **Middleware:** `verifyToken`
- **Request Body:** None
- **Query Parameters:** Optional (pagination, filters)
- **Response:** Array of blog objects

### 2. Add New Blog
- **Endpoint:** `POST /blog/addBlog`
- **Description:** Create a new blog post (Admin only)
- **Authentication:** ✅ Required (Admin)
- **Middleware:** `verifyTokenAdmin`, `multer` (file upload)
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "cover": "file (multipart/form-data)"
  }
  ```
- **Response:** Created blog object

### 3. Update Blog
- **Endpoint:** `PATCH /blog/:_id`
- **Description:** Update an existing blog post (Admin only)
- **Authentication:** ✅ Required (Admin)
- **Middleware:** `verifyTokenAdmin`
- **URL Parameters:**
  - `_id` (string): Blog ID
- **Request Body:**
  ```json
  {
    "title": "string (optional)",
    "content": "string (optional)",
    "cover": "file (optional)"
  }
  ```
- **Response:** Updated blog object

### 4. Delete Blog
- **Endpoint:** `DELETE /blog/:_id`
- **Description:** Delete a blog post (Admin only)
- **Authentication:** ✅ Required (Admin)
- **Middleware:** `verifyTokenAdmin`
- **URL Parameters:**
  - `_id` (string): Blog ID
- **Request Body:** None
- **Response:** Success message

---

## Admin Routes

**Base Path:** `/admin`

### 1. Get All Admins
- **Endpoint:** `GET /admin/getAllAdmins`
- **Description:** Retrieve list of all administrators
- **Authentication:** ✅ Required (Admin)
- **Middleware:** `verifyTokenAdmin`
- **Request Body:** None
- **Response:** Array of admin objects

---

## Authentication

### JWT Token-Based Authentication

The API uses JWT (JSON Web Tokens) for secure authentication.

#### How It Works:
1. User registers or logs in at `/register` or `/login`
2. Server returns a JWT token
3. Include token in request headers:
   ```
   Authorization: Bearer <jwt_token>
   ```

#### Middleware:
- **`verifyToken`**: Verifies standard user JWT token
- **`verifyTokenAdmin`**: Verifies admin-level JWT token (stricter validation)

#### Protected Endpoints:
- All blog routes require at least `verifyToken`
- Blog creation, update, deletion, and admin routes require `verifyTokenAdmin`

---

## File Upload

Blog cover images are handled via Multer middleware (`blog.multer.js`).

- **Supported Method:** `multipart/form-data`
- **Field Name:** `cover`
- **Storage Location:** `/public/uploads/`

---

## Error Handling

The API follows standard HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized (Invalid/Missing token)
- `403`: Forbidden (Insufficient permissions)
- `404`: Not Found
- `500`: Server Error

---

## Running the Server

```bash
npm start
```

The server will start on the port specified in your `.env` file.

