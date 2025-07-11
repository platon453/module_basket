let cartItems = [
    {
        id: 1,
        title: 'Дом, милый дом',
        author: 'Begemot',
        image: 'img/image32.png',
        weight: 0.37,
        stock: 4,
        quantity: 1,
        price: 435,
        discountPrice: 347
    },
    {
        id: 2,
        title: 'Шёпот шахт',
        author: 'Андрей Винтер',
        image: 'img/image34.png',
        weight: 0.17,
        stock: 4,
        quantity: 1,
        price: 447, // Предположим, цена без скидки
        discountPrice: 447
    }
];

function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Очистить контейнер перед рендерингом

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваша корзина пуста</p>';
    } else {
        // Проходим по массиву cartItems и генерируем HTML для каждого товара
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="book-cover">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <p class="author">${item.author}</p>
                    <p class="weight">${item.weight} кг</p>
                    <p class="availability">В наличии ${item.stock} шт.</p>
                </div>
                <div class="item-controls">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <div class="price-info">
                        <span class="old-price">${item.price} ₽</span>
                        <span class="current-price">${item.discountPrice} ₽</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="action-btn" onclick="removeItem(${item.id})">🗑️</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    updateSummary(); // Обновить итоговые суммы
}

function changeQuantity(itemId, delta) {
    const item = cartItems.find(item => item.id === itemId); // Находим товар по id
    if (item) {
        item.quantity += delta; // Увеличиваем или уменьшаем количество
        if (item.quantity <= 0) item.quantity = 1; // Если количество меньше 1, то ставим 1
        renderCart(); // Перерисовываем корзину
    }
}


// Функция для удаления товара из корзины
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId); // Удаляем товар из массива
    renderCart(); // Перерисовываем корзину
}

document.querySelector('.clear-cart').addEventListener('click', () => {
    cartItems = []; // Очищаем корзину
    renderCart(); // Перерисовываем корзину
});



function updateSummary() {
    let total = 0;
    let discount = 0;
    let totalWeight = 0;

    // Проходим по всем товарам в корзине и рассчитываем итоговую сумму
    cartItems.forEach(item => {
        total += item.discountPrice * item.quantity; // Общая цена
        discount += (item.price - item.discountPrice) * item.quantity; // Скидка
        totalWeight += item.weight * item.quantity; // Общий вес
    });

    // Обновляем итоговые данные на странице
    document.querySelector('.total').textContent = `${total} ₽`;
    document.querySelector('.discount').textContent = `- ${discount} ₽`;
    document.querySelector('.total-weight').textContent = `${totalWeight} кг`;
}

// Инициализируем рендеринг корзины при загрузке страницы
renderCart();


document.querySelector('.clear-cart').addEventListener('click', () => {
    cartItems = []; // Очищаем корзину
    renderCart(); // Перерисовываем корзину
});

//frame4
document.querySelectorAll('.person-type-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.person-type-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        toggleForm(tab);
    });
});

function toggleForm(tab) {
    const isLegalPerson = tab.textContent === 'Юридическое лицо';
    document.querySelector('.individual-form').style.display = isLegalPerson ? 'none' : 'block';
    document.querySelector('.legal-form').style.display = isLegalPerson ? 'block' : 'none';
}

document.querySelectorAll('.delivery-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.delivery-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        toggleDeliveryForm(option);
    });
});

function toggleDeliveryForm(option) {
    const deliveryMethod = option.textContent.trim();
    document.querySelector('.pickup-form').style.display = deliveryMethod === 'Самовывоз' ? 'block' : 'none';
    document.querySelector('.courier-form').style.display = deliveryMethod === 'Курьером' ? 'block' : 'none';
    document.querySelector('.postal-form').style.display = deliveryMethod === 'Почтой РФ' ? 'block' : 'none';
}


document.querySelector('.add-legal-btn').addEventListener('click', () => {
    document.querySelector('.modal-overlay').style.display = 'flex';
});

document.querySelector('.modal-close').addEventListener('click', () => {
    document.querySelector('.modal-overlay').style.display = 'none';
});


// Обработчик для кнопки "Перейти к оформлению"
document.querySelector('.go-to-checkout-btn').addEventListener('click', function() {
    // Переход на страницу оформления заказа
    window.location.href = 'frame4.html'; // Замените на путь к вашей странице оформления
});




