"use client"

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation"; 
import { Button } from "@/components/ui/button"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { topicQuestions } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

export default function InterviewPage() {
  const [startInterview, setStartInterview] = useState(false);
  const [code, setCode] = useState<string | undefined>("// Write your code here");
  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => { editorRef.current = editor }
  const searchParams = useParams();
  const { userId } = useAuth();

  const topic = (searchParams.topic && !Array.isArray(searchParams.topic)) ? decodeURIComponent(searchParams.topic) : "";
  const question = (searchParams.question && !Array.isArray(searchParams.question)) ? decodeURIComponent(searchParams.question) : "";
  const interviewData = topicQuestions[topic][question];

  const [timeLeft, setTimeLeft] = useState(60 * 45);

  // once a user starts the interview, if the user ends, timer runs out, or crashes, upload this to DB
  // TODO: should add the functionality for the timer
  useEffect(() => { 
    if (startInterview) {
      console.log("the interval is starting!!");
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [startInterview])

  useEffect(() => {
    const uploadInterview = async () => {
      try {
        const data = await fetch("/api/interview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            question: question,
            code: code,
            communication: "10",
            result: "A-"
          })
        })

        const res = await data.json();
        console.log(res)
      } catch {
        console.error("Error with post request")
      }
    }

    if (timeLeft == 0) {
      uploadInterview();
    }

  }, [timeLeft])

  return (
    <>
      {!startInterview ? (
        <Dialog open={!startInterview} onOpenChange={() => setStartInterview(true)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ready to being your mock interview?</DialogTitle>
              <DialogDescription>
                This interview CANNOT be paused, if you exit early, lose connection, or any other issue, the interview will be saved and registered at that point in time.
              </DialogDescription>
              <DialogDescription>
                Once you are ready, get uncomfortable, drink some water, and click the "Start" button!
              </DialogDescription>
              <Button onClick={() => setStartInterview(true)}>
                Start Interview
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ): (
          <div className="flex flex-col w-full h-screen">
            <div className="flex justify-center py-4">
              <div className="bg-black text-white px-6 py-2 rounded-xl text-2xl font-mono tracking-widest shadow-md">
                Remaining Time: {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>
            <div className="flex">
              <div className="w-2/3 p-4 flex flex-col">
                <Tabs defaultValue="question" className="flex-grow">
                  <TabsList>
                    <TabsTrigger value="question">Question</TabsTrigger>
                    <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                  </TabsList>
                  <TabsContent value="question" className="h-full overflow-auto">
                    <h2 className="text-2xl font-bold mb-4">{interviewData.question}</h2>
                    <p className="mb-4">{interviewData.description}</p>
                    <h3 className="text-xl font-semibold mb-2">Constraints:</h3>
                    <pre className="bg-gray-100 p-2 rounded">{interviewData.constraints}</pre>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Examples:</h3>
                    <pre className="bg-gray-100 p-2 rounded">{interviewData.examples}</pre>
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
                <div className="w-full">
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
          </div>
        )}
    </>
  )
}
