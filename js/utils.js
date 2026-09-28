// Utility functions

const utils = {
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: siteConfig.CURRENCY_CODE,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Trigger reflow
        toast.offsetHeight;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        return container;
    },

    getURLParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    getProductById(id) {
        return window.products.find(p => p.id === id);
    },

    generateOrderId() {
        const date = new Date();
        const dateStr = date.toISOString().slice(0,10).replace(/-/g,"");
        const randomStr = Math.floor(1000 + Math.random() * 9000);
        return `ORD-${dateStr}-${randomStr}`;
    }
};

window.utils = utils;
