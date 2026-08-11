/* ==========================================================================
   MegaStore FazleVai — Site Logic
   Cart, search, product rendering/selection, modal, theme, language,
   FAQ accordion, testimonial slider. Depends on js/products-data.js
   being loaded first.
   ========================================================================== */

/* ==========================================
   APP STATE MANAGEMENT
   ========================================== */
let cart = JSON.parse(localStorage.getItem('megastore_cart')) || [];
let currentCategory = 'all';
let selectedOptions = {};

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  productsData.forEach(p => {
    selectedOptions[p.id] = { typeIdx: 0, planIdx: 0 };
    const firstValidPlan = p.accountTypes[0].plans.findIndex(plan => !plan.soldOut);
    if(firstValidPlan !== -1) selectedOptions[p.id].planIdx = firstValidPlan;
  });

  renderProducts();
  updateCartBadge();
  initTestimonialSlider();

  // Close search dropdown & expanded bar on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search-wrapper')) {
      const suggestions = document.getElementById('searchSuggestions');
      if (suggestions) suggestions.style.display = 'none';
      closeSearch();
    }
  });

  // Close search on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
});

/* ==========================================
   HEADER SEARCH TOGGLE
   ========================================== */
function toggleSearch() {
  const wrapper = document.getElementById('searchWrapper');
  const isActive = wrapper.classList.contains('active');
  if (isActive) {
    closeSearch();
  } else {
    wrapper.classList.add('active');
    setTimeout(() => document.getElementById('headerSearch').focus(), 150);
  }
}

function closeSearch() {
  const wrapper = document.getElementById('searchWrapper');
  wrapper.classList.remove('active');
  document.getElementById('searchSuggestions').style.display = 'none';
}

/* ==========================================
   LANGUAGE TOGGLE LOGIC
   ========================================== */
let currentLang = 'en';
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  document.body.setAttribute('data-lang', currentLang);
  const btn = document.getElementById('langToggleBtn');
  btn.textContent = currentLang === 'en' ? 'বাং' : 'EN';
  btn.setAttribute('title', currentLang === 'en' ? 'Translate to Bengali' : 'Translate to English');
}

/* ==========================================
   HEADER SEARCH & AUTOSUGGEST
   ========================================== */
function handleSearch(e) {
  const val = e.target.value.toLowerCase().trim();
  const dropdown = document.getElementById('searchSuggestions');
  
  if (!val) { 
    dropdown.style.display = 'none'; 
    return; 
  }
  
  const matches = productsData.filter(p => p.name.toLowerCase().includes(val) || p.desc.toLowerCase().includes(val));
  
  if (matches.length > 0) {
    dropdown.innerHTML = matches.map(m => {
        const minPrice = m.accountTypes[0].plans[0].price;
        return `
        <div class="suggestion-item" onclick="scrollToProduct(${m.id})">
          <div class="suggestion-icon">${m.icon}</div>
          <div class="suggestion-details">
            <span class="suggestion-title">${m.name}</span>
            <span class="suggestion-price">${m.soldOut ? 'Sold Out' : `From ৳${minPrice}`}</span>
          </div>
        </div>
        `;
    }).join('');
  } else {
    dropdown.innerHTML = `<div style="padding:16px; text-align:center; font-size:13px; color:var(--text-muted);">No products found</div>`;
  }
  dropdown.style.display = 'block';
}

function scrollToProduct(id) {
  closeSearch();
  const searchInput = document.getElementById('headerSearch');
  if (searchInput) searchInput.value = '';

  // If there's no product grid on this page (e.g. a product detail page),
  // navigate to the homepage and land on that product's card instead.
  if (!document.getElementById('productGrid')) {
    const base = window.location.pathname.includes('/products/') ? '../index.html' : 'index.html';
    window.location.href = `${base}#card-${id}`;
    return;
  }

  const activePill = document.querySelector('.pill-btn.active');
  if (activePill) setCategory('all', activePill);

  const card = document.getElementById('card-' + id);
  if(card) {
    const y = card.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({top: y, behavior: 'smooth'});
    
    card.style.animation = 'none'; 
    setTimeout(() => {
      card.style.animation = 'zoomOutIn 0.8s ease';
      card.style.borderColor = 'var(--primary)';
      setTimeout(() => card.style.borderColor = 'var(--border-color)', 2000);
    }, 50);
  }
}

