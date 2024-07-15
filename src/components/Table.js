import React from "react";
import DataTable from "react-data-table-component"
import TrashIcon from "../icons/TrashIcon";
import EditIcon from "../icons/EditIcon";
import Tooltip from "./Tooltip";
const Table = ( ) => {
    const columns = [
        {
            name: "Предмет",
            sortable: true,
            style: {
                minWidth: 250
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.discipline}</div>
            )
        },
        {
            name: "5",
            selector: row => row.mark5,
            style: {
                minWidth: 120
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark5}</div>
            )
        },
        {
            name: "4",
            selector: row => row.mark4,
            style: {
                minWidth: 120
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark4}</div>
            )
        },
        {
            name: "3",
            selector: row => row.mark3,
            style: {
                minWidth: 120
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark3}</div>
            )
        },
        {
            name: "2",
            selector: row => row.mark2,
            style: {
                minWidth: 120
            },
            cell: (row) => (
                <div style={{whiteSpace: "normal"}}>{row.mark2}</div>
            )
        },
        {
            name: "Пропущенных занятий",
            selector: row => row.skipped,
            minWidth: 300,
            style: {
                minWidth: 280,
            },
        },
        {
            name: "Зачтено",
            cell: (row) => (
                row.done ? "Да" : "Нет"
            ),
            minWidth: 140,
            style: {
                minWidth: 120,
            },
        },
        {
            name: "",
            cell: (row) => (
                <>
                    <Tooltip position="top"
                             content="Удалить"
                             style={{ width: "80px", textAlign: "center" }}>
                        <TrashIcon onclick={() => console.log(row.id)}/>
                    </Tooltip>
                    <Tooltip position="top"
                             content="Редактировать"
                             style={{ width: "120px", marginLeft: "10px", textAlign: "center" }}>
                        <EditIcon style={{marginLeft: 10}} onclick={() => console.log(row.id)}/>
                    </Tooltip>
                </>
            ),
            minWidth: 140,
            style: {
                minWidth: 120,
            },
        },
    ]

    const data = [
        {
            id: 1,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 2,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 3,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 4,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 5,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 6,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 7,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 8,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 9,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 10,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 11,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 12,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 13,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 14,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
        {
            id: 15,
            discipline: "ШШШШШШШШШШШШШШШШ",
            mark5: 9999999999999,
            mark4: 0,
            mark3: 0,
            mark2: 0,
            skipped: 0,
            done: true,
        },
    ]

    const customStyle = {
        rows: {
            style: {
                fontSize: "20px",
                backgroundColor: "#F8F7EE",
            }
        },
        headCells: {
            style: {
                fontSize: "20px",
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

    return <DataTable data={data}
                      columns={columns}
                      customStyles={customStyle}
                      responsive
                      fixedHeader={true}
                      pagination={data.length > 10}
                      paginationComponentOptions={paginationComponentOptions}
                      noDataComponent={<div style={{padding: 24}}>Нет данных</div>}
        />
}

export default Table;