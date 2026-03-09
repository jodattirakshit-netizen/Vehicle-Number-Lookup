# Vehicle Number Lookup System

Full stack vehicle lookup platform with modern UI and secure admin management.

## Tech Stack
- Frontend: React (Vite), TailwindCSS, Framer Motion, Axios, React Context API
- Backend: Node.js, Express.js, JWT, MySQL (`mysql2`)
- Database: MySQL

## Project Structure
```text
Vehicle Number Lookup System/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navbar.jsx
|   |   |   |-- VehicleCard.jsx
|   |   |   |-- SearchBar.jsx
|   |   |   |-- Loader.jsx
|   |   |   `-- VehicleTable.jsx
|   |   |-- pages/
|   |   |   |-- Landing.jsx
|   |   |   |-- SearchVehicle.jsx
|   |   |   |-- AdminLogin.jsx
|   |   |   `-- AdminDashboard.jsx
|   |   |-- context/
|   |   |   `-- AuthContext.jsx
|   |   |-- services/
|   |   |   `-- api.js
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- index.css
|   |-- tailwind.config.js
|   |-- postcss.config.js
|   |-- vite.config.js
|   |-- package.json
|   `-- .env.example
|-- backend/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   |-- authController.js
|   |   `-- vehicleController.js
|   |-- middleware/
|   |   `-- authMiddleware.js
|   |-- routes/
|   |   |-- authRoutes.js
|   |   `-- vehicleRoutes.js
|   |-- models/
|   |   `-- vehicleModel.js
|   |-- server.js
|   |-- package.json
|   `-- .env.example
`-- database.sql
```

## Features
- Public vehicle lookup by registration number
- JWT-based admin login
- Protected admin dashboard
- CRUD operations for vehicles
- Vehicle search/filter in dashboard
- Dashboard analytics: total vehicles, vehicle type counts, recent searches
- Search history tracking
- RTO auto-detection from registration prefix (KA01, MH12, etc.)
- Responsive glassmorphism automotive UI
- Framer Motion page/element animations

## MySQL Setup
1. Create DB and tables:
   - Run `database.sql` in MySQL Workbench or CLI.
2. Ensure MySQL service is running.
3. Use matching DB credentials in backend env.
4. (Recommended) generate your own admin bcrypt hash:
   - `cd backend`
   - `npm install`
   - `npm run hash:admin -- Admin@123`
   - Update `admins.password` in `database.sql` or directly in MySQL.

## Environment Variables

### Backend (`backend/.env`)
Copy from `backend/.env.example`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vehicle_lookup_system
JWT_SECRET=super_secret_jwt_key
```

### Frontend (`frontend/.env`)
Copy from `frontend/.env.example`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run Backend
```bash
cd backend
npm install
node server.js
```
Backend starts at `http://localhost:5000`.

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at `http://localhost:5173`.

## API Endpoints

### Auth
- `POST /api/auth/login`
  - Body:
    ```json
    {
      "email": "admin@vnl.com",
      "password": "Admin@123"
    }
    ```

### Vehicles
- `GET /api/vehicles` (Protected)
- `GET /api/vehicles/:number` (Public search)
- `POST /api/vehicles` (Protected)
- `PUT /api/vehicles/:id` (Protected)
- `DELETE /api/vehicles/:id` (Protected)
- `GET /api/vehicles/analytics/summary` (Protected)

## Validation & Security
- Input validation for required fields and registration date
- Duplicate vehicle number checks
- JWT auth middleware for admin routes
- Password verification with bcrypt

## Notes
- Update the sample admin hash in `database.sql` with a valid bcrypt hash for your chosen password.
- By default, route protection is enforced for admin operations only.
