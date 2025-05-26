import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

const interview_info = z.object({
  question_title: z.string(),
  question: z.string(),
  constraints: z.string(),
  examples: z.array(z.object({
    input: z.string(),
    expected_output: z.string(),
  })),
  test_cases: z.array(z.object({
    input: z.string(),
    expected_output: z.string(),
  })),
});

export async function POST(req: NextRequest) {
  const completion = await openai.chat.completions.create({ 
    model: "gpt-4o-mini",
    messages: [
      { role: "developer", content: "You create software engineering technical interview questions, examples, test cases all in JSON format" },
    ],

    response_format: zodResponseFormat(interview_info, "interview_info")
  })

  return new NextResponse(completion.choices[0].message.content);
}

