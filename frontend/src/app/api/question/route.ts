import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const data = await fetch("http://localhost:8080/api/question", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const questions = await data.json();
  return NextResponse.json(questions);
}

