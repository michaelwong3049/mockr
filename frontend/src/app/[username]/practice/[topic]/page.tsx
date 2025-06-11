"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Question } from "@/lib/utils"; 
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDifficultyColor } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { topicQuestions } from "@/lib/utils";

export default function TopicPage() {
  const [currentQuestions, setCurrentQuestions] = useState<Record<string, Question>| null>(null);
  const searchParams = useParams();
  const username = (searchParams.username && !Array.isArray(searchParams.username)) ? decodeURIComponent(searchParams.username) : "";
  const topic = (searchParams.topic && !Array.isArray(searchParams.topic)) ? decodeURIComponent(searchParams.topic) : "";

  useEffect(() => {
    let questions = topicQuestions[topic];
    console.log("questions: ", questions);
    setCurrentQuestions(questions)
  }, [])

  useEffect(() => {
    if (currentQuestions != null) {
      console.log(Object.values(currentQuestions));
    }
  }, [currentQuestions])

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href={`/${username}/practice`}>
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{topic} Questions</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Practice these 9 questions to master Two Pointers
          technique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuestions && Object.values(currentQuestions).map((question) => (
            <Card key={question.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{question.question}</CardTitle>
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </div>
                {question.description && (
                  <CardDescription>{question.description}</CardDescription>
                )}
              </CardHeader>
              <CardFooter className="pt-2">
                <Link className="w-full" href={`/${username}/practice/${searchParams.topic}/${question.question}`}>
                  <Button variant="outline" className="w-full">
                    Solve Challenge 
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

