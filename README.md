# 🔐 NextJS Authentication System

A modern, production-ready authentication system built with **Next.js**, **TypeScript**, **MongoDB Atlas**, **JWT**, and **Gmail SMTP**. It provides secure user authentication with email verification, password recovery, protected routes, and a responsive user interface.

---

## 🌐 Live Demo

🚀 **Live Website:**  
https://25-full-stack-authentication-system.vercel.app

📂 **GitHub Repository:**  
https://github.com/Vinayak-123-jpj/25-full-stack-authentication-systems

---

# ✨ Features

- 🔐 Secure User Registration
- 📧 Email Verification
- 🔑 JWT Authentication
- 🔒 Protected Routes
- 👤 User Dashboard
- 🔄 Forgot Password
- ♻️ Reset Password
- 🚪 Secure Logout
- 🍪 HTTP-Only Cookie Authentication
- ☁️ MongoDB Atlas Integration
- 📱 Fully Responsive Design

---

# 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas |
| Authentication | JWT |
| Email Service | Gmail SMTP (Nodemailer) |
| Deployment | Vercel |

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Vinayak-123-jpj/25-full-stack-authentication-systems.git
```

## 2. Navigate to the Project

```bash
cd 25-full-stack-authentication-systems
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=

TOKEN_SECRET=

DOMAIN=http://localhost:3000

MAIL_HOST=smtp.gmail.com

MAIL_PORT=587

MAIL_USER=

MAIL_PASS=
```

---

## 5. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

# 🔄 Authentication Flow

```
User Registration
        │
        ▼
Email Verification
        │
        ▼
User Login
        │
        ▼
Protected Dashboard
        │
        ▼
Forgot Password
        │
        ▼
Reset Password
        │
        ▼
Login with New Password
        │
        ▼
Logout
```

---

# 📁 Project Structure

```
src/
 ├── app/
 ├── components/
 ├── lib/
 ├── models/
 ├── utils/
 └── middleware/

public/

README.md
package.json
```

---

# 📌 Key Highlights

- Production-ready authentication system
- JWT-based authentication
- Secure password hashing
- Email verification workflow
- Password reset via email
- Protected API routes
- MongoDB Atlas cloud database
- Deployed on Vercel
- Responsive and modern UI

---

# 💡 Future Improvements

- Google Authentication
- GitHub OAuth
- Two-Factor Authentication (2FA)
- User Roles (Admin/User)
- Profile Image Upload
- Account Settings Page
- Login Activity History

---

# 👨‍💻 Author

**Vinayak Dhyani**

🎓 B.Tech CSE Student

### Connect with me

**GitHub**

https://github.com/Vinayak-123-jpj

**LinkedIn**

https://www.linkedin.com/in/vinayak-dhyani-18b547373/

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It really helps and motivates me to build more projects.

---

## 📄 License

This project is licensed under the MIT License.
