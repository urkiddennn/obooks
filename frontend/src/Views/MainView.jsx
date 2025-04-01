import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import Header from '../components/Header.jsx';

const MainView = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                message.error('No token found, please log in.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5001/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Assuming token-based auth
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch user data');
                }

                // Assuming the response is an array, take the first user
                const user = Array.isArray(data) && data.length > 0 ? data[0] : null;
                setUserData(user);
            } catch (error) {
                message.error(error.message || 'An error occurred while fetching user data');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                email={userData?.email}
                profilePicture={userData?.profilePicture}
            />
            <main className="flex-grow flex flex-col items-center justify-center space-y-6">
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome, {userData?.email || 'User'}!
                        </h1>
                        <p className="text-gray-600">This is your dashboard</p>
                    </>
                )}
            </main>
        </div>
    );
};

export default MainView;
