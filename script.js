// ========================================
// السلة
// ========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ========================================
// حفظ السلة
// ========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ========================================
// اختيار المقاس
// ========================================

function selectSize(button) {

    if (!button) {
        return;
    }


    const product =
        button.closest(".product");


    if (!product) {
        return;
    }


    const buttons =
        product.querySelectorAll(".sizes button");


    buttons.forEach(function (btn) {

        btn.classList.remove("selected");

    });


    button.classList.add("selected");

}


// ========================================
// إضافة المنتج
// ========================================

function addProductToCart(name, price, button) {

    if (!button) {
        return;
    }


    const product =
        button.closest(".product");


    if (!product) {

        alert("حدث خطأ في المنتج.");

        return;
    }


    const selectedSize =
        product.querySelector(
            ".sizes button.selected"
        );


    if (!selectedSize) {

        alert("⚠️ اختر المقاس أولاً");

        return;
    }


    const size =
        selectedSize.textContent.trim();


    addToCart(
        name,
        price,
        size
    );

}


// ========================================
// إضافة إلى السلة
// ========================================

function addToCart(name, price, size) {

    const existingProduct =
        cart.find(function (item) {

            return (
                item.name === name &&
                item.size === size
            );

        });


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) + 1;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            size: size,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


// ========================================
// تحديث السلة
// ========================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartCount =
        document.getElementById("cartCount");


    const cartTotal =
        document.getElementById("cartTotal");


    if (
        !cartItems ||
        !cartCount ||
        !cartTotal
    ) {

        return;

    }


    cartItems.innerHTML = "";


    let totalQuantity = 0;

    let totalPrice = 0;


    // ====================================
    // السلة فارغة
    // ====================================

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>السلة فارغة.</p>";


        cartCount.textContent =
            "0";


        cartTotal.textContent =
            "0 دج";


        return;

    }


    // ====================================
    // عرض المنتجات
    // ====================================

    cart.forEach(function (item, index) {

        const quantity =
            Number(item.quantity) || 1;


        const price =
            Number(item.price) || 0;


        totalQuantity += quantity;


        totalPrice +=
            price * quantity;


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
                    السعر: ${price} دج
                </p>


                <div class="quantity">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>


                    <span>
                        ${quantity}
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


        cartItems.appendChild(
            itemElement
        );

    });


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        totalPrice + " دج";

}


// ========================================
// زيادة الكمية
// ========================================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(cart[index].quantity) + 1;


    saveCart();

    updateCart();

}


// ========================================
// إنقاص الكمية
// ========================================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(cart[index].quantity) - 1;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


// ========================================
// حذف المنتج
// ========================================

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    saveCart();

    updateCart();

}


// ========================================
// فتح السلة
// ========================================

function openCart() {

    const cartElement =
        document.getElementById("cart");


    const overlay =
        document.getElementById("overlay");


    if (
        !cartElement ||
        !overlay
    ) {

        return;

    }


    cartElement.classList.add(
        "active"
    );


    overlay.classList.add(
        "active"
    );

}


// ========================================
// إغلاق السلة
// ========================================

function closeCart() {

    const cartElement =
        document.getElementById("cart");


    const overlay =
        document.getElementById("overlay");


    if (
        !cartElement ||
        !overlay
    ) {

        return;

    }


    cartElement.classList.remove(
        "active"
    );


    overlay.classList.remove(
        "active"
    );

}


// ========================================
// إتمام الطلب
// ========================================

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "🛒 السلة فارغة! أضف منتجًا أولاً."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// ========================================
// تشغيل الموقع
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // تحديث السلة

        updateCart();


        // ====================================
        // أزرار المقاسات
        // ====================================

        document
            .querySelectorAll(".sizes button")
            .forEach(function (button) {


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        selectSize(this);

                    }
                );

            });


        // ====================================
        // أزرار إضافة المنتج
        // ====================================

        document
            .querySelectorAll(".add-button")
            .forEach(function (button) {


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const product =
                            this.closest(".product");


                        if (!product) {
                            return;
                        }


                        const selectedSize =
                            product.querySelector(
                                ".sizes button.selected"
                            );


                        if (!selectedSize) {

                            alert(
                                "⚠️ اختر المقاس أولاً"
                            );

                            return;
                        }


                        const nameElement =
                            product.querySelector(
                                ".product-info h3"
                            );


                        const priceElement =
                            product.querySelector(
                                ".product-info strong"
                            );


                        if (
                            !nameElement ||
                            !priceElement
                        ) {

                            alert(
                                "حدث خطأ في بيانات المنتج."
                            );

                            return;
                        }


                        const name =
                            nameElement
                                .textContent
                                .trim();


                        const priceText =
                            priceElement
                                .textContent
                                .replace(
                                    "دج",
                                    ""
                                )
                                .replace(
                                    /\s/g,
                                    ""
                                );


                        const price =
                            parseInt(
                                priceText,
                                10
                            );


                        if (isNaN(price)) {

                            alert(
                                "حدث خطأ في سعر المنتج."
                            );

                            return;
                        }


                        // إضافة واحدة فقط

                        addToCart(
                            name,
                            price,
                            selectedSize
                                .textContent
                                .trim()
                        );

                    }
                );

            });

    }
);

