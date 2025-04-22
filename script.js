// Sample product data
const products = [
  {
    id: 1,
    name: "Achari Punch (Pickle-inspired tang with hing/kalonji) ",
    price: 199,
    originalPrice: 249,
    image: "/AchariPunch.jpeg",
    description:
      "Our original recipe with a perfect balance of sweet and tangy flavors. A timeless favorite for mango lovers.",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Mirchi Masti (Andhra-style fiery chili) ",
    price: 219,
    image: "/MirchiMasti.jpeg",
    description:
      "A fiery twist on our classic recipe, featuring a blend of Indian spices that pack a punch with every bite.",
    badge: "New",
  },

  {
    id: 3,
    name: "Kokum-Kairi (Maharashtra-style kokum + raw mango fusion)",
    price: 209,
    image: "/KokumKair.jpeg",
    description:
      "A delightful combination of sweetness and sea salt that creates a perfectly balanced snacking experience.",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Protein Punch (For fitness buffs: added quinoa/amaranth crunch)",
    price: 209,
    image: "/ProteinPunch.jpeg",
    description:
      "A delightful combination of sweetness and sea salt that creates a perfectly balanced snacking experience.",
    badge: "Popular",
  },
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  // Generate product cards
  generateProductCards();

  // Update cart count on page load
  updateCartCount();

  // Header scroll effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  mobileMenuClose.addEventListener("click", function () {
    mobileMenu.classList.remove("show");
    document.body.style.overflow = "";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("show");
      document.body.style.overflow = "";
    });
  });

  // Cart modal
  const cartIcon = document.getElementById("cartIcon");
  const cartModal = document.getElementById("cartModal");
  const closeModal = document.getElementById("closeModal");
  const continueShoppingBtn = document.getElementById("continueShoppingBtn");
  const startShoppingBtn = document.getElementById("startShoppingBtn");

  cartIcon.addEventListener("click", function () {
    cartModal.classList.add("show");
    document.body.style.overflow = "hidden";
    updateCartUI();
  });

  function closeCartModal() {
    cartModal.classList.remove("show");
    document.body.style.overflow = "";
  }

  closeModal.addEventListener("click", closeCartModal);
  continueShoppingBtn.addEventListener("click", closeCartModal);
  continueShoppingBtn.addEventListener("click", closeCartModal);
  startShoppingBtn.addEventListener("click", closeCartModal);

  // Close modal when clicking outside
  cartModal.addEventListener("click", function (e) {
    if (e.target === cartModal) {
      closeCartModal();
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector(".newsletter-input");
      if (emailInput.value) {
        showToast(
          "Success",
          "You have successfully subscribed to our newsletter!",
          "success"
        );
        emailInput.value = "";
      }
    });
  }

  // Contact form submission
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast(
        "Thank you!",
        "Your message has been sent. We'll get back to you soon.",
        "success"
      );
      this.reset();
    });
  }

  // Initialize cart UI
  updateCartUI();
});

// Generate product cards
function generateProductCards() {
  const productGrid = document.getElementById("productGrid");
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${
                  product.badge
                    ? `<div class="product-badge">${product.badge}</div>`
                    : ""
                }
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">₹${product.price} ${
      product.originalPrice
        ? `<span class="original-price">₹${product.originalPrice}</span>`
        : ""
    }</div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn decrease-quantity">-</button>
                        <input type="text" class="quantity-input" value="1" readonly>
                        <button class="quantity-btn increase-quantity">+</button>
                    </div>
                    <button class="add-to-cart">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
        `;
  });

  productGrid.innerHTML = productsHTML;

  // Add event listeners to product cards
  const quantityBtns = document.querySelectorAll(".quantity-btn");
  quantityBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.parentElement.querySelector(".quantity-input");
      let value = parseInt(input.value);

      if (this.classList.contains("increase-quantity")) {
        value++;
      } else if (this.classList.contains("decrease-quantity") && value > 1) {
        value--;
      }

      input.value = value;
    });
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productId = parseInt(productCard.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      const quantityInput = productCard.querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value);

      addToCart(product, quantity);

      // Show toast notification
      showToast(
        "Added to Cart",
        `${product.name} has been added to your cart.`,
        "success"
      );

      // Reset quantity to 1
      quantityInput.value = 1;
    });
  });
}

function addToCart(product, quantity) {
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity,
    });
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Animate cart icon
  const cartCount = document.getElementById("cartCount");
  cartCount.classList.add("pulse");
  setTimeout(() => {
    cartCount.classList.remove("pulse");
  }, 500);
}

function removeFromCart(productId) {
  const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
  if (cartItem) {
    cartItem.classList.add("removing");

    setTimeout(() => {
      cart = cart.filter((item) => item.id !== productId);

      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart UI
      updateCartUI();

      // Update cart count
      updateCartCount();

      // Show toast notification
      showToast(
        "Removed from Cart",
        "Item has been removed from your cart.",
        "info"
      );
    }, 300);
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Show/hide cart count
  if (totalItems > 0) {
    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
  }
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const cartSummary = document.getElementById("cartSummary");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartSummary.style.display = "none";
    checkoutBtn.style.display = "none";
    cartItemsContainer.innerHTML = "";
    cartItemsContainer.appendChild(emptyCartMessage);
    return;
  }

  emptyCartMessage.style.display = "none";
  cartSummary.style.display = "flex";
  checkoutBtn.style.display = "block";

  let cartHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    cartHTML += `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <div class="cart-quantity">
                        <button class="cart-quantity-btn cart-decrease">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <input type="text" class="cart-quantity-input" value="${
                          item.quantity
                        }" readonly>
                        <button class="cart-quantity-btn cart-increase">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Remove
                    </button>
                </div>
            </div>
        </div>
        `;
  });

  cartItemsContainer.innerHTML = cartHTML;
  cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;

  // Add event listeners to cart item controls
  const removeButtons = cartItemsContainer.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });

  const decreaseButtons = cartItemsContainer.querySelectorAll(".cart-decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cartItem = this.closest(".cart-item");
      const productId = parseInt(cartItem.getAttribute("data-id"));
      const item = cart.find((item) => item.id === productId);

      if (item.quantity > 1) {
        item.quantity--;

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartUI();
        updateCartCount();
      } else {
        removeFromCart(productId);
      }
    });
  });

  const increaseButtons = cartItemsContainer.querySelectorAll(".cart-increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cartItem = this.closest(".cart-item");
      const productId = parseInt(cartItem.getAttribute("data-id"));
      const item = cart.find((item) => item.id === productId);

      item.quantity++;

      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartUI();
      updateCartCount();
    });
  });

  // Add event listener to checkout button
  checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.addEventListener("click", function () {
    showToast("Checkout", "Proceeding to checkout...", "success");
    setTimeout(() => {
      alert("Thank you for your order! This is a demo checkout process.");
      cart = [];
      localStorage.removeItem("cart");
      updateCartUI();
      updateCartCount();
      closeCartModal();
    }, 1000);
  });
}

// Toast notification function
function showToast(title, message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        `;
  } else {
    iconSvg = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        `;
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">×</button>
    `;

  toastContainer.appendChild(toast);

  // Add event listener to close button
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", function () {
    toast.style.opacity = "0";
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  });

  // Auto remove toast after 3 seconds
  setTimeout(() => {
    if (toastContainer.contains(toast)) {
      toastContainer.removeChild(toast);
    }
  }, 3000);
}
