document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    const showSlide = (index) => {
        const slidesContainer = document.querySelector('.slides');
        currentSlide = index < 0 ? totalSlides - 1 : index % totalSlides;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);

    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    let activePopup = null;

    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const popup = document.getElementById(button.getAttribute('aria-controls'));
            
            if (activePopup && activePopup !== popup) {
                activePopup.classList.remove('active');
                activePopup.previousElementSibling.setAttribute('aria-expanded', 'false');
            }

            popup.classList.toggle('active');
            const isExpanded = popup.classList.contains('active');
            button.setAttribute('aria-expanded', isExpanded);
            
            if (isExpanded) {
                activePopup = popup;
                ensurePopupVisibility(popup);
            } else {
                activePopup = null;
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (activePopup && !e.target.closest('.item-box')) {
            activePopup.classList.remove('active');
            activePopup.previousElementSibling.setAttribute('aria-expanded', 'false');
            activePopup = null;
        }
    });

    function ensurePopupVisibility(popup) {
        const rect = popup.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        
        if (rect.bottom > viewHeight) {
            window.scrollBy(0, rect.bottom - viewHeight);
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activePopup) {
            activePopup.classList.remove('active');
            activePopup.previousElementSibling.setAttribute('aria-expanded', 'false');
            activePopup = null;
        }
    });
});


// Add to cart functionality
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const itemBox = button.closest('.item-box');
        const item = {
            name: itemBox.querySelector('.item-title').textContent,
            price: parseFloat(itemBox.querySelector('.price-tag').textContent.replace('$', '')),
            image: itemBox.querySelector('img').src,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
    });
});