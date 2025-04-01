import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, message } from 'antd';

const Header = ({ email, profilePicture }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        message.success('Logged out successfully!');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-900">Obooks</div>
            <div className="flex items-center space-x-4">
                <Avatar
                    size="large"
                    src={profilePicture || 'https://api.dicebear.com/8.x/notionists-neutral/svg?seed=default'} // Fallback image
                    className="bg-blue-600"
                />
                <span className="text-gray-700">{email || 'User'}</span>
                <Button
                    type="primary"
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default Header;
