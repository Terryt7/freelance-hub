"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatMessage {
  id: number
  sender: string
  text: string
  timestamp: string
  isOwn: boolean
}

interface MessageChatProps {
  chatMessages: ChatMessage[]
  onSendMessage: (text: string) => void
  recipientName: string
  currentUser: string
}

export default function MessageChat({ chatMessages, onSendMessage, recipientName, currentUser }: MessageChatProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="bg-card border-primary/20 glow-border p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-primary/20">
        <h3 className="font-bold text-lg">{recipientName}</h3>
        <p className="text-xs text-foreground/60">Active now</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.isOwn
                  ? "bg-primary/20 border border-primary/50 text-foreground"
                  : "bg-foreground/10 border border-primary/20 text-foreground"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs text-foreground/50 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-secondary border-primary/30 glow-border"
        />
        <Button onClick={handleSend} className="bg-primary hover:bg-primary/90 px-6" disabled={!inputValue.trim()}>
          Send
        </Button>
      </div>
    </Card>
  )
}
