import React, {useState} from 'react';
import type {TableItem} from "../types.ts";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Button, Table} from "antd";

const TableComponent: React.FC = () => {

    const [data] = useState<TableItem[]>([
        { id: '1', name: 'Михаил Горленко', date: '2023-12-27', value: 37 },
        { id: '2', name: 'Иван Смирнов', date: '2024-03-16', value: 3 },
        { id: '3', name: 'Серега Сергеев', date: '2024-08-12', value: 75 },
    ]);

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
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
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        size="small"
                        danger
                    />
                </div>
            ),
        },
    ];


    return (
        <div >
            <h2>Таблица</h2>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
        </div>
    );
};

export default TableComponent;