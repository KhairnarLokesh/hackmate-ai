"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Rocket,
  Users,
  Brain,
  Clock,
  Zap,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  ListTodo,
  Presentation,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Trophy,
  BarChart3,
  Globe,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupName, setSignupName] = useState("")

  const [resetEmail, setResetEmail] = useState("")
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInAsGuest, resetPassword } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) return

    setIsResetting(true)
    try {
      await resetPassword(resetEmail)
      toast({
        title: "Email sent",
        description: "Check your email (including spam) for password reset instructions.",
      })
      setResetDialogOpen(false)
      setResetEmail("")
    } catch (error: any) {
      toast({
        title: "Failed to send email",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsResetting(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signInWithEmail(loginEmail, loginPassword)
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signUpWithEmail(signupEmail, signupPassword, signupName)
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Google login failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setIsLoading(true)
    try {
      await signInAsGuest()
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Guest login failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const userTypes = [
    {
      title: "Students",
      description: "Perfect for college assignments and portfolio projects.",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Hackathon Teams",
      description: "Built for high-speed execution in competitive 24-48h events.",
      icon: <Trophy className="h-6 w-6" />,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      title: "Event Organizers",
      description: "Manage multiple teams and stream judging workflows effortlessly.",
      icon: <Globe className="h-6 w-6" />,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Corporate Managers",
      description: "Track innovation and productivity during internal hack days.",
      icon: <Briefcase className="h-6 w-6" />,
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ]

  const pricingTiers = {
    students: [
      {
        name: "Free",
        price: "$0",
        description: "Standard Student Mode",
        features: ["1 Private Project", "Basic Kanban Board", "Manual Task Creation", "Team size max 3"],
        button: "Get Started",
        pro: false
      },
      {
        name: "Student Pro",
        price: "$5",
        description: "JIRA-lite for Students",
        features: ["Unlimited projects", "AI Idea Analysis", "AI Task Breakdown", "Milestones & Sprints", "Export PDF Summary"],
        button: "Go Pro",
        pro: true
      }
    ],
    hackathons: [
      {
        name: "Free",
        price: "$0",
        description: "Event Participant Tier",
        features: ["1 AI Analysis", "Basic Task Board", "Real-time Collaboration", "Limited AI Mentor"],
        button: "Join Pack",
        pro: false
      },
      {
        name: "Team Pro",
        price: "$19",
        description: "Execution Powerhouse",
        features: ["Unlimited AI Mentor", "Task Auto-regeneration", "Pitch/Demo Export", "Judge Read-only Mode", "Full Activity Feed"],
        button: "Boost Team",
        pro: true
      }
    ],
    organizers: [
      {
        name: "Enterprise",
        price: "Custom",
        description: "For Large Scale Events",
        features: ["Organizer Dashboard", "Team Analytics", "Sponsor Customization", "Judge Demo Links", "Full Outcome Reports"],
        button: "Contact Sales",
        pro: true
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <header className="relative">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Rocket className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black tracking-tight">HackMate <span className="text-primary italic">AI</span></span>
            </motion.div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                animate: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                <Sparkles className="h-4 w-4" />
                Vision 2.0 is Live
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Remove <span className="text-primary relative inline-block">
                  Chaos
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span> <br />
                from Execution.
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                HackMate AI combines lightweight project management with context-aware AI to help students and hackathon teams build faster.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Students
                </div>
                <div className="flex items-center gap-2 font-medium text-sm">
                  <Trophy className="h-5 w-5 text-primary" />
                  Hackathons
                </div>
                <div className="flex items-center gap-2 font-medium text-sm">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Enterprise
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glassmorphism-card border-2 bg-background/60 backdrop-blur-xl shadow-2xl relative">
                <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-primary/20 blur-xl animate-pulse" />
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-3xl font-bold">Start Building</CardTitle>
                  <CardDescription className="text-base">Join 5,000+ hackers worldwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1">
                      <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Login</TabsTrigger>
                      <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Register</TabsTrigger>
                    </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <div className="flex justify-end mt-1">
                          <Button
                            variant="link"
                            className="p-0 h-auto text-xs text-muted-foreground hover:text-primary"
                            type="button"
                            onClick={() => setResetDialogOpen(true)}
                          >
                            Forgot password?
                          </Button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                    <AnimatePresence mode="wait">
                      <TabsContent key="login" value="login" className="space-y-5">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email Address</Label>
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="alex@hackmate.ai"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              className="bg-muted/30 border-none focus-visible:ring-primary"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input
                              id="login-password"
                              type="password"
                              placeholder="••••••••"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="bg-muted/30 border-none focus-visible:ring-primary"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In to Workspace"}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent key="signup" value="signup" className="space-y-5">
                        <form onSubmit={handleSignup} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="signup-name">Full Name</Label>
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Alex Thompson"
                              value={signupName}
                              onChange={(e) => setSignupName(e.target.value)}
                              className="bg-muted/30 border-none focus-visible:ring-primary"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email">Work Email</Label>
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="alex@hackmate.ai"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              className="bg-muted/30 border-none focus-visible:ring-primary"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password">Secure Password</Label>
                            <Input
                              id="signup-password"
                              type="password"
                              placeholder="••••••••"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              className="bg-muted/30 border-none focus-visible:ring-primary"
                              required
                              minLength={6}
                            />
                          </div>
                          <Button type="submit" className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </form>
                      </TabsContent>
                    </AnimatePresence>

                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-background/60 backdrop-blur-md px-4 text-muted-foreground font-semibold">Security first access</span></div>
                    </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" onClick={handleGuestLogin} disabled={isLoading}>
                    <Zap className="mr-2 h-4 w-4" />
                    Guest Mode
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                  <DialogDescription>
                    Enter your email address and we'll send you a link to reset your password.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isResetting}>
                    {isResetting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading} className="border-border hover:bg-muted font-semibold">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </Button>
                      <Button variant="ghost" onClick={handleGuestLogin} disabled={isLoading} className="bg-muted hover:bg-muted/80 font-semibold">
                        <Zap className="mr-2 h-4 w-4 text-amber-500 fill-amber-500" />
                        Guest Mode
                      </Button>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </header>

      {/* User Types Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">One Platform, <span className="text-primary italic">Every Perspective</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored workspaces designed for the unique challenges of students, teams, and organizers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${type.color}`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Matrix / Pricing */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/30 text-primary font-bold">Pricing tiers</Badge>
            <h2 className="text-4xl font-bold tracking-tight">Find Your <span className="text-primary italic">Perfect Fit</span></h2>
          </div>

          <Tabs defaultValue="students" className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-background border border-border p-1">
                <TabsTrigger value="students" className="px-8 font-bold">Students</TabsTrigger>
                <TabsTrigger value="hackathons" className="px-8 font-bold">Hackathon Teams</TabsTrigger>
                <TabsTrigger value="organizers" className="px-8 font-bold">Organizers</TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {['students', 'hackathons', 'organizers'].map((key) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`grid md:grid-cols-${pricingTiers[key as keyof typeof pricingTiers].length} gap-8 justify-center`}
                  >
                    {pricingTiers[key as keyof typeof pricingTiers].map((tier, idx) => (
                      <Card key={idx} className={`relative flex flex-col w-[350px] overflow-hidden ${tier.pro ? 'border-primary shadow-2xl scale-105 z-10' : 'border-border'}`}>
                        {tier.pro && (
                          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-black uppercase tracking-widest rounded-bl-lg">
                            Pro
                          </div>
                        )}
                        <CardHeader className="p-8">
                          <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                          <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-5xl font-black">{tier.price}</span>
                            <span className="text-muted-foreground font-medium">/per proj</span>
                          </div>
                          <CardDescription className="mt-4 font-medium">{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 flex-1">
                          <ul className="space-y-4">
                            {tier.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                <CheckCircle2 className={`h-5 w-5 shrink-0 ${tier.pro ? 'text-primary' : 'text-muted-foreground'}`} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <div className="p-8 pt-0">
                          <Button className={`w-full py-6 text-lg font-bold ${tier.pro ? '' : 'variant-outline'}`} variant={tier.pro ? 'default' : 'outline'}>
                            {tier.button}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section >

      {/* Persona User Flows */}
      < section className="py-24" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Journey to <span className="text-primary italic">Success</span></h2>
            <p className="text-xl text-muted-foreground">The HackMate workflow tailored to your role</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                persona: "Team Members",
                steps: ["Create/Join Hackathon", "Submit AI Idea Input", "AI Analysis & Review", "Kanban Execution", "Export Pitch Deck"],
                icon: <Users className="h-10 w-10 text-primary" />,
              },
              {
                persona: "Students",
                steps: ["Create Private Project", "Map Core Features", "Use AI Mentor Chat", "Track Progress Log", "PDF Final Export"],
                icon: <GraduationCap className="h-10 w-10 text-primary" />,
              },
              {
                persona: "Event Organizers",
                steps: ["Setup Event Space", "Distribute Join Codes", "Monitor Analytics Hub", "Share Judge Links", "Generate Event Report"],
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
              },
            ].map((flow, index) => (
              <div key={index} className="space-y-8 relative">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center shadow-inner">
                    {flow.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{flow.persona}</h3>
                </div>
                <div className="space-y-6 relative pl-8 border-l-2 border-primary/20">
                  {flow.steps.map((step, sIdx) => (
                    <div key={sIdx} className="relative">
                      <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                      <p className="text-lg font-bold">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning Summary Banner */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold italic max-w-4xl mx-auto leading-snug">
            "HackMate AI removes execution chaos for students and hackathons by combining lightweight project management with context-aware AI."
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">HackMate AI</span>
          </div>
          <div className="text-muted-foreground text-sm font-medium">
            © 2026 HackMate AI. Built for the next generation of builders.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