/* ==========================================
   PRODUCT MODAL ZOOM OUT LOGIC
   ========================================== */
function handleCardClick(e, id) {
  // Prevent modal opening when clicking interactive elements like selects or buttons
  if (e.target.closest('select') || e.target.closest('button')) return;
  openProductModal(id);
}

function openProductModal(id) {
  const p = productsData.find(x => x.id === id);
  const sel = selectedOptions[id];
  const activeType = p.accountTypes[sel.typeIdx];
  const activePlan = activeType.plans[sel.planIdx] || activeType.plans[0];
  const isSoldOut = p.soldOut || activePlan.soldOut;
  
  let priceHTML = `<span class="price-current">${isSoldOut ? 'Sold Out' : `৳${activePlan.price}`}</span>`;
  if (!isSoldOut && activePlan.originalPrice) {
      priceHTML += `<span class="price-original" style="margin-left: 8px;">৳${activePlan.originalPrice}</span>`;
  }

  const modalContent = document.getElementById('productModalContent');
  modalContent.innerHTML = `
    <button class="modal-close-btn" onclick="closeProductModal(event)">&times;</button>
    <div class="product-thumb-wrapper" style="height: 160px; margin-bottom: 24px;">
      ${p.icon}
    </div>
    <h3 class="product-title" style="font-size: 1.5rem; margin-bottom: 12px;">${p.name}</h3>
    <p class="product-desc" style="font-size: 14px; margin-bottom: 20px; -webkit-line-clamp: unset; overflow: visible; display: block;">${p.desc}</p>
    
    <div class="dropdown-group" style="margin-bottom: 20px;">
      <select class="card-select" style="font-size: 14px; padding: 12px;" onchange="updateModalSelection(${p.id}, 'type', this.value)" ${p.soldOut ? 'disabled' : ''}>
        ${p.accountTypes.map((t, idx) => `<option value="${idx}" ${idx === sel.typeIdx ? 'selected' : ''}>Type: ${t.name}</option>`).join('')}
      </select>
      <select class="card-select" style="font-size: 14px; padding: 12px;" onchange="updateModalSelection(${p.id}, 'plan', this.value)" ${p.soldOut ? 'disabled' : ''}>
        ${activeType.plans.map((plan, idx) => `
          <option value="${idx}" ${plan.soldOut ? 'disabled' : ''} ${idx === sel.planIdx ? 'selected' : ''}>
            Validity: ${plan.duration} ${plan.soldOut ? '(Sold Out)' : ''}
          </option>
        `).join('')}
      </select>
    </div>
    
    <div class="price-section" style="margin-bottom: 24px; padding: 12px 16px;">
      <div class="price-box">${priceHTML}</div>
    </div>

    <ul class="product-features" style="margin-bottom: 24px;">
      ${p.features.map(f => `<li class="feature-badge" style="font-size: 13px; padding: 6px 10px;">✓ ${f}</li>`).join('')}
    </ul>

    <div class="card-actions" style="grid-template-columns: 1fr 1fr; gap: 12px;">
      <button class="btn btn-outline" style="justify-content: center;" onclick="addToCart(${p.id}); closeProductModal(event)" ${isSoldOut ? 'disabled' : ''}>Add Cart 🛒</button>
      <button class="btn btn-primary" style="justify-content: center;" onclick="buyNow(${p.id}); closeProductModal(event)" ${isSoldOut ? 'disabled' : ''}>Buy Now ⚡</button>
    </div>
  `;
  
  document.getElementById('productModalOverlay').classList.add('active');
}

function closeProductModal(e) {
  if(e.target === document.getElementById('productModalOverlay') || e.target.closest('.modal-close-btn')) {
    document.getElementById('productModalOverlay').classList.remove('active');
  }
}

function updateModalSelection(productId, field, value) {
  updateSelectionState(productId, field, value);
  openProductModal(productId);
}

/* ==========================================
   PRODUCT DETAIL PAGE RENDERING
   (used by the individual /products/*.html pages)
   ========================================== */
