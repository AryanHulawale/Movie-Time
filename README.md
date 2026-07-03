# Movie Time

A full-stack movie browsing/booking web application built as part of an internship assignment. Deployed live on Vercel.


## About

Movie Time is a full-stack application that allows users to browse and interact with movie listings through a modern web interface, backed by a REST API and dedicated backend service. The project was built as an internship assignment to demonstrate full-stack development, API design, and cloud deployment skills.

## Project Structure

```
Movie-Time/
├── api/               # Serverless API entry point (for Vercel deployment)
│
├── client/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── movie.js
│   │   └── user.js
│   ├── routers/
│   ├── uploads/       # Uploaded media (e.g. movie posters/images)
│   ├── app.js
│   └── package.json
│
└── vercel.json         # Vercel deployment configuration
```

## Tech Stack

- Frontend: React (built with Vite) - `client/`
- Backend: Node.js / Express - `server/`, `api/`
- Deployment: Vercel (serverless hosting)
- Database: MongoDB with Mongoose (based on model structure)
- File Uploads: local `uploads/` directory (e.g. for movie posters)

## Data Models

- User - user accounts and authentication
- Movie - movie listings and details

## Features

- Browse and view movie listings
- Movie detail pages
- User authentication
- Image/media uploads for movie content
- Client-server architecture with a dedicated API layer
- Deployed and continuously updated via Vercel

## Getting Started

Clone the repository:

```bash
git clone https://github.com/AryanHulawale/Movie-Time.git
cd Movie-Time
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Configure any required environment variables (database URI, API base URL, etc.) before running locally.

## Deployment

This project is deployed on Vercel, with production builds automatically triggered from the `main` branch. See `vercel.json` for deployment configuration details.

## Purpose

Developed as an internship assignment to showcase practical full-stack development, from API design and backend logic to frontend integration and cloud deployment.

## License

This project is for educational and internship evaluation purposes.
