import { Sum, updateCartCount } from '../Cart/cartUtils.js';
import { getFromLocalStorage } from '../Utils/localStorage.js';
import { addCancelOrderEvent, addOrderDetailsToggleEvent } from './events.js';
import { URL_DB } from './orderUtils.js';

export const fetchAndDisplayOrders = async () => {
    try {
        const response = await fetch(URL_DB);
        const data = await response.json();
        const itemOrder = document.getElementById('item-order');
        const thead = document.querySelector('.table-order thead');
        const products = getFromLocalStorage("DANHSACHSP") || [];

        if (data.length > 0) {
            itemOrder.innerHTML = data.map(order => {
                const totalQuantity = Sum(order.cart, 'soLuong');
                const totalPrice = Sum(order.cart.map(item => {
                    const product = products.find(p => p.id === item.idSP);
                    return product ? product.price * item.soLuong : 0;
                }), null);

                return `
                <tr class="item">
                    <td>
                        <p>${order.id}</p>
                        <p class="detail">Details<i class="fa-solid fa-sort-down"></i></p>
                    </td>
                    <td>${order.userInfo.fullName}</td>
                    <td>${order.date}</td>
                    <td>${order.cart.length}</td>
                    <td>${totalQuantity}</td>
                    <td>$${totalPrice.toLocaleString()}</td>
                    <td><i class="fa-regular fa-rectangle-xmark x" data-id="${order.id}"></i></td>
                </tr>
                <tr class="details-order" style="display: none;">
                    <td colspan="7">
                        ${order.cart.map(item => {
                    const product = products.find(p => p.id === item.idSP);
                    return product ? `
                            <div class="details-content">
                                <div class="product">
                                    <img src="${product.image}" alt="">
                                    <div>
                                        <p>${product.name} x${item.soLuong}</p>
                                        <p>Price: $${product.price.toLocaleString()}</p>
                                    </div>
                                </div>                                            
                                <p>Total Price: $${(product.price * item.soLuong).toLocaleString()}</p>
                            </div>` : '';
                }).join('')}
                    </td>
                </tr>`;
            }).join("");

            thead.style.display = "table-header-group";
            addOrderDetailsToggleEvent();
            addCancelOrderEvent(data, products);
        } else {
            itemOrder.innerHTML = `<div class="empty-order"><img src="../images/empty-order.jpg" alt="" width="500" ></div>
                    <div style="margin-left: -400px;">
                         <a href="home.html" class="back"><i class="fa-solid fa-arrow-left"></i> Back to shopping</a>
                    </div>`;
            thead.style.display = "none";
        }
    } catch (error) {
        console.log(error);
    }
};

fetchAndDisplayOrders();
updateCartCount();
