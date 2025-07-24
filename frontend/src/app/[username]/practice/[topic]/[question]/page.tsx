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
import AIInterviewer from "@/components/AIInterviewer";
import ConversationControls from "@/components/ConversationControls";

import { io } from "socket.io-client";

import { useAuth } from "@clerk/nextjs";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import { sendApiRequest, boilerplateCode, Question } from "@/lib/utils";

export default function InterviewPage() {
  const [startInterview, setStartInterview] = useState(false);
  const [runTestCases, setRunTestCases] = useState(false);
  const [interviewData, setInterviewData] = useState<[string, Question]>();
  const [conversationStarted, setConversationStarted] = useState(false);

  const editorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => { editorRef.current = editor }
  const [code, setCode] = useState<string | undefined>();

  const { userId } = useAuth();
  const [timeLeft, setTimeLeft] = useState(60 * 45);
  // const timeLeft = useRef(60 * 45);

  const socket = io("http://127.0.0.1:5000");

  // request the current question
  useEffect(() => {
    const stored = localStorage.getItem("selectedQuestion");
    if (stored) {
      const [questionName, questionObj] = JSON.parse(stored) as [string, Question];
      setInterviewData([questionName, questionObj]);
    }
  }, [])

  // if the conversation has stared, give the info to agent
  useEffect(() => {
    if (conversationStarted && code && interviewData) {
      const data = {
        code: code,
        interviewData: interviewData
      }

      socket.emit("update interview", data, () => {
        console.log("coding")
      })
    }
  }, [conversationStarted])

  // socketio logic
  useEffect(() => {
    socket.on("connect", () => {
      console.log("--- connected to socketio ---");
    })

    const data = {
      code: code,
      interviewData: interviewData
    }

    socket.emit("update interview", data, () => {
      console.log("coding")
    })
  }, [code])

  useEffect(() => {
    if (interviewData) {
      setCode(boilerplateCode(interviewData))
    }
  }, [interviewData])

  useEffect(() => { 
    if (startInterview) {
      const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [startInterview])

  useEffect(() => {
    if (!interviewData) {
      return
    }

    // should upload interview to DB
    if (timeLeft == 0) {
      const postInterviewBody = {
        userId: userId!,
        question: interviewData[0],
        code: code!,
        communication: "10",
        result: "A-"
      }

      sendApiRequest("/api/interview/", "POST", postInterviewBody);
    }

    // shoud run test cases
    if (runTestCases) {
      const postModalBody = {
        code: code!,
        interviewData: interviewData[1]
      }

      const res = sendApiRequest("/api/modal/", "POST", postModalBody);
      console.log(res);
      setRunTestCases(false);
    }

  }, [timeLeft, runTestCases])

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
            <div className="flex items-center justify-center py-4">
              <Button className="mr-4" onClick={() => setRunTestCases(true)}>Run Tests</Button>
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
                    <h2 className="text-2xl font-bold mb-4">{interviewData ? interviewData[0] : "Loading..."}</h2>
                    <p className="mb-4">{interviewData ? interviewData[1].description : "Loading..."}</p>
                    <h3 className="text-xl font-semibold mb-2">Constraints:</h3>
                    <pre className="bg-gray-100 p-2 rounded">{interviewData ? interviewData[1].constraints : "Loading"}</pre>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Examples:</h3>
                    <pre className="bg-gray-100 p-2 rounded">{interviewData ? interviewData[1].test_cases.map((val, idx) => {
                      return (
                        <div key={idx} className="border-2 border-black mb-2">
                          <pre className="bg-gray-100 p-2 rounded">{val.input}</pre>
                          <pre className="bg-gray-100 p-2 rounded">{val.output}</pre>
                        </div>
                      )
                      }) : "Loading..."}
                    <AIInterviewer onConversationStart={() => setConversationStarted(true)}/>
                    </pre>
                  </TabsContent>
                  <TabsContent value="testcases" className="h-full overflow-auto">
                    <h3 className="text-xl font-semibold mb-2">Test Cases:</h3>
                    <pre className="bg-gray-100 p-2 rounded">
                      {interviewData ? interviewData[1].test_cases.map((val) => {
                        return (
                          <div className="border-2 border-black mb-2">
                            <pre className="bg-gray-100 p-2 rounded">{val.input}</pre>
                            <pre className="bg-gray-100 p-2 rounded">{val.output}</pre>
                          </div>
                        )
                      }) : "Loading..."}
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
                    height="800px"
                    onChange={(e) => setCode(e)}
                    defaultLanguage="python"
                    defaultValue={code}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    options={{
                      minimap: { enabled: false },
                      folding: true
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}
