# React JWT Authentication Demo

This project demonstrates a secure authentication flow using JWT (Access + Refresh tokens) with React, Axios, React Query, and React Hook Form.

## Features

- **JWT Authentication**: Secure login with access and refresh tokens.
- **Automatic Token Refresh**: Axios interceptors handle 401 Unauthorized responses by refreshing the access token seamlessly.
- **React Query**: Manages server state and data fetching.
- **React Hook Form**: Handles form validation and submission.
- **Protected Routes**: Restricts access to authenticated users.
- **Persistent Login**: Uses localStorage for refresh tokens to maintain sessions across reloads.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm run install-all
    ```
    This will install dependencies for the root, server, and client.

2.  **Start the Development Server**:
    ```bash
    npm start
    ```
    This command runs both the backend (Express) and frontend (React/Vite) concurrently.
    - Frontend: http://localhost:5173
    - Backend: http://localhost:4000

## Usage

1.  Open the frontend URL (http://localhost:5173).
2.  You will be redirected to the Login page.
3.  Use the demo credentials:
    - **Email**: `test@example.com`
    - **Password**: `password123`
4.  Upon login, you will be redirected to the Dashboard.
5.  The Dashboard shows protected user data fetched from `/api/me`.
6.  The Access Token is short-lived (15 seconds). Wait on the dashboard and observe the console or network tab. Subsequent requests will trigger a token refresh automatically when the access token expires.
7.  Click "Logout" to clear tokens and return to the login page.

## Deployment Instructions

To deploy this application to a public host (e.g., Render, Heroku, Railway, or Vercel):

### Option 1: Full Stack Deployment (Recommended for simplicity)

1.  **Build the React App**:
    ```bash
    npm run build
    ```
    This creates a `dist` folder in `client/`.

2.  **Serve Static Files from Express**:
    The server is configured to serve files from `client/dist` when in production mode.

3.  **Deploy the Repo**:
    - Push this repository to GitHub.
    - Connect the repository to a hosting provider like Render or Heroku.
    - Set the Build Command to `npm run install-all && npm run build`.
    - Set the Start Command to `npm run server`.
    - Set Environment Variables:
        - `NODE_ENV`: `production`

### Option 2: Separate Deployment

1.  **Backend**: Deploy the `server` folder to a Node.js host.
2.  **Frontend**: Deploy the `client` folder to Vercel or Netlify.
    - You will need to update the `baseURL` in `client/src/api/axios.js` to point to your deployed backend URL.

## Project Structure

- `client/`: React frontend.
    - `src/api/axios.js`: Axios instance with interceptors.
    - `src/context/AuthProvider.jsx`: Auth context and logic.
    - `src/pages/`: Login and Dashboard pages.
- `server/`: Express backend.
    - `index.js`: API endpoints and JWT logic.
