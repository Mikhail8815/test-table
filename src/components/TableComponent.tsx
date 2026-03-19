import React, {useMemo, useState} from 'react';
import dayjs from 'dayjs';
import type {TableItem, FormValues} from "../types.ts";
import { EditOutlined, DeleteOutlined, PlusOutlined  } from '@ant-design/icons';
import {Button, Table, Modal, Form, Input, DatePicker, InputNumber} from "antd";

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


    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: TableItem, b: TableItem) => a.name.localeCompare(b.name),
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            sorter: (a: TableItem, b: TableItem) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
            sorter: (a: TableItem, b: TableItem) => a.value - b.value,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: unknown, record: TableItem) => (
                <div>
                    <Button
                        icon={<EditOutlined />}
                        type="text"
                        size="small"
                        onClick={() => handleEditClick(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        size="small"
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </div>
            ),
        },
    ];

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
            <h2>Таблица</h2>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddClick}
            >
                Добавить
            </Button>
            <Input.Search
                placeholder="Поиск по таблице..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
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
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                >
                    <Form.Item
                        label="Имя"
                        name="name"
                        rules={[{ required: true, message: 'Введите имя' }]}
                    >
                        <Input placeholder="Введите имя" />
                    </Form.Item>

                    <Form.Item
                        label="Дата"
                        name="date"
                        rules={[{ required: true, message: 'Выберите дату' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Значение"
                        name="value"
                        rules={[{ required: true, message: 'Введите число' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TableComponent;