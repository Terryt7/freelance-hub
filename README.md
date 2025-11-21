# FreelanceHub - Freelance Marketplace MVP

FreelanceHub is a modern, web3-inspired freelance marketplace built with Next.js and React. It connects clients with talented freelancers for various services including design, development, content creation, and more.

## Features

- **Marketplace Discovery**: Browse and search freelance services by category
- **Service Details**: View detailed service descriptions, pricing tiers, and freelancer profiles
- **Authentication**: Simple login/register system with role-based access (Client/Freelancer)
- **Client Dashboard**: Manage orders, track progress, and communicate with freelancers
- **Freelancer Dashboard**: View available jobs, manage listings, track earnings
- **Real-time Messaging**: Direct chat interface between clients and freelancers
- **Order Management**: Multi-step checkout flow with order tracking
- **Web3 Integration**: Connect wallet for potential blockchain transactions
- **Data Persistence**: All user data and orders persist using localStorage

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **State Management**: React Context API
- **Persistence**: Browser localStorage
- **Deployment**: Vercel-ready

## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd higherstreamm

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

## Demo Credentials

### Client Account
- **Email**: client@demo.com
- **Password**: demo123

### Freelancer Account
- **Email**: freelancer@demo.com
- **Password**: demo123

## Project Structure

\`\`\`
app/
├── layout.tsx              # Root layout with auth provider
├── page.tsx                # Landing page
├── login/page.tsx          # Login page
├── register/page.tsx       # Registration page
├── marketplace/page.tsx    # Browse services
├── service/[id]/page.tsx   # Service detail page
├── checkout/[id]/page.tsx  # Checkout flow
├── client-dashboard/page.tsx    # Client dashboard
├── freelancer-dashboard/page.tsx # Freelancer dashboard
├── messages/page.tsx       # Messages list
└── messages/[userId]/page.tsx    # Direct chat page
│
components/
├── navbar.tsx              # Navigation bar
├── hero.tsx                # Hero section
├── categories-grid.tsx     # Category browsing
├── featured-services.tsx   # Featured listings
├── why-choose-us.tsx       # Value proposition
├── testimonials.tsx        # Social proof
├── footer.tsx              # Footer
├── checkout-modal.tsx      # Multi-step checkout
├── message-chat.tsx        # Chat interface
├── wallet-modal.tsx        # Web3 wallet connection
└── ui/                     # shadcn components
│
lib/
├── auth-context.tsx        # Auth state management
├── local-storage-manager.ts # Data persistence
├── demo-data.ts            # Mock service data
├── dashboard-data.ts       # Mock dashboard data
└── utils.ts                # Utility functions
│
styles/
└── globals.css             # Global styles & theme
\`\`\`

## Key Features Documentation

### Authentication System

The app uses a simple client-side authentication with localStorage persistence. Users can log in as either a Client or Freelancer.

**File**: `lib/auth-context.tsx`

\`\`\`typescript
// Login
const { user, error } = await login(email, password);

// Logout
logout(); // Clears all user data
\`\`\`

### Data Persistence

All application data persists to browser localStorage using the storage manager.

**File**: `lib/local-storage-manager.ts`

Methods available:
- `saveUser(user)` - Save authenticated user
- `loadUser()` - Load user from storage
- `saveOrders(orders)` - Save client orders
- `loadOrders()` - Load client orders
- `saveJobs(jobs)` - Save freelancer jobs
- `loadJobs()` - Load freelancer jobs
- `saveMessages(userId, messages)` - Save conversation messages
- `loadMessages(userId)` - Load conversation messages
- `clearAll()` - Clear all stored data on logout

### Messaging System

Direct messaging between clients and freelancers with real-time updates.

**Pages**:
- `/messages` - View all conversations
- `/messages/[userId]` - Open direct chat with specific user

**Features**:
- Message history persistence
- Read/unread status tracking
- User presence indicators
- Auto-scroll to latest messages
- Timestamp for each message

### Marketplace

Browse and search services with filtering and sorting options.

**Page**: `/marketplace`

**Features**:
- Category filtering
- Price range filtering
- Rating sorting
- Search by keyword
- Service cards with preview

### Checkout Flow

Multi-step modal-based checkout process.

**Page**: `/checkout/[id]`

**Steps**:
1. Order details review
2. Payment information (demo)
3. Confirm and complete

### Dashboards

#### Client Dashboard (`/client-dashboard`)

**Tabs**:
- **Overview**: Quick stats and recent activity
- **Orders**: Active and completed orders with status tracking
- **Messages**: Conversations with freelancers
- **Profile**: Update profile information

#### Freelancer Dashboard (`/freelancer-dashboard`)

**Tabs**:
- **Overview**: Statistics and earnings
- **Jobs**: Available jobs and current projects
- **Messages**: Client conversations
- **Profile**: Freelancer profile and portfolio

## Styling & Theme

The app uses a modern web3-inspired dark theme with vibrant orange accents.

**Theme Colors**:
- **Background**: Near-black (`oklch(0.08 0 0)`)
- **Primary**: Vibrant Orange (`oklch(0.55 0.22 40)`)
- **Accent**: Bright Orange (`oklch(0.6 0.25 35)`)
- **Foreground**: Off-white (`oklch(0.98 0 0)`)

**Custom Animations**:
- `glow-pulse` - Glowing border animation
- `slide-up` - Slide in from bottom
- `fade-in` - Fade in effect
- `scale-in` - Scale up entrance
- `glow-border` - Orange glow effect on hover

**Tailwind Configuration**: Located in `app/globals.css` using CSS variables.

## State Management

### Auth Context

Provides global authentication state and user information.

\`\`\`typescript
const { user, login, logout, register } = useContext(AuthContext);
\`\`\`

### localStorage Manager

Handles all data persistence without a backend.

## Deployment

This app is optimized for Vercel deployment:

\`\`\`bash
# Deploy to Vercel
vercel deploy
\`\`\`

Or connect your GitHub repository to Vercel for automatic deployments.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized component bundling
- Lazy loading for images
- Tailwind CSS v4 with minimal bloat
- Client-side rendering for instant interactions

## Future Enhancements

- Backend API integration (Node.js, Python)
- Database integration (PostgreSQL, MongoDB)
- Real authentication with JWT tokens
- Payment processing (Stripe)
- Email notifications
- Service ratings and reviews
- Dispute resolution system
- Video call integration

## Known Limitations

- All data is stored in browser localStorage (lost when cache is cleared)
- No real payment processing
- Demo data is limited to showcasing features
- No image upload functionality
- Messages are not encrypted

## Troubleshooting

### Login not redirecting to dashboard
- Clear browser cache and localStorage
- Ensure cookies are enabled
- Check browser console for errors

### Messages not persisting
- Verify localStorage is not disabled
- Check that you're not in private/incognito mode
- Ensure sufficient storage space in browser

### Styling not applied correctly
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that dark mode is enabled

## Support

For issues or feature requests, please open an issue in the repository.

## License

MIT License - feel free to use this template for your projects.
