# 🍳 Kuresepi

A modern recipe discovery and calorie tracking application built with React, TypeScript, and Vite.

![Kuresepi](https://img.shields.io/badge/version-1.0.0-neon?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

- 🔍 **Recipe Search** - Search thousands of recipes from FatSecret database
- 📊 **Nutrition Info** - View detailed calorie and nutrition information
- ❤️ **Favorites** - Save your favorite recipes (requires login)
- 🔐 **Authentication** - Secure user authentication with Supabase
- 📱 **Responsive Design** - Works beautifully on desktop and mobile

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **API:** FatSecret Platform API
- **Auth & Database:** Supabase
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- FatSecret API credentials
- Supabase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kuresepi.git
   cd kuresepi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_FATSECRET_CLIENT_ID=your_client_id
   VITE_FATSECRET_CLIENT_SECRET=your_client_secret
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Deployment (Vercel)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel Dashboard:
   - `VITE_FATSECRET_CLIENT_ID`
   - `VITE_FATSECRET_CLIENT_SECRET`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

The `api/` folder contains serverless functions that proxy requests to FatSecret API.

## 📁 Project Structure

```
kuresepi/
├── api/                 # Vercel serverless functions
│   ├── token.ts         # OAuth token proxy
│   └── fatsecret.ts     # FatSecret API proxy
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── public/              # Static assets
└── vercel.json          # Vercel configuration
```

## 📄 License

MIT License - feel free to use this project for learning and personal use.

---

Made with 💚 by Wisnu
