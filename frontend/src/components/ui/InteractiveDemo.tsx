"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Mic, User } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const InteractiveDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Tell me about a challenging situation you faced at work and how you handled it.",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: userInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setUserInput("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "That's a good example of problem-solving. I'd suggest expanding on the specific actions you took and quantifying the results. Also, try using the STAR method (Situation, Task, Action, Result) to structure your response more clearly. This will help the interviewer follow your thought process better.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">See How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our AI-powered mock interview platform in action. Try
            responding to this sample question to see how our AI provides
            personalized feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold mb-2">How It Works:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                    1
                  </span>
                  <p>Our AI asks you industry-specific interview questions</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                    2
                  </span>
                  <p>You respond as you would in a real interview</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                    3
                  </span>
                  <p>Get instant, personalized feedback on your answers</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                    4
                  </span>
                  <p>Improve your responses with specific suggestions</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="mt-4">
                Start Your Full Practice Session
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <div className="bg-primary text-white p-4 rounded-t-lg flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=interview-ai"
                      alt="AI Assistant"
                    />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Interview AI Assistant</h3>
                    <p className="text-xs opacity-80">
                      Online • Providing feedback
                    </p>
                  </div>
                </div>

                <div className="h-80 overflow-y-auto p-4 bg-white">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-blue-100 text-gray-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t flex items-center">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your response here..."
                    className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="rounded-l-none"
                    disabled={!userInput.trim()}
                  >
                    <Send size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    className="ml-2"
                    title="Voice input (coming soon)"
                  >
                    <Mic size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
