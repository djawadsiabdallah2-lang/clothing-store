// ========================================
// STYLE - نظام المتجر والسلة
// 30 منتجًا
// ========================================

const products = [

    // 👕 تيشيرتات
    {
        id: 1,
        name: "تيشيرت أسود كلاسيكي",
        price: 1800,
        type: "shirt",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 2,
        name: "تيشيرت أبيض Basic",
        price: 1700,
        type: "shirt",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 3,
        name: "تيشيرت Oversize أسود",
        price: 2200,
        type: "shirt",
        sizes: ["M", "L", "XL"]
    },

    {
        id: 4,
        name: "تيشيرت Oversize أبيض",
        price: 2200,
        type: "shirt",
        sizes: ["M", "L", "XL"]
    },

    {
        id: 5,
        name: "تيشيرت رمادي Urban",
        price: 2000,
        type: "shirt",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 6,
        name: "تيشيرت أزرق Navy",
        price: 2100,
        type: "shirt",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 7,
        name: "تيشيرت Graphic أسود",
        price: 2500,
        type: "shirt",
        sizes: ["M", "L", "XL"]
    },

    {
        id: 8,
        name: "تيشيرت Streetwear بيج",
        price: 2400,
        type: "shirt",
        sizes: ["M", "L", "XL"]
    },


    // 👖 بناطيل
    {
        id: 9,
        name: "بنطال Cargo أسود",
        price: 4200,
        type: "jeans",
        sizes: ["30", "32", "34", "36"]
    },

    {
        id: 10,
        name: "بنطال Cargo بيج",
        price: 4200,
        type: "jeans",
        sizes: ["30", "32", "34", "36"]
    },

    {
        id: 11,
        name: "بنطال Jeans أزرق",
        price: 4500,
        type: "jeans",
        sizes: ["30", "32", "34", "36"]
    },

    {
        id: 12,
        name: "بنطال Jeans أسود",
        price: 4500,
        type: "jeans",
        sizes: ["30", "32", "34", "36"]
    },

    {
        id: 13,
        name: "بنطال Jogger رمادي",
        price: 3500,
        type: "jeans",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 14,
        name: "بنطال Jogger أسود",
        price: 3500,
        type: "jeans",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 15,
        name: "بنطال Wide Leg أسود",
        price: 4800,
        type: "jeans",
        sizes: ["S", "M", "L", "XL"]
    },


    // 🧥 جاكيتات
    {
        id: 16,
        name: "جاكيت Bomber أسود",
        price: 6500,
        type: "jacket",
        sizes: ["M", "L", "XL"]
    },

    {
        id: 17,
        name: "جاكيت Denim أزرق",
        price: 7000,
        type: "jacket",
        sizes: ["M", "L", "XL"]
    },

    {
        id: 18,
        name: "جاكيت Puffer أسود",
        price: 8500,
        type: "jacket",
        sizes: ["M", "L", "XL"]
    },

    {
        id: 19,
        name: "جاكيت Varsity أسود وأبيض",
        price: 7500,
        type: "jacket",
        sizes: ["M", "L", "XL"]
    },

    {
        id: 20,
        name: "جاكيت Windbreaker رمادي",
        price: 6000,
        type: "jacket",
        sizes: ["M", "L", "XL"]
    },


    // 🩳 شورتات
    {
        id: 21,
        name: "شورت Cargo أسود",
        price: 2800,
        type: "shorts",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 22,
        name: "شورت Cargo بيج",
        price: 2800,
        type: "shorts",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 23,
        name: "شورت رياضي رمادي",
        price: 2200,
        type: "shorts",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: 24,
        name: "شورت Denim أزرق",
        price: 3000,
        type: "shorts",
        sizes: ["S", "M", "L", "XL"]
    },


    // 👟 أحذية
    {
        id: 25,
        name: "حذاء Street أسود",
        price: 7500,
        type: "shoe",
        sizes: ["40", "41", "42", "43", "44"]
    },

    {
        id: 26,
        name: "حذاء Casual أبيض",
        price: 8000,
        type: "shoe",
        sizes: ["40", "41", "42", "43", "44"]
    },

    {
        id: 27,
        name: "حذاء Sport رمادي",
        price: 8500,
        type: "shoe",
        sizes: ["40", "41", "42", "43", "44"]
    },


    // 🧢 إكسسوارات
    {
        id: 28,
        name: "قبعة Baseball سوداء",
        price: 1800,
        type: "cap",
        sizes: ["مقاس موحد"]
    },

    {
        id: 29,
        name: "حقيبة Crossbody سوداء",
        price: 2500,
        type: "bag",
        sizes: ["مقاس موحد"]
    },

    {
        id: 30,
        name: "حقيبة ظهر Urban",
        price: 4000,
        type: "bag",
        sizes: ["مقاس موحد"]
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

    const grid =
        document.getElementById("products");

    if (!grid) {
        return;
    }


    grid.innerHTML = products.map(function(product) {

        return `

            <article
                class="product"
                data-id="${product.id}"
            >

                <div class="visual">

                    <div class="shape ${product.type}"></div>

                </div>


                <div class="info">

                    <h3>
                        ${product.name}
                    </h3>


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
    // أحداث المنتجات
    // ========================================

    document
        .querySelectorAll(".product")
        .forEach(function(card) {


            const sizeButtons =
                card.querySelectorAll(".sizes button");


            // اختيار المقاس
            sizeButtons.forEach(function(button) {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();
                        event.stopPropagation();


                        sizeButtons.forEach(
                            function(btn) {

                                btn.classList.remove(
                                    "selected"
                                );

                            }
                        );


                        button.classList.add(
                            "selected"
                        );

                    }
                );

            });


            // ========================================
            // إضافة للسلة
            // ========================================

            const addButton =
                card.querySelector(".add");


            addButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();


                    const productId =
                        Number(card.dataset.id);


                    const product =
                        products.find(
                            function(item) {

                                return item.id === productId;

                            }
                        );


                    if (!product) {
                        return;
                    }


                    const selectedSize =
                        card.querySelector(
                            ".sizes button.selected"
                        );


                    if (!selectedSize) {

                        alert(
                            "⚠️ اختر المقاس أولاً"
                        );

                        return;
                    }


                    const size =
                        selectedSize.dataset.size;


                    // نفس المنتج + نفس المقاس
                    const existing =
                        cart.find(
                            function(item) {

                                return (
                                    item.id === product.id &&
                                    item.size === size
                                );

                            }
                        );


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

                }
            );

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


    if (
        !items ||
        !count ||
        !totalElement
    ) {

        return;

    }


    let total = 0;

    let quantity = 0;


    // ========================================
    // السلة فارغة
    // ========================================

    if (cart.length === 0) {

        items.innerHTML = `

            <div class="empty">

                🛒
                <br>

                السلة فارغة

            </div>

        `;


        count.textContent = "0";

        totalElement.textContent = "0 دج";

        return;

    }


    // ========================================
    // المنتجات داخل السلة
    // ========================================

    items.innerHTML =
        cart.map(function(item, index) {


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


    // ========================================
    // تحديث العدد والمجموع
    // ========================================

    count.textContent =
        quantity;


    totalElement.textContent =
        money(total);


    // ========================================
    // حذف
    // ========================================

    items
        .querySelectorAll("[data-remove]")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(button.dataset.remove);


                    cart.splice(index, 1);


                    saveCart();

                    renderCart();

                }
            );

        });


    // ========================================
    // زيادة
    // ========================================

    items
        .querySelectorAll("[data-plus]")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(button.dataset.plus);


                    if (!cart[index]) {
                        return;
                    }


                    cart[index].qty += 1;


                    saveCart();

                    renderCart();

                }
            );

        });


    // ========================================
    // نقصان
    // ========================================

    items
        .querySelectorAll("[data-minus]")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

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

                }
            );

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
// إتمام الطلب
// ========================================

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "🛒 السلة فارغة! أضف منتجًا أولاً."
        );

        return;

    }


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

