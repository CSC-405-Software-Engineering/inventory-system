# Endpoints

## Auth

- **Login**
  - Route: `/backend/v1/auth/login`
  - Method: POST
  - Version: 1
  - Format: {"email": "uwagbalegeorge@gmail.com","password":"Thepassword123$"}

- **Register**
  - Route: `/backend/v1/auth/register`
  - Method: POST
  - Version: 1
  - Format: {"email": "zionumoh8@gmail.com", "firstName": "Zion", "lastName": "Umoh", "password":"Thepassword123$", "role":"admin"}


## Users

- **Get All Users**
  - Route: `/backend/v1/users`
  - Method: GET

## Inventory

- **Create Inventory**
  - Route: `/backend/v1/inventory/create`
  - Method: POST
  - Version: 1
  - Format: {"name": "Spices"}

- **Get All Inventories**
  - Route: `/backend/v1/inventory`
  - Method: GET
  - Version: 1

- **Get Inventory by ID**
  - Route: `/backend/v1/inventory/:id`
  - Method: GET
  - Version: 1

- **Update Inventory by ID**
  - Route: `/backend/v1/inventory/:id`
  - Method: PATCH
  - Version: 1
  - Format: { "name": "Fruits Side"}

- **Delete Inventory by ID**
  - Route: `/backend/v1/inventory/:id`
  - Method: DELETE
  - Version: 1

## Stock

- **Create Stock**
  - Route: `/backend/v1/stock/create`
  - Method: POST
  - Version: 1
  - Format: { "name": "Candy kanes", "inventoryId": "2df2b4ec-1265-4250-8b7e-6b609dab2bff" "imageURL": "candy_kanes.jpg", "minStock": 3, "maxStock": 20, "quantity": 15, "unitPrice": 20, "location": "Freezer B", "expirationDate": "2024-09-09" }

- **Get All Stocks**
  - Route: `/backend/v1/stock`
  - Method: GET
  - Version: 1

- **Get Stock by ID**
  - Route: `/backend/v1/stock/:id`
  - Method: GET
  - Version: 1

- **Update Stock by ID**
  - Route: `/backend/v1/stock/:id`
  - Method: PATCH
  - Version: 1
  - Format: {"name": "Candy kanes Christmas", "inventoryId": "2df2b4ec-1265-4250-8b7e-6b609dab2bff", "imageURL": "candy_kanes.jpg", "minStock": 3, "maxStock": 20, "quantity": 15, "unitPrice": 20, "location": "Freezer B", "expirationDate": "2024-09-09" }

- **Delete Stock by ID**
  - Route: `/backend/v1/stock/:id`
  - Method: DELETE
  - Version: 1

