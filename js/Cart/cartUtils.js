import { showErrorDialog, showSuccessDialog } from "../Utils/dialogConfig.js";
import { keyLocalStorageItemCart } from "../Utils/listDataProduct.js";
import { getByIdSpLocal, getFromLocalStorage, saveToLocalStorage } from "../Utils/localStorage.js";

export const updateCartCount = (cart) => {
    const data = getFromLocalStorage("DANHSACHITEMCART") || [];
    const uniqueProductCount = new Set(data.map(item => item.idSP)).size;
    document.getElementById("cart-quantity").textContent = uniqueProductCount;
}

export const updateCart = () => {
    let totalPrice = 0;
    document.querySelectorAll(".subtotal").forEach(subtotalElem => {
        totalPrice += parseFloat(subtotalElem.textContent.replace(/\$|,/g, ''));
    });
    document.querySelector(".totalPrice p").textContent = `Tổng: $${totalPrice.toLocaleString()}`;
}


export const addToCart = (idProduct) => {
    const product = getByIdSpLocal(idProduct);

    if (!product || product.quantity < 1) {
        showErrorDialog("Sản phẩm đã hết hàng!");
        return;
    }

    const cartItem = {
        idSP: Number(idProduct),
        soLuong: 1
    };

    const data = getFromLocalStorage(keyLocalStorageItemCart) || [];

    const existingItemCart = data.find(item => item.idSP === cartItem.idSP);

    if (existingItemCart) {
        const totalQuantityInCart = existingItemCart.soLuong;
        if (totalQuantityInCart >= product.quantity) {
            showErrorDialog("Số lượng trong giỏ hàng vượt quá số lượng sản phẩm!");
            return;
        }
        existingItemCart.soLuong += 1;
    } else {
        data.push(cartItem);
    }

    saveToLocalStorage(keyLocalStorageItemCart, data);
    showSuccessDialog("Thêm sản phẩm vào giỏ hàng thành công!");
    updateCartCount();
};

export const checkQuantity = () => {
    const cartItems = getFromLocalStorage("DANHSACHITEMCART") || [];
    const products = getFromLocalStorage("DANHSACHSP") || [];
    let check = true;

    cartItems.forEach(item => {
        const product = products.find(p => p.id == item.idSP);
        if (product && item.soLuong > product.quantity) {
            showErrorDialog(`Số lượng sản phẩm "${product.name}" trong giỏ hàng vượt quá số lượng có sẵn.`);
            check = false;
        }
    });

    return check;
};

export const Sum = (array, property) => {
    if (array.length === 0) return 0;
    if (typeof array[0] === 'number') {
        return array.reduce((sum, num) => sum + num, 0);
    }
    if (property && typeof array[0] === 'object') {
        return array.reduce((sum, item) => sum + (item[property] || 0), 0);
    }
    return 0;
};

