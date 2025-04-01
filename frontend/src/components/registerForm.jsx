import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api.jsx';

const RegisterForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const gotoLogin = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = await registerUser(values.email, values.password);

            message.success('Registration successful!');
            console.log('Registration response:', data);

            if (data.token) {
                localStorage.setItem('token', data.token);
            } else {
                console.warn('No token received from server');
            }

            form.resetFields();
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            // Error is already handled in api.jsx, no need to re-handle here unless specific UI logic
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="w-1/4 h-auto flex flex-col justify-center items-center rounded-lg outline-1 p-3">
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">Register to Obooks</h3>
                <p className="text-sm text-gray-500">Create your account to get started</p>
            </div>

            <Form
                form={form}
                name="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="space-y-4 w-full"
            >
                <Form.Item
                    name="email"
                    label={<span className="text-gray-700">Email</span>}
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Enter your email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={<span className="text-gray-700">Password</span>}
                    rules={[
                        { required: true, message: 'Please input your Password!' },
                        { min: 6, message: 'Password must be at least 6 characters' },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Enter your password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </Form.Item>

                <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="#" className="text-blue-600 hover:underline" onClick={gotoLogin}>
                        Login now!
                    </a>
                </div>
            </Form>
        </div>
    );
};

export default RegisterForm;
