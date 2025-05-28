import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "Master Your Interviews with AI",
  description = "Practice with our AI-powered mock interviews and get real-time feedback to improve your skills and land your dream job.",
  ctaText = "Start Practicing Now",
  onCtaClick = () => {
	},
}: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply" />
        <div className="absolute right-0 bottom-0 w-full h-full max-w-[800px] max-h-[600px] opacity-20">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4F46E5"
              d="M45.7,-78.1C58.9,-69.9,69.3,-56.5,76.4,-41.7C83.4,-26.9,87.2,-10.7,85.6,4.9C84,20.5,77,35.5,67.4,48.4C57.8,61.3,45.7,72.1,31.7,77.8C17.7,83.5,1.8,84.1,-13.4,81.1C-28.6,78.1,-43.2,71.5,-55.3,61.3C-67.4,51.1,-77,37.3,-81.7,21.8C-86.4,6.3,-86.2,-10.9,-80.8,-25.8C-75.4,-40.7,-64.8,-53.3,-51.7,-61.5C-38.6,-69.7,-23,-73.5,-7.4,-73.1C8.2,-72.7,32.5,-86.3,45.7,-78.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px] bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-700">
              <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm text-slate-400">
                  AI Interview Session
                </div>
              </div>
              <div className="pt-12 p-6 h-full">
                <div className="flex flex-col space-y-4">
                  <div className="bg-slate-700 p-4 rounded-lg max-w-[80%] text-white">
                    <p className="text-xs text-slate-400 mb-1">
                      AI Interviewer
                    </p>
                    <p>
                      Tell me about a challenging project you worked on and how
                      you overcame obstacles.
                    </p>
                  </div>
                  <div className="bg-blue-600 p-4 rounded-lg max-w-[80%] ml-auto text-white">
                    <p className="text-xs text-blue-300 mb-1">You</p>
                    <p>In my last role, I led a team that had to deliver...</p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-lg max-w-[80%] text-white">
                    <p className="text-xs text-slate-400 mb-1">
                      AI Interviewer
                    </p>
                    <p>
                      That's a good start. Could you elaborate on the specific
                      challenges and your approach?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
