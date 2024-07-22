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
        // используем здесь put т.к. при post создается случайный ключ, нам это не совсем удобно
        axios.post(`dataStudyMate.json`, item)
            .then(() => {
                 this.data.push(item);
            })
            .catch((err) => console.log(err))
    }

    removeItem(keyName) {
        axios.delete(`dataStudyMate/${keyName}.json`)
            .then(() => {
                this.data = this.data.filter(item => item.keyName !== keyName);
            })
            .catch((err) => console.log(err))
    }

    updateItem(updatedItem) {
        axios.put(`dataStudyMate/${updatedItem.keyName}.json`, updatedItem)
            .then(() => {
                const index = this.data.findIndex(item => item.keyName === updatedItem.keyName);
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
                const arr = Object.keys(data).map(key => ({ [key]: {...data[key], keyName: key} }));
                const obj = arr.reduce((result, current) => {
                    const key = Object.keys(current)[0];
                    result[key] = current[key];
                    return result;
                }, {});

                this.data = Object.values(obj);
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