# 🎟 EventHub — Full-Stack Event Booking Platform

A modern, full-stack event booking platform with role-based access for **Users**, **Organizers**, and **Admins**. Users can browse and book events, organizers can create and manage their own events, and admins have full control through the Django admin panel.

**🔗 Live Demo:** [https://eventhub-frontend-beryl.vercel.app](https://eventhub-frontend-beryl.vercel.app)

---

## 🚀 Features

### 👤 For Users
- Register and log in with token-based authentication
- Email domain validation during registration
- Browse upcoming events with category and location filters
- View detailed event information with images
- Book tickets with instant seat availability checks
- View personal booking history on the **My Bookings** page
- Toggle between Dark and Light themes

### 🎤 For Organizers
- Dedicated organizer registration
- Personal dashboard with real-time statistics:
  - Total events, bookings, customers, and revenue
- Create, edit, and delete your own events
- **Multi-tenant isolation** — organizers can manage only their own events
- Image uploads via Cloudinary

### 👑 For Admins
- Full access to the Django admin panel
- Manage all users, events, and bookings
- Assign roles and manage permissions

---

## 🛠 Tech Stack

### Frontend
- **React 18** + **Vite**
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for theme management
- Custom CSS with design tokens (CSS variables)
- Deployed on **Vercel**

### Backend
- **Django 6.1** + **Django REST Framework**
- **Token Authentication** (DRF)
- **PostgreSQL** on Render (production)
- **SQLite** for local development
- **Cloudinary** for image hosting
- **WhiteNoise** for serving static files in production
- **Gunicorn** as the production WSGI server
- Deployed on **Render**

### Database & Storage
- **PostgreSQL** on Render
- **SQLite** for local development
- **Cloudinary** for media files

---

## 📦 Project Structure

```
Eventhub/
├── backend/
│   ├── config/              # Django project settings
│   ├── eventhub/            # Main app
│   │   ├── models.py        # Event, Booking, UserProfile
│   │   ├── views.py         # API endpoints
│   │   ├── serializers.py   # DRF serializers
│   │   ├── urls.py          # App URLs
│   │   ├── admin.py         # Admin configuration
│   │   └── emails.py        # Email helpers
│   ├── requirements.txt
│   ├── Procfile
│   ├── runtime.txt
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── config.js
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL (optional — SQLite works for local development)

### Backend Setup

```bash
git clone https://github.com/NARESHRAJESH/eventhub-backend.git
cd eventhub-backend

python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

# Create a .env file (see .env.example)

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup

```bash
git clone https://github.com/NARESHRAJESH/eventhub-frontend.git
cd eventhub-frontend

npm install

echo "VITE_API_URL=http://127.0.0.1:8000" > .env

npm run dev
```

### Environment Variables (Backend `.env`)

```env
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=postgresql://user:password@host:port/dbname

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password

DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=your_password
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | User / Organizer registration |
| POST | `/api/login/` | Login (returns token) |
| GET | `/api/events/` | List all events |
| POST | `/api/events/` | Create event (organizer only) |
| GET | `/api/events/<id>/` | Event details |
| PUT | `/api/events/<id>/` | Update event (owner only) |
| DELETE | `/api/events/<id>/` | Delete event (owner only) |
| POST | `/api/bookings/` | Create booking |
| GET | `/api/my-bookings/` | Current user's bookings |
| GET | `/api/organizer/dashboard/` | Organizer statistics |

---

## 🎨 Design System

- **Colors:** Rose + Slate palette
- **Typography:** Inter font family
- **Theming:** CSS variables with light and dark mode
- **Responsive:** Mobile-first, works on all screen sizes

---

## 🔒 Security

- Token-based authentication (DRF)
- Password hashing (Django default)
- CSRF protection
- CORS configured for production
- Object-level permissions (organizers can modify only their own events)
- Environment variables for all secrets

---

## 🚧 Future Improvements

- [ ] Email verification with Resend API
- [ ] Payment gateway (Razorpay / Stripe)
- [ ] Event reviews and ratings
- [ ] Advanced search and filtering
- [ ] PDF ticket generation
- [ ] Analytics dashboard with charts

---

## 👨‍💻 Author

**Naresh Rajesh**
- GitHub: [@NARESHRAJESH](https://github.com/NARESHRAJESH)
- Live Demo: [EventHub](https://eventhub-frontend-beryl.vercel.app)

---

⭐ **If you like this project, please give it a star!**
