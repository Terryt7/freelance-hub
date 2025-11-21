"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { CLIENT_MESSAGES } from "@/lib/dashboard-data"
import localStorageManager from "@/lib/local-storage-manager"
import MessageChat from "@/components/message-chat"

export default function MessagesPage() {
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [messages, setMessages] = useState(CLIENT_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<any[]>([])

  useEffect(() => {
    const savedMessages = localStorageManager.loadMessages()
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages)
    }
  }, [])

  if (!isLoggedIn) {
    router.push("/login")
    return null
  }

  const handleSelectChat = (chatId: number) => {
    setSelectedChat(chatId)
    // Mark as read
    const updatedMessages = messages.map((msg) => (msg.id === chatId ? { ...msg, unread: false } : msg))
    setMessages(updatedMessages)
    localStorageManager.saveMessages(updatedMessages)

    // Load chat messages
    const chat = messages.find((m) => m.id === chatId)
    setChatMessages(
      chat?.chatHistory || [
        {
          id: 1,
          sender: chat?.sender,
          text: `Hi! I'm interested in your ${chat?.lastMessage.split(":")[0]} service.`,
          timestamp: "10:30 AM",
          isOwn: false,
        },
      ],
    )
  }

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !selectedChat) return

    const newMsg = {
      id: Date.now(),
      sender: user?.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    }

    setChatMessages([...chatMessages, newMsg])
    setNewMessage("")

    // Save to localStorage
    const updatedMessages = messages.map((msg) =>
      msg.id === selectedChat ? { ...msg, chatHistory: [...(msg.chatHistory || []), newMsg] } : msg,
    )
    setMessages(updatedMessages)
    localStorageManager.saveMessages(updatedMessages)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-primary/20 glow-border p-4 h-full max-lg:max-h-64 overflow-y-auto">
              <h2 className="font-bold mb-4 text-lg">Conversations</h2>
              <div className="space-y-2">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectChat(msg.id)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedChat === msg.id
                        ? "bg-primary/20 border border-primary/50"
                        : "hover:bg-foreground/10 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm">{msg.sender}</p>
                      {msg.unread && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                    </div>
                    <p className="text-xs text-foreground/60 line-clamp-1">{msg.lastMessage}</p>
                    <p className="text-xs text-foreground/40 mt-1">{msg.timestamp}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {selectedChat ? (
              <MessageChat
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
                recipientName={messages.find((m) => m.id === selectedChat)?.sender || ""}
                currentUser={user?.name || ""}
              />
            ) : (
              <Card className="bg-card border-primary/20 glow-border p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-foreground/60 mb-2">Select a conversation to start messaging</p>
                  <p className="text-sm text-foreground/40">Choose a chat from the list to view messages</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