function renderProductDetail(id) {
  const p = productsData.find(x => x.id === id);
  const container = document.getElementById('productDetailContainer');
  if (!p || !container) return;

  if (!selectedOptions[id]) {
    selectedOptions[id] = { typeIdx: 0, planIdx: 0 };
    const firstValidPlan = p.accountTypes[0].plans.findIndex(plan => !plan.soldOut);
    if (firstValidPlan !== -1) selectedOptions[id].planIdx = firstValidPlan;
  }

  const sel = selectedOptions[id];
  const activeType = p.accountTypes[sel.typeIdx];
  const activePlan = activeType.plans[sel.planIdx] || activeType.plans[0];
  const isSoldOut = p.soldOut || activePlan.soldOut;

  let priceHTML = `<span class="price-current">${isSoldOut ? 'Sold Out' : `৳${activePlan.price}`}</span>`;
  if (!isSoldOut && activePlan.originalPrice) {
    priceHTML += `<span class="price-original" style="margin-left: 8px;">৳${activePlan.originalPrice}</span>`;
  }

  container.innerHTML = `
    <div class="product-thumb-wrapper" style="width:140px; height:140px; margin:0 auto 24px auto;">
      ${p.icon}
    </div>
    <h1 class="product-title" style="font-size:1.85rem; text-align:center;">${p.name}</h1>
    <p class="product-desc" style="text-align:center; -webkit-line-clamp:unset; overflow:visible; display:block; max-width:600px; margin:0 auto 20px auto; font-size:15px;">${p.desc}</p>

    <div class="dropdown-group" style="max-width:420px; margin:0 auto 20px auto;">
      <select class="card-select" style="padding:12px;" onchange="updateDetailSelection(${p.id}, 'type', this.value)" ${p.soldOut ? 'disabled' : ''}>
        ${p.accountTypes.map((t, idx) => `<option value="${idx}" ${idx === sel.typeIdx ? 'selected' : ''}>Type: ${t.name}</option>`).join('')}
      </select>
      <select class="card-select" style="padding:12px;" onchange="updateDetailSelection(${p.id}, 'plan', this.value)" ${p.soldOut ? 'disabled' : ''}>
        ${activeType.plans.map((plan, idx) => `
          <option value="${idx}" ${plan.soldOut ? 'disabled' : ''} ${idx === sel.planIdx ? 'selected' : ''}>
            Validity: ${plan.duration} ${plan.soldOut ? '(Sold Out)' : ''}
          </option>
        `).join('')}
      </select>
    </div>

    <div class="price-section" style="max-width:420px; margin:0 auto 24px auto; padding:12px 16px;">
      <div class="price-box">${priceHTML}</div>
    </div>

    <ul class="product-features" style="justify-content:center; max-width:520px; margin:0 auto 28px auto;">
      ${p.features.map(f => `<li class="feature-badge" style="font-size:13px; padding:6px 10px;">✓ ${f}</li>`).join('')}
    </ul>

    <div class="card-actions" style="grid-template-columns: 1fr 1fr; gap:12px; max-width:420px; margin:0 auto;">
      <button class="btn btn-outline" style="justify-content:center;" onclick="addToCart(${p.id})" ${isSoldOut ? 'disabled' : ''}>Add Cart 🛒</button>
      <button class="btn btn-primary" style="justify-content:center;" onclick="buyNow(${p.id})" ${isSoldOut ? 'disabled' : ''}>Buy Now ⚡</button>
    </div>
  `;
}

function updateDetailSelection(productId, field, value) {
  updateSelectionState(productId, field, value);
  renderProductDetail(productId);
}

