import type {FormInstance} from "antd/es/form";
import {useMemo, useState} from "react";
import {message, Modal} from "antd";
import dayjs from "dayjs";
import type {FormValues, TableItem} from "../types.ts";

export const useTableData = (form: FormInstance) => {
    const [data, setData] = useState<TableItem[]>([
        { id: '1', name: 'Михаил Горленко', date: '2023-12-27', value: 37 },
        { id: '2', name: 'Иван Смирнов', date: '2024-03-16', value: 3 },
        { id: '3', name: 'Серега Сергеев', date: '2024-08-12', value: 75 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TableItem | null>(null);
    const [searchText, setSearchText] = useState('');

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
        Modal.confirm({
            title: 'Подтверждение удаления',
            content: 'Вы уверены, что хотите удалить эту запись?',
            okText: 'Да, удалить',
            cancelText: 'Отмена',
            okType: 'danger',
            onOk: () => {
                setData(prevData => prevData.filter(item => item.id !== id));
                message.success('Запись успешно удалена');
            },
        });
    };

    const handleEditClick = (record: TableItem) => {
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
            message.success('Запись успешно обновлена');
        } else {
            setData(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    ...newItem
                }
            ]);
            message.success('Запись успешно добавлена');
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

    const sortByName = (a: TableItem, b: TableItem) => a.name.localeCompare(b.name);
    const sortByDate = (a: TableItem, b: TableItem) =>
        new Date(a.date).getTime() - new Date(b.date).getTime();
    const sortByValue = (a: TableItem, b: TableItem) => a.value - b.value;

    return {
        filteredData,
        searchText,
        isModalOpen,
        editingItem,
        setSearchText,
        handleAddClick,
        handleEditClick,
        handleDelete,
        handleSave,
        closeModal,
        sortByName,
        sortByDate,
        sortByValue,
    }
}