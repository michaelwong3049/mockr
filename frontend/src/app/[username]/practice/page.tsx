"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { topics } from "@/lib/topics";
import { Question, sendApiRequest } from "@/lib/utils";

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  solved: number;
  onClick?: () => void;
}

function TopicCard ({
  title,
  description,
  icon,
  solved,
  onClick,
}: TopicCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
      <div className="flex items-center text-sm justify-end mt-4">
        <div className="bg-gray-100 border-2 rounded-[25px] px-2 py-1">
          {solved}/9
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          Practice <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default function Practice() {
  const [solvedQuestions, setSolvedQuestions] = useState<Question[]>([]);
  const topicQuestionsMap = new Map<string, number>();
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await sendApiRequest("/api/question", "GET");

      const questionsJson = await data.json();
      for(let question = 0; question < questionsJson.length; question++) {
        let currentTopic = questionsJson[question].getQuestionType;

        for(let i = 0; i < topics.length; i++) {
          if(topics[i].title == currentTopic) {
            topicQuestionsMap.set(currentTopic, (topicQuestionsMap.get(currentTopic) ?? 0) + 1)
          }
          else {
            // this set function might cause errors because of type errors...
            setSolvedQuestions(prev => [...prev, questionsJson[question]])
          }
        }

      }
    }

    fetchQuestions();
  }, [])

  useEffect(() => {
    console.log(solvedQuestions);
  }, [solvedQuestions])

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold mb-2">
              mockr
            </h1>
            <h1 className="text-3xl mb-2">
              Practice Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Select a topic to start practicing interview questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <TopicCard
              key={index}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              solved={topicQuestionsMap.get(topic.title) ?? 0}
              onClick={() => 
              {
                  router.push(`practice/${topic.title}`)}
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
