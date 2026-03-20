import React from 'react';
import { Form, Input, DatePicker, InputNumber } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type {FormValues} from "../../types.ts";
import styles from './ItemForm.module.css';

interface Props {
    form: FormInstance;
    onFinish: (values: FormValues) => void;
}

const ItemForm: React.FC<Props> = ({ form, onFinish }) => {
    return (
        <Form
            className={styles.form}
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                className={styles.formItem}
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Введите имя' }]}
            >
                <Input placeholder="Введите имя" />
            </Form.Item>

            <Form.Item
                className={styles.formItem}
                label="Дата"
                name="date"
                rules={[{ required: true, message: 'Выберите дату' }]}
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                className={styles.formItem}
                label="Значение"
                name="value"
                rules={[{ required: true, message: 'Введите число' }]}
            >
                <InputNumber className={styles.fullWidth} />
            </Form.Item>
        </Form>
    );
};

export default ItemForm;