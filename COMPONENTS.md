# Component Documentation

## Navigation & Layout

### Navbar
**File**: `components/navbar.tsx`

Global navigation bar with dynamic links based on authentication state.

**Props**: None (uses AuthContext)

**Features**:
- Login/Register links when not authenticated
- Dashboard & Logout links when authenticated
- Logo with home navigation
- Responsive design

**Usage**:
\`\`\`tsx
<Navbar />
\`\`\`

## Pages

### Landing Page
**File**: `app/page.tsx`

Marketing homepage showcasing the platform.

**Sections**:
- Hero with CTA
- Service categories
- Featured services
- Value propositions
- Testimonials
- Footer

### Login Page
**File**: `app/login/page.tsx`

User authentication page.

**Features**:
- Email/password form
- Role selection
- Demo credentials display
- Error handling
- Redirect to dashboard on success

**Demo Credentials**:
- Client: `client@demo.com` / `demo123`
- Freelancer: `freelancer@demo.com` / `demo123`

### Marketplace Page
**File**: `app/marketplace/page.tsx`

Browse and search services.

**Features**:
- Category filter
- Price range filter
- Sort by rating
- Search by keyword
- Service card grid
- Pagination (if many results)

### Service Detail Page
**File**: `app/service/[id]/page.tsx`

View detailed service information.

**Features**:
- Service images/preview
- Description and features
- Pricing tiers
- Freelancer profile
- Reviews and ratings
- "Contact Seller" button → navigates to `/messages/freelancer-[id]`
- "Hire Now" button → navigates to `/checkout/[id]`

### Checkout Page
**File**: `app/checkout/[id]/page.tsx`

Multi-step order placement flow.

**Components**:
- CheckoutModal with steps:
  1. Order Details Review
  2. Payment Information
  3. Confirmation

**Features**:
- Form validation
- Price calculation
- Redirect to dashboard on success

## Dashboard Pages

### Client Dashboard
**File**: `app/client-dashboard/page.tsx`

Hub for client activities.

**Tabs**:
1. **Overview**: Quick stats, recent activity
2. **Orders**: Active/completed orders with:
   - Order status tracking
   - "Message Seller" button → `/messages/freelancer-[id]`
   - Approval/completion actions
3. **Messages**: List of conversations
4. **Profile**: Edit client profile (name, email, etc.)

### Freelancer Dashboard
**File**: `app/freelancer-dashboard/page.tsx`

Hub for freelancer activities.

**Tabs**:
1. **Overview**: Earnings, active jobs
2. **Jobs**: Available and current jobs with:
   - Job details
   - "Message Client" button → `/messages/client-[id]`
   - Job status management
3. **Messages**: Client conversations
4. **Profile**: Edit freelancer info (bio, skills, rate)

### Messages Page
**File**: `app/messages/page.tsx`

List of all conversations.

**Features**:
- Conversation list
- Unread message count
- Last message preview
- Click to open chat

### Chat Page
**File**: `app/messages/[userId]/page.tsx`

Direct conversation with another user.

**Features**:
- Message history
- Message input field
- Send button or Enter key
- Auto-scroll to latest
- Read status
- User info at top

## Components

### CheckoutModal
**File**: `components/checkout-modal.tsx`

Multi-step checkout form.

**Props**:
\`\`\`typescript
interface CheckoutModalProps {
  serviceId: string;
  price: number;
  onClose: () => void;
  onComplete: (order: Order) => void;
}
\`\`\`

**Steps**:
1. Review order details
2. Enter payment info (demo)
3. Confirm and place order

### MessageChat
**File**: `components/message-chat.tsx`

Chat interface component.

**Props**:
\`\`\`typescript
interface MessageChatProps {
  userId: string;
  userName: string;
  userAvatar: string;
}
\`\`\`

**Features**:
- Message history display
- Message input
- Send functionality
- Auto-scroll
- Timestamps

### WalletModal
**File**: `components/wallet-modal.tsx`

Web3 wallet connection.

**Features**:
- Display connected/disconnected state
- Connect wallet button
- Show wallet address
- Disconnect option

## Landing Page Sections

### Hero
**File**: `components/hero.tsx`

Eye-catching introduction.

**Features**:
- Large headline
- Subheading
- CTA button
- Background imagery

### CategoriesGrid
**File**: `components/categories-grid.tsx`

Service categories showcase.

**Layout**: Grid of category cards with icons and descriptions.

### FeaturedServices
**File**: `components/featured-services.tsx`

Highlight top services.

**Layout**: Carousel or grid of service cards.

### WhyChooseUs
**File**: `components/why-choose-us.tsx`

Value propositions.

**Content**: Benefits, features, differentiators.

### Testimonials
**File**: `components/testimonials.tsx`

Social proof section.

**Content**: Customer testimonials with ratings.

### Footer
**File**: `components/footer.tsx`

Site footer with links.

**Content**: Navigation, social links, copyright.

## UI Components (shadcn)

All standard shadcn/ui components available:
- Button
- Card
- Input
- Dialog/Modal
- Tabs
- Dropdown
- Avatar
- Badge
- And more...

**Location**: `components/ui/`

**Usage**:
\`\`\`tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Click me</Button>
\`\`\`

## Component Best Practices

1. **Keep components focused**: Single responsibility principle
2. **Extract custom hooks**: Reusable logic in `hooks/` directory
3. **Use TypeScript**: Full type safety
4. **Props interface**: Define all props clearly
5. **Error boundaries**: Handle errors gracefully
6. **Accessibility**: Use semantic HTML, ARIA labels
7. **Performance**: Memoize expensive components
8. **Testing**: Write tests for critical components
