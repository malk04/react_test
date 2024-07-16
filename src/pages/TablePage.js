import Modal from "../components/Modal";
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Tooltip from "../components/Tooltip";
import dataStore from "../stores/DataStore";
import {observer} from "mobx-react-lite";

const TablePage = observer(() => {
    const [isOpen, setIsOpen] = useState(false)
    const [dataItem, setDataItem] = useState(undefined)

    const handleAdd = (item) => {
        dataStore.addItem({ ...item, id: Date.now().toString() });
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

    return <>
        <Header/>
        <div className="container not-vertical-center">
            <div style={{maxWidth: 1400, margin: "auto"}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 15}}>
                    <Tooltip position="right"
                             content="Добавить"
                             style={{width: "80px", textAlign: "center"}}>
                        <button className="button-style" style={{fontSize: 40, padding: "0 12px", margin: 0}}
                                onClick={() => setIsOpen(true)}>+
                        </button>
                    </Tooltip>
                    <label>Поиск по дисциплине:<input type="text" className="input-search"/></label>
                </div>
                <Table data={dataStore.data} onDeleteRow={handleRemove} onEditRow={handleEditClick}/>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} initialData={dataItem}
                   setInitialData={setDataItem} onSubmit={dataItem ? handleUpdate : handleAdd}/>
        </div>
        <Footer/>
    </>
});

export default TablePage;