"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, BarChart3, FileQuestion, Clock } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description = "" }: FeatureProps) => {
  return (
    <Card className="bg-white h-full transition-all hover:shadow-lg">
      <CardContent className="flex flex-col items-center text-center p-6">
        <div className="rounded-full bg-primary/10 p-3 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeatureShowcase = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI-Powered Feedback",
      description:
        "Get instant, detailed feedback on your responses from our advanced AI that simulates real interviewers.",
    },
    {
      icon: <FileQuestion className="h-6 w-6 text-primary" />,
      title: "Industry-Specific Questions",
      description:
        "Practice with questions tailored to your industry, role level, and specific job requirements.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Performance Analytics",
      description:
        "Track your progress over time with detailed analytics on your strengths and areas for improvement.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Practice Anytime",
      description:
        "Prepare for interviews on your schedule with 24/7 access to unlimited practice sessions.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50" id="features">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Why Choose Our AI Interview Practice
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Prepare for your next interview with confidence using our
            cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
