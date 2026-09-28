const cartManager = {
    cartKey: 'sareeloom_cart',

    getCart() {
        const cart = localStorage.getItem(this.cartKey);
        return cart ? JSON.parse(cart) : [];
    },

    saveCart(cart) {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.updateCartCount();
    },

    addToCart(product, quantity = 1, options = {}) {
        const cart = this.getCart();
        const existingItemIndex = cart.findIndex(item =>
            item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: quantity,
                options: options
            });
        }

        this.saveCart(cart);
        window.utils.showToast('Added to cart');
    },

    removeFromCart(index) {
        const cart = this.getCart();
        cart.splice(index, 1);
        this.saveCart(cart);
        window.utils.showToast('Removed from cart');
    },

    updateQuantity(index, quantity) {
        if (quantity < 1) return;
        const cart = this.getCart();
        cart[index].quantity = quantity;
        this.saveCart(cart);
    },

    clearCart() {
        localStorage.removeItem(this.cartKey);
        this.updateCartCount();
    },

    getCartTotals() {
        const cart = this.getCart();
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        let shipping = subtotal > 0 && subtotal < window.siteConfig.SHIPPING_THRESHOLD
            ? window.siteConfig.SHIPPING_FEE
            : 0;

        let discount = 0;
        const appliedCoupon = this.getAppliedCoupon();
        if (appliedCoupon) {
            const couponData = window.siteConfig.COUPONS[appliedCoupon];
            if(couponData) {
                if(couponData.type === 'percent') {
                    discount = subtotal * (couponData.value / 100);
                } else if(couponData.type === 'fixed') {
                    discount = couponData.value;
                }
            }
        }

        const total = subtotal - discount + shipping;

        return {
            subtotal,
            shipping,
            discount,
            total
        };
    },

    updateCartCount() {
        const cart = this.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartBadges = document.querySelectorAll('.cart-count-badge');
        cartBadges.forEach(badge => {
            badge.textContent = count;
            if(count > 0) {
               badge.style.display = 'flex';
            } else {
               badge.style.display = 'none';
            }
        });
    },

    applyCoupon(couponCode) {
        if(window.siteConfig.COUPONS[couponCode]) {
            localStorage.setItem('sareeloom_coupon', couponCode);
            window.utils.showToast('Coupon applied');
            return true;
        }
        window.utils.showToast('Invalid coupon', 'error');
        return false;
    },

    removeCoupon() {
        localStorage.removeItem('sareeloom_coupon');
        window.utils.showToast('Coupon removed');
    },

    getAppliedCoupon() {
        return localStorage.getItem('sareeloom_coupon');
    }
};

window.cartManager = cartManager;

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', () => {
    cartManager.updateCartCount();
});
