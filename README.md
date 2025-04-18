# 📸 Snapify - Photo Gallery API

Snapify is a full-stack backend API for a photo gallery application built using **NestJS**, **PostgreSQL**, **Cloudinary**, **Sequelize**, and **JWT Authentication**.

It allows users to register, login, upload and manage photos, and includes admin-only statistics.

---

## 🚀 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL (via Sequelize ORM)
- **Auth:** JWT-based Authentication
- **Image Upload:** Cloudinary
- **Logging:** Winston + Morgan
- **Validation:** DTOs and class-validator
- **Architecture:** Modular with MVC pattern

---

## 📦 Installation

# Clone the repo
git clone https://github.com/akshat1app/Snapify-PhotoGallery.git

cd Snapify-PhotoGallery

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run the app
npm run start:dev

🔐 Authentication
All protected routes require an Authorization: Bearer <token> header.

📂 API Endpoints

📁 Auth Module
Method | Endpoint | Description | Protected
POST | /auth/register | Register new user | ❌
POST | /auth/login | Login and get JWT token | ❌
GET | /auth/me | Get current user info | ✅

🖼️ Photo Module
Method | Endpoint | Description | Protected
POST | /photos/upload | Upload a new photo (image + caption) | ✅
GET | /photos | Get all user-uploaded photos (paginated) | ✅
GET | /photos/:id | Get a specific photo by ID | ✅
DELETE | /photos/:id | Delete a photo (only by the owner) | ✅

✅ POST /photos/upload accepts multipart/form-data:
image: image file
caption: string

🛠️ Admin Module
Method | Endpoint | Description | Protected | Access
GET | /admin/stats | View platform statistics | ✅ | Admin Only

Sample Stats returned:

{
    "totalUploads": 4,
    "mostActiveUploader": {
        "name": "Akshat",
        "email": "akshat@gmail.com",
        "uploadCount": 1
    },
    "largestPhoto": {
        "id": 5,
        "fileName": "file",
        "fileSize": 22258,
        "filePath": "https://res.cloudinary.com/difywkjte/image/upload/v1744979325/snapify_photos/qdutlgb8df8r3o2z1kgk.jpg",
        "caption": "profile photo",
        "userId": null,
        "createdAt": "2025-04-18T12:28:46.397Z",
        "updatedAt": "2025-04-18T12:28:46.397Z"
    }
}

📁 Project Structure
src/
│
├── auth/         # Auth module (login, register, guard, strategy)
├── user/         # User model/service
├── photo/        # Photo CRUD operations
├── admin/        # Admin stats & guards
├── cloudinary/   # Cloudinary upload config
├── config/       # Centralized app configs
├── main.ts       # Entry point


🧑‍💻 Author
Akshat Srivastava
