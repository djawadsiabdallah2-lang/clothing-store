let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==============================
// حفظ السلة
// ==============================

function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));
}

// ==============================
// اختيار المقاس
// ==============================

function selectSize(button) {

```
const product = button.closest(".product");

if (!product) return;

const buttons = product.querySelectorAll(".sizes button");

buttons.forEach(function (btn) {
    btn.classList.remove("selected");
});

button.classList.add("selected");
```

}

// ==============================
// إضافة المنتج إلى السلة
// ==============================

function addProductToCart(button) {

```
const product = button.closest(".product");

if (!product) {
    alert("حدث خطأ في العثور على المنتج.");
    return;
}


// اسم المنتج
const nameElement = product.querySelector("h3");

if (!nameElement) {
    alert("لم يتم العثور على اسم المنتج.");
    return;
}

const name = nameElement.textContent.trim();


// السعر
const priceElement = product.querySelector("strong");

if (!priceElement) {
    alert("لم يتم العثور على سعر المنتج.");
    return;
}

const priceText = priceElement.textContent;

const price = parseInt(
    priceText.replace(/[^\d]/g, "")
);


// المقاس المختار
const selectedSize =
    product.querySelector(".sizes button.selected");


if (!selectedSize) {

    alert("⚠️ اختر المقاس أولاً");

    return;
}


const size =
    selectedSize.textContent.trim();


// البحث عن نفس المنتج + نفس المقاس
const existingProduct = cart.find(function (item) {

    return (
        item.name === name &&
        item.size === size
    );

});


if (existingProduct) {

    existingProduct.quantity += 1;

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

// ==============================
// تحديث السلة
// ==============================

function updateCart() {

```
const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


if (!cartItems || !cartCount || !cartTotal) {
    return;
}


cartItems.innerHTML = "";


let totalQuantity = 0;

let totalPrice = 0;


if (cart.length === 0) {

    cartItems.innerHTML =
        "<p>🛒 السلة فارغة.</p>";

    cartCount.textContent = "0";

    cartTotal.textContent = "0 دج";

    return;
}


cart.forEach(function (item, index) {

    totalQuantity += item.quantity;

    totalPrice +=
        item.price * item.quantity;


    const div =
        document.createElement("div");


    div.className = "cart-item";


    div.innerHTML = `

        <div>

            <strong>
                ${item.name}
            </strong>

            <p>
                المقاس: ${item.size}
            </p>

            <p>
                ${item.price} دج
            </p>

            <div class="quantity">

                <button
                    type="button"
                    data-action="decrease"
                    data-index="${index}">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    data-action="increase"
                    data-index="${index}">
                    +
                </button>

            </div>

        </div>


        <button
            type="button"
            data-action="remove"
            data-index="${index}">
            حذف
        </button>

    `;


    cartItems.appendChild(div);

});


cartCount.textContent =
    totalQuantity;


cartTotal.textContent =
    totalPrice + " دج";
```

}

// ==============================
// زيادة الكمية
// ==============================

function increaseQuantity(index) {

```
if (!cart[index]) return;

cart[index].quantity++;

saveCart();

updateCart();
```

}

// ==============================
// إنقاص الكمية
// ==============================

function decreaseQuantity(index) {

```
if (!cart[index]) return;

cart[index].quantity--;


if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

}


saveCart();

updateCart();
```

}

// ==============================
// حذف منتج
// ==============================

function removeFromCart(index) {

```
if (!cart[index]) return;

cart.splice(index, 1);

saveCart();

updateCart();
```

}

// ==============================
// فتح السلة
// ==============================

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

// ==============================
// إغلاق السلة
// ==============================

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

// ==============================
// الذهاب للدفع
// ==============================

function goToCheckout() {

```
if (cart.length === 0) {

    alert("🛒 السلة فارغة!");

    return;
}


window.location.href =
    "checkout.html";
```

}

// ==============================
// تشغيل الموقع
// ==============================

document.addEventListener(
"DOMContentLoaded",
function () {

```
    // اختيار المقاسات
    document
        .querySelectorAll(".sizes button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    selectSize(this);

                }
            );

        });


    // أزرار إضافة إلى السلة
    document
        .querySelectorAll(".add-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    addProductToCart(this);

                }
            );

        });


    // أزرار السلة
    document
        .getElementById("cartItems")
        ?.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest("button");


                if (!button) return;


                const index =
                    parseInt(button.dataset.index);


                const action =
                    button.dataset.action;


                if (action === "increase") {

                    increaseQuantity(index);

                }

                else if (action === "decrease") {

                    decreaseQuantity(index);

                }

                else if (action === "remove") {

                    removeFromCart(index);

                }

            }
        );


    updateCart();

}
```

);
