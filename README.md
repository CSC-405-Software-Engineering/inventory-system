# PantryHub - Inventory Management System

PantryHub is a comprehensive inventory management system designed to efficiently manage and organize groceries, consumables, and provisions. This README provides an overview of the project, setup instructions, and key features.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Setting Up PostgreSQL](#setting-up-postgresql)
  - [Running the Application](#running-the-application)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

PantryHub is a stock management pantry system, leveraging SQL for database management. It is designed to streamline inventory management processes, providing features such as inventory tracking, expiration alerts, low stock level alerts, and comprehensive reporting. The system caters to a diverse user base, ranging from individuals to restaurants and businesses.

## Features

1. **Integration:**
   - Seamless integration with accounting software for financial tracking.
   - Option to integrate with online marketplaces for automatic ordering.

2. **Inventory Management:**
   - Add, edit, and delete stock items with details like name, brand, and quantity.
   - Search for items based on various criteria.
   - Utilize barcode scanning for quick inventory updates.

3. **Stock Management:**
   - Track stock levels and receive alerts for low stock levels.

4. **Reporting:**
   - Generate reports on stock levels, usage, trends, and cost analysis.
   - Filter and export reports in various formats for further analysis.

5. **User Management:**
   - User registration for access to the pantry system.
   - Secure login using credentials.
   - Role-based access control for effective user permissions management.

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

### Setting Up PostgreSQL

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

After the dependencies are installed, you can run the application from the root directory using the following command:

```bash
npm run dev
```

This will start the development server for both the frontend and backend.

#### Frontend:
```bash
http://localhost:5173/
```

#### Backend:
```bash
http://localhost:3000/
```

#### Backend with global prefix:
```bash
http://localhost:3000/backend
```

#### Swagger UI:
```bash
http://localhost:3000/api
```

## Documentation

This is the link to the [Project Documentation](https://docs.google.com/document/d/15gDeZ9JZkWgwJ7_Mo0rmMpxyM4BfZlnofWvqnSAJOTk/edit?usp=sharing).

## Contributing

If you'd like to contribute to PantryHub, please follow our guidelines for contributing. Feel free to report issues or submit pull requests.

## License

This project is licensed under MIT. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please reach out to the project team:

- Project Manager: Oge
- Lead Backend: George
- Lead Fronend: Francis
- Lead Design: Anjola
- Lead Documentation: Chukwudi

