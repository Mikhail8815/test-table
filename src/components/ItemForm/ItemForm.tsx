import React from 'react';
import { Form, Input, DatePicker, InputNumber } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type {FormValues} from "../../types.ts";

interface Props {
    form: FormInstance;
    onFinish: (values: FormValues) => void;
}

const ItemForm: React.FC<Props> = ({ form, onFinish }) => {
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
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
    );
};

export default ItemForm;