import React from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type {TableItem} from "../../types.ts";

interface Props {
    record: TableItem;
    onEdit: (record: TableItem) => void;
    onDelete: (id: string) => void;
}

const ActionsCell: React.FC<Props> = ({ record, onEdit, onDelete }) => {
    return (
        <Space>
            <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => onEdit(record)}
            />
            <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                danger
                onClick={() => onDelete(record.id)}
            />
        </Space>
    );
};

export default ActionsCell;