import React from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;

const SearchBar = () => {

    const onSearch = (value, _e, info) =>
        console.log(info === null || info === void 0 ? void 0 : info.source, value);
    return (
        <div className='w-full flex justify-end'>
            <Space direction="vertical" className=''>

                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search Books"
                    size="large"
                    onSearch={onSearch}
                    className='w-full'
                />

            </Space>

        </div>
    )
}

export default SearchBar
