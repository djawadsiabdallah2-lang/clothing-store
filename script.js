let cart = [];

// إضافة منتج إلى السلة
function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}


// تحديث السلة
function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    // حساب عدد جميع القطع
    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    cartCount.textContent = totalQuantity;


    // السلة فارغة
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>السلة فارغة.</p>
        `;

        cartTotal.textContent = "0 دج";

        return;
    }


    let total = 0;

    cartItems.innerHTML = "";


    // عرض المنتجات
    cart.forEach((item, index) => {

        total += item.price * item.quantity;


        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";


        itemElement.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ${item.price} دج
                </p>

                <div class="quantity">

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                </div>

            </div>


            <button onclick="removeFromCart(${index})">
                حذف
            </button>

        `;


        cartItems.appendChild(itemElement);

    });


    cartTotal.textContent = total + " دج";
}


// زيادة الكمية
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// إنقاص الكمية
function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


// حذف المنتج
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// فتح السلة
function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");
}


// إغلاق السلة
function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");
}
