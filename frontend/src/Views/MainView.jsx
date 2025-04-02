import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx'; // Import the new Sidebar component
import { fetchUserData, fetchBooks } from '../api.jsx';
import SearchBar from '../components/SearchBar.jsx';

const MainView = () => {
    const [userData, setUserData] = useState(null);
    const [books, setBooks] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('fiction');
    const [selectedSort, setSelectedSort] = useState('title_asc'); // Default sort
    const currentPages = 10; // number of books to be displayed.

    useEffect(() => {
        const getUserData = async () => {
            const user = await fetchUserData();
            setUserData(user);
            setLoadingUser(false);
        };

        const getBooks = async () => {
            setLoadingBooks(true);
            let bookList = await fetchBooks(selectedCategory, currentPages);

            // Apply sorting locally (since Open Library API sorting is limited)
            if (bookList.length > 0) {
                bookList = [...bookList].sort((a, b) => {
                    if (selectedSort === 'title_asc') {
                        return a.title.localeCompare(b.title);
                    } else if (selectedSort === 'title_desc') {
                        return b.title.localeCompare(a.title);
                    } else if (selectedSort === 'year_desc') {
                        return (b.first_publish_year || 0) - (a.first_publish_year || 0);
                    } else if (selectedSort === 'year_asc') {
                        return (a.first_publish_year || 0) - (b.first_publish_year || 0);
                    }
                    return 0;
                });
            }

            setBooks(bookList);
            setLoadingBooks(false);
        };

        getUserData();
        getBooks();
    }, [selectedCategory, selectedSort]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category.toLowerCase());
    };

    const handleSortChange = (sortValue) => {
        setSelectedSort(sortValue);
    };

    return (
        <div className="h-screen w-full flex flex-col">
            <Header email={userData?.email} profilePicture={userData?.profilePicture} />
            <div className="flex flex-grow">
                <Sidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    selectedSort={selectedSort}
                    onSortChange={handleSortChange}
                />
                <main className="flex-grow flex flex-col items-center py-8 px-4 space-y-8">
                    <SearchBar />
                    {loadingUser ? (
                        <p className="text-gray-600">Loading user data...</p>
                    ) : (
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome, {userData?.email || 'User'}!
                        </h1>
                    )}

                    <section className="w-full max-w-5xl">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Featured Books - {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                        </h2>
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
                                            className="w-40 h-52 object-cover rounded"
                                        />
                                        <h3 className="text-lg font-medium text-gray-900 text-center">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {book.first_publish_year || 'Unknown Year'}
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
        </div>
    );
};

export default MainView;
