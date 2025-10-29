# Weather Now 🌤️

A modern, responsive weather application built for outdoor enthusiasts to quickly check current weather conditions for any city worldwide.

## 🎯 Project Overview

This application was developed as part of a UI/UX take-home challenge. It addresses the needs of Jamie, an outdoor enthusiast who requires quick access to current weather information for planning outdoor activities.

## ✨ Features

- **Real-time Weather Data**: Fetches current weather information from OpenWeatherMap API
- **City Search**: Search for any city worldwide with instant results
- **Comprehensive Weather Details**:
    - Current temperature with "feels like" metric
    - Weather conditions and descriptions
    - Humidity levels
    - Wind speed
    - Min/max temperatures
    - Atmospheric pressure
    - Visibility
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Graceful handling of network errors, invalid cities, and API issues
- **Loading States**: Visual feedback during data fetching
- **Modern UI**: Clean, glassmorphic design with smooth animations

## 🛠️ Technology Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: OpenWeatherMap API
- **Build Tool**: Vite
- **State Management**: React Hooks (useState)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-now
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Deployment

### Deploy to StackBlitz

1. Go to [StackBlitz](https://stackblitz.com/)
2. Click "New Project" → "Import from GitHub"
3. Enter your repository URL
4. The app will automatically deploy

### Deploy to CodeSandbox

1. Go to [CodeSandbox](https://codesandbox.io/)
2. Click "Import" → "From GitHub"
3. Enter your repository URL
4. The app will automatically build and deploy

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory.

## 📝 Code Structure
```
src/
├── App.jsx          # Main application component with all logic
├── main.jsx         # React entry point
└── index.css        # Global styles and Tailwind imports
```

## 🎨 Design Decisions

- **Glassmorphism**: Used frosted glass effect for a modern, weather-appropriate aesthetic
- **Gradient Background**: Blue gradient to simulate sky/weather theme
- **Icon Integration**: Weather-related icons for intuitive understanding
- **Grid Layout**: Responsive grid for weather details that adapts to screen size
- **Accessibility**: High contrast text, focus states, and semantic HTML

## 🔧 Key Features Implementation

### Error Handling
- Network connectivity issues
- Invalid city names (404 errors)
- API authentication errors
- Generic error fallback

### State Management
- `data`: Stores weather information
- `location`: Tracks user input
- `loading`: Shows loading state during API calls
- `error`: Manages error messages

### API Integration
- Uses native `fetch` API for HTTP requests
- Async/await pattern for clean asynchronous code
- Proper error handling with try-catch blocks

## 🧪 Testing

Test the application with:
- Valid cities: "London", "New York", "Tokyo"
- Invalid cities: "XYZ123" (should show error)
- Network issues: Disconnect internet (should show network error)
- Edge cases: Empty input (prevents submission)

## 📱 Responsiveness

The application is fully responsive and tested on:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🎓 Learning Objectives Demonstrated

- React functional components and hooks
- API integration and data fetching
- Error handling and loading states
- Responsive design with Tailwind CSS
- Modern JavaScript (ES6+)
- Clean code practices and documentation
- User-centric design

## 👤 User Persona

**Name**: Jamie  
**Occupation**: Outdoor Enthusiast  
**Need**: Quick access to current weather conditions for outdoor activity planning

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern weather applications

## 📄 License

This project is part of a take-home challenge and is for educational purposes.

---

Built with ❤️ for Jamie, the Outdoor Enthusiast
```

---

## **8. .gitignore**
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production