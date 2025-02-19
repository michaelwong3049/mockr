import { NextResponse, NextRequest } from "next/server";	
import { auth } from "@clerk/nextjs/server";


export async function GET() {

  const { userId } = await auth();

  // getting specific interviewer
  try {
    const data = await fetch(`http://localhost:8080/api/interviewer/${userId}`, {
      method: "GET",
      headers: {
	'Content-Type': 'application/json',
      }
    })

    const interviewers = await data.json();

    return NextResponse.json(interviewers);
  } catch {
    return NextResponse.json({ message: "Error fetching specific interviewer" });
  }
}

export async function POST() {
  const { userId, sessionClaims } = await auth();
  const email = sessionClaims?.email;

  try {
    const data = await fetch("http://localhost:8080/api/interviewer", {
      method: "POST",
      headers: {
	'Content-Type': "application/json"
      },
      body: JSON.stringify({
	id: userId,
	username: "gdotonthebeat",
	email: email
      })
    })

    const interviewer = await data.json();

    return NextResponse.json(interviewer);
  } catch {
    return NextResponse.json({ message: "Error creating interviewer" });
  }
}

