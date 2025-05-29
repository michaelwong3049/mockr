"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  ListTree,
  GitBranch,
  SlidersHorizontal,
  Network,
  BrainCircuit,
  Database,
  Layers,
} from "lucide-react";

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function TopicCard ({
  title,
  description,
  icon,
  onClick,
}: TopicCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
      <div className="flex justify-end mt-4">
        <Button variant="ghost" size="sm" className="text-primary">
          Practice <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// const Dashboard: React.FC = () => {
export default function Practice() {
	const router = useRouter();
  const topics = [
    {
      title: "Two Pointers",
      description:
        "Master the two-pointer technique for array and string problems with efficient O(n) solutions.",
      icon: <Code className="h-6 w-6" />,
    },
		{
			title: "Sliding Window",
			description:
			"Learn to solve substring and subarray problems with the sliding window technique.",
			icon: <SlidersHorizontal className="h-6 w-6" />,
		},
    {
      title: "Linked Lists",
      description:
        "Practice traversal, reversal, and manipulation of singly and doubly linked lists.",
      icon: <ListTree className="h-6 w-6" />,
    },
    {
      title: "Trees",
      description:
        "Explore binary trees, BSTs, and tree traversal algorithms for hierarchical data.",
      icon: <GitBranch className="h-6 w-6" />,
    },
    {
      title: "Graphs",
      description:
        "Master DFS, BFS, and shortest path algorithms for graph-based problems.",
      icon: <Network className="h-6 w-6" />,
    },
    {
      title: "Dynamic Programming",
      description:
        "Tackle optimization problems by breaking them down into overlapping subproblems.",
      icon: <BrainCircuit className="h-6 w-6" />,
    },
    {
      title: "Heaps & Priority Queues",
      description:
        "Solve problems involving finding the kth largest/smallest elements efficiently.",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "System Design",
      description:
        "Practice designing scalable systems and discussing architectural trade-offs.",
      icon: <Layers className="h-6 w-6" />,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
					<div className="flex gap-2">
						<h1 className="text-3xl font-bold mb-2">
							mockr
						</h1>
						<h1 className="text-3xl mb-2">
							Practice Dashboard
						</h1>
					</div>
          <p className="text-gray-600">
            Select a topic to start practicing interview questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <TopicCard
              key={index}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              onClick={() => 
								{
								router.push(`practice/${topic.title}`)}
							}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
