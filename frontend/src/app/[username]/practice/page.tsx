"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Target, Menu } from "lucide-react";
import { topics } from "@/lib/topics";
import { Question, sendApiRequest } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  solved: number;
  onClick?: () => void;
}

function TopicCard({
  title,
  description,
  icon,
  solved,
  onClick,
}: TopicCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:via-blue-50/20 group-hover:to-blue-50/10 transition-all duration-500" />
      
      <div className="relative p-6 flex flex-col h-full">
        {/* Header with icon and title */}
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm flex-grow leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Progress and action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-gray-500">
              <Target className="h-4 w-4 mr-1" />
              <span className="font-medium">{solved}/9</span>
            </div>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${(solved / 9) * 100}%` }}
              />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group-hover:translate-x-1 transition-all duration-300"
          >
            Practice 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Practice() {
  const [solvedQuestions, setSolvedQuestions] = useState<Question[]>([]);
  const [showCards, setShowCards] = useState(false);
  const topicQuestionsMap = new Map<string, number>();
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await sendApiRequest("/api/question", "GET");

      if (data.length > 0) {
        const questionsJson = await data.json;
        for(let question = 0; question < questionsJson.length; question++) {
          let currentTopic = questionsJson[question].getQuestionType;

          for(let i = 0; i < topics.length; i++) {
            if(topics[i].title == currentTopic) {
              topicQuestionsMap.set(currentTopic, (topicQuestionsMap.get(currentTopic) ?? 0) + 1)
            }
            else {
              setSolvedQuestions(prev => [...prev, questionsJson[question]])
            }
          }
        }
      }
    }

    fetchQuestions();
    
    // Trigger card animations after a short delay
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    console.log(solvedQuestions);
  }, [solvedQuestions])

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Practice Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Master coding interview questions across different topics. Track your progress and improve your problem-solving skills.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">45 min sessions</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="h-5 w-5" />
              <span className="font-medium">9 questions per topic</span>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                showCards 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'opacity, transform'
              }}
            >
              <TopicCard
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                solved={topicQuestionsMap.get(topic.title) ?? 0}
                onClick={() => {
                  router.push(`practice/${topic.title}`)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
