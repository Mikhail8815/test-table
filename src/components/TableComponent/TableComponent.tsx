import React from 'react';
import {Button, Table, Modal, Form } from "antd";
import {useTableData} from "../../hooks/useTableData.ts";
import ActionsCell from "../ActionsCell/ActionsCell.tsx";
import ItemForm from "../ItemForm/ItemForm.tsx";
import SearchAndAdd from "../SearchAndAdd/SearchAndAdd.tsx";
import type {TableItem} from "../../types.ts";
import styles from './TableComponent.module.css';


const TableComponent: React.FC = () => {

    const MODAL_TITLES = {
        ADD: 'Добавить запись',
        EDIT: 'Редактировать запись',
    } as const;

    const [form] = Form.useForm();

    const {
        isModalOpen,
        editingItem,
        searchText,
        filteredData,
        setSearchText,
        handleAddClick,
        handleEditClick,
        handleDelete,
        handleSave,
        closeModal,
        sortByName,
        sortByDate,
        sortByValue,
    } = useTableData(form);

    const columns = [
        { title: 'Имя', dataIndex: 'name', key: 'name', sorter: sortByName },
        { title: 'Дата', dataIndex: 'date', key: 'date', sorter: sortByDate },
        { title: 'Значение', dataIndex: 'value', key: 'value', sorter: sortByValue },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: undefined, record: TableItem) => (
                <ActionsCell
                    record={record}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    const getRowClassName = (_: unknown, index: number) => {
        return index % 2 === 0 ? styles.rowEven : styles.rowOdd;
    };

    return (
        <div className={styles.container}>
            <SearchAndAdd
                onAdd={handleAddClick}
                searchText={searchText}
                onSearchChange={setSearchText}
            />
         <div className={styles.tableWrapper}>
             <Table
                 dataSource={filteredData}
                 columns={columns}
                 rowKey="id"
                 pagination={false}
                 scroll={{ x: 'max-content' }}
                 rowClassName={getRowClassName}
             />
         </div>
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