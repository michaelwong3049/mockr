import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDifficultyColor (difficulty: string) {
	if (difficulty == "Easy") {
		return "bg-green-100 text-green-800 hover:bg-green-200";
	}
	else if (difficulty == "Medium") { 
		return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
	}
	else if (difficulty == "Hard") {
		return "bg-red-100 text-red-800 hover:bg-red-200";
	}
	else {
		return "bg-gray-100 text-gray-800 hover:bg-gray-200";
	}
};

export interface Topic {
  title_name: string;
  description: string;
  completed: string;
}

export interface Question {
	id: number,
  question: string,
  questionType: string,
  difficulty: string,
  description: string
}

export const arraysAndHashing: Question[] = [
  { id: 1, question: "Pair Match Sum", questionType: "Arrays and Hashing", difficulty: "Easy", description: "Find a pair of numbers in the array that add up to a given target." },
  { id: 2, question: "Check Unique Characters", questionType: "Arrays and Hashing", difficulty: "Easy", description: "Determine if a string contains all unique characters using hashing." },
  { id: 3, question: "Bucket Count", questionType: "Arrays and Hashing", difficulty: "Medium", description: "Distribute items into buckets and count how many buckets exceed a threshold." },
  { id: 4, question: "Frequency Sort", questionType: "Arrays and Hashing", difficulty: "Medium", description: "Sort an array based on the frequency of each element." },
  { id: 5, question: "Symmetric Hash Table", questionType: "Arrays and Hashing", difficulty: "Medium", description: "Check if the hash map representation of a list is symmetric." },
  { id: 6, question: "Chain Map Sequence", questionType: "Arrays and Hashing", difficulty: "Medium", description: "Given a mapping of keys to values, determine if there's a cycle in the map chain." },
  { id: 7, question: "Rare Element Finder", questionType: "Arrays and Hashing", difficulty: "Hard", description: "Find elements that appear only once in an array of large size efficiently." },
  { id: 8, question: "Max Coverage Intervals", questionType: "Arrays and Hashing", difficulty: "Hard", description: "Determine the maximum number of overlapping intervals using hash buckets." }
];

export const twoPointers: Question[] = [
  { id: 1, question: "Opposite Ends Match", questionType: "Two Pointers", difficulty: "Easy", description: "Check if characters at opposing ends of a string match based on a condition." },
  { id: 2, question: "Sorted Merge Points", questionType: "Two Pointers", difficulty: "Easy", description: "Merge two sorted arrays into a new sorted array using two pointers." },
  { id: 3, question: "Middle Anchor", questionType: "Two Pointers", difficulty: "Medium", description: "Anchor one pointer at the center and expand to compare values symmetrically." },
  { id: 4, question: "Skip Duplicates", questionType: "Two Pointers", difficulty: "Medium", description: "Remove duplicates from a sorted list using two pointers." },
  { id: 5, question: "Balanced Tails", questionType: "Two Pointers", difficulty: "Medium", description: "Check if sum of head and tail sections of array are equal." },
  { id: 6, question: "Direction Match", questionType: "Two Pointers", difficulty: "Medium", description: "Determine if two strings can be made equal by reversing substrings." },
  { id: 7, question: "Converging Sum Check", questionType: "Two Pointers", difficulty: "Hard", description: "Use two pointers to find matching subarrays from start and end of array." },
  { id: 8, question: "Sliding Equal Sections", questionType: "Two Pointers", difficulty: "Hard", description: "Check if there are two equal-sized contiguous subarrays in an array." }
];

export const slidingWindow: Question[] = [
  { id: 1, question: "Max Sum Subarray", questionType: "Sliding Window", difficulty: "Easy", description: "Find the maximum sum of any contiguous subarray of size k." },
  { id: 2, question: "Fixed Window Average", questionType: "Sliding Window", difficulty: "Easy", description: "Compute average of all subarrays of fixed size." },
  { id: 3, question: "Variable Size Window", questionType: "Sliding Window", difficulty: "Medium", description: "Find longest subarray with sum less than or equal to target." },
  { id: 4, question: "Count Distinct in Window", questionType: "Sliding Window", difficulty: "Medium", description: "Count distinct elements in every window of size k." },
  { id: 5, question: "Longest Substring With Unique Chars", questionType: "Sliding Window", difficulty: "Medium", description: "Find longest substring with all unique characters." },
  { id: 6, question: "Min Window of Target Sum", questionType: "Sliding Window", difficulty: "Medium", description: "Find smallest subarray with a sum greater than a given value." },
  { id: 7, question: "Substring Anagram Check", questionType: "Sliding Window", difficulty: "Hard", description: "Check how many substrings of a string are anagrams of another." },
  { id: 8, question: "Weighted Max Window", questionType: "Sliding Window", difficulty: "Hard", description: "Find the maximum weighted sum window for a given weight array." }
];

