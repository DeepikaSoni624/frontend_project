const products = [
  { name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 79.99, rating: "★★★★☆", emoji: "🎧" },
  { name: "Smart Watch with Fitness Tracker", category: "Electronics", price: 49.50, rating: "★★★★★", emoji: "⌚" },
  { name: "Portable Bluetooth Speaker", category: "Electronics", price: 34.99, rating: "★★★★☆", emoji: "🔊" },
  { name: "Minimal Ceramic Table Lamp", category: "Home", price: 28.00, rating: "★★★★☆", emoji: "💡" },
  { name: "Soft Knit Throw Blanket", category: "Home", price: 32.49, rating: "★★★★★", emoji: "🧣" },
  { name: "Everyday Canvas Backpack", category: "Fashion", price: 39.95, rating: "★★★★☆", emoji: "🎒" },
  { name: "Classic Running Sneakers", category: "Fashion", price: 64.00, rating: "★★★★★", emoji: "👟" },
  { name: "Stainless Steel Travel Mug", category: "Home", price: 18.75, rating: "★★★★☆", emoji: "☕" }
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
let activeCategory = "all";
let cartCount = 0;

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const category = activeCategory !== "all" ? activeCategory : selectedCategory;

  const matches = products.filter(product => {
    const categoryMatch =
      category === "all" || product.category === category;

    const textMatch =
      product.name.toLowerCase().includes(query);

    return categoryMatch && textMatch;
  });

  if (matches.length === 0) {
    grid.innerHTML =
      '<div class="empty">No products found. Try another search.</div>';
    return;
  }

  grid.innerHTML = matches.map(product => `
    <article class="card">
      <div class="product-image" aria-hidden="true">${product.emoji}</div>
      <h3>${product.name}</h3>
      <div class="rating" aria-label="Rating">${product.rating}</div>
      <p class="price"><small>$</small>${product.price.toFixed(2)}</p>
      <button class="add-button" data-name="${product.name}">
        Add to Cart
      </button>
    </article>
  `).join("");
}

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);

categorySelect.addEventListener("change", () => {
  activeCategory = "all";

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "all"
    );
  });

  renderProducts();
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    categorySelect.value = "all";

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts();
  });
});

grid.addEventListener("click", event => {
  if (!event.target.matches(".add-button")) return;

  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;
  event.target.textContent = "Added!";

  setTimeout(() => {
    event.target.textContent = "Add to Cart";
  }, 900);
});

document.getElementById("cartButton").addEventListener("click", () => {
  const itemWord = cartCount === 1 ? "item" : "items";
  alert(`You have ${cartCount} ${itemWord} in your cart.`);
});

renderProducts();