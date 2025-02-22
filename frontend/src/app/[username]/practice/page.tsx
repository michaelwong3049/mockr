"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Topic } from "@/lib/types";
import { useState, useEffect } from "react";


export default function Practice({ params }: {
  params: Promise<{ username: string }>
}) {
  const [username, setUsername] = useState<string | null>();
  const [interviewer, setInterviewer] = useState();
  const [arraysAndHashing, setArraysAndHashing] = useState<number>(0);
  const [twoPointers, setTwoPointers] = useState<number>(0);
  const [linkedLists, setLinkedLists] = useState<number>(0);

  useEffect(() => {
    const getSlug = async () => {
      setUsername((await params).username);
    }

    const getInterviewerInfo = async () => {
      const data = await fetch("/api/interviewer", {
	method: "GET",
	headers: { 
	  "Content-Type": "application/json"
	}
      }); 

      const interviewerData = await data.json();
      setInterviewer(interviewerData);


      // getting the # of questions solved data
      for(let i = 0; i < interviewerData.solved.length; i++) {
	const question = interviewerData.solved
	if(question[i].questionType == "Arrays and Hashing") {
	  setArraysAndHashing(arraysAndHashing + 1);
	}

	if(question[i].questionType == "Two Pointers") {
	  setTwoPointers(twoPointers + 1);
}

	if(question[i].questionType == "Linked Lists") {
	  setLinkedLists(linkedLists + 1);
	}
      }
    }

    getSlug();
    getInterviewerInfo();

  }, [])

  const topics: Array<Topic> = [
    {
      title_name: "Arrays and Hashing",
      description: "Master 2D matrices, hash maps, sets, subarrys, and more!",
      completed: `${arraysAndHashing}/7`
    },
    {
      title_name: "Two Pointers",
      description: "Understand concepts like sliding window, fast and slow pointers, and more!",
      completed: `${twoPointers}/7`
    },
    {
      title_name: "Linked Lists",
      description: "Learn concepts like reversing linked lists, merging, and more!",
      completed: `${linkedLists}/7`
    },
    //{
    //  title_name: "Trees",
    //  description: "Find more about depth/breadth first search, traversal types, and more!",
    //  completed: "0/7",
    //},
  ]

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-center gap-x-12 mt-10">
	{topics.map((topic, index) => (
	  <Link
	  key={index}
	  href={{
	    pathname: `/${username}/practice/${topic.title_name}`,
	    query: {
	      title: topic.title_name
	    }
	  }}
	  >
	    <Card>
	      <CardHeader>
		<CardTitle className="text-center">{topic.title_name}</CardTitle>
		<CardDescription className="text-center">{topic.description}</CardDescription>
	      </CardHeader>
	      <CardContent>
		<p></p>
	      </CardContent>
	      <CardFooter className="flex flex-col items-center">
		<p>Questions Completed:</p>
		<p className="text-bold">{topic.completed}</p>
	      </CardFooter>
	    </Card>
	  </Link>
	))}
      </div>
      <div>
	<Link
	href={{
	  pathname: `/${username}/practice/random/random`,
	  query: {
	    title: "random"
	  }
	}}
	>
	  <Card>
	    <CardHeader>
	      <CardTitle className="text-center">Try A Random Question!</CardTitle>
	      <CardDescription className="text-center">Test Your Range of Knowledge...</CardDescription>
	    </CardHeader>
	    <CardContent>
	      <p></p>
	    </CardContent>
	  </Card>
	</Link>
      </div>
    </div>
  )
}
