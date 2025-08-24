<<<<<<< HEAD
# ecomerce-website-
author - fawad ali <br>
Ecom-Multi is a production-ready e-commerce starter for the modern web, built with Next.js 14 (App Router), TypeScript, Prisma, NextAuth, and TailwindCSS. It lets you sell your own products and also list affiliate items such as Amazon links, so you can combine inventory sales and referral revenue in one clean storefron.
=======
# MERN E‑Commerce (Ready-to-Run)

Full‑stack e‑commerce boilerplate using **React + Vite**, **Node.js/Express**, and **MongoDB** with **JWT** auth, **cart**, **orders**, and **Stripe/PayPal** stubs. Mobile‑responsive UI and admin panel for product & order management.

## Quick Start

### 1) Backend
```bash
cd server
npm install
# copy env template and fill your secrets
cp .env.example .env
# run dev
npm run dev
```
The server runs on `http://localhost:5000`. Make sure MongoDB is running and your `.env` has `MONGO_URI`.

### 2) Seed Products (optional)
```bash
npm run seed
```

### 3) Frontend
```bash
cd ../client
npm install
npm run dev
```
Open the printed local URL (usually `http://localhost:5173`).

## .env (Backend)
Copy from `.env.example` and fill in values:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce
JWT_SECRET=supersecret
STRIPE_SECRET=sk_test_xxx
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
CORS_ORIGIN=http://localhost:5173
```

## Features
- User Auth (JWT + bcrypt)
- Product list/search/filter, details
- Cart & checkout
- Orders (create/list), Admin can mark delivered
- Admin Product CRUD
- Stripe PaymentIntent stub & PayPal order stub (use your keys)
- Responsive layout
- Netlify (frontend) + Heroku (backend) ready configs

## Deploy
- **Server (Heroku)**: uses `Procfile`; set env vars in Heroku.
- **Client (Netlify)**: `npm run build` then deploy `client/dist` or connect repo; set `VITE_API_URL` in Netlify env.

## Scripts
- `server`: `npm run dev` (nodemon)
- `client`: `npm run dev`, `npm run build`, `npm run preview`

---

Author: **Fawad Ali** (you can change branding in `client/src/components/NavBar.jsx` and `index.html`)
>>>>>>> caba95a (Initial commit: MERN e-commerce (React + Node + MongoDB))
