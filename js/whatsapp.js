const whatsappManager = {
    generateOrderMessage(customerDetails, orderId) {
        const cart = window.cartManager.getCart();
        const totals = window.cartManager.getCartTotals();

        let message = `🛍️ NEW SAREE ORDER\n\n`;
        message += `Order Reference: ${orderId}\n`;
        message += `━━━━━━━━━━━━━━━━━━\n\n`;

        message += `📦 ORDER ITEMS\n\n`;

        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Product ID: ${item.id}\n`;

            // Add variants if any
            if (item.options) {
                for (const [key, value] of Object.entries(item.options)) {
                    message += `   ${key}: ${value}\n`;
                }
            }

            message += `   Qty: ${item.quantity}\n`;
            message += `   Price: ${window.utils.formatCurrency(item.price)}\n`;
            message += `   Subtotal: ${window.utils.formatCurrency(item.price * item.quantity)}\n\n`;
        });

        message += `━━━━━━━━━━━━━━━━━━\n\n`;

        message += `💰 ORDER SUMMARY\n\n`;
        message += `Subtotal: ${window.utils.formatCurrency(totals.subtotal)}\n`;
        if (totals.discount > 0) {
            message += `Discount: -${window.utils.formatCurrency(totals.discount)}\n`;
        }
        message += `Shipping: ${totals.shipping === 0 ? 'FREE' : window.utils.formatCurrency(totals.shipping)}\n`;
        message += `TOTAL: ${window.utils.formatCurrency(totals.total)}\n\n`;

        message += `━━━━━━━━━━━━━━━━━━\n\n`;

        message += `👤 CUSTOMER DETAILS\n\n`;
        message += `Name: ${customerDetails.name}\n`;
        message += `Mobile: ${customerDetails.mobile}\n`;
        if (customerDetails.email) message += `Email: ${customerDetails.email}\n`;
        if (customerDetails.altPhone) message += `Alt Phone: ${customerDetails.altPhone}\n`;

        message += `\n📍 DELIVERY ADDRESS\n\n`;
        message += `House/Flat: ${customerDetails.house}\n`;
        message += `Street/Area: ${customerDetails.street}\n`;
        if (customerDetails.landmark) message += `Landmark: ${customerDetails.landmark}\n`;
        message += `City: ${customerDetails.city}\n`;
        message += `State: ${customerDetails.state}\n`;
        message += `Pincode: ${customerDetails.pincode}\n`;

        if (customerDetails.notes) {
            message += `\n📝 ORDER NOTES\n\n`;
            message += `${customerDetails.notes}\n`;
        }

        message += `\n━━━━━━━━━━━━━━━━━━\n\n`;
        message += `Order generated from:\n${window.siteConfig.SITE_NAME}\n`;

        return message;
    },

    getWhatsAppUrl(message) {
        const number = window.siteConfig.BUSINESS_WHATSAPP_NUMBER;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${number}?text=${encodedMessage}`;
    },

    openWhatsApp(message) {
        const url = this.getWhatsAppUrl(message);
        window.open(url, '_blank');
    },

    generateDirectProductMessage(product, quantity, options = {}) {
        let message = `Hi ${window.siteConfig.SITE_NAME}, I'm interested in buying this saree:\n\n`;
        message += `Product: ${product.name}\n`;
        message += `Product ID: ${product.id}\n`;
        message += `Price: ${window.utils.formatCurrency(product.price)}\n`;
        message += `Quantity: ${quantity}\n`;

        if (Object.keys(options).length > 0) {
            message += `\nOptions:\n`;
            for (const [key, value] of Object.entries(options)) {
                message += `${key}: ${value}\n`;
            }
        }

        message += `\nPlease send me payment and delivery details.`;
        return message;
    }
};

window.whatsappManager = whatsappManager;
