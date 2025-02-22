"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InterviewInfo } from "@/lib/types"
import Editor from "@monaco-editor/react"
import * as monaco from "monaco-editor";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const [interviewInfo, setInterviewInfo] = useState<InterviewInfo>();
  const [code, setCode] = useState<string | undefined>("// Write your code here");
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);

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
    
    generateInfo();

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
	      <TabsContent value="question" className="h-full overflow-auto">
		<h2 className="text-2xl font-bold mb-4">{interviewInfo.question_title}</h2>
		<p className="mb-4">{interviewInfo.question}</p>
		<h3 className="text-xl font-semibold mb-2">Constraints:</h3>
		<pre className="bg-gray-100 p-2 rounded overflow-auto">{interviewInfo.constraints}</pre>
		<h3 className="text-xl font-semibold mt-4 mb-2">Examples:</h3>
		<pre className="bg-gray-100 p-2 rounded">
		  {interviewInfo.examples.map((example, index) => {
		    return(
		      <>
			<p className="font-bold">Example {index}:</p>
			<div key={index} className="ml-8">
			  <p>Expected Input: {example.input}</p>
			  <p> Input: {example.expected_output}</p>
			</div>
		      </>
		    )
		  })}
		</pre>
	      </TabsContent>
	      <TabsContent value="testcases" className="h-full overflow-auto">
		<h3 className="text-xl font-semibold mb-2">Test Cases:</h3>
		<pre className="bg-gray-100 p-2 rounded overflow-auto">
		  {interviewInfo.test_cases.map((test_case, index) => {
		    return(
		      <>
			<p className="font-bold">Test Case {index}:</p>
			  <div key={index} className="ml-4">
			    <p>Input: {test_case.input}</p>
			    <p>Expected Output: {test_case.expected_output}</p>
			  </div>
		      </>
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
		defaultValue="// write function"
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
