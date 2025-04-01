import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const gotoRegister = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        navigate('/register');
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Success handling
            message.success('Login successful!');
            console.log('Login response:', data);

            // Store the token in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
            } else {
                console.warn('No token received from server');
            }

            // Reset form fields
            form.resetFields();

            // Redirect to dashboard after login
            setTimeout(() => {
                navigate('/home'); // Adjust the route as needed
            }, 1000); // Small delay to show success message
        } catch (error) {
            message.error(error.message || 'An error occurred during login');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">Welcome Back</h3>
                <p className="text-sm text-gray-500">Please enter your credentials to login</p>
            </div>

            <Form
                form={form}
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="space-y-4"
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
                    <div className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="text-gray-700">Remember me</Checkbox>
                        </Form.Item>
                        <a href="#" className="text-blue-600 hover:underline text-sm">
                            Forgot password?
                        </a>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </Button>
                </Form.Item>

                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-600 hover:underline" onClick={gotoRegister}>
                        Register now!
                    </a>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
