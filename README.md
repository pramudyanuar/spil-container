# Container FE - Container Stuffing Optimization

A modern React application for optimizing container stuffing operations with an intuitive multi-step workflow.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css)

## 🚀 Features

- **Multi-Step Workflow**: Intuitive 3-step process for container stuffing optimization
- **Product Management**: Select and configure products for shipping
- **Container & Truck Selection**: Choose appropriate containers and transportation
- **Stuffing Results**: View optimization results with detailed analytics
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 📋 Workflow Steps

### 1. Products
- Select product categories (Electronics, Clothing, Home & Garden, Sports)
- Configure product specifications
- Review product details

### 2. Containers & Trucks
- Choose from available container types:
  - 20ft Standard Container
  - 40ft Standard Container  
  - 40ft High Cube Container
- Select appropriate trucks for transportation
- View availability status

### 3. Stuffing Result
- View optimization summary (containers, utilization, cost)
- Detailed container assignment information
- Visual utilization progress bars
- Complete stuffing analytics

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: Dark/Light mode support
- **Linting**: ESLint with TypeScript support

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── navigation-menu.tsx
│   │   └── stepper.tsx        # Main stepper component
│   ├── layout/
│   │   └── layout.tsx         # Main layout wrapper
│   ├── navbar.tsx             # Navigation bar
│   ├── mode-toggle.tsx        # Theme toggle button
│   └── theme-provider.tsx     # Theme context provider
├── pages/
│   ├── products.tsx           # Step 1: Products selection
│   ├── containers-trucks.tsx  # Step 2: Container & truck selection
│   └── stuffing-result.tsx    # Step 3: Results display
├── hooks/
│   └── use-theme.ts          # Theme hook
├── lib/
│   └── utils.ts              # Utility functions
└── types/                    # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pramudyanuar/spil-container.git
cd spil-container
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier formatting (via ESLint rules)

### Adding New UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/). To add new components:

```bash
npx shadcn@latest add [component-name]
```

## 🎨 Theming

The application supports both dark and light themes:

- Theme preference is stored in localStorage
- Toggle available in the navigation bar
- Automatic system theme detection
- Smooth theme transitions

## 🐳 Docker Support

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production
```bash
docker-compose up
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)  
- Mobile (320px - 767px)

## 🔧 Configuration

### Path Aliases

The project uses path aliases configured in both `tsconfig.json` and `vite.config.ts`:

```typescript
'@/*': ['./src/*']
```

### Environment Variables

Create a `.env.local` file for local environment variables:

```bash
VITE_API_URL=http://localhost:3001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [pramudyanuar](https://github.com/pramudyanuar)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon library
- [Vite](https://vitejs.dev/) for the fast build tool
