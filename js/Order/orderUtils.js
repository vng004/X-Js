import { showErrorDialog } from "../Utils/dialogConfig.js";


export const URL_DB = "http://localhost:3000/orders";

export const randomId = (existingId) => {
    const id = Math.random().toString(36).substr(2, 8);
    return existingId.includes(id) ? randomId(existingId) : id;
};

export const addOrder = async (order) => {
    try {
        const response = await fetch(URL_DB, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        const newOrder = await response.json();
        console.log('Thêm mới đơn hàng thành công:', newOrder);
        return newOrder;
    } catch (error) {
        console.error(error);
        showErrorDialog('Có lỗi xảy ra khi thêm đơn hàng.');
    }
};

export const deleteOrder = async (id) => {
    try {
        await fetch(`${URL_DB}/${id}`, {
            method: 'DELETE'
        });
        console.log(`Xóa đơn hàng ${id} thành công!`);
    } catch (error) {
        console.error(error);
        showErrorDialog('Có lỗi xảy ra khi xóa đơn hàng.');
    }
};