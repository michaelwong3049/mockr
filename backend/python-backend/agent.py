from __future__ import annotations

import asyncio

import logging
import os

from dataclasses import dataclass
from livekit import rtc, api, agents
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    ChatContext,
    ChatMessage,
    RoomInputOptions,
    RunContext,
    WorkerOptions,
    AgentSession,
    Agent,
    function_tool,
    cli,
    llm,
)

from livekit.plugins import openai
from livekit.plugins.openai import realtime
from livekit.protocol import agent
from openai.types.beta.realtime.session import TurnDetection

from flask import Flask
from flask_cors import CORS

from dotenv import load_dotenv

import socketio

load_dotenv(dotenv_path=".env.local")

# logging setup
logger = logging.getLogger("myagent")
logger.setLevel(logging.INFO)

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# Add handler to logger
logger.addHandler(console_handler)

# -- socketio logic --
sio = socketio.Client()

interview_info = ""
code = ""

@sio.event
def connect():
    print("-- connected in agent.py  --")

@sio.event
def connect_error():
    print("-- connection error occurring --")

@sio.event
def disconnect(reason):
    print("-- disconnected in agent.py  --")
    print(reason)

@sio.event
def agent_data(data):
    global interview_info
    global code

    question = data["interviewData"][0]
    desc = data["interviewData"][1]["description"]
    code = data["code"]
    interview_info = question + " " + desc
    print("here:", interview_info)

# -- flask logic for livekit frontend --
flask_app = Flask(__name__)
cors = CORS(flask_app)

@flask_app.route('/getToken')
def getToken():
    print("get token function...")
    print("get token function...")
    print("get token function...")
    token = api.AccessToken(os.getenv('LIVEKIT_API_KEY'), os.getenv('LIVEKIT_API_SECRET')) \
    .with_identity("identity") \
    .with_name("my name") \
    .with_grants(api.VideoGrants(
        room_join=True,
        room="demo-room",
    ))
    return { "token": token.to_jwt() }


class MockrAgent(Agent):
    def __init__(self, chat_ctx: ChatContext):
        super().__init__(instructions="You are an software engineer that interviews candidates and here you are going to interview a candidate today! Please state the current question that has been given to you in the chat context.", chat_ctx=chat_ctx)

    @function_tool()
    async def receive_code(self, context: RunContext):
        """Use this tool to retreive interview data such as code written or current question"""
        global code
        print("here:ajsdkfjkasdkf", code)
        def return_chat_context(chat_ctx: ChatContext, role, content) -> ChatContext:
            chat_ctx.add_message(role=role, content=content)
            print("chat_ctx: ", chat_ctx)
            return chat_ctx

        chat=self.chat_ctx.copy()
        role="user"
        content=code

        return await self.update_chat_ctx(return_chat_context(chat, role, content))

async def entrypoint(ctx: JobContext):
    global interview_info
    print("in entrypoint")

    try:
        sio.connect("http://127.0.0.1:5000/")
    except Exception as e:
        print("failure to connect to socketio", e)

    print("--- connected ---")

    while interview_info == "":
        print("interview_info is empty")
        await asyncio.sleep(1)

    if interview_info:
        print("Got interview info!!", interview_info)

    print("returning?")

    logger.info("starting entrypoint")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    participant = await ctx.wait_for_participant()
    print("--- Found participant ---")

    session = AgentSession(
        llm=realtime.RealtimeModel(
            voice="coral",
            turn_detection=TurnDetection(
                type="server_vad",
                threshold=0.5,
                prefix_padding_ms=300,
                silence_duration_ms=500,
                create_response=True,
                interrupt_response=True,
            )
        ),
    )

    print("chat_ctx: ", interview_info)
    inital_ctx = ChatContext()
    inital_ctx.insert(item=ChatMessage(role="assistant", content=[interview_info]))

    try:
        await session.start(
            room=ctx.room,
            agent=MockrAgent(inital_ctx),
        )

        print("Started session")
    except Exception as e:
        print(f"--- Error starting session {e} ---")
    
    try:
        print("agent Context: ")
        print(interview_info)
        await session.generate_reply(
            user_input=interview_info,
            instructions="In English, state the current given question from the chat_ctx/chat context"
        )
        print("Generating response..")
    except Exception as e:
        print(f"--- Error generating reply in agent.py: {e} ---")

    

if __name__ == "__main__":
    try:
        print("cli")
        cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
    except Exception:
        print("Error starting entrypoint in try block")
