document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM ready');

    // DOM Elements
    const productContainer = document.getElementById('product-container');
    const categoryFilter = document.getElementById('category-filter');
    const searchBar = document.getElementById('search-bar');
    const ratingFilter = document.getElementById('rating-filter');
    const priceFilter = document.getElementById('price-filter');
    const cartCount = document.getElementById('cart-count');

    // Sample product data
    const products = [
        { id: 1, name: "UPS Pro 1000", category: "ups", price: 299.99, rating: 4.5, description: "Reliable UPS with 1000VA capacity", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 2, name: "PowerBank 5000", category: "battery", price: 79.99, rating: 4.2, description: "Portable 5000mAh power bank", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 3, name: "InverterMax 3000", category: "inverter", price: 599.99, rating: 4.8, description: "High-capacity 3000W inverter", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 4, name: "UPS Lite 500", category: "ups", price: 149.99, rating: 3.9, description: "Compact UPS with 500VA capacity", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 5, name: "MegaBattery 10000", category: "battery", price: 129.99, rating: 4.6, description: "High-capacity 10000mAh power bank", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 6, name: "InverterPro 1500", category: "inverter", price: 399.99, rating: 4.3, description: "Professional-grade 1500W inverter", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 7, name: "SolarPanel 200W", category: "solar", price: 249.99, rating: 4.7, description: "High-efficiency 200W solar panel", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 8, name: "UPS Enterprise 2000", category: "ups", price: 499.99, rating: 4.9, description: "Enterprise-grade UPS with 2000VA capacity", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 9, name: "PowerStation 50000", category: "battery", price: 599.99, rating: 4.8, description: "Portable power station with 50000mAh capacity", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 10, name: "SolarInverter 5000", category: "inverter", price: 799.99, rating: 4.6, description: "5000W solar inverter for off-grid systems", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 11, name: "SolarKit 500W", category: "solar", price: 999.99, rating: 4.5, description: "Complete 500W solar kit with panels and inverter", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
        { id: 12, name: "UPS Rack 3000", category: "ups", price: 899.99, rating: 4.7, description: "Rack-mountable UPS with 3000VA capacity", image: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e5b00ec3-f36e-4782-b75e-f2a958a5e68b_Eco-Watt-NEO.png" },
    ];

    // Render Products
    function renderProducts(filteredProducts) {
        productContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-rating">Rating: ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }

    // Filter Products
    function filterProducts() {
        const category = categoryFilter.value;
        const searchTerm = searchBar.value.toLowerCase();
        const minRating = parseFloat(ratingFilter.value) || 0;
        const priceRange = priceFilter.value;

        let filteredProducts = products.filter(product => {
            const categoryMatch = category === 'all' || product.category === category;
            const searchMatch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
            const ratingMatch = product.rating >= minRating;
            let priceMatch = true;

            if (priceRange !== 'all') {
                const [min, max] = priceRange.split('-').map(Number);
                priceMatch = product.price >= min && (max ? product.price <= max : true);
            }

            return categoryMatch && searchMatch && ratingMatch && priceMatch;
        });

        renderProducts(filteredProducts);
    }

    // Event Listeners for Filters
    categoryFilter.addEventListener('change', filterProducts);
    searchBar.addEventListener('input', filterProducts);
    ratingFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);

    // Initial render
    renderProducts(products);

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            console.log('Product added to cart:', product);
        }
    }

    productContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            console.log('Add to cart clicked for product ID:', productId);
            addToCart(productId);
            e.target.textContent = 'Added to Cart';
            e.target.disabled = true;
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
                e.target.disabled = false;
            }, 2000);
        }
    });

    // Initialize cart count
    updateCartCount();
});