import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;

const SearchBar = ({ onSearchBooks }) => {
    const onSearch = (value, _e, info) => {
        if (value.trim()) {
            onSearchBooks(value.trim());
        }
    };

    return (
        <div className="w-full flex justify-end">
            <Space direction="vertical" className="">
                <Search
                    placeholder="Search books by title, author, or keyword"
                    allowClear
                    enterButton="Search Books"
                    size="large"
                    onSearch={onSearch}
                    className="w-96" // Adjust width as needed
                />
            </Space>
        </div>
    );
};

export default SearchBar;
