import { addToCart, updateCartCount } from '../Cart/cartUtils.js';
import { listData } from '../Utils/listDataProduct.js';
import { getFromLocalStorage } from '../Utils/localStorage.js';

function displayProducts() {
    // saveToLocalStorage("DANHSACHSP", listData)
    const products = getFromLocalStorage("DANHSACHSP");
    const content = document.getElementById("content");

    if (products && Array.isArray(products)) {
        content.innerHTML = products.map(item =>
            `<div class="product" data-id="${item.id}">
                <img src="${item.image}" alt="">
                <p class="name">${item.name}</p>
                <button class="add-cart" onclick="addToCart(${item.id})">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
                <div class="product-details">
                    <p>$${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>`
        ).join('');
    } else {
        console.log("Dữ liệu không phải là mảng hoặc không có dữ liệu.");
    }
}

window.addToCart = addToCart;
window.onload = () => {
    displayProducts();
    updateCartCount();
};
