import {
	Code,
	ListTree,
	GitBranch,
	SlidersHorizontal,
	Network,
	BrainCircuit,
	Database,
	Layers,
} from "lucide-react";

export const topics = [
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


