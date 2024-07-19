import Modal from "../components/Modal";
import React, {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Tooltip from "../components/Tooltip";
import dataStore from "../stores/DataStore";
import {observer} from "mobx-react-lite";
import { FaTrashAlt } from "react-icons/fa";
import {CustomContext} from "../utils/Context";

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

    return <>
        <Header/>
        <div className="container not-vertical-center">
            <div style={{maxWidth: 1400, margin: "auto", maxHeight: 700}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 15}}>
                    <div>
                        <div className="tooltipWrapper">
                            <Tooltip position="top"
                                     content="Добавить"
                                     style={{width: "80px", textAlign: "center"}}>
                                <button className="button-style" style={{fontSize: 40, padding: "0 12px", margin: 0}}
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
                                    <button className="button-style"
                                            style={{fontSize: 40, padding: "0 12px", margin: 0}}
                                            onClick={() => dataStore.deleteSelectedRows()}>
                                        <FaTrashAlt style={{fill: "#F8F7EE", width: 25, height: 25}}/>
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
        <Footer/>
    </>
});

export default TablePage;