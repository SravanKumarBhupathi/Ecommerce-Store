# Sareeloom - Premium Indian Sarees Static Ecommerce

## Project Overview
I have built a complete, production-quality, mobile-first Saree Ecommerce Website as a 100% static frontend application.

- **Framework Used:** Pure HTML, CSS, and Vanilla JavaScript (No backend framework needed).
- **Architecture:** Local state management using `localStorage` for Cart and Wishlist. Dynamic rendering using JavaScript manipulating the DOM.
- **Styling:** Custom CSS with CSS variables, fully responsive grid systems, and flexbox layouts. Mobile-first design approach.

## How to Run Locally
1. Clone the repository or download the source files.
2. Open `index.html` directly in your browser, or use a local static server (e.g., `npx serve`, `python -m http.server`, or VS Code Live Server).

## How to Deploy
Because this is a 100% static website, you can deploy it for free on any static hosting provider.
- **Cloudflare Pages / Vercel / Netlify:** Just connect your GitHub repository or drag and drop the folder into the deployment dashboard.
- **GitHub Pages:** Push the code to a repository and enable GitHub Pages in the repository settings.

## Configuration Guide

The central configuration for the website is stored in `js/config.js`.

- **Where to change WhatsApp number:**
  Open `js/config.js` and modify `BUSINESS_WHATSAPP_NUMBER`. Include the country code but omit the `+` sign (e.g., `"919876543210"`).
- **Where to change site name, email, and social links:**
  Open `js/config.js` and modify `SITE_NAME`, `BUSINESS_EMAIL`, `BUSINESS_PHONE`, `INSTAGRAM_URL`, etc.
- **Where to change shipping fee and threshold:**
  Open `js/config.js` and edit `SHIPPING_THRESHOLD` (e.g., 999) and `SHIPPING_FEE` (e.g., 79).
- **Where to add/edit coupons:**
  Open `js/config.js` and edit the `COUPONS` object.

## Product Management

- **Where to add/edit products:**
  Open `js/products.js`. The products are stored as an array of JavaScript objects. You can easily add, remove, or modify product entries. Make sure each product has a unique `id` (e.g., `"SAR-1021"`).

## How the WhatsApp Ordering Flow Works

1. **Product Selection:** The user browses products and clicks "Add to Cart" or "Buy Now". Product details (including ID, Name, Price, and Quantity) are saved in the `localStorage`.
2. **Checkout:** The user enters their Customer Information and Delivery Address. The form validates the inputs (e.g., ensuring a 10-digit mobile number and 6-digit pincode).
3. **Order Generation:** When the user clicks "Order on WhatsApp", the system calculates the totals (including shipping and applicable coupons) and generates a unique Order Reference (e.g., `ORD-20231024-1234`).
4. **Message Formatting:** A formatted string is generated containing the complete order details: Items, Product IDs, Subtotal, Discount, Shipping, Total, Customer Details, Address, and Order Notes.
5. **WhatsApp URL:** The message is URL-encoded and appended to the WhatsApp `wa.me` URL along with the configured `BUSINESS_WHATSAPP_NUMBER`.
6. **Submission:** WhatsApp opens with the pre-filled message. The customer manually presses SEND to finalize the order. A fallback "Copy Order Message" button is also provided if the redirect fails.

## Key Features Implemented
- Completely static architecture, zero backend dependencies.
- Fully working search and filtering system.
- Cart and Wishlist using `localStorage`.
- Promotional coupon logic.
- Responsive, high-end design optimized for mobile devices.
