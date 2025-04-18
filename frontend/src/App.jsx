import React from 'react';
import LoginForm from './components/loginForm.jsx';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/registerForm.jsx';
import MainView from './Views/MainView.jsx';
import Favorites from './Views/Favorites.jsx';
const App = () => {
    return (

        <div className="w-full h-screen bg-gray-100 flex items-center justify-center bg-image-pic">
            <div className="bg-white p-6 rounded-lg w-full flex justify-center items-center h-full">
                <Routes>
                    <Route path='/' element={<LoginForm />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path='/home' element={<MainView />} />
                    <Route path='/favorite' element={<Favorites />} />
                </Routes>

            </div>
        </div>



    );
};

export default App;
