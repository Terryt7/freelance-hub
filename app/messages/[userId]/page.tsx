"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { CLIENT_MESSAGES } from "@/lib/dashboard-data"
import localStorageManager from "@/lib/local-storage-manager"
import MessageChat from "@/components/message-chat"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const userId = Number.parseInt(params.userId as string)
  const { user, isLoggedIn } = useAuth()
  const [messages, setMessages] = useState(CLIENT_MESSAGES)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [recipientName, setRecipientName] = useState("")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    const savedMessages = localStorageManager.loadMessages()
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages)
    }

    // Find the chat for this user
    const chat = CLIENT_MESSAGES.find((m) => m.id === userId)
    if (chat) {
      setRecipientName(chat.sender)
      // Mark as read
      const updatedMessages = CLIENT_MESSAGES.map((msg) => (msg.id === userId ? { ...msg, unread: false } : msg))
      setChatMessages(
        chat.chatHistory || [
          {
            id: 1,
            sender: chat.sender,
            text: `Hi! I'm interested in your service.`,
            timestamp: "10:30 AM",
            isOwn: false,
          },
        ],
      )
      localStorageManager.saveMessages(updatedMessages)
    }
  }, [userId])

  if (!isLoggedIn) {
    return null
  }

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const newMsg = {
      id: Date.now(),
      sender: user?.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    }

    setChatMessages([...chatMessages, newMsg])

    // Save to localStorage
    const updatedMessages = messages.map((msg) =>
      msg.id === userId ? { ...msg, chatHistory: [...(msg.chatHistory || []), newMsg] } : msg,
    )
    setMessages(updatedMessages)
    localStorageManager.saveMessages(updatedMessages)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <Link href="/messages" className="text-primary hover:text-primary/80 mb-6 inline-block">
          ← Back to Messages
        </Link>

        <MessageChat
          chatMessages={chatMessages}
          onSendMessage={handleSendMessage}
          recipientName={recipientName}
          currentUser={user?.name || ""}
        />
      </div>

      <Footer />
    </main>
  )
}
