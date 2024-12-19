// Initialize cart data if it's not already stored
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

function addToCart(productName, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    if (quantity > 0) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const item = { name: productName, price: price, quantity: quantity };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSummary();
    } else {
        alert("Please select a valid quantity.");
    }
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let totalItems = 0;
    let totalPrice = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let cartHtml = '';
    cart.forEach(item => {
        cartHtml += `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
    });

    document.getElementById('cart-items').innerHTML = cartHtml;
    updateCartSummary();
}

function checkout() {
    alert("Thank you for your purchase!");
    localStorage.setItem('cart', JSON.stringify([])); // Clear the cart
    loadCartItems();
}

// Call updateCartSummary when the page loads to show the current cart status
if (document.body.id === 'index') {
    updateCartSummary();
} else if (document.body.id === 'cart') {
    loadCartItems();
}
