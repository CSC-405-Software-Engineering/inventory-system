# Inventory System

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/Zio-n/inventory-system.git
```
### Install Dependencies

Navigate to the project directory and install the required dependencies for both the backend and frontend:

```bash
cd inventory-system
npm install

cd apps/inv-backend
npm install

cd ../inv-frontend
npm install
```

## Setting Up PostgreSQL

### Configuring PostgreSQL Credentials

Ensure you have the necessary PostgreSQL credentials set up in the `.env` file located in the **root directory of the backend**. Modify the following environment variables with your PostgreSQL credentials:

```dotenv
# .env file

POSTGRES_URL=the_postgres_url

POSTGRES_HOST=the_postgres_host
POSTGRES_USERNAME=the_postgres_username
POSTGRES_DATABASE=the_postgres_database_name
POSTGRES_PASSWORD=the_postgres_password

```

### Running the Application
After the dependencies are installed, you can run the application front the root directory using the following command:
```bash
npm run dev
```

This will start the development server for both the frontend and backend.

Frontend: 
```bash
http://localhost:5173/ 
```

Backend: 
```bash
http://localhost:3000/
```

Backend with global prefix: 
```bash
http://localhost:3000/backend
```
Swagger UI can be accessed via: 
```bash
http://localhost:3000/api
```
