import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const interviewData = await req.json();

  const data = await fetch("http://localhost:8080/api/interview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(interviewData),
  })

  const response = await data.json();
  return NextResponse.json({ response });
}

