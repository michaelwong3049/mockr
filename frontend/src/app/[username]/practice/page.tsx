import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Topic } from "@/lib/types";


export default async function Practice({ params }: {
    params: Promise<{ slug: string }>
}) {

    const slug = (await params).slug;

    const topics: Array<Topic> = [
        {
            title_name: "Arrays and Hashing",
            description: "Master 2D matrixes, hash maps, sets, subarrys, and more!",
            completed: "0/7"
        },
        {
            title_name: "Two Pointers",
            description: "Understand concepts like sliding window, fast and slow pointers, and more!",
            completed: "0/7",
        },
        {
            title_name: "Linked Lists",
            description: "Learn concepts like reversing linked lists, merging, and more!",
            completed: "0/7",
        },
        {
            title_name: "Trees",
            description: "Find more about depth/breadth first search, traversal types, and more!",
            completed: "0/7",
        },
    ]

    return(
        <div className="w-full flex justify-center gap-x-12 mt-10">
            {topics.map((topic, index) => (
                <Link 
                    key={index} 
                    href={{
                        pathname: `/${slug}/practice/${topic.title_name}`,
                        query: {
                            title: topic.title_name
                        }
                    }}
                    >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">{topic.title_name}</CardTitle>
                            <CardDescription className="text-center">{topic.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p></p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center">
                            <p>Questions Completed:</p>
                            <p className="text-bold">{topic.completed}</p>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    )
}