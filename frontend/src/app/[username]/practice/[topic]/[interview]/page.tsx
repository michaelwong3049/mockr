"use client"

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIInterviewer from "@/components/AIInterviewer";
import { InterviewInfo } from "@/lib/types";
import { Socket, io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const [interviewInfo, setInterviewInfo] = useState<InterviewInfo>();
  const [code, setCode] = useState<string | undefined>("// Write your code here");
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const socketRef = useRef<Socket | null>(null);

  // socketio initialization
  useEffect(() => {
    if(!socketRef.current){
      socketRef.current = io("http://127.0.0.1:5000");
      console.log("connecting to the socketio instance");
    } 

    socketRef.current.on("connect", () => {
      console.log("-- socket.io connected --");	
    })

    socketRef.current.on("disconnect", () => {
      console.log("-- socket.io disconnected --");
    })

    socketRef.current.on("connect_error", (error: any) => {
      if (socketRef.current!.active) {
	console.log("connection error && socket active");
      } else {
	console.log("connection error & socket not active + ", error.message);
      }
    });
  }, [])

  // setting up default values
  useEffect(() => {
    const defaultInterview: InterviewInfo = {
      question_title: "Two Sum",
      question: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
      constraints: "N/A",
      examples: [
	{
	  input: "Something",
	  expected_output: "Something",
	},
      ],
      test_cases: [
	{
	  input: "Something",
	  expected_output: "Something"
	}
      ]
    }
    setInterviewInfo(defaultInterview);
  }, [])

  // sending data through the socket instance
  useEffect(() => {
    if(socketRef.current?.connected && interviewInfo) {
      if(interviewInfo != undefined) {
	const data = {
	  code: code,
	  question: interviewInfo.question
	}

	// sends data for flask backend in api.py
	socketRef.current.emit("update interview", { data }, () => {
	  console.log("sending interview info to api.py");
	})
      }
    }
  }, [code, interviewInfo, socketRef])

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  useEffect(() => {
    const generateInfo = async () => {
      const data = await fetch("/api/openai", {
	method: "POST",
	headers: {
	  "Content-Type": "application/json"
	}
      })
      const interviewInfoJson = await data.json();
      console.log(interviewInfoJson);
      setInterviewInfo(interviewInfoJson);
    }

    //generateInfo();

  }, [])

  return (
    <>
    {interviewInfo ? (
	<div className="flex h-screen">
	  <div className="w-1/3 p-4 flex flex-col">
	    <Tabs defaultValue="question" className="flex-grow">
	      <TabsList>
		<TabsTrigger value="question">Question</TabsTrigger>
		<TabsTrigger value="testcases">Test Cases</TabsTrigger>
	      </TabsList>
	      <TabsContent value="question" className="h-3/4 overflow-auto">
		<h2 className="text-2xl font-bold mb-4">{interviewInfo.question_title}</h2>
		<p className="mb-4">{interviewInfo.question}</p>
		<h3 className="text-xl font-semibold mb-2">Constraints:</h3>
		<pre className="bg-gray-100 p-2 rounded overflow-auto">{interviewInfo.constraints}</pre>
		<h3 className="text-xl font-semibold mt-4 mb-2">Examples:</h3>
		<pre className="bg-gray-100 p-2 rounded">
		 {interviewInfo.examples.map((example, index) => {
		    return(
		      <div key={index}>
			<p className="font-bold">Example {index}:</p>
			<div className="ml-8">
			  <p>Expected Input: {example.input}</p>
			  <p> Input: {example.expected_output}</p>
			</div>
		      </div>
		    )
		  })}
		</pre>
		<div className="mt-2 flex flex-col justify-center">
		  <h3 className="text-center font-bold">AI Interviewer</h3>
		  <AIInterviewer/>
		</div>
	      </TabsContent>
	      <TabsContent value="testcases" className="h-full overflow-auto">
		<h3 className="text-xl font-semibold mb-2">Test Cases:</h3>
		<pre className="bg-gray-100 p-2 rounded overflow-auto">
		  {interviewInfo.test_cases.map((test_case, index) => {
		    return(
		      <div key={index}>
  			<p className="font-bold">Test Case {index}:</p>
			  <div className="ml-4">
			    <p>Input: {test_case.input}</p>
			    <p>Expected Output: {test_case.expected_output}</p>
			  </div>
		      </div>
		      )
		    })
		  }
		</pre>
	      </TabsContent>
	    </Tabs>
	  </div>
	  <div className="w-full p-4 flex flex-col">
	    <div className="mb-4 flex items-center">
	      <Avatar className="h-12 w-12 mr-4">
	      {/* <AvatarImage src="/placeholder.svg" alt="AI Interviewer" /> */}
		<AvatarFallback>AI</AvatarFallback>
	      </Avatar>
	      <span className="text-lg font-semibold">AI Interviewer</span>
	    </div>
	    <div className="flex-grow">
	      <Editor
		height="90vh"
		onChange={(e) => setCode(e)}
		defaultLanguage="python"
		defaultValue={`def ${interviewInfo.question_title.slice(0, interviewInfo.question_title.indexOf(" ")).toLowerCase()}():\n\t`}
		theme="vs-dark"
		onMount={handleEditorDidMount}
	      /> 
	    </div>
	  </div>
	</div>
      ) : (
	<div>Loading...</div>
      )}
    </>
  )
}
