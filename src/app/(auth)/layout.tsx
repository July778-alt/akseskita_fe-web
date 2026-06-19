import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side: Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 relative">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              AksesKita
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Public service made accessible for everyone.
            </p>
          </div>
          <div className="mt-10">{children}</div>
        </div>
      </div>

      {/* Right Side: Image/Branding */}
      <div className="relative hidden w-0 flex-1 lg:block bg-zinc-950 dark:bg-zinc-900">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-l border-zinc-800">
          <div className="flex h-full items-center justify-center p-12 relative overflow-hidden">
            {/* Premium ambient branding glow */}
            <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] bg-primary/15 rounded-full blur-[120px]" />
            
            <div className="max-w-md space-y-6 relative z-10">
              <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
                Empowering Communities Through <span className="text-primary">Transparent Communication.</span>
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Join thousands of citizens in making our city better, one report at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
