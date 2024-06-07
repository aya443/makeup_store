document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Rouge à lèvres A", type: "rouge", price: 15, img: "rouge1.jpg" },
        { id: 2, name: "Rouge à lèvres B", type: "rouge", price: 18, img: "rouge2.jpg" },
        { id: 3, name: "Rouge à lèvres C", type: "rouge", price: 20, img: "rouge3.jpg" },
        { id: 4, name: "Fond de teint A", type: "fond", price: 25, img: "fond1.jpg" },
        { id: 5, name: "Fond de teint B", type: "fond", price: 30, img: "fond2.jpg" },
        { id: 6, name: "Fond de teint C", type: "fond", price: 35, img: "fond3.jpg" },
        { id: 7, name: "Poudre A", type: "poudre", price: 22, img: "poudre1.jpg" },
        { id: 8, name: "Poudre B", type: "poudre", price: 28, img: "poudre2.jpg" },
        { id: 9, name: "Poudre C", type: "poudre", price: 32, img: "poudre3.jpg" }
    ];

    const cart = [];
    const cartItemsElement = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    function displayProducts(filteredProducts) {
        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}€</p>
                <button onclick="addToCart(${product.id})">Ajouter au panier</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.textContent = `${item.name} - ${item.price}€`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Supprimer';
            removeButton.onclick = () => {
                removeFromCart(item.id);
            };
            cartItemElement.appendChild(removeButton);
            cartItemsElement.appendChild(cartItemElement);
        });
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.textContent = totalPrice;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
    }

    function removeFromCart(productId) {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
            updateCart();
        }
    }

    document.getElementById('toggleCart').addEventListener('click', () => {
        document.getElementById('cart').classList.toggle('hidden');
    });

    document.getElementById('emptyCart').addEventListener('click', () => {
        cart.length = 0;
        updateCart();
    });

    document.querySelectorAll('.filter').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(cb => cb.value);
            const filteredProducts = selectedFilters.length === 0
                ? products
                : products.filter(product => selectedFilters.includes(product.type));
            displayProducts(filteredProducts);
        });
    });

    displayProducts(products);

    window.addToCart = addToCart; // Ensure addToCart is globally accessible
});
