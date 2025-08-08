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

export default function AIInterviewer({ onConversationStart }: { onConversationStart: () => void }) {
  const [shouldFetchToken, setShouldFetchToken] = useState<boolean>(false); 
  const [myToken, setMyToken] = useState<string>();
  const room = "demo-room";
  const name = "demo-name";

  useEffect(() => {
    if(shouldFetchToken) { const fetchToken = async() => {
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
    <div className="bg-zinc-900 flex flex-col items-center">
      {/* AI Interviewer with radiating ring */}
      <div className="relative mb-2">
        <div
          className={`absolute inset-0 rounded-full ${"bg-transparent"}`}
        ></div>
        <div className="relative">
        </div>
      </div>
      <span className="text-sm font-medium"></span>
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
        <SimpleVoiceAssistant/>
        <RoomAudioRenderer/>
      </LiveKitRoom>
      <Button variant="outline" className="my-2 py-2 text-white bg-gray-900" onClick={() => setShouldFetchToken(true)}>
        Start Conversation
      </Button>
    </div>
  )
}

function SimpleVoiceAssistant() {
  const { state, audioTrack } = useVoiceAssistant(); 
  return (
    <div className="bg-gray-900 h-40">
      <BarVisualizer state={state} trackRef={audioTrack} barCount={5} style={{}}></BarVisualizer>
    </div>
  )
}

