document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const productGrid = document.getElementById('shop-product-grid');
    const productCount = document.getElementById('product-count');
    const noResults = document.getElementById('no-results');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort-select');
    const filterCategory = document.getElementById('filter-category');
    const filterColor = document.getElementById('filter-color');
    const filterFabric = document.getElementById('filter-fabric');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const toggleFiltersBtn = document.getElementById('toggle-filters');
    const filterDrawer = document.getElementById('filter-drawer');

    // State
    let currentProducts = [...window.products];
    let filters = {
        category: [],
        color: [],
        fabric: []
    };
    let searchQuery = '';

    // Initialize
    initFilters();
    checkUrlParams();
    renderProducts();

    // Event Listeners
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') handleSearch();
    });

    sortSelect.addEventListener('change', renderProducts);
    clearFiltersBtn.addEventListener('click', clearAllFilters);

    // Mobile filter toggle
    toggleFiltersBtn.addEventListener('click', () => {
        const isVisible = filterDrawer.style.display === 'block';
        filterDrawer.style.display = isVisible ? 'none' : 'block';
        toggleFiltersBtn.textContent = isVisible ? 'Show Filters' : 'Hide Filters';
    });

    function checkUrlParams() {
        const urlCategory = utils.getURLParam('category');
        if(urlCategory) {
            filters.category.push(urlCategory);
            // Check the corresponding checkbox
            const cb = document.querySelector(`input[value="${urlCategory}"]`);
            if(cb) cb.checked = true;
        }
    }

    function initFilters() {
        // Extract unique values
        const categories = [...new Set(window.products.map(p => p.category))];
        const colors = [...new Set(window.products.map(p => p.color))];
        const fabrics = [...new Set(window.products.map(p => p.fabric))];

        renderFilterOptions(filterCategory, categories, 'category');
        renderFilterOptions(filterColor, colors, 'color');
        renderFilterOptions(filterFabric, fabrics, 'fabric');
    }

    function renderFilterOptions(container, options, type) {
        options.sort().forEach(option => {
            const label = document.createElement('label');
            label.className = 'filter-label';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option;
            checkbox.dataset.type = type;

            checkbox.addEventListener('change', handleFilterChange);

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(option));
            container.appendChild(label);
        });
    }

    function handleFilterChange(e) {
        const type = e.target.dataset.type;
        const value = e.target.value;

        if (e.target.checked) {
            filters[type].push(value);
        } else {
            filters[type] = filters[type].filter(v => v !== value);
        }

        applyFiltersAndSort();
    }

    function handleSearch() {
        searchQuery = searchInput.value.toLowerCase().trim();
        applyFiltersAndSort();
    }

    function clearAllFilters() {
        filters = { category: [], color: [], fabric: [] };
        searchQuery = '';
        searchInput.value = '';

        document.querySelectorAll('.filter-label input').forEach(cb => {
            cb.checked = false;
        });

        // Remove URL param
        const url = new URL(window.location);
        url.searchParams.delete('category');
        window.history.pushState({}, '', url);

        applyFiltersAndSort();
    }

    function applyFiltersAndSort() {
        currentProducts = window.products.filter(product => {
            // Search
            const matchesSearch = !searchQuery ||
                product.name.toLowerCase().includes(searchQuery) ||
                product.id.toLowerCase().includes(searchQuery) ||
                product.color.toLowerCase().includes(searchQuery) ||
                product.fabric.toLowerCase().includes(searchQuery);

            // Filters
            const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
            const matchesColor = filters.color.length === 0 || filters.color.includes(product.color);
            const matchesFabric = filters.fabric.length === 0 || filters.fabric.includes(product.fabric);

            return matchesSearch && matchesCategory && matchesColor && matchesFabric;
        });

        // Sort
        const sortValue = sortSelect.value;
        if (sortValue === 'price-low') {
            currentProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high') {
            currentProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'newest') {
            // Assuming higher ID is newer for this static demo
            currentProducts.sort((a, b) => b.id.localeCompare(a.id));
        }

        renderProducts();
    }

    function renderProducts() {
        productGrid.innerHTML = '';

        if (currentProducts.length === 0) {
            productGrid.style.display = 'none';
            noResults.style.display = 'block';
            productCount.textContent = '0 products found';
            return;
        }

        productGrid.style.display = 'grid';
        noResults.style.display = 'none';
        productCount.textContent = `Showing ${currentProducts.length} product${currentProducts.length > 1 ? 's' : ''}`;

        currentProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-wrap">
                    <div class="product-badges">
                        ${product.discount > 0 ? `<span class="badge sale">${product.discount}% OFF</span>` : ''}
                        ${product.bestseller ? `<span class="badge">Bestseller</span>` : ''}
                    </div>
                    <button class="wishlist-btn" data-id="${product.id}" onclick="wishlistManager.toggleWishlist('${product.id}')">🤍</button>
                    <a href="product.html?id=${product.id}">
                        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                    </a>
                </div>
                <div class="product-info">
                    <div class="product-id">${product.id}</div>
                    <a href="product.html?id=${product.id}"><h3 class="product-title">${product.name}</h3></a>
                    <div class="product-price-wrap">
                        <span class="product-price">${utils.formatCurrency(product.price)}</span>
                        ${product.originalPrice > product.price ? `<span class="product-original-price">${utils.formatCurrency(product.originalPrice)}</span>` : ''}
                    </div>
                    <button class="btn btn-primary btn-block" onclick="cartManager.addToCart(utils.getProductById('${product.id}'))">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(card);
        });

        if(window.wishlistManager) window.wishlistManager.updateWishlistUI();
    }
});
