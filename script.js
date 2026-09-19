let cart = [];

function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });

    updateCart();

    openCart();
}

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartCount.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>السلة فارغة.</p>
        `;

        cartTotal.textContent = "0 دج";

        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>${item.price} دج</p>
            </div>

            <button onclick="removeFromCart(${index})">
                حذف
            </button>
        `;

        cartItems.appendChild(itemElement);
    });

    cartTotal.textContent = total + " دج";
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function openCart() {

    document.getElementById("cart").classList.add("active");

    document.getElementById("overlay").classList.add("active");
}


function closeCart() {

    document.getElementById("cart").classList.remove("active");

    document.getElementById("overlay").classList.remove("active");
}
