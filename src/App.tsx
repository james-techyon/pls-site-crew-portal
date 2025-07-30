import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContractorForm from "./components/ContractorForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Briefcase } from "lucide-react";

export default function App() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <ContractorForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
              <span className="text-background font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Prestige Labor Solutions</h1>
              <p className="text-sm text-muted-foreground">Your Premier Labor Partner for AV Events</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Hero Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-muted-foreground"
              >
                <Award className="w-4 h-4 text-primary" />
                <span>Professional AV Contractor Network</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                Join Our{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Elite Crew
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Connect with top-tier audio, video, lighting, and production opportunities. 
                Apply now to become part of our professional contractor network.
              </motion.p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {[
                {
                  icon: Users,
                  title: "Premium Events",
                  description: "Work on high-profile corporate events, festivals, and concerts"
                },
                {
                  icon: Briefcase,
                  title: "Competitive Rates",
                  description: "Industry-leading compensation for skilled professionals"
                },
                {
                  icon: Award,
                  title: "Expert Network",
                  description: "Join a community of top-tier AV professionals"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="glass p-6 rounded-2xl hover:bg-background/30 transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-8"
            >
              <Button
                size="lg"
                onClick={() => setShowForm(true)}
                className="group px-8 py-6 text-lg glow-primary hover:scale-105 transition-all duration-300"
              >
                <span>Start Application</span>
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Complete application takes 5-10 minutes
              </p>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Prestige Labor Solutions. Professional AV staffing since 2019.
          </p>
        </footer>
      </div>
    </div>
  );
}
