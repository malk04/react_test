import {makeAutoObservable, action} from "mobx";
import axios from "../utils/axios";

class DataStore {
    data = [];
    selectedRows = [];
    filterCriteria = null;

    constructor() {
        makeAutoObservable(this);
    }

    addItem(item) {
        axios.post('/dataStudyMate', item)
            .then(({data}) => {
                 this.data.push(data);
            })
            .catch((err) => console.log(err))
    }

    removeItem(id) {
        axios.delete(`/dataStudyMate/${id}`)
            .then(() => {
                this.data = this.data.filter(item => item.id !== id);
            })
            .catch((err) => console.log(err))
    }

    updateItem(updatedItem) {
        axios.put(`/dataStudyMate/${updatedItem.id}`, updatedItem)
            .then(({data}) => {
                const index = this.data.findIndex(item => item.id === updatedItem.id);
                this.data[index] = data;
            })
            .catch((err) => console.log(err))
    }

    loadFromDataBase() {
        let ownerId = JSON.parse(localStorage.getItem('user'))?.id
        axios.get(`/dataStudyMate?ownerId=${ownerId}`)
            .then(({data}) => {
                this.data = data;
                // console.log(this.data)
            })
            .catch((err) => console.log(err))
    }

    setSelectedRows(rows) {
        this.selectedRows = rows;
    }

    deleteSelectedRows() {
        this.selectedRows.forEach((id) => {
            this.removeItem(id)
        })
    }

    setFilterCriteria(criteria) {
        this.filterCriteria = criteria;
    }

    get filteredData() {
        if (!this.filterCriteria) {
            return this.data;
        }
        return this.data.filter(item => {
            return item.discipline.includes(this.filterCriteria);
        });
    }
}


const dataStore = new DataStore();
export default dataStore;