import Modal from "../components/Modal";
import React, {useContext, useEffect, useState} from "react";
import Table from "../components/Table";
import Tooltip from "../components/Tooltip";
import dataStore from "../stores/DataStore";
import {observer} from "mobx-react-lite";
import { FaTrashAlt } from "react-icons/fa";
import {CustomContext} from "../utils/Context";
import MainTemplate from "../components/MainTemplate";

const TablePage = observer(() => {
    const [isOpen, setIsOpen] = useState(false)
    const [dataItem, setDataItem] = useState(undefined)
    const [filterValue, setFilterValue] = useState("");
    const {user} = useContext(CustomContext)

    useEffect(() => {
        dataStore.loadFromDataBase()
    }, [user]);

    const handleAdd = (item) => {
        dataStore.addItem({...item, id: Date.now().toString()});
    };

    function handleRemove(id) {
        dataStore.removeItem(id);
    }

    function handleUpdate(updatedItem) {
        dataStore.updateItem(updatedItem);
    }

    function handleEditClick(item) {
        setDataItem(item);
        setIsOpen(true);
    }

    function handleFilter(event) {
        const value = event.target.value;
        setFilterValue(value);
        dataStore.setFilterCriteria(value);
    }

    return <MainTemplate>
        <div className="container not-vertical-center">
            <div className="table-div">
                <div className="table-box">
                    <div>
                        <div className="tooltipWrapper">
                            <Tooltip position="top"
                                     content="Добавить"
                                     style={{width: "80px", textAlign: "center"}}>
                                <button className="button-style button-table"
                                        onClick={() => setIsOpen(true)}>+
                                </button>
                            </Tooltip>
                        </div>
                        {dataStore.selectedRows.length > 0 &&
                            <div className="tooltipWrapper" style={{marginLeft: 10}}>
                                <Tooltip position="top"
                                         content="Удалить выбранные"
                                         style={{
                                             width: "160px",
                                             textAlign: "center"
                                         }}>
                                    <button className="button-style button-table"
                                            onClick={() => dataStore.deleteSelectedRows()}>
                                        <FaTrashAlt className="trash"/>
                                    </button>
                                </Tooltip>
                            </div>}
                    </div>
                    <label>Поиск по дисциплине:
                        <input className="input-search"
                               type="search"
                               value={filterValue}
                               onChange={handleFilter}/>
                    </label>
                </div>
                <Table data={dataStore.filteredData} onDeleteRow={handleRemove} onEditRow={handleEditClick}/>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} initialData={dataItem}
                   setInitialData={setDataItem} onSubmit={dataItem ? handleUpdate : handleAdd}/>
        </div>
    </MainTemplate>
});

export default TablePage;