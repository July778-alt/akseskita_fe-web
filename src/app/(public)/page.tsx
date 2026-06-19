"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  MapPin, 
  BarChart3, 
  MessageSquare, 
  ArrowRight,
  CheckCircle2,
  Users2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-tight text-primary bg-primary/10 rounded-full">
                Empowering Citizens, Improving Cities
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
                Your Voice for a <span className="text-primary">Better Community.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                AksesKita is the bridge between you and public services. Report issues, track progress, and contribute to a more transparent city.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20">
                    Get Started Now <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                    View Public Reports
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need to make an impact.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our platform provides powerful tools for citizens and administrators to collaborate effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<MapPin className="text-primary" />}
              title="Location-Based"
              description="Precisely pinpoint issues on an interactive map for faster resolution."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-primary" />}
              title="Real-time Updates"
              description="Get notified as your reports move from pending to resolved."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-primary" />}
              title="Transparent Process"
              description="Full visibility into how administrators handle each reported case."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-primary" />}
              title="Data-Driven"
              description="Advanced analytics to help officials prioritize community needs."
            />
          </div>
        </div>
      </section>

      {/* How it Works / Social Proof */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Built for public service, <br />
              <span className="text-primary">Trusted by thousands.</span>
            </h2>
            <div className="space-y-6 mt-8">
              <CheckItem text="Secure and verified reporting system." />
              <CheckItem text="Direct communication with local authorities." />
              <CheckItem text="Optimized for both mobile and web access." />
              <CheckItem text="Integrated categorization for better organization." />
            </div>
            <div className="mt-10 flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <Users2 size={20} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">
                Join <span className="text-primary font-bold">10,000+</span> active citizens.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full lg:max-w-xl aspect-video rounded-2xl bg-muted border overflow-hidden relative shadow-2xl">
             <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 size={64} className="text-primary/20" />
             </div>
             {/* Simple dashboard mock elements */}
             <div className="absolute top-4 left-4 right-4 h-8 rounded-lg bg-background/50 border" />
             <div className="absolute top-16 left-4 w-1/3 bottom-4 rounded-lg bg-background/50 border" />
             <div className="absolute top-16 right-4 left-[40%] bottom-4 rounded-lg bg-background/50 border" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
                Ready to make a difference?
              </h2>
              <p className="text-primary-foreground/80 text-xl mb-10 max-w-xl mx-auto">
                Create your account today and start contributing to your city's growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full">
                    Create Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="ghost" className="h-14 px-10 text-lg text-white hover:bg-white/10 rounded-full">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-background border rounded-2xl transition-all hover:shadow-xl hover:border-primary/20"
    >
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <CheckCircle2 size={16} />
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
}
