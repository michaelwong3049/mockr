"use client";

import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import HeroSection from "../components/ui/HeroSection";
import FeatureShowcase from "../components/ui/FeatureShowcase";
import InteractiveDemo from "../components/ui/InteractiveDemo";
import TestimonialSection from "../components/ui/TestimonialSection";
import { motion } from "framer-motion";

const HomePage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Email submitted");
  };

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Showcase */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <FeatureShowcase />
      </motion.div>

      {/* Interactive Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <InteractiveDemo />
      </motion.div>

      {/* Testimonial Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <TestimonialSection />
      </motion.div>

      {/* Email Signup Form */}
      <motion.section
        className="py-16 px-4 md:px-8 bg-muted/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Early Access</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be among the first to experience our AI-powered mock interview
            platform. Sign up now for exclusive early access and free trial
            opportunities.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
              required
            />
            <Button type="submit" className="px-6">
              Sign Up
            </Button>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-xl">AI Mock Interview</h3>
            <p className="text-muted-foreground text-sm">
              Ace your next interview with AI-powered practice
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-muted text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Mock Interview. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
