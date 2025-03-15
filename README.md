# Library Management System 📚

A modern web application built on the MERN stack (MongoDB, Express, React, Node.js) for comprehensive library management. This system streamlines all aspects of library operations including member management, book transactions, reservations, and more.

![Library Management System Screenshot](screenshot.png)
<!-- Note: Please add the screenshot of the new design manually to the repository and name it 'screenshot.png' -->

## ✨ Features

- **Dual Authentication System**
  - Separate login portals for administrators and members
  - Secure role-based access control

- **Intuitive Dashboards**
  - Admin dashboard with comprehensive management tools
  - Member dashboard with personalized information

- **Member Management**
  - Add and manage library members
  - Track member activity and borrowing history
  - Points-based reward system

- **Book Management**
  - Catalog books with detailed information
  - Track available copies and reservations
  - Categorize books for easy searching

- **Transaction System**
  - Issue and return tracking with automated notifications
  - Book reservation for specific dates
  - Fine calculation for overdue books

- **Modern UI/UX**
  - Clean, responsive interface
  - Material Design inspired components
  - Custom alert notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

#### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Create a `.env` file with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

#### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```
   npm start
   ```
   or
   ```
   nodemon server.js
   ```

## 🛠️ Technologies

- **Frontend**
  - React.js with Hooks
  - Material UI components
  - Context API for state management
  - Axios for API requests

- **Backend**
  - Node.js
  - Express.js
  - MongoDB for database
  - JWT for authentication

## 🧩 Project Structure

```
library-management-system/
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── Components/     # Reusable components
│   │   ├── Context/        # Context providers
│   │   ├── Pages/          # Page components
│   │   └── styles/         # CSS files
│   └── package.json        # Frontend dependencies
│
└── backend/                # Node.js backend
    ├── controllers/        # Request handlers
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── scripts/            # Utility scripts
    ├── server.js           # Entry point
    └── package.json        # Backend dependencies
```

## 👥 Authors

- **Yvonne Chege** - [GitHub](https://github.com/yvonnechege)
- **Joseph Kamau** - [GitHub](https://github.com/josephkamau)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
