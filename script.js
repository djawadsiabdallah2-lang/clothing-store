let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// اختيار المقاس
// ==========================

function selectSize(button) {

```
const sizes =
    button.parentElement.querySelectorAll("button");


sizes.forEach(function (item) {

    item.classList.remove("selected");

});


button.classList.add("selected");
```

}

// ==========================
// إضافة المنتج إلى السلة
// ==========================

function addProductToCart(name, price, button) {

```
const product =
    button.closest(".product");


const selectedSize =
    product.querySelector(".sizes .selected");


if (!selectedSize) {

    alert("⚠️ اختر المقاس أولاً");

    return;
}


const size =
    selectedSize.textContent.trim();


const existingProduct =
    cart.find(function (item) {

        return (
            item.name === name &&
            item.size === size
        );

    });


if (existingProduct) {

    existingProduct.quantity++;

} else {

    cart.push({

        name: name,

        price: price,

        size: size,

        quantity: 1

    });

}


saveCart();

updateCart();

openCart();
```

}

// ==========================
// حفظ السلة
// ==========================

function saveCart() {

```
localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);
```

}

// ==========================
// تحديث السلة
// ==========================

function updateCart() {

```
const cartCount =
    document.getElementById("cartCount");


const cartItems =
    document.getElementById("cartItems");


const cartTotal =
    document.getElementById("cartTotal");


if (!cartCount || !cartItems || !cartTotal) {

    return;
}


cartItems.innerHTML = "";


let totalQuantity = 0;

let totalPrice = 0;


if (cart.length === 0) {

    cartItems.innerHTML =
        "<p>السلة فارغة.</p>";

    cartCount.textContent = "0";

    cartTotal.textContent = "0 دج";

    return;
}


cart.forEach(function (item, index) {

    totalQuantity += item.quantity;


    totalPrice +=
        item.price * item.quantity;


    const itemElement =
        document.createElement("div");


    itemElement.className =
        "cart-item";


    itemElement.innerHTML = `

        <div>

            <strong>
                ${item.name}
            </strong>

            <p>
                المقاس: ${item.size}
            </p>

            <p>
                السعر: ${item.price} دج
            </p>


            <div class="quantity">

                <button
                    type="button"
                    onclick="decreaseQuantity(${index})"
                >
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    type="button"
                    onclick="increaseQuantity(${index})"
                >
                    +
                </button>

            </div>

        </div>


        <button
            type="button"
            onclick="removeFromCart(${index})"
        >
            حذف
        </button>

    `;


    cartItems.appendChild(itemElement);

});


cartCount.textContent =
    totalQuantity;


cartTotal.textContent =
    totalPrice + " دج";
```

}

// ==========================
// زيادة الكمية
// ==========================

function increaseQuantity(index) {

```
if (!cart[index]) {
    return;
}


cart[index].quantity++;


saveCart();

updateCart();
```

}

// ==========================
// إنقاص الكمية
// ==========================

function decreaseQuantity(index) {

```
if (!cart[index]) {
    return;
}


cart[index].quantity--;


if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

}


saveCart();

updateCart();
```

}

// ==========================
// حذف المنتج
// ==========================

function removeFromCart(index) {

```
if (!cart[index]) {
    return;
}


cart.splice(index, 1);


saveCart();

updateCart();
```

}

// ==========================
// فتح السلة
// ==========================

function openCart() {

```
const cartElement =
    document.getElementById("cart");


const overlay =
    document.getElementById("overlay");


if (!cartElement || !overlay) {
    return;
}


cartElement.classList.add("active");

overlay.classList.add("active");
```

}

// ==========================
// إغلاق السلة
// ==========================

function closeCart() {

```
const cartElement =
    document.getElementById("cart");


const overlay =
    document.getElementById("overlay");


if (!cartElement || !overlay) {
    return;
}


cartElement.classList.remove("active");

overlay.classList.remove("active");
```

}

// ==========================
// إتمام الطلب
// ==========================

function goToCheckout() {

```
if (cart.length === 0) {

    alert(
        "🛒 السلة فارغة! اختر منتجًا أولاً."
    );

    return;
}


window.location.href =
    "checkout.html";
```

}

// ==========================
// تشغيل الموقع
// ==========================

document.addEventListener(
"DOMContentLoaded",
function () {

```
    updateCart();

}
```

);