export const binarySearch: Question[] = [
  { id: 1, question: "Find Target in Sorted Array", questionType: "Binary Search", difficulty: "Easy", description: "Search for a target number in a sorted array." },
  { id: 2, question: "Check Element Exists", questionType: "Binary Search", difficulty: "Easy", description: "Determine whether an element exists in a binary search manner." },
  { id: 3, question: "First True Condition", questionType: "Binary Search", difficulty: "Medium", description: "Find the first index where a condition becomes true." },
  { id: 4, question: "Binary Search on Function", questionType: "Binary Search", difficulty: "Medium", description: "Apply binary search to a monotonic function to find root or threshold." },
  { id: 5, question: "Minimum in Rotated Array", questionType: "Binary Search", difficulty: "Medium", description: "Find the minimum element in a rotated sorted array." },
  { id: 6, question: "Peak Element Finder", questionType: "Binary Search", difficulty: "Medium", description: "Find a peak element using binary search strategy." },
  { id: 7, question: "Search in Infinite Array", questionType: "Binary Search", difficulty: "Hard", description: "Search for a value in a conceptual infinite sorted array." },
  { id: 8, question: "Optimal Threshold Finder", questionType: "Binary Search", difficulty: "Hard", description: "Binary search to find a threshold value satisfying multiple constraints." }
];

export const linkedList: Question[] = [
  { id: 1, question: "Insert at Head", questionType: "Linked List", difficulty: "Easy", description: "Insert a new node at the beginning of a singly linked list." },
  { id: 2, question: "Find Tail Node", questionType: "Linked List", difficulty: "Easy", description: "Find the last node of a linked list." },
  { id: 3, question: "Reverse Subsection", questionType: "Linked List", difficulty: "Medium", description: "Reverse a subsection of a singly linked list." },
  { id: 4, question: "Merge Two Lists", questionType: "Linked List", difficulty: "Medium", description: "Merge two sorted linked lists into a single list." },
  { id: 5, question: "Cycle Detection", questionType: "Linked List", difficulty: "Medium", description: "Detect if a cycle exists in a linked list." },
  { id: 6, question: "Reorder List", questionType: "Linked List", difficulty: "Medium", description: "Reorder linked list in a specific pattern." },
  { id: 7, question: "Skip List Search", questionType: "Linked List", difficulty: "Hard", description: "Efficiently search in a skip list using linked list structure." },
  { id: 8, question: "Deep Clone List", questionType: "Linked List", difficulty: "Hard", description: "Create a deep copy of a linked list with random pointers." }
];

export const trees: Question[] = [
  { id: 1, question: "Find Leaf Nodes", questionType: "Trees", difficulty: "Easy", description: "Identify all the leaf nodes in a binary tree." },
  { id: 2, question: "Tree Height Calculator", questionType: "Trees", difficulty: "Easy", description: "Calculate the height of a binary tree." },
  { id: 3, question: "Balanced Tree Check", questionType: "Trees", difficulty: "Medium", description: "Check if a binary tree is height-balanced." },
  { id: 4, question: "Mirror Tree", questionType: "Trees", difficulty: "Medium", description: "Create a mirror image of a binary tree." },
  { id: 5, question: "Path Sum", questionType: "Trees", difficulty: "Medium", description: "Check if there's a root-to-leaf path that adds up to a given sum." },
  { id: 6, question: "Common Ancestor", questionType: "Trees", difficulty: "Medium", description: "Find the lowest common ancestor of two nodes." },
  { id: 7, question: "Serialize and Deserialize Tree", questionType: "Trees", difficulty: "Hard", description: "Convert a binary tree to a string and back." },
  { id: 8, question: "Tree Diameter", questionType: "Trees", difficulty: "Hard", description: "Find the longest path between any two nodes in a tree." }
];

export const heapAndPriorityQueue: Question[] = [
  { id: 1, question: "Basic Heap Insert", questionType: "Heap and Priority Queue", difficulty: "Easy", description: "Insert a value into a min-heap and maintain heap property." },
  { id: 2, question: "Top Element Extract", questionType: "Heap and Priority Queue", difficulty: "Easy", description: "Extract the top element from a heap and rebalance." },
  { id: 3, question: "Stream Median", questionType: "Heap and Priority Queue", difficulty: "Medium", description: "Find the median of a stream of numbers using heaps." },
  { id: 4, question: "Task Scheduler", questionType: "Heap and Priority Queue", difficulty: "Medium", description: "Schedule tasks based on priority and cooldown period." },
  { id: 5, question: "K Closest Points", questionType: "Heap and Priority Queue", difficulty: "Medium", description: "Find k closest points to the origin using a max heap." },
  { id: 6, question: "Event Processor", questionType: "Heap and Priority Queue", difficulty: "Medium", description: "Process events by their priority and timestamp order." },
  { id: 7, question: "Dynamic Range Median", questionType: "Heap and Priority Queue", difficulty: "Hard", description: "Maintain median with insert/delete operations in a dynamic set." },
  { id: 8, question: "Merging K Sorted Streams", questionType: "Heap and Priority Queue", difficulty: "Hard", description: "Merge k sorted input streams using a heap efficiently." }
];
