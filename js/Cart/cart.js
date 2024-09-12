import { getByIdSpLocal, getFromLocalStorage } from '../Utils/localStorage.js';
import { Sum, updateCart, updateCartCount } from './cartUtils.js';
import { handleBuyButton, handleQuantityChange, handleRemoveItem } from './events.js';

export function getCartFromLocal() {
    const data = getFromLocalStorage("DANHSACHITEMCART") || [];
    const itemCart = document.getElementById("item-cart");
    const empty = document.getElementById("list-cart");
    const thead = document.getElementById("thead");

    if (data.length > 0) {
        const totalPrice = Sum(data.map(item => {
            const product = getByIdSpLocal(item.idSP);
            return product ? product.price * item.soLuong : 0;
        }));

        itemCart.innerHTML = data.map(item => {
            const product = getByIdSpLocal(item.idSP);
            if (product) {
                return `
                <tr class="product">
                    <td class="product-info">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <p class="name">${product.name}</p>
                            <p class="quantity">Số lượng: ${product.quantity}</p>
                        </div>
                    </td>
                    <td>
                        <button class="btn-decrease" data-id="${item.idSP}">-</button>
                        <span class="quantity">${item.soLuong}</span>
                        <button class="btn-increase" data-id="${item.idSP}">+</button>
                    </td>
                    <td class="price" data-price="${product.price}">$${product.price.toLocaleString()}</td>
                    <td class="subtotal">$${(product.price * item.soLuong).toLocaleString()}</td>
                    <td><i class="fa-regular fa-circle-xmark x" data-id="${item.idSP}"></i></td>
                </tr>`;
            } else {
                return '';
            }
        }).join('') + `
        <div class="totalPrice">
            <p>Tổng: $${totalPrice.toLocaleString()}</p>
            <div><button class="buy" id="buy-btn">Mua</button></div>
        </div>`;

        handleQuantityChange(data);
        handleRemoveItem(data);
        handleBuyButton(data);

        updateCart();
    } else {
        thead.style.display = "none";
        empty.innerHTML = `<div class="empty"><img src="../images/empty-cart.png" alt=""></div>
                    <div class="btn-cart" style="margin-left: -400px;">
                         <a href="home.html" class="back"><i class="fa-solid fa-arrow-left"></i> Back to shopping</a>
                    </div>`;
    }
}

getCartFromLocal();
updateCartCount();
