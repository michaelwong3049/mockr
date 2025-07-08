"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Question } from "@/lib/utils"; 
import { ArrowLeft } from "lucide-react";
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
import { arraysAndHashing, twoPointers, slidingWindow, binarySearch} from "@/lib/utils";

export default function TopicPage() {
  const [currentQuestions, setCurrentQuestions] = useState<Array<string | any>>();
  const searchParams = useParams();
  const username = (searchParams.username && !Array.isArray(searchParams.username)) ? decodeURIComponent(searchParams.username) : "";
  const currTopic = (searchParams.topic && !Array.isArray(searchParams.topic)) ? decodeURIComponent(searchParams.topic) : "";
  const topics = [arraysAndHashing, twoPointers, slidingWindow, binarySearch];
  const router = useRouter();

  useEffect(() => {
    for(let topic = 0; topic < topics.length; topic++) {
      if(Object.values(topics[topic])[0].questionType == currTopic) {
        setCurrentQuestions(Object.entries(topics[topic]))
      }
    }
  }, [])

  const routeToInterview = (question: any) => {
    localStorage.setItem("selectedQuestion", JSON.stringify(question))
    router.push(`/${username}/practice/${searchParams.topic}/${question[0]}`);
  }

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href={`/${username}/practice`}>
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{currTopic} Questions</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Practice these 9 questions to master Two Pointers
          technique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuestions && currentQuestions.map((question) => (
            <Card key={question[1].id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{question[0]}</CardTitle>
                  <Badge className={question[1].difficulty}>
                    {question.difficulty}
                  </Badge>
                </div>
                {question[1].description && (
                  <CardDescription>{question[1].description}</CardDescription>
                )}
              </CardHeader>
              <CardFooter className="pt-2">
                <Button onClick={() => routeToInterview(question)} variant="outline" className="w-full">
                  Solve Challenge 
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

