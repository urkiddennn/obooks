# Book Explorer Web App

Book Explorer is a web application that allows users to browse, search, and manage their favorite books. Built with a React frontend and a Node.js/Express backend, it integrates with the Open Library API to fetch book data and uses MongoDB to store user and favorite book information.



## Features

- **User Authentication**: Sign up and log in securely with email and password.
- **Book Browsing**: Explore books by category (e.g., fiction) with sorting options (title, year, ascending/descending).
- **Search Functionality**: Search for books by title, author, or keyword using the Open Library API.
- **Favorites Management**: Add or remove books from your favorites list, with a dedicated Favorites page.
- **Responsive Design**: A clean, grid-based UI that works on desktop and mobile devices.

## Screenshots

![Main View](images/main-view.png "Browse and search books on the Main View")
![Favorites Page](images/favorites-page.png "View and manage your favorite books")

## Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Ant Design**: UI component library for search bars and other elements.
- **React Router**: For client-side routing between pages (e.g., MainView and Favorites).
- **React Icons**: For favorite heart icons (e.g., `MdFavorite`).

### Backend
- **Node.js & Express**: Server-side framework for handling API requests.
- **MongoDB & Mongoose**: Database and ORM for storing user and book data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bcrypt**: Password hashing for security.
- **Winston**: Logging library for server-side logs.
- **Morgan**: HTTP request logging middleware.

### External APIs
- **Open Library API**: Source of book data (`https://openlibrary.org/search.json`).

## Prerequisites

- **Node.js**: v16.x or higher
- **MongoDB**: A running MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- **npm**: Package manager (comes with Node.js)

## Setup Instructions

## 1. Clone the Repository
```bash
git clone https://github.com/your-username/book-explorer.git
cd book-explorer
```
## 2. Backend Setup
```bash
cd backend
```
#Install dependencies:

```bash
npm install
```
#Create a .env file in the backend directory with the following:

MONGO_URI=mongodb://localhost:27017/book_explorer
PORT=5001
JWT_TOKEN=your_secret_key_here

## 3. Frontend Setup
#Navigate to the frontend directory (if separated, otherwise root):

Navigate to the frontend directory (if separated, otherwise root):
```bash
cd frontend
```
#Install dependencies:
```bash
npm install
```
#Start the React development server:
--The app will open at http://localhost:3000.

## 4. Verify Setup
Open your browser to http://localhost:3000.
Register a new user, log in, and explore the app.


```book-explorer/
├── backend/                # Backend code (if separated)
│   ├── Models/             # Mongoose schemas (Users.js, Books.js)
│   ├── logs/               # Winston log files
│   ├── server.js           # Express server and API routes
│   └── package.json
├── frontend/               # Frontend code (if separated)
│   ├── src/
│   │   ├── components/     # Reusable components (Header.jsx, Sidebar.jsx, SearchBar.jsx)
│   │   ├── pages/          # Page components (MainView.jsx, Favorites.jsx)
│   │   ├── api.jsx         # API fetch functions
│   │   └── App.jsx         # Main app component with routing
│   └── package.json
├── .env                    # Environment variables (not tracked)
└── README.md
```

#API Endpoints
##Authentication
- **POST /api/users: Register a new user.
- **POST /api/users/login: Log in and receive a JWT token.
- **GET /api/users/me: Get logged-in user data (requires token).
- **Books & Favorites
- **POST /api/favorites/toggle: Add or remove a book from favorites (requires token).
- **GET /api/favorites: Get the user's favorite books (requires token).
##External API
- **GET https://openlibrary.org/search.json?q={query}&limit={limit}: Fetch books from Open Library.
