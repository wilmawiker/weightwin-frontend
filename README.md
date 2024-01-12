# WeightWin Frontend

WeightWin is a workout tracking app designed to help users keep track of their exercises, log their workouts, and analyze training statistics. This frontend part of the project is built using React, Vite, and TypeScript.

## Features

- **User Authentication**: Users can create accounts, log in, and secure their data.
- **Workout Logging**: Log your daily workouts, including exercises, sets, reps, and weights used.
- **Training Statistics**: Track and visualize your training progress over time.
- **Exercise Database**: Browse a comprehensive database of exercises to add to your workouts.

## Technologies Used

- React
- Vite
- TypeScript
- JavaScript (for backend)
- Express (for backend)
- MongoDB (for backend)

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Make sure to have a MongoDB instance running)

### Installation

1. Clone the repository (frontend and backend):

   ```bash
   git clone https://github.com/wilmawiker/weightwin-frontend.git

   git clone https://github.com/wilmawiker/weightwin-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weightwin-frontend

   cd weightwin-backend
   ```

3. Install dependencies (for both frontend and backend):

   ```bash
   npm install
   ```

4. Create a .env file in the project root for the backend and configure the necessary environment variables (such as API endpoints, etc.).

5. Start the servers for both the frontend and the backend:

   ```bash
   npm run dev
   ```

The backend application should now be running locally on <http://localhost:3000> and the frontend on <http://127.0.0.1:5173/>.
