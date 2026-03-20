import React, {useCallback, useState} from 'react';
import {Button, Input, Spin} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import debounce from 'lodash/debounce';
import styles from './SearchAndAdd.module.css';

interface Props {
    onAdd: () => void;
    searchText: string;
    onSearchChange: (value: string) => void;
}

const SearchAndAdd: React.FC<Props> = ({ onAdd, searchText, onSearchChange }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [inputValue, setInputValue] = useState(searchText);

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            onSearchChange(value);
            setIsSearching(false);
        }, 500),
        [onSearchChange]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setIsSearching(true);
        debouncedSearch(value);
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Управление записями</h2>

            <div className={styles.controls}>
                <Input
                    className={styles.searchInput}
                    placeholder="Поиск по таблице..."
                    value={inputValue}
                    onChange={handleInputChange}
                    allowClear
                    suffix={isSearching ? <Spin size="small" /> : null}
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