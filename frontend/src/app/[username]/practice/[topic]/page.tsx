
"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Question } from "@/lib/types";	
import { Card, CardTitle, CardHeader, CardFooter, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PracticeTopic({ params }: {
  params: Promise<{ slug: string }>
}) {
  const [slug, setSlug] = useState<string>();
  const [questions, setQuestions] = useState<Question[]>([]);

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  
  useEffect(() => {
    const getSlug = async () => {
      setSlug((await params).slug);
    }

    const getQuestions = async () => {
      const data = await fetch("/api/question", {
	method: "GET",
	headers: {
	  "Content-Type": "application/json"
	}
      })
    
      // TODO: need to remove [0] in the future since questionsJson returns an array 
      const questionsJson: Question = (await data.json())[0];
      setQuestions((prevQuestions) => [...prevQuestions, questionsJson]);
    }

    getSlug();
    getQuestions();
  }, [])

    console.log(questions);

  return(
    <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-3xl">{title}</p>
      <div className="w-full flex flex-col justify-center items-center mt-4">
	{questions ? (
	  questions.map((question, index) => (
	    <Link
	    key={index}
	    href={{
	      pathname: `/${slug}/practice/topic/${question.question}`,
	      query: {
		title: question.question
	      }
	    }}
	    >
	      <Card>
		<CardHeader>
		  <CardTitle className="text-center">{question.question}</CardTitle>
		  <CardDescription className="text-center">{question.question}</CardDescription>
		</CardHeader>
		<CardContent>
		  <p></p>
		</CardContent>
		<CardFooter className="flex flex-col items-center">
		  <p>Questions Completed:</p>
		  <p className="text-bold">{question.question}</p>
		</CardFooter>
	      </Card>
	    </Link>
	  ))
	) : (
	<p>LOADING...</p>
	)}
      </div>
  </div>
  )
}

