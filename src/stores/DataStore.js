import {makeAutoObservable} from "mobx";

class DataStore {
    data = [];

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    addItem(item) {
        this.data.push(item);
        this.saveToLocalStorage();
    }

    removeItem(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.saveToLocalStorage();
    }

    updateItem(updatedItem) {
        const index = this.data.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            this.data[index] = updatedItem;
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('dataStudyMate', JSON.stringify(this.data));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('dataStudyMate');
        if (data) {
            this.data = JSON.parse(data);
        }
    }
}


const dataStore = new DataStore();
export default dataStore;