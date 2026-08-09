# Architecture

## 1. App Flow and Architecture
- **Client-Side:** Single Page Application (SPA) built with React.
- **Routing:** [e.g., React Router]
- **State Management:** [e.g., React Context, Zustand, Redux]
- **Data Fetching:** [e.g., React Query, SWR, native fetch]

## 2. Folder and File Structure
```text
/src
  /assets        # Static assets (images, icons)
  /components    # Reusable UI components (Shadcn UI, etc.)
  /hooks         # Custom React hooks
  /lib           # Utility functions (e.g., tailwind-merge)
  /pages         # Page components (routes)
  /services      # API calls and external services
  /store         # Global state management
  /types         # TypeScript type definitions
  App.tsx        # Main application component
  main.tsx       # Entry point
```

## 3. Tech Stack
- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI + Tailwind)
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
