CREATE DATABASE jwtauth0;

-- go to jwtauth0
\c jwtauth0;

-- adding extension in our DATABASE
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
   user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_name VARCHAR(255) NOT NULL,
   user_email VARCHAR(255) UNIQUE NOT NULL,
   user_password VARCHAR(255) NOT NULL
);

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

-- function
CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedAt = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';


-- trigger
CREATE TRIGGER update_updatedAt
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE PROCEDURE update_updatedAt_column();