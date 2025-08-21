"use client";

import { Button } from './ui/button';
import { useState, useEffect } from 'react';

import "@livekit/components-styles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
} from "@livekit/components-react";
import { Mic, MicOff, MessageCircle, Bot } from "lucide-react";

export default function AIInterviewer({ onConversationStart }: { onConversationStart: () => void }) {
  const [shouldFetchToken, setShouldFetchToken] = useState<boolean>(false); 
  const [myToken, setMyToken] = useState<string>();
  const [isConnected, setIsConnected] = useState(false);
  const room = "demo-room";
  const name = "demo-name";

  useEffect(() => {
    if(shouldFetchToken) { 
      const fetchToken = async() => {
        const data = await fetch(`/api/livekit?room=${room}&username=${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if(data.ok) {
          const json = await data.json();
          console.log(json.token);
          setMyToken(json.token);
          setIsConnected(true);
          onConversationStart();
        } else {
          console.log(data);
          throw new Error("Error fetching the token")
        }
      }

      fetchToken();
    }
  }, [shouldFetchToken])

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-gray-800/30 backdrop-blur-sm">
      {!isConnected ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">AI Interviewer</h3>
            <p className="text-gray-300 text-xs">Ready to guide you</p>
          </div>
          <Button 
            variant="outline" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm"
            onClick={() => setShouldFetchToken(true)}
          >
            <Mic className="mr-2 h-3 w-3" />
            Start
          </Button>
        </div>
      ) : (
        <LiveKitRoom
          token={myToken}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          connect={true}
          audio={true}
          data-lk-theme="default"
          onError={(error) => {
            console.log("---- error here ----");
            console.error("Livekit connection error", error);
          }}
        >
          <CompactVoiceAssistant/>
          <RoomAudioRenderer/>
        </LiveKitRoom>
      )}
    </div>
  )
}

function CompactVoiceAssistant() {
  const { state, audioTrack } = useVoiceAssistant(); 
  const isSpeaking = state === 'speaking';
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-2">
      <div className="relative mb-3">
        {isSpeaking && (
          <>
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 rounded-full bg-purple-500/15 animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}></div>
          </>
        )}
        
        <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300 ${
          isSpeaking ? 'scale-110 shadow-lg shadow-blue-500/50' : 'scale-100'
        }`}>
          <Bot className={`h-10 w-10 text-white transition-all duration-300 ${
            isSpeaking ? 'animate-pulse' : ''
          }`} />
        </div>
      </div>

      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-1 mb-1">
          <div className={`w-2 h-2 rounded-full ${
            isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`}></div>
          <span className="text-white font-medium text-sm">
            {isSpeaking ? 'Speaking...' : 'Listening'}
          </span>
        </div>
      </div>

      <div className="w-full max-w-32 mb-3">
        <BarVisualizer 
          state={state} 
          trackRef={audioTrack} 
          barCount={6} 
          className="h-8 bg-gray-700/50 rounded-lg p-1"
          style={{
            '--lk-bar-color': isSpeaking ? '#3b82f6' : '#6b7280',
            '--lk-bar-color-active': '#8b5cf6'
          } as React.CSSProperties}
        />
      </div>

      <div className="scale-75">
        <VoiceAssistantControlBar 
          className="bg-gray-700/50 rounded-lg p-1"
          style={{
            '--lk-button-color': '#3b82f6',
            '--lk-button-color-active': '#8b5cf6'
          } as React.CSSProperties}
        />
      </div>
    </div>
  )
}

