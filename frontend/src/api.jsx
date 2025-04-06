import { message } from 'antd';

// Fetch user data from local API
export const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        message.error('No token found, please log in.');
        return null;
    }

    try {
        const response = await fetch('http://localhost:5001/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch user data');
        }

        return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (error) {
        message.error(error.message || 'An error occurred while fetching user data');
        console.error('Fetch user error:', error);
        return null;
    }
};

// Fetch books from Open Library API
export const fetchBooks = async (query = 'fiction', limit = 10) => {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=${limit}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        return data.docs || [];
    } catch (error) {
        message.error(error.message || 'An error occurred while fetching books');
        console.error('Fetch books error:', error);
        return [];
    }
};

// Login user
export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        message.error(error.message || 'An error occurred during login');
        console.error('Login error:', error);
        throw error; // Re-throw to handle in the component
    }
};

// Register user
export const registerUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        message.error(error.message || 'An error occurred during registration');
        console.error('Registration error:', error);
        throw error; // Re-throw to handle in the component
    }
};


// ... (other imports and functions remain the same)

// Toggle favorite book
export const toggleFavoriteBook = async (bookData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        message.error('No token found, please log in.');
        return null;
    }

    try {
        const response = await fetch('http://localhost:5001/api/favorites/toggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bookData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to toggle favorite');
        }

        return data; // Return updated book data
    } catch (error) {
        message.error(error.message || 'An error occurred while toggling favorite');
        console.error('Toggle favorite error:', error);
        return null;
    }
};

// Fetch user's favorite books
export const fetchFavoriteBooks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        message.error('No token found, please log in.');
        return [];
    }

    try {
        const response = await fetch('http://localhost:5001/api/favorites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch favorite books');
        }

        return data || [];
    } catch (error) {
        message.error(error.message || 'An error occurred while fetching favorite books');
        console.error('Fetch favorites error:', error);
        return [];
    }
};
