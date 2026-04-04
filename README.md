# HelpOthers – Frontend

HelpOthers is a MERN stack platform designed to support NGOs by enabling users to explore initiatives and contribute through donations.  
This repository contains the **frontend application built with React (Vite)**.

The application communicates with the backend API deployed on Railway and provides a responsive interface for users to interact with the platform.

---

## Live Application

**Frontend (Vercel)

https://helpothers-five.vercel.app

for demo purpose 
email => admin@gmail.com , volunteer@gmail.com , user@gmail.com , 
password => admin123 , volunteer123 , user123
username => admin , volunteer , user
verification code => 123456

Google login are provided please login to check in detail

**Backend API

https://myprojectadiyuvanbackend-production.up.railway.app

---

## Tech Stack

Frontend
- React (Vite)
- Axios
- React Router
- Google OAuth
- Tailwind CSS / CSS
- Environment Variables

Deployment
- Vercel

---

## Features

### Authentication
- Role based authentication i.e user, volunteer and admin
- Google OAuth login
- Secure authentication flow with backend JWT handling
- Password reset interface
 
### NGO Platform
- Browse NGO initiatives
- View uploaded NGO images
- Explore donation campaigns

### Donation System
- Razorpay payment integration
- Secure donation workflow
- Order creation and verification through backend API

### Media Handling
- Display images uploaded to Cloudinary
- Optimized image loading from cloud storage

### User Experience
- Responsive UI for desktop and mobile
- Dynamic API-driven content
- Error handling and user feedback

### Security
- Secure API communication
- Environment variable configuration

---

## Environment Variables

Create a `.env` file in the root of the frontend project.

Example:

VITE_BACKEND_URL=https://myprojectadiyuvanbackend-production.up.railway.app

VITE_GOOGLE_CLIENT_ID=your_google_client_id

---

## Installation

Clone the repository

git clone https://github.com/RahulShukla387/helpOthersFrontend.git

Navigate to the project directory => cd MyProjectAdiYuvanFrontend
Install dependencies => npm install

Run the development server  => npm run dev


---

## Deployment

The frontend is deployed using **Vercel**.

Steps used:

1. Push project to GitHub
2. Import repository into Vercel
3. Configure environment variables
4. Deploy

---

## Author

Rahul Shukla

GitHub

https://github.com/RahulShukla387
