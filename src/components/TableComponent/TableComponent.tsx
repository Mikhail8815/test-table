import React, {useMemo, useState} from 'react';
import dayjs from 'dayjs';
import type {TableItem, FormValues} from "../../types.ts";
import {Button, Table, Modal, Form} from "antd";
import ActionsCell from "../ActionsCell/ActionsCell.tsx";
import ItemForm from "../ItemForm/ItemForm.tsx";
import SearchAndAdd from "../SearchAndAdd/SearchAndAdd.tsx";

const TableComponent: React.FC = () => {

    const [data, setData] = useState<TableItem[]>([
        { id: '1', name: 'Михаил Горленко', date: '2023-12-27', value: 37 },
        { id: '2', name: 'Иван Смирнов', date: '2024-03-16', value: 3 },
        { id: '3', name: 'Серега Сергеев', date: '2024-08-12', value: 75 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<TableItem | null>(null);

    const [searchText, setSearchText] = useState('');

    const MODAL_TITLES = {
        ADD: 'Добавить запись',
        EDIT: 'Редактировать запись',
    } as const;

    const [form] = Form.useForm();

    const closeModal = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleAddClick = () => {
        setEditingItem(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    const handleEditClick = (record: TableItem) => {
        console.log(record)
        setEditingItem(record);
        form.setFieldsValue({
            name: record.name,
            date: dayjs(record.date),
            value: record.value,
        });
        setIsModalOpen(true);
    };

    const handleSave = (values: FormValues) => {
        const newItem = {
            name: values.name,
            date: values.date.format('YYYY-MM-DD'),
            value: values.value,
        };

        if (editingItem) {
            setData(prev =>
                prev.map(item =>
                    item.id === editingItem.id
                        ? { ...item, ...newItem }
                        : item
                )
            );
        } else {
            setData(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    ...newItem
                }
            ]);
        }

        closeModal()
    };

    const sortByName = (a: TableItem, b: TableItem) => a.name.localeCompare(b.name);

    const sortByDate = (a: TableItem, b: TableItem) =>
        new Date(a.date).getTime() - new Date(b.date).getTime();

    const sortByValue = (a: TableItem, b: TableItem) => a.value - b.value;

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: sortByName,
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            sorter: sortByDate,
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
            sorter: sortByValue,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: unknown, record: TableItem) => (
                <ActionsCell
                    record={record}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    const filteredData = useMemo(() => {
        if (!searchText) return data;

        const searchLower = searchText.toLowerCase();
        return data.filter(item =>
            item.name.toLowerCase().includes(searchLower) ||
            item.date.includes(searchLower) ||
            String(item.value).includes(searchLower)
        );
    }, [data, searchText]);

    return (
        <div >
            <SearchAndAdd
                onAdd={handleAddClick}
                searchText={searchText}
                onSearchChange={setSearchText}
            />
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
            <Modal
                title={editingItem ? MODAL_TITLES.EDIT : MODAL_TITLES.ADD}
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button key="cancel" onClick={closeModal}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()} >
                        Сохранить
                    </Button>,
                ]}
            >
                <ItemForm form={form} onFinish={handleSave} />
            </Modal>
        </div>
    );
};

export default TableComponent;