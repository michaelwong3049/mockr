"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Question } from "@/lib/utils"; 
import { ArrowLeft, Play, Clock, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getDifficultyColor } from "@/lib/utils";
import { useParams } from "next/navigation";
import { arraysAndHashing, twoPointers, slidingWindow, binarySearch, linkedList, trees, graphs, dynamicProgramming, heaps } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TopicPage() {
  const [currentQuestions, setCurrentQuestions] = useState<Array<string | any>>();
  const [showCards, setShowCards] = useState(false);
  const searchParams = useParams();
  const username = (searchParams.username && !Array.isArray(searchParams.username)) ? decodeURIComponent(searchParams.username) : "";
  const currTopic = (searchParams.topic && !Array.isArray(searchParams.topic)) ? decodeURIComponent(searchParams.topic) : "";
  const topics = [arraysAndHashing, twoPointers, slidingWindow, binarySearch, linkedList, trees, graphs, dynamicProgramming, heaps];
  const router = useRouter();

  useEffect(() => {
    for(let topic = 0; topic < topics.length; topic++) {
      const questionTopic = Object.values(topics[topic])[0].questionType;
      if(questionTopic == currTopic) {
        setCurrentQuestions(Object.entries(topics[topic]))
      }
    }
    
    // Trigger card animations after a short delay
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [])

  const routeToInterview = (question: any) => {
    localStorage.setItem("selectedQuestion", JSON.stringify(question))
    router.push(`/${username}/practice/${searchParams.topic}/${question[0]}`);
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch(difficulty) {
      case "Easy":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case "Medium":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case "Hard":
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-gray-600 hover:text-gray-900 transition-colors duration-300" />
            <Link href={`/${username}/practice`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-gray-100 transition-all duration-300 group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" /> 
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <Target className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                {currTopic} Questions
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Master the {currTopic} technique with these carefully curated problems. 
            Each question is designed to build your problem-solving skills progressively.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">45 min per session</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="h-5 w-5" />
              <span className="font-medium">9 questions total</span>
            </div>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuestions && currentQuestions.map((question, index) => (
            <div
              key={question[1].id}
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
              <Card className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 h-full">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 group-hover:from-blue-50/20 group-hover:via-blue-50/10 group-hover:to-blue-50/5 transition-all duration-500" />
                
                <div className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                        {question[0]}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={`${getDifficultyColor(question[1].difficulty)} border-0 font-medium px-3 py-1 flex items-center gap-2`}
                      >
                        {getDifficultyIcon(question[1].difficulty)}
                        {question[1].difficulty}
                      </Badge>
                    </div>
                    {question[1].description && (
                      <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                        {question[1].description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Target className="h-4 w-4" />
                        <span>ID: {question[1].id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>~5-10 min</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button 
                      onClick={() => routeToInterview(question)} 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Start Challenge
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

