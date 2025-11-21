"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { FREELANCER_JOBS, FREELANCER_MESSAGES, FREELANCER_EARNINGS } from "@/lib/dashboard-data"
import localStorageManager from "@/lib/local-storage-manager"
import Link from "next/link"

export default function FreelancerDashboardPage() {
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "messages" | "profile">("overview")
  const [jobStates, setJobStates] = useState<Record<number, string>>(
    FREELANCER_JOBS.reduce((acc, job) => ({ ...acc, [job.id]: job.status }), {}),
  )
  const [profileData, setProfileData] = useState({
    bio: "Professional freelancer with 5+ years of experience",
    skills: "Web Development, UI/UX Design, React, Node.js",
    hourlyRate: 75,
  })

  useEffect(() => {
    const savedJobStates = localStorageManager.loadJobStates()
    if (Object.keys(savedJobStates).length > 0) {
      setJobStates(savedJobStates)
    }

    const savedProfile = localStorageManager.loadProfileData()
    if (savedProfile) {
      setProfileData(savedProfile)
    }
  }, [])

  useEffect(() => {
    localStorageManager.saveJobStates(jobStates)
  }, [jobStates])

  useEffect(() => {
    localStorageManager.saveProfileData(profileData)
  }, [profileData])

  if (!isLoggedIn || user?.role !== "freelancer") {
    router.push("/login")
    return null
  }

  const handleSubmitWork = (jobId: number) => {
    setJobStates((prev) => ({ ...prev, [jobId]: "completed" }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-500/20 text-yellow-400"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      case "completed":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-foreground/20 text-foreground"
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-foreground/60">Manage your jobs and earnings</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {["overview", "jobs", "messages", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium transition capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">Earnings This Month</p>
                <p className="text-3xl font-bold text-primary">${FREELANCER_EARNINGS.thisMonth}</p>
              </Card>
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">Total Earnings</p>
                <p className="text-3xl font-bold">${FREELANCER_EARNINGS.totalEarnings}</p>
              </Card>
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">Active Jobs</p>
                <p className="text-3xl font-bold text-blue-400">{FREELANCER_EARNINGS.activeJobs}</p>
              </Card>
              <Card className="bg-card border-primary/20 p-6 glow-border">
                <p className="text-foreground/60 text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold text-green-400">{FREELANCER_EARNINGS.completedJobs}</p>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Current Jobs</h2>
              <div className="space-y-3">
                {FREELANCER_JOBS.filter((j) => (jobStates[j.id] || j.status) === "in-progress").map((job) => (
                  <Card key={job.id} className="bg-card border-primary/20 p-4 glow-border">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{job.title}</h3>
                        <p className="text-sm text-foreground/60">From {job.client}</p>
                      </div>
                      <p className="font-semibold text-primary text-lg">${job.amount}</p>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${job.progress}%` }}></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-4">
            {FREELANCER_JOBS.map((job) => (
              <Card key={job.id} className="bg-card border-primary/20 p-6 glow-border">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                    <div className="flex gap-4 text-sm text-foreground/60">
                      <span>Client: {job.client}</span>
                      <span>Due: {job.dueDate}</span>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full font-medium ${getStatusColor(jobStates[job.id] || job.status)}`}
                  >
                    {jobStates[job.id] || job.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-primary">${job.amount}</div>
                  <div className="flex gap-2">
                    {(jobStates[job.id] || job.status) === "in-progress" && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handleSubmitWork(job.id)}
                      >
                        Submit Work
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-primary/30 bg-transparent" asChild>
                      <Link href={`/messages/client-${job.id}`}>Message Client</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-3">
            {FREELANCER_MESSAGES.map((msg) => (
              <Link key={msg.id} href={`/messages/${msg.senderId}`}>
                <Card
                  className={`bg-card border-primary/20 p-4 glow-border cursor-pointer hover:border-primary/50 transition ${msg.unread ? "border-primary/50" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{msg.sender}</h3>
                        {msg.unread && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                      </div>
                      <p className="text-foreground/70 text-sm line-clamp-1">{msg.lastMessage}</p>
                    </div>
                    <span className="text-xs text-foreground/60 whitespace-nowrap ml-2">{msg.timestamp}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <Card className="bg-card border-primary/20 p-8 glow-border">
              <div className="mb-8">
                <div className="text-6xl mb-4">👨‍💻</div>
                <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
                <p className="text-foreground/60">{user?.email}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Skills</label>
                  <input
                    type="text"
                    value={profileData.skills}
                    onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={profileData.hourlyRate}
                    onChange={(e) => setProfileData({ ...profileData, hourlyRate: Number.parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground"
                  />
                </div>

                <Button
                  onClick={() => {
                    localStorageManager.saveProfileData(profileData)
                    // Could add a toast notification here
                  }}
                  className="w-full bg-primary hover:bg-primary/90 py-6"
                >
                  Save Profile
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
