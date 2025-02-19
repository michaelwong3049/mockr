"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Editor from "@monaco-editor/react"
import * as monaco from "monaco-editor";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const [code, setCode] = useState<string | undefined>("// Write your code here");
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);

  const [question, setQuestion] = useState({
    title: "",
    description: "",
    constraints: "",
    examples: "",
  })

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  useEffect(() => {
    // In a real app, you would fetch the question from an API based on the topic and difficulty
    setQuestion({
      title: `Sample ${topic} Question (${difficulty})`,
      description: "This is a sample question description. In a real app, this would be fetched from an API.",
      constraints: "- 1 <= n <= 10^5\n- -10^9 <= nums[i] <= 10^9",
      examples:
	"Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    })
  }, [topic, difficulty])

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4 flex flex-col">
	<Tabs defaultValue="question" className="flex-grow">
	  <TabsList>
	    <TabsTrigger value="question">Question</TabsTrigger>
	    <TabsTrigger value="testcases">Test Cases</TabsTrigger>
	  </TabsList>
	  <TabsContent value="question" className="h-full overflow-auto">
	    <h2 className="text-2xl font-bold mb-4">{question.title}</h2>
	    <p className="mb-4">{question.description}</p>
	    <h3 className="text-xl font-semibold mb-2">Constraints:</h3>
	    <pre className="bg-gray-100 p-2 rounded">{question.constraints}</pre>
	    <h3 className="text-xl font-semibold mt-4 mb-2">Examples:</h3>
	    <pre className="bg-gray-100 p-2 rounded">{question.examples}</pre>
	  </TabsContent>
	  <TabsContent value="testcases" className="h-full overflow-auto">
	    <h3 className="text-xl font-semibold mb-2">Test Cases:</h3>
	    <pre className="bg-gray-100 p-2 rounded">
	      {`Test Case 1:
	      Input: ...
	      Expected Output: ...

	      Test Case 2:
	      Input: ...
	      Expected Output: ...`}
	    </pre>
	  </TabsContent>
	</Tabs>
      </div>
      <div className="w-full p-4 flex flex-col">
	<div className="mb-4 flex items-center">
	  <Avatar className="h-12 w-12 mr-4">
	    <AvatarImage src="/placeholder.svg" alt="AI Interviewer" />
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
  )
}
