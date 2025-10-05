const products = [
            { id: 1, name: "Adire Boubou Gown", category: "women", price: 35000, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800", badge: "Best Seller" },
            { id: 2, name: "Men's Adire Kaftan", category: "men", price: 42000, image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800" },
            { id: 3, name: "Adire Two-Piece Set", category: "women", price: 38500, image: "https://images.unsplash.com/photo-1558769132-cb1aea3c6baa?w=800", badge: "New" },
            { id: 4, name: "Traditional Adire Dress", category: "women", price: 32000, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" },
            { id: 5, name: "Men's Adire Shirt", category: "men", price: 25000, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800" },
            { id: 6, name: "Adire Maxi Dress", category: "women", price: 40000, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800" },
            { id: 7, name: "Kids Adire Outfit", category: "kids", price: 18000, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", badge: "New" },
            { id: 8, name: "Adire Bag Set", category: "accessories", price: 15000, image: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=800" },
        ];

        let cart = [];
        let isLoggedIn = false;

        function renderProducts() {
            const section = document.getElementById('productsSection');
            const categoryFilter = document.getElementById('categoryFilter').value;
            const filtered = categoryFilter === 'all' ? products : products.filter(p => p.category === categoryFilter);
            const categories = { men: "Men's Collection", women: "Women's Collection", kids: "Kids Collection", accessories: "Accessories" };
            const grouped = {};
            filtered.forEach(p => { if (!grouped[p.category]) grouped[p.category] = []; grouped[p.category].push(p); });
            section.innerHTML = Object.keys(grouped).map(cat => `<div class="category-section"><h2 class="category-title">${categories[cat]}</h2><div class="products-grid">${grouped[cat].map(p => `<div class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}">${p.badge ? `<div class="product-badge ${p.badge === 'New' ? 'new' : ''}">${p.badge}</div>` : ''}</div><div class="product-info"><h4>${p.name}</h4><p class="product-category">${categories[p.category]}</p><div class="product-price">₦${p.price.toLocaleString()}</div><button class="add-to-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button></div></div>`).join('')}</div></div>`).join('');
        }

        function addToCart(productId) {
            if (!isLoggedIn) { document.getElementById('loginModal').classList.add('active'); return; }
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCart();
            document.getElementById('cartSidebar').classList.add('active');
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartCount = document.getElementById('cartCount');
            const cartTotal = document.getElementById('cartTotal');
            cartCount.textContent = cart.length;
            if (cart.length === 0) { cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>'; cartTotal.textContent = '₦0'; return; }
            cartItems.innerHTML = cart.map((item, index) => `<div class="cart-item"><img src="${item.image}" class="cart-item-img" alt="${item.name}"><div class="cart-item-info"><h4>${item.name}</h4><p class="cart-item-price">₦${item.price.toLocaleString()}</p><span class="remove-item" onclick="removeFromCart(${index})">Remove</span></div></div>`).join('');
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartTotal.textContent = `₦${total.toLocaleString()}`;
        }

        function removeFromCart(index) { cart.splice(index, 1); updateCart(); }

        document.getElementById('loginForm').addEventListener('submit', (e) => { e.preventDefault(); isLoggedIn = true; document.getElementById('loginModal').classList.remove('active'); alert('Successfully logged in!'); });
        document.getElementById('cartIcon').addEventListener('click', () => { document.getElementById('cartSidebar').classList.add('active'); });
        document.getElementById('closeCart').addEventListener('click', () => { document.getElementById('cartSidebar').classList.remove('active'); });
        document.getElementById('userIcon').addEventListener('click', () => { if (!isLoggedIn) document.getElementById('loginModal').classList.add('active'); });
        document.getElementById('checkoutBtn').addEventListener('click', () => { if (!isLoggedIn) { document.getElementById('cartSidebar').classList.remove('active'); document.getElementById('loginModal').classList.add('active'); } else { alert('Proceeding to checkout...'); } });
        document.getElementById('categoryFilter').addEventListener('change', renderProducts);
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            const mobileNav = document.getElementById('mobileNav');
            const menuIcon = document.getElementById('menuIcon');
            const closeIcon = document.getElementById('closeIcon');
            mobileNav.classList.toggle('active');
            if (mobileNav.classList.contains('active')) { menuIcon.style.display = 'none'; closeIcon.style.display = 'block'; } else { menuIcon.style.display = 'block'; closeIcon.style.display = 'none'; }
        });
        window.addEventListener('click', (e) => { if (e.target === document.getElementById('loginModal')) document.getElementById('loginModal').classList.remove('active'); });
        renderProducts();