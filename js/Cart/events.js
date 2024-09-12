import { showErrorDialog, showSuccessDialog } from "../Utils/dialogConfig.js";
import { getByIdSpLocal, saveToLocalStorage } from "../Utils/localStorage.js";
import { getCartFromLocal } from "./cart.js";
import { updateCart, updateCartCount } from "./cartUtils.js";

export function handleQuantityChange(data) {
    document.querySelectorAll(".btn-decrease, .btn-increase").forEach(button => {
        button.addEventListener("click", function () {
            const quantityElem = this.parentElement.querySelector(".quantity");
            const currentQuantity = parseInt(quantityElem.textContent, 10);
            const price = parseFloat(this.parentElement.parentElement.querySelector(".price").dataset.price);
            const subtotalElem = this.parentElement.parentElement.querySelector(".subtotal");
            const productId = Number(this.dataset.id);

            const product = getByIdSpLocal(productId);
            const quantityMax = product ? product.quantity : 0;

            let newQuantity;
            if (this.classList.contains("btn-decrease")) {
                newQuantity = Math.max(currentQuantity - 1, 0);
            } else {
                newQuantity = currentQuantity + 1;
            }

            if (newQuantity === 0) {
                if (confirm("Số lượng sản phẩm đã giảm xuống 0. Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?")) {
                    const productId = this.dataset.id;
                    const updatedData = data.filter(item => item.idSP != productId);
                    saveToLocalStorage("DANHSACHITEMCART", updatedData);
                    getCartFromLocal();
                    showSuccessDialog("Xóa sản phẩm khỏi giỏ hàng thành công");
                    updateCartCount();

                } else {
                    quantityElem.textContent = currentQuantity;
                    return;
                }
            } else if (quantityMax < newQuantity) {
                showErrorDialog(`Số lượng đã vượt quá số lượng sản phẩm trong kho.`);
                return
            } else {
                quantityElem.textContent = newQuantity;
                subtotalElem.textContent = `$${(price * newQuantity).toLocaleString()}`;

                const updatedData = data.map(item => {
                    if (item.idSP === productId) {
                        item.soLuong = newQuantity;
                    }
                    return item;
                });
                saveToLocalStorage("DANHSACHITEMCART", updatedData);
                updateCart();
            }
        });
    });
}

export function handleRemoveItem(data) {
    document.querySelectorAll(".x").forEach(icon => {
        icon.addEventListener('click', function () {
            if (confirm("Bạn chắc chắn muốn xóa sản phẩm!")) {
                const productId = this.dataset.id;
                const updatedData = data.filter(item => item.idSP != productId);
                saveToLocalStorage("DANHSACHITEMCART", updatedData);
                getCartFromLocal();
                showSuccessDialog("Xóa sản phẩm khỏi giỏ hàng thành công");
                updateCartCount();

            }
        });
    });
}

export function handleBuyButton(data) {
    document.getElementById("buy-btn").addEventListener("click", function () {
        data.forEach(item => {
            const quantityElem = document.querySelector(`[data-id="${item.idSP}"]`).parentElement.querySelector(".quantity");
            item.soLuong = parseInt(quantityElem.textContent, 10);
        });
        saveToLocalStorage("DANHSACHITEMCART", data);
    });
}
