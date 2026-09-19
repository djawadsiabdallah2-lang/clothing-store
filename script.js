let cart = [];


// ==========================
// اختيار المقاس
// ==========================

function selectSize(button) {

    // الحصول على أزرار المقاسات
    const sizeButtons =
        button.parentElement.querySelectorAll("button");

    // إزالة الاختيار من جميع المقاسات
    sizeButtons.forEach(function (btn) {
        btn.classList.remove("selected");
    });

    // تحديد المقاس الذي ضغطنا عليه
    button.classList.add("selected");
}


// ==========================
// إضافة المنتج إلى السلة
// ==========================

function addProductToCart(name, price, button) {

    const product = button.closest(".product");

    const selectedSize =
        product.querySelector(".sizes button.selected");


    if (!selectedSize) {

        alert("⚠️ اختر المقاس أولاً");

        return;
    }


    const size =
        selectedSize.textContent.trim();


    addToCart(name, price, size);
}


// ==========================
// إضافة للسلة
// ==========================

function addToCart(name, price, size) {

    const existingProduct = cart.find(function (item) {

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


    updateCart();

    openCart();
}


// ==========================
// تحديث السلة
// ==========================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    let totalQuantity = 0;

    let totalPrice = 0;


    cartItems.innerHTML = "";


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
                    ${item.price} دج
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
}


// ==========================
// زيادة الكمية
// ==========================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// ==========================
// إنقاص الكمية
// ==========================

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


// ==========================
// حذف المنتج
// ==========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ==========================
// فتح السلة
// ==========================

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");


    document
        .getElementById("overlay")
        .classList.add("active");
}


// ==========================
// إغلاق السلة
// ==========================

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");


    document
        .getElementById("overlay")
        .classList.remove("active");
}
