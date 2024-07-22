import React from "react";
import DataTable from "react-data-table-component"
import { FaTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import Tooltip from "./Tooltip";
import {observer} from "mobx-react-lite";
import dataStore from "../stores/DataStore";

const Table = observer(({data, onDeleteRow, onEditRow}) => {
    const columns = [
        {
            name: "Предмет",
            sortable: true,
            selector: row => row.discipline,
            minWidth: 50,
            style: {
                minWidth: 50
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.discipline}</div>
            )
        },
        {
            name: "5",
            selector: row => row.mark5,
            minWidth: 20,
            style: {
                minWidth: 20
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark5}</div>
            )
        },
        {
            name: "4",
            selector: row => row.mark4,
            minWidth: 20,
            style: {
                minWidth: 20
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark4}</div>
            )
        },
        {
            name: "3",
            selector: row => row.mark3,
            minWidth: 20,
            style: {
                minWidth: 20
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark3}</div>
            )
        },
        {
            name: "2",
            selector: row => row.mark2,
            minWidth: 20,
            style: {
                minWidth: 20
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark2}</div>
            )
        },
        {
            name: "Пропущенных занятий",
            selector: row => row.skipped,
            minWidth: 50,
            style: {
                minWidth: 50,
            },
        },
        {
            name: "Зачтено",
            cell: (row) => (
                row.passed ? "Да" : "Нет"
            ),
            minWidth: 30,
            style: {
                minWidth: 30,
            },
        },
        {
            name: "",
            cell: (row) => (
                <>
                    <Tooltip position="top"
                             content="Удалить"
                             style={{width: "80px", textAlign: "center"}}>
                        <FaTrashAlt className="icon-table"
                                    onClick={() => onDeleteRow instanceof Function && onDeleteRow(row.keyName)}/>
                    </Tooltip>
                    <Tooltip position="left"
                             content="Редактировать"
                             style={{width: "120px", marginLeft: "10px", textAlign: "center"}}>
                        <RiEdit2Fill style={{marginLeft: 10}} className="icon-table"
                                  onClick={() => onEditRow instanceof Function && onEditRow(row)}/>
                    </Tooltip>
                </>
            ),
            minWidth: 50,
            style: {
                minWidth: 50,
            },
        },
    ]

    const customStyle = {
        rows: {
            style: {
                fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                backgroundColor: window.innerWidth <= 480 ? "white" : "#F8F7EE",
            }
        },
        headCells: {
            style: {
                fontSize: window.innerWidth <= 768 ? "12px" : "16px",
                color: "#3E1F0F",
            }
        },
        cells: {
            style: {
                borderStyle: "solid",
                borderColor: "#DBBF93",
                borderWidth: 1,
                color: "#3E1F0F",
            }
        }
    }

    const paginationComponentOptions = {
        rowsPerPageText: "строк на странице",
        rangeSeparatorText: 'из',
    };

    function handleRowSelected(state) {
        dataStore.setSelectedRows(state.selectedRows.map(row => row.keyName));
    }

    return <DataTable data={data}
                      columns={columns}
                      customStyles={customStyle}
                      responsive
                      fixedHeader
                      fixedHeaderScrollHeight="550px"
                      pagination={data && data.length > 10}
                      paginationComponentOptions={paginationComponentOptions}
                      noDataComponent={<div style={{padding: 24}}>Нет данных</div>}
                      selectableRows
                      onSelectedRowsChange={handleRowSelected}
                      selectableRowsComponentProps={{ style: { width: window.innerWidth <= 480 ? "30px" : "50px" } }}
    />
});

export default Table;