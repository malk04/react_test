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
        axios.post(`dataStudyMate/${item.id}.json`, item)
            .then(() => {
                 this.data.push(item);
            })
            .catch((err) => console.log(err))
    }

    removeItem(id) {
        axios.delete(`dataStudyMate/${id}.json`)
            .then(() => {
                this.data = this.data.filter(item => item.id !== id);
            })
            .catch((err) => console.log(err))
    }

    updateItem(updatedItem) {
        axios.put('', updatedItem)
            .then(() => {
                const index = this.data.findIndex(item => item.id === updatedItem.id);
                this.data[index] = updatedItem;
            })
            .catch((err) => console.log(err))
    }

    loadFromDataBase() {
        let uid = JSON.parse(localStorage.getItem('user'))?.uid
        const params = new URLSearchParams({
            orderBy: JSON.stringify('ownerId'),
            equalTo: JSON.stringify(uid)
        });
        axios.get('dataStudyMate.json?' + params.toString())
            .then(({data}) => {
                this.data = Object.values(data);
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