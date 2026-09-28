const wishlistManager = {
    wishlistKey: 'sareeloom_wishlist',

    getWishlist() {
        const wishlist = localStorage.getItem(this.wishlistKey);
        return wishlist ? JSON.parse(wishlist) : [];
    },

    saveWishlist(wishlist) {
        localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
        this.updateWishlistUI();
    },

    toggleWishlist(productId) {
        const wishlist = this.getWishlist();
        const index = wishlist.indexOf(productId);

        if (index > -1) {
            wishlist.splice(index, 1);
            window.utils.showToast('Removed from wishlist');
        } else {
            wishlist.push(productId);
            window.utils.showToast('Added to wishlist');
        }

        this.saveWishlist(wishlist);
    },

    isInWishlist(productId) {
        return this.getWishlist().includes(productId);
    },

    updateWishlistUI() {
        // Update all wishlist buttons on the page
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            const productId = btn.dataset.id;
            if (this.isInWishlist(productId)) {
                btn.classList.add('active');
                btn.innerHTML = '❤️'; // Or use an active icon
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '🤍'; // Or use an inactive icon
            }
        });
    }
};

window.wishlistManager = wishlistManager;

document.addEventListener('DOMContentLoaded', () => {
    wishlistManager.updateWishlistUI();
});
