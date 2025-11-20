# HigherStream Architecture Guide

## System Overview

HigherStream is a client-side freelance marketplace that demonstrates modern Next.js patterns without requiring a backend API.

## Component Hierarchy

### Pages (App Router)

\`\`\`
/ (Landing)
├── /login (Authentication)
├── /register (Registration)
├── /marketplace (Service Listing)
├── /service/[id] (Service Detail)
├── /checkout/[id] (Checkout Flow)
├── /client-dashboard (Client Hub)
├── /freelancer-dashboard (Freelancer Hub)
├── /messages (Conversations List)
└── /messages/[userId] (Direct Chat)
\`\`\`

### Component Tree

\`\`\`
Layout
├── Navbar (Global Navigation)
└── Page Components
    ├── Hero (Landing)
    ├── CategoriesGrid
    ├── FeaturedServices
    ├── WhyChooseUs
    ├── Testimonials
    ├── Footer
    ├── ServiceCard
    ├── CheckoutModal
    ├── MessageChat
    └── DashboardTabs
\`\`\`

## Data Flow

### Authentication Flow

\`\`\`
Login Page
    ↓
AuthContext (validate credentials)
    ↓
localStorage.saveUser()
    ↓
Navigate to Dashboard
\`\`\`

### Message Flow

\`\`\`
Service Detail / Dashboard
    ↓
User clicks "Message"
    ↓
Navigate to /messages/[userId]
    ↓
Load conversation from localStorage
    ↓
Send message → Update localStorage
    ↓
Display in UI
\`\`\`

### Order Flow

\`\`\`
Service Detail
    ↓
Click "Hire Now"
    ↓
Navigate to /checkout/[id]
    ↓
CheckoutModal (multi-step form)
    ↓
Complete Checkout
    ↓
Save Order to localStorage
    ↓
Redirect to Client Dashboard
\`\`\`

## State Management

### Global State (Auth Context)

\`\`\`typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, role: string) => Promise<void>;
}
\`\`\`

### Local State

Components use `useState` for:
- Form inputs
- Modal visibility
- Tab selection
- Filter selections
- UI interactions

## Storage Architecture

### localStorage Keys

\`\`\`
hs_user              → Current authenticated user
hs_orders            → Client orders array
hs_jobs              → Freelancer jobs array
hs_messages_[userId] → Conversation messages
hs_wallet            → Wallet connection state
hs_cart              → Shopping cart (if enabled)
\`\`\`

### Data Structures

**User**:
\`\`\`typescript
{
  id: string;
  email: string;
  role: 'client' | 'freelancer';
  name: string;
  avatar: string;
  bio?: string;
}
\`\`\`

**Order**:
\`\`\`typescript
{
  id: string;
  serviceId: string;
  clientId: string;
  freelancerId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  price: number;
  createdAt: string;
  messages: Message[];
}
\`\`\`

**Message**:
\`\`\`typescript
{
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}
\`\`\`

## Routing Strategy

### Dynamic Routes

- `/service/[id]` - View service details
- `/checkout/[id]` - Checkout specific service
- `/messages/[userId]` - Chat with specific user

### Protected Routes

Routes that require authentication:
- `/client-dashboard`
- `/freelancer-dashboard`
- `/checkout/[id]`
- `/messages`

Implementation: Check `user` in AuthContext, redirect to `/login` if not authenticated.

## Styling System

### Design Tokens (CSS Variables)

Located in `app/globals.css`:
- Color tokens: `--background`, `--foreground`, `--primary`, `--accent`
- Spacing: Tailwind's default scale
- Animations: `glow-pulse`, `slide-up`, `fade-in`, `scale-in`

### Tailwind Configuration

- Uses Tailwind v4 with OKLch color space
- Dark mode always enabled (no light mode)
- Custom animations in globals.css
- Glow effects for web3 aesthetic

## Performance Considerations

### Code Splitting

- Each page is code-split automatically by Next.js App Router
- Components are lazy-loaded on demand

### Bundle Size

- Using shadcn/ui for minimal component library
- Tailwind CSS v4 with tree-shaking
- No external dependencies for core features

### Optimization

- Images use Next.js Image component (where applicable)
- CSS is scoped to dark mode only
- No unnecessary re-renders with proper dependency arrays

## Error Handling

### Auth Errors

\`\`\`typescript
if (error) {
  // Display in UI
  setErrorMessage(error);
  // Auto-clear after 3 seconds
}
\`\`\`

### Data Errors

- localStorage fallbacks to default data
- Missing data creates empty states with helpful messages
- No uncaught promise rejections

## Testing Recommendations

### Unit Tests

- Test localStorage manager functions
- Test auth context reducer
- Test utility functions

### Integration Tests

- Test login flow
- Test message sending
- Test order creation

### E2E Tests

- Login and navigate to dashboard
- Create and complete an order
- Send and receive messages

## Scalability Notes

### When Moving to Backend

1. Replace localStorage manager with API calls
2. Use React Query or SWR for data fetching
3. Add proper authentication (JWT/OAuth)
4. Move validation to backend
5. Add database models for persistence
6. Implement real-time messaging (WebSocket/Supabase)

### When Adding Features

- Keep components under 300 lines
- Extract custom hooks for reusable logic
- Use context only for global state
- Create separate service/utility files

## Security Notes

### Current Implementation

⚠️ For demonstration purposes only:
- Passwords stored in localStorage (insecure)
- No encryption of sensitive data
- No HTTPS verification
- No CSRF protection

### Production Requirements

- Remove password from localStorage
- Use secure authentication tokens (JWT)
- Encrypt sensitive data
- Implement HTTPS
- Add CSRF/XSS protection
- Validate all inputs server-side
- Implement rate limiting
