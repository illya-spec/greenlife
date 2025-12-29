document.addEventListener('DOMContentLoaded', function() {
    // --- 1. ДАНІ ТА ЗАВАНТАЖЕННЯ ---
const productsData = [
    { id: 1, name: "Бамбукові щітки 4х", price: "<s>120</s> 99", img: "https://ecogrizzly.shop/wp-content/uploads/2020/04/toothbrush-set-4-psc.jpg" },
    { id: 2, name: "Еко-сумка (шопер)", price: 250, img: "https://ecogrizzly.shop/wp-content/uploads/2023/03/24111.webp" },
    { id: 3, name: "Термос вакуумний", price: 450, img: "https://prioritet.com.ua/269319-large_default/termos-mexico-vakuumniy.jpg" },
    { id: 4, name: "Набір залізних трубочок 3х", price: 180, img: "https://holahrechka.com.ua/wp-content/uploads/2020/09/syv-200909-0020-zwl_shop-600.jpg" },
    { id: 5, name: "Натуральний шоколад з кеш'ю", price: 220, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRNue5qTN0-CQ2-K0yld1Sagwl1VDs4AnwysSfYwhYBsA7TcqpwmRQ-mUmYNs60PPjzc9NmkkU3bX-CWRPVaA4MTxRC16OQ-vQg-ogMuFuM34uoIEpkCNG7" },
    { id: 6, name: "Миска з кокосу", price: 250, img: "https://ecogrizzly.shop/wp-content/uploads/2020/10/coconut-plate-1.jpg" },
    { id: 7, name: "Столове приладдя з кокосу", price: "<s>170</s> 150", img: "https://ecogrizzly.shop/wp-content/uploads/2021/03/fork-spoon.jpg" },
    { id: 8, name: "Біорозкладні пакети для сміття 3х", price: 320, img: "https://ecogrizzly.shop/wp-content/uploads/2025/06/21038.jpg" },
    { id: 9, name: "Органічна зубна паста з м'ятою 80 мл", price: 170, img: "https://ecogrizzly.shop/wp-content/uploads/2021/04/dl302.webp" },
    { id: 10, name: "Набір прянощів до глінтвейну", price: "<s>290</s> 269", img: "https://ecogrizzly.shop/wp-content/uploads/2024/10/42506.jpg" },
    { id: 11, name: "Карпатський трав'яний чай 50г", price: 199, img: "https://ecogrizzly.shop/wp-content/uploads/2025/12/58623.jpg" },
    { id: 12, name: "Еко-мило ручної роботи (лаванда)", price: "<s>120</s> 95", img: "https://content1.rozetka.com.ua/goods/images/big/238140048.jpg" },
    { id: 13, name: "Бамбуковий гребінець", price: 140, img: "https://img.joomcdn.net/674f4c6201eb69d74f11664e57f8104cfde1b026_original.jpeg" },
    { id: 14, name: "Свічка з соєвого воску", price: "<s>260</s> 219", img: "https://aromavibe.com.ua/cdn/shop/files/6_f6fff817-2454-4719-bce9-dab35fc79603.png?v=1701418175" },
    { id: 15, name: "Еко-пляшка для води 600 мл", price: 299, img: "https://u.makeup.com.ua/5/5o/5ourvap6lsd3.jpg" },
    { id: 16, name: "Натуральний дезодорант без алюмінію", price: "<s>310</s> 279", img: "https://lip.com.ua/files/products/s2759553-main-zoom_1.1000x.webp" },
    { id: 17, name: "Бавовняні мішечки для покупок 5х", price: 210, img: "https://images.prom.ua/5032270751_w640_h640_5032270751.jpg" },
    { id: 18, name: "Еко-губки для миття посуду 2х", price: "<s>150</s> 119", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT6ZH7Y9NeeBwzpZQQjGdPhG0wY0rc0mKLprJhsUiXXYBmcXUKY6B3LKSzO38bVCJT95Zb7b2hchpOkAB8LhwDa0cfvYdCsJg_7tFAv-o9z02YSwHc0HE3JYTzqW2eEk5sHMcs8yA&usqp=CAc" },
    { id: 19, name: "Металева термочашка", price: 390, img: "https://vip-print.ua/upload/iblock/738/8746-01-01.webp?1693419853" },
    { id: 20, name: "Натуральний бальзам для губ 1х", price: "<s>110</s> 89", img: "https://u.makeup.com.ua/h/hz/hzhwyetl5oyl.jpg" }
];
    let cart = JSON.parse(localStorage.getItem('greenLifeCart')) || [];
    
    function parsePrice(price) {
    if (typeof price === 'number') return price;

    // прибираємо HTML-теги
    const clean = price.replace(/<[^>]*>/g, '');

    // беремо ОСТАННЄ число (ціна зі знижкою)
    const numbers = clean.match(/\d+/g);
    return numbers ? Number(numbers[numbers.length - 1]) : 0;
}

    // --- 2. ЛОГІКА СЛАЙДЕРА ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);

    // --- 3. БРЕНД ТА ГЕНЕРАЦІЯ ТОВАРІВ ---
    document.querySelectorAll('.logo, .footer-info h3').forEach(el => el.innerHTML = 'Green<span>Life</span>');

    const container = document.getElementById('product-container');
    if (container) {
        container.innerHTML = productsData.map(item => `
            <div class="product-card">
                <div class="product-img" style="background-image: url('${item.img}');"></div>
                <h3>${item.name}</h3>
                <p><strong>${item.price} грн</strong></p>
                <button class="buy-btn" data-name="${item.name}" data-price="${item.price}">Купити зараз</button>
            </div>
        `).join('');
    }

    // --- 4. СТВОРЕННЯ КОШИКА (SVG ІКОНКА) ---
    if (!document.getElementById('open-cart')) {
        const cartMarkup = `
            <div id="open-cart" class="cart-widget">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <div id="cart-count" class="cart-count">0</div>
            </div>
            <div id="modal-overlay" class="modal-overlay">
                <div class="modal-content">
                    <span id="close-cart" class="close-modal">&times;</span>
                    <h2 style="color: #2d5a27; margin-bottom: 15px;">Ваше замовлення</h2>
                    <div id="cart-items-list" style="margin: 20px 0; border-bottom: 1px solid #eee; max-height: 250px; overflow-y: auto;"></div>
                    <div style="font-weight: bold; margin-bottom: 20px; font-size: 1.2rem;">Всього: <span id="total-sum">0</span> грн</div>
                    <form id="order-form" class="order-form">
                        <input type="text" placeholder="Ваше ПІБ" required>
                        <input type="text" placeholder="Адреса доставки" required>
                        <input type="text" placeholder="Номер картки" required>
                        <button type="submit" class="submit-order">Оформити замовлення</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cartMarkup);
    }

    // --- 5. ФУНКЦІЯ ОНОВЛЕННЯ ТА ВИДАЛЕННЯ ---
    function updateCart() {
        const countEl = document.getElementById('cart-count');
        const listEl = document.getElementById('cart-items-list');
        const sumEl = document.getElementById('total-sum');
        
        localStorage.setItem('greenLifeCart', JSON.stringify(cart));
        countEl.innerText = cart.length;
        
        if (cart.length === 0) {
            listEl.innerHTML = '<p style="text-align:center; color:#888;">Кошик порожній</p>';
            sumEl.innerText = '0';
        } else {
            listEl.innerHTML = cart.map((item, index) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding: 10px 0; border-bottom: 1px dashed #eee;">
                    <div style="flex: 1;">
                        <div style="font-size: 14px; font-weight: 500;">${item.name}</div>
                        <div style="font-size: 12px; color: #2d5a27;">${item.price} грн</div>
                    </div>
                    <button class="remove-item" data-index="${index}" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:18px; padding: 0 5px;">&times;</button>
                </div>
            `).join('');
            
            const total = cart.reduce((acc, curr) => acc + parsePrice(curr.price), 0);
            sumEl.innerText = total;
        }
    }

    updateCart();

    // --- 6. ОБРОБНИК КЛІКІВ ---
    document.addEventListener('click', function(e) {
        // Навігація
        if (e.target.closest('.slider-container .btn')) {
            e.preventDefault();
            const section = document.getElementById('products');
            if (section) window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
        }

        // Додавання товару
        if (e.target.classList.contains('buy-btn')) {
            const name = e.target.getAttribute('data-name');
            const price = e.target.getAttribute('data-price');
            cart.push({ name, price });
            updateCart();
            const widget = document.getElementById('open-cart');
            widget.style.transform = 'scale(1.2)';
            setTimeout(() => widget.style.transform = 'scale(1)', 200);
        }

        // ВИДАЛЕННЯ ТОВАРУ (Нова функція)
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1); // Видаляємо елемент з масиву за індексом
            updateCart();
        }

        // Модалка
        if (e.target.closest('#open-cart')) document.getElementById('modal-overlay').style.display = 'flex';
        if (e.target.id === 'close-cart' || e.target.id === 'modal-overlay') {
            document.getElementById('modal-overlay').style.display = 'none';
        }
    });

    // Оформлення
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (cart.length === 0) return alert("Кошик порожній!");
        const finalSum = document.getElementById('total-sum').innerText;
        alert(`Дякуємо! Замовлення на ${finalSum} грн прийнято!`);
        cart = [];
        localStorage.removeItem('greenLifeCart');
        updateCart();
        document.getElementById('modal-overlay').style.display = 'none';
    });
    function renderProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = products.map(item => `
        <div class="product-card">
            <div class="product-img" style="background-image: url('${item.img}')"></div>
            <h3>${item.name}</h3>
            <p><strong>${item.price} грн</strong></p>
            <button class="buy-btn" data-name="${item.name}" data-price="${getNumericPrice(item.price)}">
                Купити зараз
            </button>
        </div>
    `).join('');
}

    function getNumericPrice(price) {
    if (typeof price === 'number') return price;

    // витягує ОСТАННЄ число (актуальна ціна після знижки)
    const matches = price.match(/\d+/g);
    return matches ? Number(matches[matches.length - 1]) : 0;
}
const sortSelect = document.getElementById('sort-select');

// копія, щоб не ламати оригінал
let sortedProducts = [...productsData];

sortSelect.addEventListener('change', () => {
    const value = sortSelect.value;

    if (value === 'price-asc') {
        sortedProducts.sort(
            (a, b) => getNumericPrice(a.price) - getNumericPrice(b.price)
        );
    }

    if (value === 'price-desc') {
        sortedProducts.sort(
            (a, b) => getNumericPrice(b.price) - getNumericPrice(a.price)
        );
    }

    if (value === 'popular') {
        sortedProducts = [...productsData]; // повертаємо як було
    }

    renderProducts(sortedProducts);
});

    document.addEventListener("mousemove", function(e){
let x = e.pageX
let y = e.pageY

let dx = window.innerWidth / 2 - x
let dy = window.innerHeight / 2 - y

let angleX = 20 * dx / window.innerWidth
let angleY = 20 * dy / window.innerHeight
document.querySelector('.GLlogo').style.transform = `
rotateX(${angleY}deg) rotateY(${-angleX}deg)`
})
});