# Feature Documentation

## Authentication

### Login
- Email and password validation
- Role-based access (Client vs Freelancer)
- Persistent session via localStorage
- Error handling and user feedback
- Demo credentials for testing

### Register
- New user account creation
- Role selection at signup
- Profile setup
- Auto-login after registration

### Logout
- Clear all user data
- Clear localStorage
- Redirect to home page

## Marketplace

### Browse Services
- Grid view of all services
- Service cards with:
  - Service image
  - Title and description
  - Freelancer name and rating
  - Price starting from
  - Quick preview

### Search & Filter
- **Category Filter**: Filter by service type
- **Price Range**: Min/max price filtering
- **Rating Sort**: Sort by highest rated first
- **Keyword Search**: Full-text search in service names

### Service Details
- Full service description
- Pricing tiers and options
- Freelancer profile and portfolio
- Reviews and ratings
- "Contact Seller" messaging option
- "Hire Now" checkout button

## Ordering

### Place Order
1. Click "Hire Now" on service
2. Navigate to checkout page
3. Complete multi-step form:
   - Select service tier/options
   - Enter delivery timeline
   - Review total price
   - Confirm order
4. Order saved to client dashboard

### Order Management
- View all orders in dashboard
- Track order status:
  - Pending (awaiting freelancer acceptance)
  - Active (in progress)
  - Completed (delivered)
  - Cancelled
- Approve/reject deliverables
- Rate and review completed work

### Order History
- Completed orders archive
- Invoice/receipt view
- Repeat order option

## Messaging

### Conversations
- List of all active conversations
- Unread message count
- Last message preview
- User avatars and names
- Sort by recency

### Direct Chat
- Full message history
- Real-time message display
- Typing indicators
- Read/unread status
- User online status
- Timestamps for all messages

### Starting Conversations
Multiple entry points:
- "Contact Seller" on service detail
- "Message Freelancer" in orders
- "Message Client" in jobs
- Direct message from conversations list

## Dashboards

### Client Dashboard

**Overview Tab**:
- Total spent
- Active orders count
- Completed orders count
- Unread messages count
- Quick action buttons

**Orders Tab**:
- All active orders
- Filter by status
- View order details
- Message freelancer
- Track progress
- Approve/complete orders

**Messages Tab**:
- All conversations
- Unread badges
- Search conversations
- Direct access to chat

**Profile Tab**:
- Edit profile information:
  - Name
  - Email
  - Bio
  - Profile picture
- Save changes

### Freelancer Dashboard

**Overview Tab**:
- Total earnings
- Active jobs count
- Completed jobs count
- Pending invitations
- Quick stats

**Jobs Tab**:
- Available job listings
- Current active projects
- Job details and requirements
- Estimated timeline and pay
- Accept/start job button

**Messages Tab**:
- Client conversations
- Respond to inquiries
- Discuss project details

**Profile Tab**:
- Edit freelancer profile:
  - Title/bio
  - Skills and expertise
  - Hourly rate
  - Portfolio
  - Certifications
- Make profile public/private
- Set availability status

## Web3 Features

### Wallet Connection
- Connect crypto wallet
- Display wallet address
- Show network
- Disconnect option
- Wallet status persistence

## Data Persistence

### localStorage Implementation
All data automatically saved to browser storage:
- User authentication state
- Orders and invoices
- Messages and conversations
- Dashboard preferences
- Wallet connection status
- User profiles

### Manual Actions
Users can:
- Clear all data (logout)
- Export data (future feature)
- Import data from backup (future feature)

## Notifications

### Message Notifications
- Unread message badges
- Message count in navbar
- New message indicators

### Order Notifications
- Order status updates
- Delivery reminders
- Review prompts

## Ratings & Reviews

### Leave Review
After order completion, client can:
- Rate service (1-5 stars)
- Write detailed review
- Comment on freelancer quality

### View Reviews
- See previous reviews on profile
- Average rating display
- Review text and ratings on service page

## Settings

### User Settings
- Profile information
- Privacy preferences
- Notification settings
- Data management

### Account Settings
- Change email/password
- Delete account option
- Security settings

## Future Features

- **Video Calls**: Integrated video conferencing
- **File Sharing**: Share project files securely
- **Time Tracking**: Track hours worked
- **Invoicing**: Automatic invoice generation
- **Payments**: Real payment processing
- **Disputes**: Resolution system
- **Escrow**: Payment protection
- **Insurance**: Service guarantees
- **Referrals**: Earning referral bonuses
