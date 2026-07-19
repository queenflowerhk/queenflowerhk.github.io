/**
 * Components module - shared UI behaviors.
 * Toast notifications, mobile menu toggle, navbar scroll effect, cart sidebar toggle.
 */
const Components = (() => {

    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;
        toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        }, 3000);
    }

    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('hidden');
    }

    function toggleCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        if (!sidebar || !overlay) return;

        if (sidebar.classList.contains('translate-x-full')) {
            sidebar.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.add('translate-x-full');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    function initNavbarScroll() {
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (!navbar) return;
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (!cartCount) return;
        const count = Cart.getCartCount();
        if (count > 0) {
            cartCount.textContent = count;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.classList.add('hidden');
        }
    }

    return { showToast, toggleMobileMenu, toggleCart, initNavbarScroll, updateCartCount };
})();

// Expose globally for inline onclick handlers
function toggleCart() { Components.toggleCart(); }
function toggleMobileMenu() { Components.toggleMobileMenu(); }
function setLanguage(lang) { Main.setLanguage(lang); }
