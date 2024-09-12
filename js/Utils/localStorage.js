import { keyLocalStorageListSP } from "./listDataProduct.js";

export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};

export const getFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return JSON.parse(data) || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
};

export const getByIdSpLocal = (idSP) => {
    const products = getFromLocalStorage(keyLocalStorageListSP);
    return products.find(p => p.id === idSP);
};