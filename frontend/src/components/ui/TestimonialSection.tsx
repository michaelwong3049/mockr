"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  avatar?: string;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialSection = ({
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-16 px-4 bg-slate-50 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear from professionals who improved their interview performance
            with our AI mock interview platform.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="min-w-full bg-white shadow-md rounded-xl"
                >
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="mb-6">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="mb-6">
                      <svg
                        className="h-8 w-8 text-slate-300 mx-auto mb-2"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-lg text-slate-700 italic">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">
                        {testimonial.position}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-6 bg-primary" : "w-2 bg-slate-300"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The AI mock interviews helped me identify weaknesses in my responses that I never noticed before. After just two weeks of practice, I felt much more confident and landed my dream job!",
    name: "Sarah Johnson",
    position: "Software Engineer at Google",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    quote:
      "As someone who gets nervous during interviews, this platform was a game-changer. The realistic AI feedback helped me improve my communication skills and handle tough questions with ease.",
    name: "Michael Chen",
    position: "Product Manager at Microsoft",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: 3,
    quote:
      "The industry-specific questions were spot on! I practiced with the AI for my finance interview, and many similar questions came up in my actual interview. I was well-prepared and got the job!",
    name: "Jessica Williams",
    position: "Financial Analyst at JP Morgan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
  {
    id: 4,
    quote:
      "The performance analytics helped me track my progress over time. I could see exactly where I needed to improve, and the AI provided actionable feedback that made a real difference.",
    name: "David Rodriguez",
    position: "Marketing Director at Adobe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

export default TestimonialSection;
