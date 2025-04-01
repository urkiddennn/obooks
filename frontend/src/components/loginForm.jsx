import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api.jsx';

const LoginForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const gotoRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = await loginUser(values.email, values.password);

            message.success('Login successful!');
            console.log('Login response:', data);

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
