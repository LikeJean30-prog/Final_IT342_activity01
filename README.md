# Service Request Module — Activity01

A full-stack authenticated Service Request system built with Spring Boot (REST API + JWT security) and ReactJS. Authenticated users can create, view, update, and delete their own service requests. Ownership is enforced entirely on the backend using the authenticated JWT — not by client-side filtering.

## Tech Stack

**Backend:** Spring Boot, Spring Security, Spring Data JPA, JWT (jjwt), PostgreSQL (Supabase)
**Frontend:** ReactJS (Vite), React Router

## Prerequisites

- Java 19+
- Node.js and npm
- A PostgreSQL database (this project uses Supabase)

## Backend Setup

1. Navigate to the backend project folder.
2. Configure `src/main/resources/application.properties` with your database connection:
```properties
   spring.datasource.url=jdbc:postgresql://<your-supabase-host>:5432/postgres
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
   spring.jpa.hibernate.ddl-auto=update
   jwt.secret=<your-secret-key>
   jwt.expiration=86400000
```
3. Run the application:
```bash
   ./mvnw spring-boot:run
```
   The API will start on `http://localhost:8080`.

## Frontend Setup

1. Navigate to the frontend project folder.
2. Install dependencies:
```bash
   npm install
```
3. Start the development server:
```bash
   npm run dev
```
   The app will be available at `http://localhost:5173`.

## Usage

1. Register a new account at `/register`.
2. Log in at `/login`.
3. From the Dashboard, click **My Service Requests** to create, view, update, and delete your own service requests.
4. Click **Logout** to end your session.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/register | Register a new user |
| POST | /api/login | Log in and receive a JWT |
| POST | /api/requests | Create a service request (authenticated) |
| GET | /api/requests | Get the authenticated user's own service requests |
| GET | /api/requests/{id} | Get a single service request (must be owner) |
| PUT | /api/requests/{id} | Update a service request (must be owner) |
| DELETE | /api/requests/{id} | Delete a service request (must be owner) |

## Security Notes

- All `/api/requests/**` endpoints require a valid JWT sent via `Authorization: Bearer <token>`.
- Ownership of each service request is determined server-side from the authenticated user's identity in the JWT — the frontend never sends a `userId` to determine access.
- Attempting to access, update, or delete another user's service request returns `403 Forbidden`.
