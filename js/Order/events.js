import { showSuccessDialog } from '../Utils/dialogConfig.js';
import { saveToLocalStorage } from '../Utils/localStorage.js';
import { fetchAndDisplayOrders } from './order.js';
import { deleteOrder } from './orderUtils.js';

export const addOrderDetailsToggleEvent = () => {
    document.querySelectorAll('.detail').forEach(button => {
        button.addEventListener("click", function () {
            const detailsRow = this.closest('tr').nextElementSibling;
            detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
        });
    });
};


export const addCancelOrderEvent = (data, products) => {
    document.querySelectorAll('.x').forEach(button => {
        button.addEventListener('click', async function () {
            if (confirm("Bạn chắc chắn muốn hủy đơn hàng !")) {
                const orderId = this.dataset.id;
                const order = data.find(item => item.id === orderId);
                if (order) {
                    order.cart.forEach(item => {
                        const product = products.find(p => p.id === item.idSP);
                        if (product) {
                            product.quantity += item.soLuong;
                        }
                    });
                    saveToLocalStorage("DANHSACHSP", products);
                    await deleteOrder(orderId);
                    showSuccessDialog("Hủy đơn hàng thành công!");
                    fetchAndDisplayOrders();
                }
            }
        });
    });
};