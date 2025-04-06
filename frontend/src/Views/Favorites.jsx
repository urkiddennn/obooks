import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import { fetchUserData, fetchFavoriteBooks } from '../api.jsx';
import { MdFavorite } from "react-icons/md";

const Favorites = () => {
    const [userData, setUserData] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            const user = await fetchUserData();
            setUserData(user);
            setLoadingUser(false);
        };

        const getFavorites = async () => {
            setLoadingFavorites(true);
            const favoriteBooks = await fetchFavoriteBooks();
            setFavorites(favoriteBooks);
            setLoadingFavorites(false);
        };

        getUserData();
        getFavorites();
    }, []);

    return (
        <div className="h-screen w-full flex flex-col">
            <Header email={userData?.email} profilePicture={userData?.profilePicture} />
            <main className="flex-grow flex flex-col items-center py-8 px-4 space-y-8">
                {loadingUser ? (
                    <p className="text-gray-600">Loading user data...</p>
                ) : (
                    <h1 className="text-3xl font-bold text-gray-900">

                    </h1>
                )}

                <section className="w-full max-w-5xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Favorite Books
                    </h2>
                    {loadingFavorites ? (
                        <p className="text-gray-600">Loading favorite books...</p>
                    ) : favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {favorites.map((book) => (
                                <div
                                    key={book._id}
                                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-2 hover:shadow-lg transition-shadow duration-200"
                                >
                                    <img
                                        src={
                                            book.cover ||
                                            'https://via.placeholder.com/128x192?text=No+Cover'
                                        }
                                        alt={book.title}
                                        className="w-40 h-52 object-cover rounded"
                                    />
                                    <h3 className="text-lg font-medium text-gray-900 text-center">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {book.authors?.length > 0
                                            ? book.authors.map(author => author.name).join(', ')
                                            : 'Unknown Author'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {book.publish_date || 'Unknown Year'}
                                    </p>
                                    <MdFavorite size={24} className="text-red-500" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No favorite books yet.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Favorites;