/* ==========================================
   RENDER PRODUCTS GRID
   ========================================== */
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return; // No product grid on this page (e.g. a product detail page)

  let filtered = productsData.filter(p => {
    return (currentCategory === 'all' || p.category === currentCategory);
  });

  // Strictly sort by ID to maintain correct serial order
  filtered.sort((a, b) => a.id - b.id);

  // Move sold out to bottom
  filtered.sort((a, b) => {
    if (a.soldOut && !b.soldOut) return 1;
    if (!a.soldOut && b.soldOut) return -1;
    return 0;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 60px 20px;"><h3>No products found</h3></div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const sel = selectedOptions[p.id];
    const activeType = p.accountTypes[sel.typeIdx];
    const activePlan = activeType.plans[sel.planIdx] || activeType.plans[0];
    
    const isSoldOut = p.soldOut || activePlan.soldOut;
    
    let priceHTML = `<span class="price-current">${isSoldOut ? 'Sold Out' : `৳${activePlan.price}`}</span>`;
    if (!isSoldOut && activePlan.originalPrice) {
        priceHTML += `<span class="price-original">৳${activePlan.originalPrice}</span>`;
    }

    return `
      <div class="product-card ${p.soldOut ? 'sold-out-card' : ''}" id="card-${p.id}" onclick="handleCardClick(event, ${p.id})">
        ${p.soldOut ? '<div class="sold-out-badge">Sold Out</div>' : ''}
        ${p.ribbon && !p.soldOut ? `<div class="card-ribbon">${p.ribbon}</div>` : ''}

        <div class="product-thumb-wrapper">
          ${p.icon}
        </div>

        <h3 class="product-title"><a href="products/${p.slug}.html" onclick="event.stopPropagation()" style="color:inherit;">${p.name}</a></h3>

        <div class="dropdown-group">
          <select class="card-select" onchange="updateSelection(${p.id}, 'type', this.value)" ${p.soldOut ? 'disabled' : ''}>
            ${p.accountTypes.map((t, idx) => `<option value="${idx}" ${idx === sel.typeIdx ? 'selected' : ''}>Type: ${t.name}</option>`).join('')}
          </select>
          <select class="card-select" onchange="updateSelection(${p.id}, 'plan', this.value)" ${p.soldOut ? 'disabled' : ''}>
            ${activeType.plans.map((plan, idx) => `
              <option value="${idx}" ${plan.soldOut ? 'disabled' : ''} ${idx === sel.planIdx ? 'selected' : ''}>
                Validity: ${plan.duration} ${plan.soldOut ? '(Sold Out)' : ''}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="price-section">
          <div class="price-box">
            ${priceHTML}
          </div>
        </div>

        <p class="product-desc">${p.desc}</p>

        <ul class="product-features">
          ${p.features.slice(0, 3).map(f => `<li class="feature-badge">✓ ${f}</li>`).join('')}
        </ul>

        <div class="card-actions">
          <button class="btn btn-outline btn-sm" onclick="addToCart(${p.id})" ${isSoldOut ? 'disabled' : ''}>Add Cart 🛒</button>
          <button class="btn btn-primary btn-sm" onclick="buyNow(${p.id})" ${isSoldOut ? 'disabled' : ''}>Buy Now ⚡</button>
        </div>
      </div>
    `;
  }).join('');
}

function updateSelectionState(productId, field, value) {
  if (field === 'type') {
    selectedOptions[productId].typeIdx = parseInt(value);
    const typeObj = productsData.find(p => p.id === productId).accountTypes[selectedOptions[productId].typeIdx];
    const firstValid = typeObj.plans.findIndex(p => !p.soldOut);
    selectedOptions[productId].planIdx = firstValid !== -1 ? firstValid : 0;
  } else {
    selectedOptions[productId].planIdx = parseInt(value);
  }
}

function updateSelection(productId, field, value) {
  updateSelectionState(productId, field, value);
  renderProducts();
}

function setCategory(cat, element) {
  currentCategory = cat;
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  renderProducts();
}

/* ==========================================
   CART SYSTEM
   ========================================== */
function addToCart(productId) {
  const p = productsData.find(item => item.id === productId);
  const sel = selectedOptions[productId];
  const typeObj = p.accountTypes[sel.typeIdx];
  const planObj = typeObj.plans[sel.planIdx];

  if (p.soldOut || planObj.soldOut) {
    showToast("Sorry, this item is sold out!");
    return;
  }

  const itemKey = `${productId}_${typeObj.name}_${planObj.duration}`;
  const existing = cart.find(c => c.cartKey === itemKey);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      cartKey: itemKey, id: p.id, name: p.name, type: typeObj.name,
      duration: planObj.duration, price: planObj.price, icon: p.icon, quantity: 1
    });
  }

  saveCart();
  showToast(`Added ${p.name} to cart!`);
}

function buyNow(productId) { addToCart(productId); openCartDrawer(); }

function updateCartQuantity(cartKey, delta) {
  const item = cart.find(c => c.cartKey === cartKey);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(c => c.cartKey !== cartKey);
  }
  saveCart();
}

function removeFromCart(cartKey) { cart = cart.filter(c => c.cartKey !== cartKey); saveCart(); }

function saveCart() {
  localStorage.setItem('megastore_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() { document.getElementById('cartBadge').textContent = cart.reduce((acc, item) => acc + item.quantity, 0); }

function openCartDrawer() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
  renderCartItems();
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
}

function renderCartItems() {
  const container = document.getElementById('cartItemsContainer');
  const totalEl = document.getElementById('cartTotal');
  if (cart.length === 0) {
    container.innerHTML = `<div style="text-align:center; margin-top:60px; color:var(--text-muted)"><div style="font-size:48px; margin-bottom:12px;">🛒</div><p>Your cart is empty.</p></div>`;
    totalEl.textContent = "৳0";
    return;
  }
  let grandTotal = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;
    return `
      <div class="cart-item">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <div style="font-weight:700; font-size:14px;">${item.name}</div>
          <div style="font-size:11px; color:var(--primary); font-weight:600;">${item.type} • ${item.duration}</div>
          <div style="font-size:13px; font-weight:700; margin-top:4px;">৳${item.price} x ${item.quantity} = ৳${itemTotal}</div>
          <div style="display:flex; gap:8px; margin-top:6px;">
            <button style="width:24px; border:1px solid var(--border-color); background:var(--bg-surface);" onclick="updateCartQuantity('${item.cartKey}', -1)">-</button>
            <span>${item.quantity}</span>
            <button style="width:24px; border:1px solid var(--border-color); background:var(--bg-surface);" onclick="updateCartQuantity('${item.cartKey}', 1)">+</button>
          </div>
        </div>
        <button onclick="removeFromCart('${item.cartKey}')" style="background:none; color:#EF4444; font-size:18px;">&times;</button>
      </div>
    `;
  }).join('');
  totalEl.textContent = `৳${grandTotal}`;
}

function checkoutWhatsApp() {
  if (cart.length === 0) { showToast("Please add items to cart first!"); return; }
  let message = `Hello MegaStore FazleVai,\n\nI would like to purchase:\n`;
  let grandTotal = 0;
  cart.forEach(item => {
    const sub = item.price * item.quantity;
    grandTotal += sub;
    message += `• ${item.name} (${item.type} - ${item.duration}) x${item.quantity} : ৳${sub}\n`;
  });
  message += `\nTotal: ৳${grandTotal}\n\nPlease confirm my order.`;
  window.open(`https://wa.me/8801757919193?text=${encodeURIComponent(message)}`, '_blank');
}

/* ==========================================
   THEME & UTILS & SLIDER
   ========================================== */
function toggleTheme() { document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }

function toggleMenu() { 
  document.getElementById('navMenu').classList.toggle('active'); 
  document.querySelector('.hamburger').classList.toggle('active');
}

function toggleFaq(element) { element.classList.toggle('active'); }

function copyNumber() {
  navigator.clipboard.writeText("+8801757919193");
  document.getElementById('copyText').textContent = "Copied!";
  showToast("WhatsApp Number Copied!");
  setTimeout(() => document.getElementById('copyText').textContent = "Click to Copy WhatsApp", 3000);
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `⚡ ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ==========================================
   CYCLING BRAND NAME (header only)
   ========================================== */
const brandWords = ['MegaStore', 'FazleVai'];
let brandWordIndex = 0;
function cycleBrandName() {
  const el = document.getElementById('brandName');
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(-6px)';
  setTimeout(() => {
    brandWordIndex = (brandWordIndex + 1) % brandWords.length;
    el.textContent = brandWords[brandWordIndex];
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 280);
}
setInterval(cycleBrandName, 2000);

function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  if(track) {
      let index = 0;
      setInterval(() => {
        index = (index + 1) % 3;
        track.style.transform = `translateX(-${index * 100}%)`;
      }, 4000);
  }
}
  