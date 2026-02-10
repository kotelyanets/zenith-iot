# 🌟 Zenith IoT Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Real-time IoT monitoring dashboard with AI-powered insights**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Architecture](#architecture) • [Contributing](#contributing)

</div>

---

## 📋 Overview

Zenith IoT is a comprehensive real-time monitoring platform designed for Industrial IoT applications. Built with modern web technologies, it provides instant insights into global device networks, predictive maintenance alerts, and system health monitoring through an elegant, res ponsive interface.

### ✨ Key Highlights

- **Real-Time Monitoring**: Live energy consumption tracking with interactive charts
- **Global Device Management**: Interactive world map with geolocation-based device status
- **AI-Powered Insights**: Machine learning-driven anomaly detection and predictive maintenance recommendations
- **System Health Dashboard**: Comprehensive CPU, memory, and network monitoring with circular progress indicators
- **Incident Management**: Real-time incident tracking with severity-based prioritization
- **Responsive Design**: Mobile-first approach with Bento Grid layout system

---

## 🚀 Features

### 📊 Real-Time Analytics
- **Energy Consumption Chart**: Live power usage visualization with Recharts
- **Time-series data** with smooth animations
- **Customizable time ranges** and data granularity

### 🗺️ Global Device Map
- **Interactive world map** with authentic continent representations
- **Device markers** with real-time status (Online, Warning, Offline)
- **Geolocation tooltips** showing device details
- **7 global server locations** across continents

### 🤖 AI-Powered Analysis
- **Zenith AI Engine** with typewriter-effect notifications
- **Anomaly detection** in real-time sensor data
- **Predictive maintenance** alerts (e.g., "Check cooling fan in Server B within 48h")
- **Energy optimization** recommendations

### 💚 System Health Monitoring
- **Circular progress indicators** for CPU, Memory, and Network
- **SVG-based visualizations** with smooth gradients
- **Real-time status badges** (All systems normal / Attention needed)
- **Compact design** optimized for dashboard space

### 🚨 Incident Management
- **Incident table** with severity-based badges (Critical, Warning, Info)
- **Scrollable list** with 8+ recent incidents
- **Timestamp tracking** for all events
- **Device-level issue tracking**

---

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 16.1.6](https://nextjs.org/)** - React framework with Turbopack for ultra-fast compilation
- **[React 19.2.3](https://react.dev/)** - Latest React with improved performance
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)** - High-quality component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animations
- **[Lucide Icons](https://lucide.dev/)** - Beautiful, consistent icon set

### Data Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library
- **Custom SVG components** for circular progress indicators

### Developer Experience
- **ESLint 9** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Babel React Compiler** - Optimized React builds

---

## 🏃 Getting Started

### Prerequisites

```bash
Node.js >= 20.x
npm >= 10.x
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kotelyanets/zenith-iot.git
   cd zenith-iot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
zenith-iot/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── page.tsx             # Main dashboard page
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── ai-insights.tsx        # AI analysis card
│   │   │   ├── device-map.tsx         # Global map component
│   │   │   ├── energy-chart.tsx       # Power consumption chart
│   │   │   ├── recent-incidents.tsx   # Incident table
│   │   │   └── system-health.tsx      # Health monitoring
│   │   └── ui/                  # Reusable UI components (Shadcn)
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── scroll-area.tsx
│   │       ├── table.tsx
│   │       └── tooltip.tsx
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/
│   └── world-map.png            # World map background
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary IoT Gradient */
Indigo-Purple: from-indigo-500/5 to-purple-500/5

/* Status Colors */
Online:   emerald-500  (#10b981)
Warning:  amber-500    (#f59e0b)
Offline:  rose-500     (#f43f5e)

/* System Metrics */
CPU:      emerald-400 to emerald-500
Memory:   indigo-400 to indigo-500
Network:  violet-400 to violet-500
```

### Layout System

- **Bento Grid**: 4-column responsive grid with auto-rows
- **Component Sizes**:
  - Energy Chart: 3×2 (col-span-3 row-span-2)
  - AI Insights: 2×1 (col-span-2 row-span-1)
  - Device Map: 2×2 (col-span-2 row-span-2)
  - System Health: 1×2 (col-span-1 row-span-2)
  - Recent Incidents: 3×1 (col-span-3 row-span-1)

---

## 🏗️ Architecture

### Component Architecture

```
┌─────────────────────────────────────────┐
│         Next.js App Router              │
│  (Server Components + Client Islands)   │
└──────────────┬──────────────────────────┘
               │
      ┌────────┴────────┐
      │   Dashboard     │
      │   Layout        │
      └────────┬────────┘
               │
    ┌──────────┴──────────────────┐
    │    Bento Grid Container     │
    └──────────┬──────────────────┘
               │
      ┌────────┴─────────────┐
      │  Dashboard Cards     │
      │  (Client Components) │
      └──────────────────────┘
         │    │    │    │
    ┌────┘    │    │    └────┐
    │         │    │         │
 Energy   AI  Map  Health  Incidents
 Chart  Insights        
```

### State Management

- **Client-side state**: React hooks (`useState`, `useEffect`)
- **Animation state**: Framer Motion
- **No global state management** - component-level state only
- **Mock data layer** - ready for API integration

### Performance Optimizations

- ✅ **Server Components** by default (Next.js App Router)
- ✅ **Client Components** only where interactivity is needed
- ✅ **Code splitting** with dynamic imports
- ✅ **Image optimization** for world map
- ✅ **CSS-in-JS avoided** - pure Tailwind for performance
- ✅ **Turbopack** for lightning-fast dev builds

---

## 🔌 API Integration (Coming Soon)

The dashboard is designed to be API-agnostic. Current mock data can be easily replaced with real-time WebSocket or REST API calls.

### Recommended Integration Points

```typescript
// Energy consumption data
GET /api/metrics/energy?interval=5m

// Device status
GET /api/devices/status

// AI insights
GET /api/ai/insights

// System health
GET /api/system/health

// Incidents
GET /api/incidents?limit=10
```

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain responsive design principles
- Write descriptive commit messages
- Keep components under 200 lines when possible

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**kotelyanets**

- GitHub: [@kotelyanets](https://github.com/kotelyanets)
- Repository: [zenith-iot](https://github.com/kotelyanets/zenith-iot)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) by Vercel
- [Shadcn UI](https://ui.shadcn.com/) for beautiful components
- [Recharts](https://recharts.org/) for data visualization
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

<div align="center">

Made with ❤️ for the IoT community

**[⬆ back to top](#-zenith-iot-platform)**

</div>
