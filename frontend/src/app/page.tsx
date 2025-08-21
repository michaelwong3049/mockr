"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Target, 
  Code, 
  Brain, 
  Rocket, 
  Star,
  ArrowRight,
  Play,
  Sparkles
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Staggered animation sequence
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => setIsReady(true), 1500);
    const timer3 = setTimeout(() => setAnimateButton(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleGetStarted = () => {
    router.push("/elecmiccow/practice");
  };

  const userName = user?.firstName || user?.username || "Coder";

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Code Symbols */}
        <div className="absolute top-20 left-10 text-blue-400/20 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>
          {'{'}
        </div>
        <div className="absolute top-40 right-20 text-purple-400/20 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>
          {'}'}
        </div>
        <div className="absolute bottom-32 left-20 text-green-400/20 text-2xl animate-bounce" style={{ animationDelay: '2s' }}>
          {'['}
        </div>
        <div className="absolute bottom-20 right-32 text-yellow-400/20 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>
          {']'}
        </div>
        
        {/* Sparkles */}
        <div className="absolute top-1/4 left-1/4 text-yellow-400/30 animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="absolute top-3/4 right-1/4 text-blue-400/30 animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-purple-400/30 animate-pulse" style={{ animationDelay: '2s' }}>
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white animate-pulse">
                <Rocket className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Mockr
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Welcome Message */}
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <h2 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Hello, {userName}!
            </h2>
            <div className="flex items-center justify-center gap-2 text-2xl text-white/80 mb-8">
              <Code className="h-8 w-8 animate-pulse" />
              <span>Ready to level up your coding skills?</span>
              <Brain className="h-8 w-8 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Are You Ready Section */}
        <div className={`transition-all duration-1000 delay-500 ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mb-8 max-w-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="h-12 w-12 text-yellow-400 animate-pulse" />
              <h3 className="text-4xl md:text-5xl font-bold text-white">
                Are You Ready?
              </h3>
              <Zap className="h-12 w-12 text-yellow-400 animate-pulse" />
            </div>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Master 8 essential coding topics with 72 carefully crafted problems. 
              From arrays to dynamic programming, we've got you covered.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>8 Topics</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Target className="h-5 w-5 text-blue-400" />
                <span>72 Problems</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Rocket className="h-5 w-5 text-purple-400" />
                <span>AI Guidance</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 delay-1000 ${animateButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            onClick={handleGetStarted}
            className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-xl py-6 px-12 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 animate-pulse"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <Play className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Let's Get Started!</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </Button>
        </div>

        {/* Bottom Stats */}
        <div className={`transition-all duration-1000 delay-1500 mt-12 ${animateButton ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live AI Interviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Real-time Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Cards */}
      <div className={`absolute bottom-8 left-8 transition-all duration-1000 delay-2000 ${animateButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="text-white/80 text-sm">
            <div className="font-semibold mb-1">Quick Stats</div>
            <div>8 Topics • 72 Problems</div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-8 right-8 transition-all duration-1000 delay-2000 ${animateButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="text-white/80 text-sm">
            <div className="font-semibold mb-1">Ready to</div>
            <div>Level Up? 🚀</div>
          </div>
        </div>
      </div>
    </div>
  );
}
