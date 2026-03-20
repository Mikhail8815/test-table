import React from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
    onAdd: () => void;
    searchText: string;
    onSearchChange: (value: string) => void;
}

const SearchAndAdd: React.FC<Props> = ({ onAdd, searchText, onSearchChange }) => {
    return (
        <div>
            <h2>Управление записями</h2>

            <div>
                <Input.Search
                    placeholder="Поиск по таблице..."
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    allowClear
                />

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAdd}
                >
                    Добавить
                </Button>
            </div>
        </div>
    );
};

export default SearchAndAdd;