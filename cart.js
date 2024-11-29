document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartCount = document.getElementById('cart-count');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItems.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);

            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function updateQuantity(index, newQuantity) {
        if (newQuantity < 1) newQuantity = 1;
        cart[index].quantity = newQuantity;
        updateCart();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    cartItems.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (e.target.classList.contains('quantity-btn')) {
            const currentQuantity = cart[index].quantity;
            if (e.target.classList.contains('minus')) {
                updateQuantity(index, currentQuantity - 1);
            } else if (e.target.classList.contains('plus')) {
                updateQuantity(index, currentQuantity + 1);
            }
        } else if (e.target.classList.contains('remove-item')) {
            removeItem(index);
        }
    });

    cartItems.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const newQuantity = parseInt(e.target.value);
            const index = parseInt(e.target.dataset.index);
            if (isNaN(newQuantity) || newQuantity < 1) {
                e.target.value = 1;
            } else {
                updateQuantity(index, newQuantity);
            }
        }
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout. This feature is not implemented in this demo.');
    });

    updateCart();
});