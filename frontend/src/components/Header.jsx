import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, message } from 'antd';
import SearchBar from './SearchBar';

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
        <header className="w-full h-20 bg-white border-b-1 flex justify-between items-center sticky z-20 p-2">

            <div className="text-xl font-semibold text-gray-900">Obooks</div>

            <div className=" h-full flex items-center space-x-4 pr-10 justify-center">
                <img src={profilePicture || 'https://api.dicebear.com/8.x/notionists-neutral/svg?seed=default'} alt="" className='w-12 h-12 outline-1 rounded-full' />
                {/* <Avatar
                    size="large"
                    src={profilePicture || 'https://api.dicebear.com/8.x/notionists-neutral/svg?seed=default'} // Fallback image
                    className="bg-blue-600 outline-1 rounded-full border-2"

                /> */}

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
