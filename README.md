# Mini Task Tracker

A full-stack task management application with a React frontend and Node.js/Express backend.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run database migrations:
   ```bash
   npm run migrate
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The backend will be available at http://localhost:4000

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will be available at http://localhost:5173

### Running Both Parts Together

To run both the frontend and backend simultaneously:

1. Open two terminal windows
2. In the first terminal, start the backend server as described above
3. In the second terminal, start the frontend development server as described above

The application will be accessible at http://localhost:5173, and it will communicate with the backend at http://localhost:4000.