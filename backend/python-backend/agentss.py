from livekit.agents import (
    ChatContext,
    RunContext,
    Agent,
    function_tool,
)


class MockrAgent(Agent):
    def __init__(self, chat_ctx: ChatContext):
        super().__init__(instructions="You are an software engineer that interviews candidates and here you are going to interview a candidate today! Please state the current question that has been given to you in the chat context.", chat_ctx=chat_ctx)

    @function_tool()
    async def receive_interview_data(self, context: RunContext):
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
        await self.update_chat_ctx(return_chat_context(chat, role, content))

