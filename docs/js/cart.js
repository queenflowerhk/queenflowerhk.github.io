/**
 * Cart module - manages shopping cart state using localStorage.
 * Provides add, remove, update, and query operations.
 */
const Cart = (() => {
    const STORAGE_KEY = 'fujianFloristCart';

    function _load() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function _save(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    function getCart() {
        return _load();
    }

    function addToCart(product) {
        const cart = _load();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        _save(cart);
        return cart;
    }

    function removeFromCart(productId) {
        const cart = _load().filter(item => item.id !== productId);
        _save(cart);
        return cart;
    }

    function updateQuantity(productId, delta) {
        const cart = _load();
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                return removeFromCart(productId);
            }
        }
        _save(cart);
        return cart;
    }

    function getCartCount() {
        return _load().reduce((sum, item) => sum + item.quantity, 0);
    }

    function getCartTotal() {
        return _load().reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function clearCart() {
        _save([]);
    }

    return { getCart, addToCart, removeFromCart, updateQuantity, getCartCount, getCartTotal, clearCart };
})();
