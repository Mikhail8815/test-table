import React from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './SearchAndAdd.module.css';

interface Props {
    onAdd: () => void;
    searchText: string;
    onSearchChange: (value: string) => void;
}

const SearchAndAdd: React.FC<Props> = ({ onAdd, searchText, onSearchChange }) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Управление записями</h2>

            <div className={styles.controls}>
                <Input.Search
                    className={styles.searchInput}
                    placeholder="Поиск по таблице..."
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    allowClear
                />

                <Button
                    className={styles.addButton}
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