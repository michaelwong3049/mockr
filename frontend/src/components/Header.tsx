import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
    return(
        <div>
            <Button variant="noborder" className="text-3xl text-bold mt-6 ml-12" asChild>
                <Link href="/">
                    InterviewAI
                </Link>
            </Button>
        </div>
    )
}