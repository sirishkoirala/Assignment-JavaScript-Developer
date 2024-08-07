# Application Setup and Run Instructions

## Prerequisites

Ensure you have the following installed on your system:

-  Node.js (v14 or higher)
-  PostgreSQL (v12 or higher)

## Backend Setup

### Step 1: Clone the Repository

```sh
git clone "https://github.com/sirishkoirala/Assignment-JavaScript-Developer.git"
```

### Step 2: Install Backend Dependencies

```sh
cd server
npm install
```

### Step 3: Set Up Environment Variables
##### Create a .env file in the backend directory and add the following content:

```sh
jwtSecret=pwispw
```

### Step 4: Set Up PostgreSQL Database
1. Open PostgreSQL terminal:

```sh
psql -U postgres
```

2. Create the database:

```sh
CREATE DATABASE jwtauth0;
\c jwtauth0;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

3. Run the database script to create tables and functions:
```sh
-- Create Users Table
CREATE TABLE users(
   user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_name VARCHAR(255) NOT NULL,
   user_email VARCHAR(255) UNIQUE NOT NULL,
   user_password VARCHAR(255) NOT NULL
);

-- Create Properties Table
CREATE TABLE properties(
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   price DECIMAL(10, 2) NOT NULL,
   description TEXT,
   status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'sold')),
   image VARCHAR(255),
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   user_id UUID,
   FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Create Update Trigger Function
CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedAt = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create Trigger
CREATE TRIGGER update_updatedAt
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE PROCEDURE update_updatedAt_column();
```


### Step 5: Configure Database Connection
##### Create a db.js file in the backend directory and add the following content:

```sh
const Pool = require("pg").Pool;

const pool = new Pool({
   user: 'postgres',
   password: "qwerty",
   host: 'localhost',
   database: 'jwtauth0',
   port: 5432,
});

module.exports = pool;
```
### Step 6: Start the Backend Server
```sh
npm start
```
## Frontend Setup
### Step 1: Install Frontend Dependencies
```sh
cd client
npm install
```
### Step 2: Start the Frontend Server
```sh
npm run dev
```
## Tools Used
- Backend: Express.js, PostgreSQL, Bcrypt, JWT, Multer
- Frontend: React, Vite, React Router, React Toastify, Tailwind CSS
### Running the Application
1. Ensure the backend server is running:
```sh
cd backend
npm start
```
###
2. Ensure the frontend server is running:
```sh
cd frontend
npm run dev
```
3. Open your browser and navigate to http://localhost:5173/
### Additional Notes
- Make sure your PostgreSQL server is running and accessible.
- Adjust any configuration as necessary based on your environment.

