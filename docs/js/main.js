/**
 * Main module - orchestrates initialization, cart UI rendering, and WhatsApp checkout.
 */
const Main = (() => {

    // ---- Cart UI ----

    function handleAddToCart(productId) {
        const product = Products.findProduct(productId);
        if (!product) return;
        Cart.addToCart(product);
        updateCartUI();
        Components.showToast(Translations.t('toast_added'));
    }

    function handleRemoveFromCart(productId) {
        Cart.removeFromCart(productId);
        updateCartUI();
    }

    function handleUpdateQuantity(productId, delta) {
        Cart.updateQuantity(productId, delta);
        updateCartUI();
    }

    function generateWhatsAppLink() {
        const lang = Translations.getLang();
        let message = lang === 'zh'
            ? '您好福建花店，我有意訂購以下花牌：\n\n'
            : 'Hello Fujian Florist, I would like to order the following plaques:\n\n';

        let total = 0;
        Cart.getCart().forEach(item => {
            const name = lang === 'zh' ? item.name_zh : item.name;
            const label = Translations.t('product_no');
            message += `[${label}: ${item.id}] ${name} x ${item.quantity} - $${item.price * item.quantity}\n`;
            total += item.price * item.quantity;
        });

        message += lang === 'zh'
            ? `\n總計：$${total}\n\n請與我聯絡確認訂單詳情。謝謝！`
            : `\nTotal: $${total}\n\nPlease contact me to confirm order details. Thank you!`;

        return `https://wa.me/85291463455?text=${encodeURIComponent(message)}`;
    }

    function updateCartUI() {
        Components.updateCartCount();

        const cartItems = document.getElementById('cart-items');
        const cartFooter = document.getElementById('cart-footer');
        const cartTotal = document.getElementById('cart-total');
        const checkoutLink = document.getElementById('checkout-whatsapp-link');
        if (!cartItems || !cartFooter || !cartTotal) return;

        const cart = Cart.getCart();
        const lang = Translations.getLang();

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-12 text-gray-400">
                    <i class="fas fa-shopping-basket text-6xl mb-4 opacity-30"></i>
                    <p>${Translations.t('cart_empty')}</p>
                    <button onclick="Components.toggleCart(); document.getElementById('ceremonial').scrollIntoView({behavior: 'smooth'})"
                        class="mt-4 text-amber-700 font-semibold hover:underline">${Translations.t('cart_start')}</button>
                </div>
            `;
            cartFooter.classList.add('hidden');
        } else {
            const productNoLabel = Translations.t('product_no');
            cartItems.innerHTML = cart.map(item => {
                const name = lang === 'zh' ? item.name_zh : item.name;
                const desc = lang === 'zh' ? item.description_zh : item.description;
                return `
                    <div class="flex gap-4 slide-in-right">
                        <img src="${item.image}" alt="${name}" class="w-24 h-24 object-cover rounded-xl">
                        <div class="flex-1">
                            <div class="flex justify-between items-start mb-1">
                                <h4 class="font-serif font-bold text-gray-900">
                                    <span class="text-xs text-gray-400 font-sans font-normal">[${productNoLabel}: ${item.id}]</span> ${name}
                                </h4>
                                <button onclick="Main.handleRemoveFromCart(${item.id})" class="text-gray-400 hover:text-red-500 transition-colors">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                            <p class="text-sm text-gray-500 mb-3">${desc}</p>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center border border-gray-200 rounded-lg">
                                    <button onclick="Main.handleUpdateQuantity(${item.id}, -1)" class="quantity-btn w-8 h-8 flex items-center justify-center text-gray-600 rounded-l-lg">-</button>
                                    <span class="w-10 text-center font-semibold text-sm">${item.quantity}</span>
                                    <button onclick="Main.handleUpdateQuantity(${item.id}, 1)" class="quantity-btn w-8 h-8 flex items-center justify-center text-gray-600 rounded-r-lg">+</button>
                                </div>
                                <span class="font-bold text-amber-700">$${item.price * item.quantity}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            cartFooter.classList.remove('hidden');
            cartTotal.textContent = `$${Cart.getCartTotal()}`;

            if (checkoutLink) {
                checkoutLink.href = generateWhatsAppLink();
            }
        }
    }

    // ---- Language ----

    function setLanguage(lang) {
        Translations.setLanguage(lang);
        Products.renderAll();
        updateCartUI();
    }

    // ---- Init ----

    async function init() {
        await Translations.load();
        await Products.load();

        Translations.apply();
        Products.renderAll();
        updateCartUI();
        Components.initNavbarScroll();
    }

    return { init, setLanguage, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, updateCartUI };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => Main.init());
