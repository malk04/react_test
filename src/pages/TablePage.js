import Modal from "../components/Modal";
import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import TrashIcon from "../icons/TrashIcon";
import Tooltip from "../components/Tooltip";

const TablePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    return <>
        <Header/>
        <div className="container not-vertical-center">
            <div style={{maxWidth: 1400, margin: "auto"}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 15}}>
                    <Tooltip position="right"
                             content="Добавить"
                             style={{width: "80px", textAlign: "center", zIndex: 0}}>
                        <button className="button-style" style={{fontSize: 40, padding: "0 12px", margin: 0}}
                                onClick={() => setIsOpen(true)}>+
                        </button>
                    </Tooltip>
                    <label>Поиск по дисциплине:<input type="text" className="input-search"/></label>
                </div>
                <Table/>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
        <Footer/>
    </>
}

export default TablePage;