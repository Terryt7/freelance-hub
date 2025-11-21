export const CLIENT_ORDERS = [
  {
    id: 1,
    serviceTitle: "Build a Professional Website",
    seller: "Alex Chen",
    amount: 499,
    status: "in-progress" as const,
    createdAt: "2025-01-15",
    dueDate: "2025-01-22",
  },
  {
    id: 2,
    serviceTitle: "Logo Design - Modern & Minimal",
    seller: "Sarah Design Studio",
    amount: 149,
    status: "completed" as const,
    createdAt: "2025-01-10",
    completedAt: "2025-01-12",
  },
  {
    id: 3,
    serviceTitle: "Social Media Marketing Strategy",
    seller: "Marketing Pros",
    amount: 299,
    status: "open" as const,
    createdAt: "2025-01-18",
    dueDate: "2025-01-25",
  },
]

export const CLIENT_MESSAGES = [
  {
    id: 1,
    sender: "Alex Chen",
    senderId: "freelancer-1",
    lastMessage: "I will have the first version ready tomorrow.",
    timestamp: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    sender: "Sarah Design Studio",
    senderId: "freelancer-2",
    lastMessage: "Thanks for the approval! Your logo looks great.",
    timestamp: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    sender: "Marketing Pros",
    senderId: "freelancer-3",
    lastMessage: "Let me know if you need any changes to the strategy.",
    timestamp: "3 days ago",
    unread: false,
  },
]

export const FREELANCER_JOBS = [
  {
    id: 1,
    title: "Website Design Project",
    client: "John Doe",
    status: "in-progress" as const,
    amount: 599,
    dueDate: "2025-01-25",
    progress: 65,
  },
  {
    id: 2,
    title: "Logo Redesign",
    client: "Tech Startup",
    status: "completed" as const,
    amount: 299,
    completedAt: "2025-01-16",
  },
  {
    id: 3,
    title: "Social Media Content",
    client: "Fashion Brand",
    status: "open" as const,
    amount: 449,
    dueDate: "2025-02-01",
  },
]

export const FREELANCER_MESSAGES = [
  {
    id: 1,
    sender: "John Doe",
    senderId: "client-1",
    lastMessage: "Can you add a dark mode theme?",
    timestamp: "30 mins ago",
    unread: true,
  },
  {
    id: 2,
    sender: "Tech Startup",
    senderId: "client-2",
    lastMessage: "Perfect! We love the design.",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 3,
    sender: "Fashion Brand",
    senderId: "client-3",
    lastMessage: "Looking forward to seeing your proposal.",
    timestamp: "5 days ago",
    unread: false,
  },
]

export const FREELANCER_EARNINGS = {
  thisMonth: 1849,
  totalEarnings: 8432,
  completedJobs: 12,
  activeJobs: 2,
}
