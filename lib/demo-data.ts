export interface Service {
  id: number
  title: string
  seller: string
  sellerId: number
  rating: number
  reviews: number
  price: number
  image: string
  category: string
  description: string
  deliveryTime: number
  revisions: number
}

export interface User {
  id: number
  name: string
  email: string
  role: "client" | "freelancer"
  avatar: string
  bio: string
  verified: boolean
}

export interface Order {
  id: number
  serviceId: number
  clientId: number
  freelancerId: number
  status: "open" | "in-progress" | "completed" | "cancelled"
  amount: number
  createdAt: string
  completedAt?: string
}

export interface Message {
  id: number
  senderId: number
  recipientId: number
  content: string
  timestamp: string
  orderId?: number
}

export const DEMO_SERVICES: Service[] = [
  {
    id: 1,
    title: "Build a Professional Website",
    seller: "Alex Chen",
    sellerId: 2,
    rating: 4.9,
    reviews: 324,
    price: 499,
    image: "/placeholder.svg?key=kbo9m",
    category: "Programming",
    description:
      "Full-stack web development with React, Node.js, and database design. I will build a responsive, modern website tailored to your needs.",
    deliveryTime: 7,
    revisions: 3,
  },
  {
    id: 2,
    title: "Logo Design - Modern & Minimal",
    seller: "Sarah Design Studio",
    sellerId: 3,
    rating: 4.8,
    reviews: 512,
    price: 149,
    image: "/placeholder.svg?key=5bz6z",
    category: "Graphics",
    description:
      "Professional logo design with unlimited revisions until you are satisfied. Includes vector files and all formats.",
    deliveryTime: 3,
    revisions: 5,
  },
  {
    id: 3,
    title: "Social Media Marketing Strategy",
    seller: "Marketing Pros",
    sellerId: 4,
    rating: 4.7,
    reviews: 198,
    price: 299,
    image: "/placeholder.svg?key=htepz",
    category: "Digital Marketing",
    description: "Comprehensive social media strategy with content calendar, hashtag research, and engagement tips.",
    deliveryTime: 5,
    revisions: 2,
  },
  {
    id: 4,
    title: "Professional Video Editing",
    seller: "CreativeEdits",
    sellerId: 5,
    rating: 4.9,
    reviews: 287,
    price: 199,
    image: "/placeholder.svg?key=2v2ji",
    category: "Video Editing",
    description: "Expert video editing for YouTube, TikTok, and Instagram. Color grading, effects, and music included.",
    deliveryTime: 4,
    revisions: 3,
  },
  {
    id: 5,
    title: "Content Writing - Blog & Articles",
    seller: "Content Master",
    sellerId: 6,
    rating: 4.6,
    reviews: 421,
    price: 79,
    image: "/placeholder.svg?key=write",
    category: "Writing",
    description: "SEO-optimized blog posts and articles. 500-5000 words with research included.",
    deliveryTime: 2,
    revisions: 2,
  },
  {
    id: 6,
    title: "Mobile App Development",
    seller: "DevStudio Pro",
    sellerId: 7,
    rating: 4.8,
    reviews: 156,
    price: 999,
    image: "/placeholder.svg?key=app",
    category: "Programming",
    description: "Custom iOS and Android apps using React Native. Full development and deployment support.",
    deliveryTime: 14,
    revisions: 5,
  },
  {
    id: 7,
    title: "Branding Package",
    seller: "Brand Co",
    sellerId: 8,
    rating: 4.9,
    reviews: 289,
    price: 599,
    image: "/placeholder.svg?key=brand",
    category: "Graphics",
    description: "Complete branding package: logo, color palette, typography, guidelines, and mockups.",
    deliveryTime: 10,
    revisions: 4,
  },
  {
    id: 8,
    title: "SEO Optimization",
    seller: "SEO Masters",
    sellerId: 9,
    rating: 4.7,
    reviews: 334,
    price: 249,
    image: "/placeholder.svg?key=seo",
    category: "Digital Marketing",
    description: "Complete SEO audit and optimization strategy. Keyword research, on-page and technical SEO.",
    deliveryTime: 7,
    revisions: 2,
  },
]

export const DEMO_FREELANCERS: User[] = [
  {
    id: 2,
    name: "Alex Chen",
    email: "alex@demo.com",
    role: "freelancer",
    avatar: "👨‍💻",
    bio: "Full-stack developer with 8+ years experience",
    verified: true,
  },
  {
    id: 3,
    name: "Sarah Design Studio",
    email: "sarah@demo.com",
    role: "freelancer",
    avatar: "👩‍🎨",
    bio: "Award-winning graphic designer",
    verified: true,
  },
  {
    id: 4,
    name: "Marketing Pros",
    email: "marketing@demo.com",
    role: "freelancer",
    avatar: "👨‍💼",
    bio: "Social media and marketing experts",
    verified: true,
  },
  {
    id: 5,
    name: "CreativeEdits",
    email: "creative@demo.com",
    role: "freelancer",
    avatar: "🎬",
    bio: "Professional video editor",
    verified: true,
  },
]
