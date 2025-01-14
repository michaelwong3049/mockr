import { Button } from "../ui/button";

export default function LandingPageHeader() {
    return(
        <div className="flex items-center justify-between mt-8">
            <h1>
                InterviewAI 
            </h1>
            <div>
                <Button variant="outline">
                    Login
                </Button>
                <Button className="">
                    Sign Up
                </Button>
            </div>
        </div>
    );
}