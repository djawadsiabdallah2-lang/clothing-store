let cart = [];


// =========================
// اختيار المقاس
// =========================

function selectSize(button) {

    const parent = button.parentElement;

    const buttons = parent.querySelectorAll("button");

    buttons.forEach(function (btn) {

        btn.classList.remove("selected");

    });


    button.classList.add("selected");
}



// =========================
// إضافة المنتج للسلة
// =========================

function addProductToCart(name, price, button) {

    const product = button.closest(".product");

    const selectedButton =
        product.querySelector(".sizes .selected");


    // التأكد من اختيار المقاس

    if (!selectedButton) {

        alert("يرجى اختيار المقاس أولاً.");

        return;
    }


    const size =
        selectedButton.textContent.trim();


    addToCart(
        name,
        price,
        size
    );
}



// =========================
// إضافة للسلة
// =========================

function addToCart(name, price, size) {

    const existingProduct = cart.find(function (item) {

        return (
            item.name === name &&
            item.size === size
        );

    });


    // إذا كان المنتج والمقاس موجودين
    // نزيد الكمية فقط

    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

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



// =========================
// تحديث السلة
// =========================

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



    // السلة فارغة

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>السلة فارغة.</p>
        `;


        cartCount.textContent = "0";

        cartTotal.textContent = "0 دج";

        return;
    }



    // عرض المنتجات

    cart.forEach(function (item, index) {


        totalQuantity +=
            item.quantity;


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
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                onclick="removeFromCart(${index})"
            >
                حذف
            </button>

        `;


        cartItems.appendChild(itemElement);

    });



    // تحديث العدد

    cartCount.textContent =
        totalQuantity;


    // تحديث السعر

    cartTotal.textContent =
        totalPrice + " دج";
}



// =========================
// زيادة الكمية
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}



// =========================
// إنقاص الكمية
// =========================

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}



// =========================
// حذف المنتج
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}



// =========================
// فتح السلة
// =========================

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");


    document
        .getElementById("overlay")
        .classList.add("active");
}



// =========================
// إغلاق السلة
// =========================

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");


    document
        .getElementById("overlay")
        .classList.remove("active");
}
