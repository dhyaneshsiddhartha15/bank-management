##BANK MANAGMENT SYSTEM##

## Folder Structure

```
├── client/                 # Frontend application (React.js)
│   ├── public/             # Public assets
│   └── src/                # React application source code
│       ├── components/     # Reusable React components
│       ├── pages/          # Application pages (Customer and Bank Admin Dashboards)
│       ├── Apis/       # API service integration
│       ├── App.js          # Main component
│       ├── index.js        # React DOM rendering
│       └── ...
├── config/                 # Configuration files
├── controllers/            # Route controllers (Node.js)
├── models/                 # Database models (MongoDB)
├── routes/                 # Route definitions (Node.js)
├── utils/                  # Utility functions (Node.js)
├── app.js                  # Express application setup (Node.js)
├── package.json            # NPM package configuration
└── README.md               # Project README file
```

## Technologies Used

- **Frontend**:
  - **React.js**: JavaScript library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **axios**: Promise-based HTTP client for making API requests.
  - **TanStack Query**: This library simplifies data fetching and state management for React applications. It optimizes API requests by caching data, reducing boilerplate code, and ensuring consistency across components.

- **Backend**:
  - **Node.js**: Runtime environment for server-side JavaScript.
  - **Express.js**: Web application framework for Node.js.
  - **MongoDB**: NoSQL database used for storing account and transaction data.
  - **Mongoose**: MongoDB object modeling tool for Node.js.

- **Other**:
  - **JavaScript**: Programming language for both frontend and backend logic.
  - **Postman**: API development environment for testing API endpoints.
  - **Git**: Version control system for tracking changes in the project.
  - **npm**: Package manager for Node.js to manage project dependencies.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git
   ```

2. Navigate into the project directory:
   ```bash
   cd bank-management-system
   ```

3. Install backend dependencies:
   ```bash
   npm install
   ```

4. Navigate to the client directory:
   ```bash
   cd client
   ```

5. Install frontend dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the MongoDB service:
   ```bash
   mongod
   ```

2. Run the backend server:
   ```bash
   npm start
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

4. The frontend server should now be running on `http://localhost:3000`.

## Usage

- **Customer Dashboard**: Accessible to bank customers for viewing account details, making deposits, and withdrawing funds.
- **Bank Admin Dashboard**: Accessible to bank administrators for managing customer accounts, viewing transaction histories, and performing administrative tasks.

- ![image](https://github.com/user-attachments/assets/541014e5-13df-4b73-a787-6e1317e4bafb)

![image](https://github.com/user-attachments/assets/7425361d-ca32-415b-957d-1be0f3d68f07)
![image](https://github.com/user-attachments/assets/955c847e-d8b3-43f8-b163-dee26a46e6af)



