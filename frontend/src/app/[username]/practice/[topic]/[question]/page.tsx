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
import { TargetIcon, Play, Clock, Code, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import AIInterviewer from "@/components/AIInterviewer";

import { io } from "socket.io-client";

import { useAuth } from "@clerk/nextjs";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import { sendApiRequest, boilerplateCode, Question } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimeColor = (seconds: number) => {
    if (seconds > 1800) return "text-green-600"; // > 30 min
    if (seconds > 900) return "text-yellow-600";  // > 15 min
    return "text-red-600";                        // < 15 min
  };

  return (
    <>
      {!startInterview ? (
        <Dialog open={!startInterview} onOpenChange={() => setStartInterview(true)}>
          <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border border-gray-200/50">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white w-fit">
                <Play className="h-6 w-6" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Ready to begin your mock interview?
              </DialogTitle>
              <DialogDescription className="text-gray-600 leading-relaxed mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span>This interview cannot be paused or restarted</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>You have 45 minutes to complete the challenge</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code className="h-4 w-4 text-green-500" />
                  <span>Write clean, efficient code and explain your approach</span>
                </div>
              </DialogDescription>
              <Button 
                onClick={() => setStartInterview(true)} 
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Interview
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-gray-400 hover:text-gray-200 transition-colors duration-300" />
                <Button 
                  variant="outline" 
                  className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50 transition-all duration-300"
                  onClick={() => setRunTestCases(true)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Run Tests
                </Button>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <TargetIcon className="h-4 w-4" />
                  <span>{interviewData ? interviewData[0] : "Loading..."}</span>
                </div>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-600 text-white font-mono tracking-widest text-lg ${getTimeColor(timeLeft)}`}>
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* Two Section Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Section - Question Information + AI Interviewer */}
            <div className="w-1/2 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
              {/* Question Information */}
              <div className="flex-1 overflow-auto">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <TargetIcon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {interviewData ? interviewData[0] : "Loading..."}
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">Problem Description</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {interviewData ? interviewData[1].description : "Loading..."}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">Examples</h3>
                      <div className="space-y-3">
                        {interviewData ? interviewData[1].test_cases.map((val, idx) => (
                          <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                            <div className="mb-2">
                              <span className="text-blue-400 font-medium">Input:</span>
                              <pre className="text-gray-300 mt-1 p-2 bg-gray-800/50 rounded border border-gray-600/50 overflow-x-auto">
                                {val.input}
                              </pre>
                            </div>
                            <div>
                              <span className="text-green-400 font-medium">Output:</span>
                              <pre className="text-gray-300 mt-1 p-2 bg-gray-800/50 rounded border border-gray-600/50 overflow-x-auto">
                                {val.output}
                              </pre>
                            </div>
                          </div>
                        )) : "Loading..."}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">Constraints</h3>
                      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                        <pre className="text-gray-300 whitespace-pre-wrap">
                          {interviewData ? interviewData[1].constraints : "Loading..."}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Interviewer - Small Box */}
              <div className="h-64 border-t border-gray-700/50 flex-shrink-0">
                <AIInterviewer onConversationStart={() => setConversationStarted(true)} />
              </div>
            </div>
            
            {/* Right Section - Code Editor */}
            <div className="w-1/2">
              <Editor
                className="h-full"
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
                      "editor.background": "#1f2937",
                      "editor.foreground": "#f9fafb",
                      "editor.lineHighlightBackground": "#374151",
                      "editor.selectionBackground": "#3b82f6",
                      "editor.inactiveSelectionBackground": "#4b5563",
                    },
                  });

                  monaco.editor.setTheme("custom-dark");

                  editor.updateOptions({
                    automaticLayout: true,
                    minimap: { enabled: false },
                    folding: true,
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineHeight: 1.5,
                    padding: { top: 16, bottom: 16 },
                  });
                }}
                options={{
                  fontSize: 14,
                  automaticLayout: true,
                  minimap: { enabled: false },
                  folding: true,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  lineHeight: 1.5,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
