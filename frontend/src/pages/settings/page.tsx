import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../../components/forge/navigation"
import { cn } from "../../../lib/src/*/utils"
import { User, Book, HelpCircle, ChevronDown, LogOut, Trash2, X } from "lucide-react"

type TabType = "account" | "docs" | "support"

const faqItems = [
  {
    question: "How does the Brain Dump work?",
    answer: "Brain Dump is where you describe your project idea in natural language. Our AI agents analyze your input, break it down into features, and automatically generate a structured project plan with sprints and tasks. Just write what you want to build, and we handle the rest."
  },
  {
    question: "What do the agents actually do?",
    answer: "Each agent has a specialized role: The Planner structures features into sprints. The Architect defines your tech stack and makes architectural decisions. The Task Manager prioritizes and organizes your backlog. The Debug Agent catches potential issues early. The Analyst tracks progress and provides health reports."
  },
  {
    question: "Can I manually create tasks without using AI?",
    answer: "Yes. While AI agents can generate and organize tasks automatically, you can always create tasks manually using the 'Add Task' button on any project page. You have full control over task titles, descriptions, priorities, and statuses."
  },
  {
    question: "How are sprints created?",
    answer: "Sprints are created automatically by the Planner agent based on your project scope and complexity. The agent groups related tasks together and sequences them based on dependencies. You can also manually adjust sprint assignments and create new sprints."
  },
  {
    question: "Is my data private?",
    answer: "Yes. Your project data is encrypted and stored securely. We do not share your data with third parties. AI processing happens in isolated environments, and your project details are never used to train external models."
  },
  {
    question: "How do I delete my account?",
    answer: "You can delete your account from the Account tab in Settings. Click the 'Delete Account' button in the Danger Zone section. This action is irreversible and will permanently delete all your projects and data."
  }
]

const docsContent = {
  gettingStarted: {
    title: "Getting Started",
    description: "Begin your journey with Forge AI in minutes.",
    points: [
      "Sign up with your email or GitHub account",
      "Navigate to Brain Dump to create your first project",
      "Watch as AI agents structure your idea into actionable tasks"
    ]
  },
  brainDump: {
    title: "Brain Dump",
    description: "The starting point for every project.",
    points: [
      "Write your project idea in natural language",
      "Be as detailed or as brief as you want",
      "AI agents will analyze and expand your vision automatically"
    ]
  },
  projectsTasks: {
    title: "Projects & Tasks",
    description: "Manage your work with precision.",
    points: [
      "View all projects from the Projects page",
      "Click any project to see its tasks and sprints",
      "Change task status by clicking the status icon"
    ]
  },
  agents: {
    title: "Agents",
    description: "Your AI-powered development team.",
    points: [
      "Each agent specializes in a specific domain",
      "Trigger agents manually for on-demand analysis",
      "View agent activity logs to track their work"
    ]
  },
  sprints: {
    title: "Sprints & Backlog",
    description: "Organize work into manageable cycles.",
    points: [
      "Sprints group related tasks with deadlines",
      "Backlog contains unassigned future tasks",
      "Move tasks between sprints and backlog as needed"
    ]
  }
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("account")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formData, setFormData] = useState({
    // TODO: prefill these with actual user data from API
    fullName: "John Developer",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleLogout = () => {
    navigate("/landing")
  }

  const handleDeleteAccount = () => {
    // TODO: create delete account API endpoint and call it here
    setShowDeleteModal(false)
    navigate("/login")
  }

  const handleSaveChanges = () => {
    // TODO: create update account API endpoint and call it here
    console.log("Saving changes:", formData)
  }

  const tabs = [
    { id: "account" as const, label: "Account", icon: User },
    { id: "docs" as const, label: "Docs", icon: Book },
    { id: "support" as const, label: "Support", icon: HelpCircle }
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="space-y-8">
            {/* Profile Section */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent text-xl font-bold">
                  {getInitials(formData.fullName)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{formData.fullName}</h2>
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={e => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={e => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveChanges}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Save Changes
            </button>

            {/* Danger Zone */}
            <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
              <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. This action is permanent.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Docs Tab */}
        {activeTab === "docs" && (
          <div className="space-y-6">
            {Object.values(docsContent).map((section, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {section.description}
                </p>
                <ul className="space-y-2">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Support Tab */}
        {activeTab === "support" && (
          <div className="space-y-6">
            {/* FAQ */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="divide-y divide-border">
                {faqItems.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
                    >
                      <span className="font-medium text-foreground pr-4">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
                          expandedFaq === index && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        expandedFaq === index ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Still need help?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to assist you.
              </p>
              {/* TODO: replace mailto link with actual support form or integration */}
              <a
                href="mailto:support@forgeai.dev"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Support
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowDeleteModal(false)}
        >
          <div 
            className="relative w-full max-w-md mx-4 rounded-lg border border-destructive/50 bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete your account? This action cannot be undone. 
              All your projects, tasks, and data will be permanently deleted.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
