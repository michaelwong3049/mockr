"use client";
import Header from '@/components/Header';
import { useAuth } from '@clerk/nextjs';

export default function Dashboard() {
  const { userId } = useAuth();

  const createInterviewer = async () => {
    const data = await fetch("/api/interviewer", {
      method: "GET",
      headers: {
	"Content-Type": "application/json"
      }
    })
    const interviewer = await data.json();
  
    if(interviewer.status != 500) {
      console.log("FOUND INTERVIEWER");
      console.log(interviewer);
    }

    else {
      const data = await fetch("/api/interviewer", {
	method: "POST",
	headers: {
	  "Content-Type": "application/json"
	}
      })
      
      const interviewer = await data.json();
      console.log("CREATED INTERVIEWER");
      console.log(interviewer);
    }
  }

  createInterviewer();

    return(
        <div>
            <Header/>
        </div>
    );
}
