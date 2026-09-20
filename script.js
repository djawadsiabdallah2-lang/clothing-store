// ========================================
// STYLE - نظام السلة الكامل
// ========================================

const products = [
    {
        id: 1,
        name: "تيشيرت أسود كلاسيكي",
        price: 2500,
        type: "shirt",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "بنطال جينز عصري",
        price: 4500,
        type: "jeans",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "جاكيت أسود فاخر",
        price: 7500,
        type: "jacket",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 4,
        name: "حذاء رياضي",
        price: 6500,
        type: "shoe",
        sizes: ["39", "40", "41", "42"]
    }
];


// ========================================
// قراءة السلة
// ========================================

let cart = JSON.parse(
    localStorage.getItem("style_cart") || "[]"
);


// ========================================
// السعر
// ========================================

function money(number) {
    return Number(number).toLocaleString("fr-FR") + " دج";
}


// ========================================
// حفظ السلة
// ========================================

function saveCart() {
    localStorage.setItem(
        "style_cart",
        JSON.stringify(cart)
    );
}


// ========================================
// عرض المنتجات
// ========================================

function renderProducts() {

    const grid = document.getElementById("products");

    if (!grid) {
        return;
    }

    grid.innerHTML = products.map(function(product) {

        return `
            <article class="product" data-id="${product.id}">

                <div class="visual">

                    <div class="shape ${product.type}"></div>

                </div>

                <div class="info">

                    <h3>${product.name}</h3>

                    <div class="price">
                        ${money(product.price)}
                    </div>

                    <div class="sizes">

                        ${product.sizes.map(function(size) {

                            return `
                                <button
                                    type="button"
                                    data-size="${size}"
                                >
                                    ${size}
                                </button>
                            `;

                        }).join("")}

                    </div>

                    <button
                        type="button"
                        class="add"
                    >
                        إضافة إلى السلة
                    </button>

                </div>

            </article>
        `;

    }).join("");


    // ========================================
    // أحداث المقاسات
    // ========================================

    document
        .querySelectorAll(".product")
        .forEach(function(card) {

            const sizeButtons =
                card.querySelectorAll(".sizes button");

            sizeButtons.forEach(function(button) {

                button.addEventListener("click", function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    sizeButtons.forEach(function(btn) {
                        btn.classList.remove("selected");
                    });

                    button.classList.add("selected");

                });

            });


            // ========================================
            // زر إضافة للسلة
            // ========================================

            const addButton =
                card.querySelector(".add");

            addButton.addEventListener("click", function(event) {

                event.preventDefault();
                event.stopPropagation();

                const productId =
                    Number(card.dataset.id);

                const product =
                    products.find(function(item) {
                        return item.id === productId;
                    });

                const selectedSize =
                    card.querySelector(".sizes button.selected");


                if (!selectedSize) {

                    alert("⚠️ اختر المقاس أولاً");

                    return;
                }


                const size =
                    selectedSize.dataset.size;


                // نفس المنتج + نفس المقاس
                const existing =
                    cart.find(function(item) {

                        return (
                            item.id === product.id &&
                            item.size === size
                        );

                    });


                if (existing) {

                    existing.qty += 1;

                } else {

                    cart.push({

                        id: product.id,

                        name: product.name,

                        price: product.price,

                        size: size,

                        qty: 1

                    });

                }


                saveCart();

                renderCart();

                openCart();

            });

        });

}


// ========================================
// عرض السلة
// ========================================

function renderCart() {

    const items =
        document.getElementById("items");

    const count =
        document.getElementById("count");

    const totalElement =
        document.getElementById("total");


    if (!items || !count || !totalElement) {
        return;
    }


    let total = 0;
    let quantity = 0;


    if (cart.length === 0) {

        items.innerHTML = `
            <div class="empty">
                🛒<br>
                السلة فارغة
            </div>
        `;

        count.textContent = "0";

        totalElement.textContent = "0 دج";

        return;
    }


    items.innerHTML = cart.map(function(item, index) {

        const itemQuantity =
            Number(item.qty) || 1;

        const itemPrice =
            Number(item.price) || 0;

        const itemTotal =
            itemPrice * itemQuantity;


        total += itemTotal;

        quantity += itemQuantity;


        return `
            <div class="cartItem">

                <div class="cartItemTop">

                    <h4>
                        ${item.name}
                    </h4>

                    <button
                        type="button"
                        class="remove"
                        data-remove="${index}"
                    >
                        حذف
                    </button>

                </div>

                <p>
                    المقاس: ${item.size}
                </p>

                <p>
                    السعر: ${money(item.price)}
                </p>

                <div class="qty">

                    <button
                        type="button"
                        data-minus="${index}"
                    >
                        −
                    </button>

                    <b>
                        ${itemQuantity}
                    </b>

                    <button
                        type="button"
                        data-plus="${index}"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

    }).join("");


    count.textContent =
        quantity;

    totalElement.textContent =
        money(total);


    // حذف
    items
        .querySelectorAll("[data-remove]")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const index =
                    Number(button.dataset.remove);

                cart.splice(index, 1);

                saveCart();

                renderCart();

            });

        });


    // زيادة
    items
        .querySelectorAll("[data-plus]")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const index =
                    Number(button.dataset.plus);

                if (!cart[index]) {
                    return;
                }

                cart[index].qty += 1;

                saveCart();

                renderCart();

            });

        });


    // نقصان
    items
        .querySelectorAll("[data-minus]")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const index =
                    Number(button.dataset.minus);

                if (!cart[index]) {
                    return;
                }

                cart[index].qty -= 1;


                if (cart[index].qty <= 0) {

                    cart.splice(index, 1);

                }


                saveCart();

                renderCart();

            });

        });

}


// ========================================
// فتح السلة
// ========================================

function openCart() {

    const cartElement =
        document.getElementById("cart");

    const shade =
        document.getElementById("shade");


    if (cartElement) {
        cartElement.classList.add("on");
    }

    if (shade) {
        shade.classList.add("on");
    }

}


// ========================================
// إغلاق السلة
// ========================================

function closeCart() {

    const cartElement =
        document.getElementById("cart");

    const shade =
        document.getElementById("shade");


    if (cartElement) {
        cartElement.classList.remove("on");
    }

    if (shade) {
        shade.classList.remove("on");
    }

}


// ========================================
// الذهاب للدفع
// ========================================

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "🛒 السلة فارغة! أضف منتجًا أولاً."
        );

        return;
    }


    // نتأكد أن السلة محفوظة
    saveCart();


    window.location.href =
        "checkout.html";

}


// ========================================
// تشغيل الموقع
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderProducts();

        renderCart();


        const cartOpen =
            document.getElementById("cartOpen");

        const cartClose =
            document.getElementById("cartClose");

        const shade =
            document.getElementById("shade");

        const checkout =
            document.getElementById("checkout");


        if (cartOpen) {

            cartOpen.addEventListener(
                "click",
                openCart
            );

        }


        if (cartClose) {

            cartClose.addEventListener(
                "click",
                closeCart
            );

        }


        if (shade) {

            shade.addEventListener(
                "click",
                closeCart
            );

        }


        if (checkout) {

            checkout.addEventListener(
                "click",
                goToCheckout
            );

        }

    }
);

