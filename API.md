# localStorage API Documentation

## LocalStorageManager

The `LocalStorageManager` handles all data persistence for FreelanceHub.

**File**: `lib/local-storage-manager.ts`

## Methods

### User Management

#### `saveUser(user: User): void`
Save authenticated user to storage.

\`\`\`typescript
localStorageManager.saveUser({
  id: '1',
  email: 'user@example.com',
  role: 'client',
  name: 'John Doe',
  avatar: '/avatar.jpg'
})
\`\`\`

#### `loadUser(): User | null`
Load user from storage.

\`\`\`typescript
const user = localStorageManager.loadUser();
\`\`\`

#### `clearUser(): void`
Remove user from storage.

\`\`\`typescript
localStorageManager.clearUser();
\`\`\`

### Order Management

#### `saveOrders(orders: Order[]): void`
Save client orders.

\`\`\`typescript
localStorageManager.saveOrders([
  {
    id: '1',
    serviceId: '10',
    clientId: '1',
    freelancerId: '5',
    status: 'active',
    price: 500,
    createdAt: '2024-01-15'
  }
])
\`\`\`

#### `loadOrders(): Order[]`
Load all client orders.

\`\`\`typescript
const orders = localStorageManager.loadOrders();
\`\`\`

#### `getOrder(orderId: string): Order | undefined`
Get specific order.

\`\`\`typescript
const order = localStorageManager.getOrder('1');
\`\`\`

#### `updateOrder(orderId: string, updates: Partial<Order>): void`
Update order details.

\`\`\`typescript
localStorageManager.updateOrder('1', { status: 'completed' });
\`\`\`

### Job Management

#### `saveJobs(jobs: Job[]): void`
Save freelancer jobs.

\`\`\`typescript
localStorageManager.saveJobs([...jobs]);
\`\`\`

#### `loadJobs(): Job[]`
Load all freelancer jobs.

\`\`\`typescript
const jobs = localStorageManager.loadJobs();
\`\`\`

#### `updateJob(jobId: string, updates: Partial<Job>): void`
Update job status.

\`\`\`typescript
localStorageManager.updateJob('1', { status: 'in-progress' });
\`\`\`

### Messaging

#### `saveMessages(userId: string, messages: Message[]): void`
Save conversation with specific user.

\`\`\`typescript
localStorageManager.saveMessages('freelancer-5', [
  {
    id: '1',
    senderId: 'client-1',
    text: 'Hello!',
    timestamp: '2024-01-15T10:30:00Z',
    read: true
  }
])
\`\`\`

#### `loadMessages(userId: string): Message[]`
Load conversation with specific user.

\`\`\`typescript
const messages = localStorageManager.loadMessages('freelancer-5');
\`\`\`

#### `addMessage(userId: string, message: Message): void`
Add new message to conversation.

\`\`\`typescript
localStorageManager.addMessage('freelancer-5', {
  id: 'msg-2',
  senderId: 'client-1',
  text: 'How long will it take?',
  timestamp: new Date().toISOString(),
  read: false
})
\`\`\`

#### `getConversations(): Conversation[]`
Get all active conversations.

\`\`\`typescript
const conversations = localStorageManager.getConversations();
\`\`\`

### Wallet Management

#### `saveWallet(address: string, network: string): void`
Save wallet connection.

\`\`\`typescript
localStorageManager.saveWallet('0x123...', 'ethereum');
\`\`\`

#### `loadWallet(): Wallet | null`
Load wallet info.

\`\`\`typescript
const wallet = localStorageManager.loadWallet();
\`\`\`

#### `clearWallet(): void`
Clear wallet connection.

\`\`\`typescript
localStorageManager.clearWallet();
\`\`\`

### Cart Management

#### `saveCart(items: CartItem[]): void`
Save shopping cart items.

\`\`\`typescript
localStorageManager.saveCart([...cartItems]);
\`\`\`

#### `loadCart(): CartItem[]`
Load cart items.

\`\`\`typescript
const cart = localStorageManager.loadCart();
\`\`\`

#### `getCart(): CartItem[]`
Alias for loadCart().

\`\`\`typescript
const cart = localStorageManager.getCart();
\`\`\`

#### `clearCart(): void`
Clear all cart items.

\`\`\`typescript
localStorageManager.clearCart();
\`\`\`

### Profile Management

#### `saveProfile(profile: Profile): void`
Save user profile data.

\`\`\`typescript
localStorageManager.saveProfile({
  bio: 'Professional designer',
  skills: ['UI/UX', 'Figma'],
  hourlyRate: 50
})
\`\`\`

#### `loadProfile(): Profile | null`
Load user profile.

\`\`\`typescript
const profile = localStorageManager.loadProfile();
\`\`\`

### Utility Methods

#### `clearAll(): void`
Clear all stored data (on logout).

\`\`\`typescript
localStorageManager.clearAll();
\`\`\`

#### `exportData(): object`
Export all data as JSON.

\`\`\`typescript
const backup = localStorageManager.exportData();
// Save to file or send to server
\`\`\`

#### `importData(data: object): void`
Import data from backup.

\`\`\`typescript
localStorageManager.importData(backup);
\`\`\`

## Data Structures

### User
\`\`\`typescript
interface User {
  id: string;
  email: string;
  role: 'client' | 'freelancer';
  name: string;
  avatar: string;
}
\`\`\`

### Order
\`\`\`typescript
interface Order {
  id: string;
  serviceId: string;
  clientId: string;
  freelancerId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  price: number;
  createdAt: string;
  completedAt?: string;
}
\`\`\`

### Job
\`\`\`typescript
interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  freelancerId: string;
  budget: number;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
}
\`\`\`

### Message
\`\`\`typescript
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}
\`\`\`

### Wallet
\`\`\`typescript
interface Wallet {
  address: string;
  network: string;
  connectedAt: string;
}
\`\`\`

### Conversation
\`\`\`typescript
interface Conversation {
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}
\`\`\`

## Storage Limits

- **Total localStorage**: ~5-10MB per domain
- **Key naming**: `hs_` prefix for FreelanceHub keys
- **String serialization**: All data converted to JSON strings

## Best Practices

1. **Always check for null**: Data might not exist
2. **Validate data**: Check types before use
3. **Error handling**: Wrap in try-catch for safety
4. **Regular cleanup**: Clear old data periodically
5. **Backup important data**: Export before clearing

## Performance Notes

- localStorage operations are synchronous
- Avoid storing large files
- Keep message history reasonable size
- Clear old conversations periodically

## Migration Guide

### From Demo to Production

Replace localStorage calls with API calls:

\`\`\`typescript
// Before (localStorage)
const orders = localStorageManager.loadOrders();

// After (API)
const response = await fetch('/api/orders');
const orders = await response.json();
\`\`\`

Update all methods to use async/await:

\`\`\`typescript
// Create adapter
const apiManager = {
  async loadOrders() {
    const res = await fetch('/api/orders');
    return res.json();
  },
  async saveOrder(order) {
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order)
    });
  }
  // ... rest of methods
};
