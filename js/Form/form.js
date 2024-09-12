import { setupFormEvents, setupModalEvents } from './event.js';
import { validateForm } from './validation.js';
import { showSuccessDialog } from '../Utils/dialogConfig.js';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../Utils/localStorage.js';
import { checkQuantity } from '../Cart/cartUtils.js';
import { addOrder, randomId } from '../Order/orderUtils.js';

document.getElementById('confirm-btn').addEventListener('click', async function (event) {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid && checkQuantity()) {
        const existingId = [];
        const newRandomId = randomId(existingId);
        const purchaseDate = new Date().toLocaleDateString();

        const order = {
            id: newRandomId,
            date: purchaseDate,
            cart: getFromLocalStorage("DANHSACHITEMCART"),
            userInfo: {
                fullName: `${document.getElementById('first-name').value.trim()} ${document.getElementById('last-name').value.trim()}`,
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: `${document.getElementById('home-number').value.trim()}, ${document.getElementById('ward').selectedOptions[0].text.trim()}, ${document.getElementById('district').selectedOptions[0].text.trim()}, ${document.getElementById('city').selectedOptions[0].text.trim()}`
            }
        };

        try {
            await addOrder(order);
            const cartItems = getFromLocalStorage("DANHSACHITEMCART") || [];
            const products = getFromLocalStorage("DANHSACHSP") || [];

            cartItems.forEach(item => {
                const product = products.find(p => p.id == item.idSP);
                if (product) {
                    product.quantity -= item.soLuong;
                }
            });
            saveToLocalStorage("DANHSACHSP", products);
            removeFromLocalStorage("DANHSACHITEMCART");
            showSuccessDialog("Mua hàng thành công!");
        } catch (error) {
            console.error("Error while posting order:", error);
        }
    }
});
setupModalEvents();
setupFormEvents();