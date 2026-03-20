import React from 'react';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type {TableItem} from "../../types.ts";
import styles from './ActionsCell.module.css';

interface Props {
    record: TableItem;
    onEdit: (record: TableItem) => void;
    onDelete: (id: string) => void;
}

const ActionsCell: React.FC<Props> = ({ record, onEdit, onDelete }) => {
    return (
        <div className={styles.buttons}>
            <Button
                className={styles.button}
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => onEdit(record)}
            />
            <Button
                className={styles.button}
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                danger
                onClick={() => onDelete(record.id)}
            />
        </div>
    );
};

export default ActionsCell;