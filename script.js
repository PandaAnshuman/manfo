// Product data
const products = [
  {
    id: 1,
    name: "Achari Punch",
    description: "Pickle-inspired tang with hing/kalonji",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Mirchi Masti",
    description: "Andhra-style fiery chili",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: "Spicy",
  },
  {
    id: 3,
    name: "Chaataka",
    description: "Chaat masala + black salt",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: null,
  },
  {
    id: 4,
    name: "Himalayan Sour",
    description: "Rock salt + lemon zest",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: "New",
  },
  {
    id: 5,
    name: "Kokum-Kairi",
    description: "Maharashtra-style kokum + raw mango fusion",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: null,
  },
  {
    id: 6,
    name: "Protein Punch",
    description: "For fitness buffs: added quinoa/amaranth crunch",
    price: 179,
    image: "/api/placeholder/300/200",
    badge: "High Protein",
  },
  {
    id: 7,
    name: "Gur-Kaccha",
    description: "Jaggery-coated sweet & sour",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: "Sweet",
  },
  {
    id: 8,
    name: "Sindhi Style",
    description: "Dry mango powder + cumin kick",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: null,
  },
  {
    id: 9,
    name: "Gur-Kaccha",
    description: "Jaggery-coated sweet & sour",
    price: 149,
    image: "/api/placeholder/300/200",
    badge: "Sweet",
  },
];

// Cart functionality
let cart = [];

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Render products
  renderProducts();

  // Setup event listeners
  document
    .getElementById("cartIcon")
    .addEventListener("click", toggleCartModal);
  document
    .getElementById("closeModal")
    .addEventListener("click", toggleCartModal);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === document.getElementById("cartModal")) {
      toggleCartModal();
    }
  });
});

// Render all products
function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${
                  product.badge
                    ? `<span class="product-badge">${product.badge}</span>`
                    : ""
                }
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">₹${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="decrementQuantity(${
                          product.id
                        })">-</button>
                        <input type="text" class="quantity-input" id="quantity-${
                          product.id
                        }" value="1" readonly>
                        <button class="quantity-btn" onclick="incrementQuantity(${
                          product.id
                        })">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${
                      product.id
                    })">Add to Cart</button>
                </div>
            </div>
        `;

    productGrid.appendChild(productCard);
  });
}

// Quantity control functions
function incrementQuantity(productId) {
  const input = document.getElementById(`quantity-${productId}`);
  let value = parseInt(input.value);
  input.value = value + 1;
}

function decrementQuantity(productId) {
  const input = document.getElementById(`quantity-${productId}`);
  let value = parseInt(input.value);
  if (value > 1) {
    input.value = value - 1;
  }
}

// Add to cart function
function addToCart(productId) {
  const quantity = parseInt(
    document.getElementById(`quantity-${productId}`).value
  );
  const product = products.find((p) => p.id === productId);

  // Check if product is already in cart
  const existingItemIndex = cart.findIndex((item) => item.id === productId);

  if (existingItemIndex !== -1) {
    // Update quantity if already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  // Reset quantity input
  document.getElementById(`quantity-${productId}`).value = 1;

  // Update cart UI
  updateCartCount();

  // Show a brief notification
  showNotification(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "var(--secondary-color)";
  notification.style.color = "white";
  notification.style.padding = "1rem";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "1000";
  notification.style.transition = "opacity 0.5s ease-in-out";
  notification.style.opacity = "1";
  document.body.appendChild(notification);
}

// Toggle cart modal
function toggleCartModal() {
  const modal = document.getElementById("cartModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";

  if (modal.style.display === "flex") {
    renderCartItems();
  }
}

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const cartSummary = document.getElementById("cartSummary");
  const checkoutBtn = document.getElementById("checkoutBtn");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartSummary.style.display = "none";
    checkoutBtn.style.display = "none";
    return;
  } else {
    emptyCartMessage.style.display = "none";
    cartSummary.style.display = "block";
    checkoutBtn.style.display = "block";
  }

  let totalAmount = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">₹${(
                  item.price * item.quantity
                ).toFixed(2)}</p>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="decrementCartItem(${
                      item.id
                    })">-</button>
                    <input type="text" class="quantity-input" id="cart-quantity-${
                      item.id
                    }" value="${item.quantity}" readonly>
                    <button class="quantity-btn" onclick="incrementCartItem(${
                      item.id
                    })">+</button>
                    <button class="remove-item" onclick="removeFromCart(${
                      item.id
                    })">Remove</button>
                </div>
            </div>
        `;

    cartItemsContainer.appendChild(cartItem);
    totalAmount += item.price * item.quantity;
  });

  document.getElementById("cartTotal").textContent = `₹${totalAmount.toFixed(
    2
  )}`;
}
// Increment cart item quantity
function incrementCartItem(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity += 1;
    renderCartItems();
  }
}
// Decrement cart item quantity
function decrementCartItem(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    renderCartItems();
  }
}
// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCartItems();
  updateCartCount();
}
// Checkout function
function checkout() {
  alert("Proceeding to checkout...");
  // Here you can implement the checkout process
}
