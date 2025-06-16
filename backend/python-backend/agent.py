from __future__ import annotations

import asyncio

import logging
import os

from livekit import rtc, api
from livekit.agents import (
  AutoSubscribe,
  JobContext,
  WorkerOptions,
  cli,
  llm,
)
from livekit.agents.multimodal import MultimodalAgent
from livekit.plugins import openai

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

agent_context = ""

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
  global agent_context
  print("getting code data?")
  question = data["data"].get("question")
  agent_context = question
  # print(agent_context)

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

async def entrypoint(ctx: JobContext):
  global agent_context
    
  print("startin entrypoint")
  logger.info("starting entrypoint")

  logger.info("-----")
  logger.info(agent_context)
  logger.info("-----")

  await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

  participant = await ctx.wait_for_participant()

  model = openai.realtime.RealtimeModel(
    instructions="You are a AI mock software engineering interviewer.",
    voice="shimmer",
    temperature=0.8,
    modalities=["audio", "text"],
  )

  # chat_ctx = llm.ChatContext()
  # chat_ctx.append(
  #   text=agent_context,
  #   role="assistant"
  # )

  chat_ctx = llm.ChatContext()

  chat_ctx.append(
    text=agent_context,
    role="assistant"
  )

  assistant = MultimodalAgent(model=model, chat_ctx=chat_ctx)

  logger.info("starting agent")
  assistant.start(ctx.room, participant)
  #
  # session = model.sessions[0]
  # session.conversation.item.create(
  #   llm.ChatMessage(
  #     role="assistant",
  #     content=agent_context,
  #   )
  # )
  # session.response.create()
  print("trying generate a reply")

  assistant.generate_reply()

async def setup():
  global agent_context
  while agent_context == "":
    await asyncio.sleep(1)
  print("Agent is now populated")
  print(agent_context)

if __name__ == "__main__":
  logger.info("testing part 2")
  sio.connect("http://127.0.0.1:5000/")
  asyncio.run(setup())
  cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
