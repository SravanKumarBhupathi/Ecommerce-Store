const siteConfig = {
    SITE_NAME: "Sareeloom",
    // CHANGE THIS TO YOUR WHATSAPP BUSINESS NUMBER (include country code, no +, no spaces)
    BUSINESS_WHATSAPP_NUMBER: "919876543210",
    BUSINESS_EMAIL: "hello@sareeloom.demo.com",
    BUSINESS_PHONE: "+91 98765 43210",
    BUSINESS_HOURS: "Mon - Sat: 10:00 AM - 8:00 PM",
    BUSINESS_ADDRESS: "123 Silk Board Road, Bengaluru, Karnataka 560068",
    INSTAGRAM_URL: "https://instagram.com/",
    FACEBOOK_URL: "https://facebook.com/",

    CURRENCY_SYMBOL: "₹",
    CURRENCY_CODE: "INR",

    SHIPPING_THRESHOLD: 999,
    SHIPPING_FEE: 79,
    FREE_SHIPPING_TEXT: "Free Shipping on Orders Above ₹999",

    COUPONS: {
        "WELCOME10": { type: "percent", value: 10 },
        "SALE200": { type: "fixed", value: 200 }
    }
};

// Make it available globally
window.siteConfig = siteConfig;
