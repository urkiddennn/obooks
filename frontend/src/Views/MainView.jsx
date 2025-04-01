import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import { fetchUserData, fetchBooks } from '../api.jsx';

const MainView = () => {
    const [userData, setUserData] = useState(null);
    const [books, setBooks] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            const user = await fetchUserData();
            setUserData(user);
            setLoadingUser(false);
        };

        const getBooks = async () => {
            const bookList = await fetchBooks('fiction', 6);
            setBooks(bookList);
            setLoadingBooks(false);
        };

        getUserData();
        getBooks();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header email={userData?.email} profilePicture={userData?.profilePicture} />
            <main className="flex-grow flex flex-col items-center py-8 px-4 space-y-8">
                {loadingUser ? (
                    <p className="text-gray-600">Loading user data...</p>
                ) : (
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome, {userData?.email || 'User'}!
                    </h1>
                )}

                <section className="w-full max-w-5xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Books</h2>
                    {loadingBooks ? (
                        <p className="text-gray-600">Loading books...</p>
                    ) : books.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {books.map((book) => (
                                <div
                                    key={book.key}
                                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-2 hover:shadow-lg transition-shadow duration-200"
                                >
                                    <img
                                        src={
                                            book.cover_i
                                                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                                                : 'https://via.placeholder.com/128x192?text=No+Cover'
                                        }
                                        alt={book.title}
                                        className="w-32 h-48 object-cover rounded"
                                    />
                                    <h3 className="text-lg font-medium text-gray-900 text-center">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No books found.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default MainView;
