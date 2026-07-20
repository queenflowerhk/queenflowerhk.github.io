/**
 * Products module - fetches product data from products.json and renders product cards.
 * Each category is rendered into its designated grid element.
 */
const Products = (() => {
    let allProducts = {};

    // Badge configuration per category
    const badges = {
        ceremonial: { text_zh: '喜慶', text_en: 'Celebration', color: '#b45309' },
        opening:    { text_zh: '開張', text_en: 'Opening',   color: '#b45309' },
        association:{ text_zh: '社團', text_en: 'Association',color: '#b45309' },
        graduation: { text_zh: '畢業', text_en: 'Graduation', color: '#2563eb' },
        pets:       { text_zh: '寵物', text_en: 'Pet',        color: '#7c3aed' }
    };

    async function load() {
        const res = await fetch('products.json');
        allProducts = await res.json();
    }

    function getAllProductsFlat() {
        return Object.entries(allProducts).flatMap(([cat, items]) =>
            items.map(p => ({ ...p, category: cat }))
        );
    }

    function getCategory(category) {
        return allProducts[category] || [];
    }

    function findProduct(productId) {
        return getAllProductsFlat().find(p => p.id === productId);
    }


    function renderProductCard(product, index) {
        const lang = Translations.getLang();
        const badge = badges[product.category] || null;
        const badgeText = badge ? (lang === 'zh' ? badge.text_zh : badge.text_en) : '';
        const badgeColor = badge ? badge.color : '';
        const ribbonHtml = badgeText
            ? `<div class="ribbon"><span style="background: ${badgeColor}">${badgeText}</span></div>`
            : '';

        const isSomber = product.category === 'funeral' || product.category === 'pets';
        const priceColor = isSomber ? 'text-gray-700' : 'text-amber-700';
        const btnColor = isSomber
            ? 'hover:text-gray-800 hover:decoration-gray-600'
            : 'hover:text-amber-700 hover:decoration-amber-700';

        const name = lang === 'zh' ? product.name_zh : product.name;
        const desc = lang === 'zh' ? product.description_zh : product.description;
        const productNoLabel = Translations.t('product_no');
        const addToCartLabel = Translations.t('add_to_cart');

        return `
            <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl group fade-in relative" style="animation-delay: ${index * 0.1}s">
                ${ribbonHtml}
                <div class="relative h-64 overflow-hidden">
                    <img src="${product.image}" alt="${name}" class="product-image w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    <button onclick="Main.handleAddToCart(${product.id})" class="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-700 hover:bg-amber-700 hover:text-white transition-all transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="p-6">
                    <p class="text-xs text-gray-400 mb-1">${productNoLabel}: ${product.id}</p>
                    <h3 class="text-xl font-serif font-bold text-gray-900 mb-1">${name}</h3>
                    <p class="text-sm text-gray-500 mb-3">${desc}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-2xl font-bold ${priceColor}">$${product.price}</span>
                        <button onclick="Main.handleAddToCart(${product.id})" class="text-sm font-semibold text-gray-600 ${btnColor} transition-colors underline decoration-2 underline-offset-4">
                            ${addToCartLabel}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderCategory(category, gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        const products = getCategory(category).map(p => ({ ...p, category }));
        grid.innerHTML = products.map((p, i) => renderProductCard(p, i)).join('');
    }

    function renderAll() {
        renderCategory('funeral', 'funeral-products-grid');
        renderCategory('wreath', 'wreaths-grid');
        renderCategory('opening', 'opening-grid');
        renderCategory('association', 'association-grid');
        renderCategory('graduation', 'graduation-grid');
        renderCategory('pets', 'pets-grid');
        renderCategory('ceremonial', 'ceremonial-grid');
    }

    return { load, getAllProductsFlat, getCategory, findProduct, renderAll, renderCategory };
})();
