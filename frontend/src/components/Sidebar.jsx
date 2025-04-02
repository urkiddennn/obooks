import React from 'react';

const Sidebar = ({ selectedCategory, onCategoryChange, selectedSort, onSortChange }) => {
    const categories = [
        'Fiction',
        'Non-fiction',
        'Science',
        'History',
        'Fantasy',
        'Mystery',
        'Romance',
        'Biography',
    ];

    const sortOptions = [
        { label: 'Title (A-Z)', value: 'title_asc' },
        { label: 'Title (Z-A)', value: 'title_desc' },
        { label: 'Publication (Newest)', value: 'year_desc' },
        { label: 'Publication (Oldest)', value: 'year_asc' },
    ];

    return (
        <aside className="w-64 bg-gray-100 p-4 shadow-md">
            {/* Categories Section */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
            <ul className="space-y-2 flex flex-wrap space-x-1 mb-6 w-full">
                {categories.map((category) => (
                    <li key={category}>
                        <button
                            onClick={() => onCategoryChange(category)}
                            className={`w-auto text-left px-4 py-2 rounded ${selectedCategory === category.toLowerCase()
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                } transition-colors duration-200`}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Filters Section */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sort By</h2>
            <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </aside>
    );
};

export default Sidebar;
