"use client"

import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { TargetIcon } from "lucide-react";
import AIInterviewer from "@/components/AIInterviewer";

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
      console.log("conversation has started");

      const data = {
        code: code,
        interviewData: interviewData
      }

      socket.on("connect", () => {
        setTimeout(() => {
          socket.emit("update interview", data, () => {
            console.log("emitting to agent??");
          });
        }, 5000); // 5000 ms = 5 seconds
      });
    }
  }, [conversationStarted])

  useEffect(() => {
    if (interviewData) {
      setCode(boilerplateCode(interviewData))
    }
  }, [interviewData])

  useEffect(() => { 
    if (startInterview) {
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
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
          <div className="bg-gray-700 flex flex-col w-full h-screen overflow-hidden">
            <div className="flex items-center justify-center py-4">
              <Button variant={"outline"} className="bg-gray-900 mr-4 border-gray-400 text-white" onClick={() => setRunTestCases(true)}>Run Tests</Button>
              <div className="border-2 border-gray-400 text-white px-2 py-2 rounded-xl font-mono tracking-widest">
                Remaining Time: {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>

            <div className="flex">
              <div className="w-2/3 mx-4 flex flex-col">
                
                {/* Interview Data */}
                <div className="bg-zinc-900 text-white h-3/5 p-4 border-2 border-gray-400">
                  <Tabs defaultValue="question" className="h-full flex-grow">
                    <TabsList className="bg-gray-900">
                      <TabsTrigger value="question">Question</TabsTrigger>
                      <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                    </TabsList>
                    <TabsContent value="question" className="h-full overflow-auto">
                      <div className="flex items-center my-4">
                        <TargetIcon className="mr-2"/>
                        <h2 className="font-bold">{interviewData ? interviewData[0] : "Loading..."}</h2>
                      </div>
                      <p className="mb-4">{interviewData ? interviewData[1].description : "Loading..."}</p>
                      <h3 className="font-semibold mt-2 mb-2">Examples:</h3>
                      <pre className="p-2 rounded-[25px]">{interviewData ? interviewData[1].test_cases.map((val, idx) => {
                        return (
                          <div key={idx} className="">
                            <pre className="p-2"><strong>Input: </strong>{val.input}</pre>
                            <pre className="p-2"><strong>Output: </strong>{val.output}</pre>
                          </div>
                        )
                        }) : "Loading..."}
                      </pre>
                      <h3 className="font-semibold mb-2">Constraints:</h3>
                      <pre className="bg-gray-900 p-2 rounded">{interviewData ? interviewData[1].constraints : "Loading"}</pre>
                    </TabsContent>
                    <TabsContent value="testcases" className="h-full overflow-auto">
                      <h3 className="text-xl font-semibold mb-2">Test Cases:</h3>
                      <pre className="bg-gray-900 p-2 rounded">
                        {interviewData ? interviewData[1].test_cases.map((val, index) => {
                          return (
                            <div key={index} className="border-2 border-black mb-2">
                              <pre className="bg-gray-900 p-2 rounded">{val.input}</pre>
                              <pre className="bg-gray-900 p-2 rounded">{val.output}</pre>
                            </div>
                          )
                        }) : "Loading..."}
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="border-2 mt-4"><AIInterviewer onConversationStart={() => setConversationStarted(true)}/></div>
              </div>
            
              {/* Editor */}
              <div className="w-full flex flex-col">
                <div className="h-screen w-full">
                  <Editor
                    className="bg-gray-900 border-2 border-gray-400"
                    onChange={(e) => setCode(e)}
                    defaultLanguage="python"
                    defaultValue={code}
                    theme="vs-dark"

                    onMount={(editor, monaco) => {
                      handleEditorDidMount(editor);

                      monaco.editor.defineTheme("custom-dark", {
                        base: "vs-dark",
                        inherit: true,
                        rules: [],
                        colors: {
                          "editor.background": "#18181b", // same as Tailwind's bg-gray-900
                        },
                      });

                      monaco.editor.setTheme("custom-dark");

                      editor.updateOptions({
                        automaticLayout: true,
                        minimap: { enabled: false },
                        folding: true,
                      });
                    }}
                    options={{
                      fontSize: 14,
                      automaticLayout: true,
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
