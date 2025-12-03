# 📦 QuickShop – MERN E-Commerce Platform

A full-stack E-commerce application built using **MongoDB, Express.js, React.js, and Node.js** with JWT authentication, admin dashboard, image uploads, analytics, Docker support, and a modern UI.

---

# 🚀 Features

### 🛒 User Features

* User registration & login (JWT)
* Product browsing
* Product search & sorting (price low→high, high→low, newest)
* Product details page
* Cart system using global state
* Checkout flow (Mock payment)
* Order placement
* Order history page
* User profile page

### 🛠 Admin Features

* Admin-only access
* Add products (with image upload)
* Delete products
* Update inventory
* View total orders & total sales (Analytics dashboard)
* Manage orders

### 🔧 Backend Features

* RESTful APIs (Express + Mongoose)
* JWT Auth + bcrypt password hashing
* Product CRUD
* Order creation & history
* Image upload using Multer
* Email notifications (Nodemailer)
* Seeder script to create admin + sample products
* Dockerized backend

### 🎨 Frontend Features

* Clean, modern UI (custom CSS)
* React Router
* Global auth & cart context
* Admin Dashboard
* Analytics Dashboard
* Image preview
* Fully responsive design
* Dockerized frontend

### 🐳 Docker Support

* Dockerfile for backend
* Dockerfile for frontend
* docker-compose.yml (MongoDB + Backend + Frontend)

---

# 📁 Project Structure

```
quickshop/
 ├── backend/
 │    ├── models/
 │    ├── routes/
 │    ├── middleware/
 │    ├── utils/
 │    ├── uploads/
 │    ├── seed.js
 │    ├── server.js
 │    ├── Dockerfile
 │    └── package.json
 ├── frontend/
 │    ├── public/
 │    ├── src/
 │    │     ├── components/
 │    │     ├── utils/
 │    │     ├── assets/
 │    │     ├── App.js
 │    │     └── index.js
 │    ├── Dockerfile
 │    └── package.json
 ├── docker-compose.yml
 └── README.md
```

---

# ⚙️ Installation (Local Setup)

## 1️⃣ Install Backend

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=mongodb://localhost:27017/quickshop
JWT_SECRET=supersecret_key
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
PORT=5000
```

## 2️⃣ Seed Database (Admin + Sample Products)

```
node seed.js
```

Admin credentials created automatically:

```
Email: admin@quickshop.local
Password: adminpass
```

## 3️⃣ Start Backend

```
npm run dev
```

Backend will start at:
👉 [http://localhost:5000](http://localhost:5000)

---

## 4️⃣ Install Frontend

```
cd ../frontend
npm install
npm start
```

Frontend runs at:
👉 [http://localhost:3000](http://localhost:3000)

---

# 🐳 Docker Setup (Recommended)

From project root:

```
docker compose up --build
```

Services started:

* **Frontend** → [http://localhost:3000](http://localhost:3000)
* **Backend** → [http://localhost:5000](http://localhost:5000)
* **MongoDB** → port 27017

---

# 🧪 Running Tests

In backend:

```
npm test
```

(Jest + Supertest)

---

# 📷 Image Uploads

Images uploaded via Admin Dashboard go to:

```
backend/uploads/
```

Served publicly at:

```
/uploads/<filename>
```

---

# 📈 Analytics

Admin can fetch total orders + total sales via:

```
GET /api/analytics/sales
```

---

# 📮 Email Notifications

Enable by configuring SMTP in `.env`:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=app_password
```

Emails are sent when order is placed (mock checkout).

---

# 🛡 Authentication

Frontend stores:

* `token` in localStorage
* `user` info in localStorage

Every protected request includes:

```
Authorization: Bearer <token>
```

---

# 🧰 Technologies Used

### Frontend

* React
* React Router
* Axios
* Context API
* Custom CSS

### Backend

* Node.js
* Express.js
* MongoDB / Mongoose
* JWT
* Multer
* Nodemailer
* Docker
* Jest + Supertest

---

# ❤️ Credits

Developed as a modern MERN-stack E-commerce project showcasing:
authentication, admin panel, dashboards, full-stack features, and deployment-ready architecture.

---
