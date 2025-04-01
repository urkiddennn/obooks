import React from 'react';
import LoginForm from './components/loginForm.jsx';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/registerForm.jsx';
const App = () => {
    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-image-pic">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <Routes>
                    <Route path='/' element={<LoginForm />} />
                    <Route path='/register' element={<RegisterForm />} />
                </Routes>

            </div>
        </div>



    );
};

export default App;
