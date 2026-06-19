"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, MapPin, BarChart3, Bell, CheckCircle, Smartphone, Users, Zap } from "lucide-react";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      {/* Premium Header */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between sticky top-0 bg-background/70 backdrop-blur-xl z-50 border-b border-border/40">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">A</div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">AksesKita</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="rounded-full px-6 hover:bg-primary/10 hover:text-primary transition-colors">Log in</Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-0.5 bg-gradient-to-r from-primary to-primary/80">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Centered Typography & Ambient Effects */}
        <section className="relative pt-32 pb-40 overflow-hidden flex items-center min-h-[85vh]">
          {/* Centered Ambient Background Glows */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
          </div>
          
          <div className="container px-6 mx-auto text-center">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {/* Pulse Badge */}
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20 backdrop-blur-sm mx-auto">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                Now Live in Your City
              </motion.div>
              
              {/* Headline */}
              <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] text-foreground">
                Smarter City, <br />
                <span className="text-teal-400 whitespace-nowrap">
                  Stronger Community.
                </span>
              </motion.h1>
              
              {/* Paragraph */}
              <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                Report infrastructure issues, track live resolutions, and collaborate directly with local authorities in one beautifully simple platform.
              </motion.p>
              
              {/* Call to Actions */}
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 group bg-gradient-to-r from-primary to-primary/90">
                    Report an Issue
                    <ArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg border-border hover:bg-primary/5 hover:text-primary transition-colors">
                    Explore Live Map
                  </Button>
                </Link>
              </motion.div>
              
              {/* Centered Bullet Features */}
              <motion.div variants={fadeIn} className="mt-16 flex items-center justify-center gap-8 text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-primary" /> Free for citizens</div>
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-primary" /> Real-time updates</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section (Glassmorphism Cards) */}
        <section id="features" className="py-32 relative">
          <div className="absolute inset-0 bg-muted/30 -skew-y-2 origin-top-left -z-10" />
          <div className="container px-6 mx-auto">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">Everything you need to improve your city.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                AksesKita bridges the gap between citizens and authorities with powerful, intuitive tools built for transparency.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: MapPin, title: "Geospatial Tracking", desc: "Pinpoint issues exactly on our interactive city map. Upload photos and provide exact coordinates effortlessly." },
                { icon: Zap, title: "Real-time Processing", desc: "Your reports are instantly routed to the correct department, minimizing delays and accelerating resolution times." },
                { icon: Bell, title: "Instant Notifications", desc: "Never be left in the dark. Receive instant push and email alerts the moment your report status changes." },
                { icon: BarChart3, title: "Public Analytics", desc: "View transparent data on resolution times, city-wide performance metrics, and community engagement." },
                { icon: Shield, title: "Secure & Verified", desc: "Enterprise-grade security ensures your data is safe, while our moderation system prevents spam and fake reports." },
                { icon: Users, title: "Community Driven", desc: "See what others are reporting, support critical community issues, and track your neighborhood's progress." },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-8 rounded-3xl bg-background/60 backdrop-blur-xl border shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all group"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
          
          <div className="container px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-background/50 backdrop-blur-2xl border border-primary/20 p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-primary/20"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to make a difference?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                Join thousands of citizens who are already using AksesKita to build better, safer, and cleaner neighborhoods.
              </p>
              <Link href="/register">
                <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform bg-primary text-primary-foreground">
                  Create Your Free Account
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t px-6 lg:px-12 bg-background">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-80">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">A</div>
            <span className="text-lg font-bold tracking-tight">AksesKita</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} AksesKita Public Service. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
