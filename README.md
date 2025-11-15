# Chocos – Modern chocos App

A full-stack, high-performance e-commerce style application built with **Next.js 15**, **React 19**, **Drizzle ORM**, **PostgreSQL**, and **React Query**.  
Chocos allows users to browse books, manage a cart, handle authentication, and perform admin-level operations.

---

##  Tech Stack

### **Frontend**
- Next.js 15 (Turbopack)
- React 19
- Tailwind CSS
- Shadcn/UI + Radix UI Components
- React Query (@tanstack/react-query)
- React Hook Form + Zod
- Recharts (Data visualization)

### **Backend / Database**
- Next.js Route Handlers
- Drizzle ORM
- PostgreSQL
- Axios
- NextAuth (Authentication)

### **State Management**
- Zustand

---

##  Features

###  User Features
- Browse books with categories and filters  
- Add/remove items from cart  
- Checkout workflow  
- User profile and order history  
-  

### 🛠️ Admin Features
- CRUD for chocolate  
- Order management  
- Role-based access control  

### 🔐 Authentication
- Email/password  
- OAuth providers (Google, GitHub, etc.)  
- Secure sessions with NextAuth  

### 🗃️ Database
- Drizzle ORM with PostgreSQL  
- Migration system  
- Clean schema-first design  

---

## 🏗️ Project Structure

Chocos-app
├── app/
│ ├── api/ # Route handlers (backend)
│ ├── dashboard/ # Admin dashboard
│ ├── (auth)/ # Auth pages
│ └── ... # Client pages
├── components/
├── db/
│ ├── schema/ # Drizzle schemas
│ └── drizzle.config.ts
├── hooks/
├── lib/
├── public/
├── styles/
├── migrate.ts
└── README.md

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file and add:

DATABASE_URL=postgres://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret

yaml
Copy code

Add more providers if needed.

---

## ▶️ Getting Started

### Clone the repository

https://github.com/Manish-Karke/Chocos-app/.git
cd chocos
Install dependencies
bash
Copy code
npm install
Generate & run migrations
bash
Copy code
npm run db:generate
npm run db:run
Start development server
bash
Copy code
npm run dev
