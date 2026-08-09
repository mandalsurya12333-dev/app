# Rules and Guidelines

## 1. What to Use
- **TypeScript:** Use strict typing for all components, functions, and API responses.
- **Components:** Prefer Shadcn UI components for consistency. Build custom components using Tailwind CSS.
- **Styling:** Use Tailwind CSS classes. Use `cn` utility from `clsx` and `tailwind-merge` for conditional classes.
- **Hooks:** Extract reusable logic into custom hooks.

## 2. What to Avoid
- **Libraries:** Avoid adding heavy dependencies if a native or lightweight solution exists (e.g., avoid moment.js, prefer date-fns).
- **Error Handling:** 
  - Avoid silent failures. Catch and log errors properly.
  - Do not expose raw error messages to the user; show user-friendly toasts (via Sonner) or error boundaries.
- **Boundaries for AI:**
  - AI should strictly adhere to this tech stack.
  - Do not introduce new state management or styling libraries without explicit permission.
  - Do not modify configuration files (`vite.config.ts`, `tailwind.config.js`) unless explicitly requested.
