import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDifficultyColor (difficulty: string) {
  console.log(difficulty)
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
  id: number;
  question: string;
  questionType: string;
  difficulty: string;
  description: string;
  constraints: string;
  examples: string;
}

export const topicQuestions: Record<string, Record<string, Question>> = {
  "Arrays and Hashing": {
    "Pair Match Sum": {
      id: 1,
      question: "Pair Match Sum",
      questionType: "Arrays and Hashing",
      difficulty: "Easy",
      description: "Find a pair of numbers in the array that add up to a given target.",
      constraints: "- Elements may be negative\n- 1 <= n <= 10^4",
      examples: "Test Case 1:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\n\nTest Case 2:\nInput: nums = [3, 2, 4], target = 6\nOutput: [1, 2]"
    },
    "Check Unique Characters": {
      id: 2,
      question: "Check Unique Characters",
      questionType: "Arrays and Hashing",
      difficulty: "Easy",
      description: "Determine if a string contains all unique characters using hashing.",
      constraints: "- Strings contain only lowercase English letters\n- Elements may be negative",
      examples: "Test Case 1:\nInput: s = 'abcdef'\nOutput: true\n\nTest Case 2:\nInput: s = 'hello'\nOutput: false"
    },
    "Bucket Count": {
      id: 3,
      question: "Bucket Count",
      questionType: "Arrays and Hashing",
      difficulty: "Medium",
      description: "Distribute items into buckets and count how many buckets exceed a threshold.",
      constraints: "- All input integers are in the range [-10^5, 10^5]\n- Elements may be negative",
      examples: "Test Case 1:\nInput: items = [1, 2, 3, 4, 5], bucketSize = 3, threshold = 5\nOutput: 2\n\nTest Case 2:\nInput: items = [10, 20, 30], bucketSize = 2, threshold = 25\nOutput: 1"
    },
    "Frequency Sort": {
      id: 4,
      question: "Frequency Sort",
      questionType: "Arrays and Hashing",
      difficulty: "Medium",
      description: "Sort an array based on the frequency of each element.",
      constraints: "- Elements may be negative\n- Input array is sorted",
      examples: "Test Case 1:\nInput: nums = [1, 1, 2, 2, 2, 3]\nOutput: [2, 2, 2, 1, 1, 3]\n\nTest Case 2:\nInput: nums = [2, 3, 1, 3, 2]\nOutput: [2, 2, 3, 3, 1]"
    },
    "Symmetric Hash Table": {
      id: 5,
      question: "Symmetric Hash Table",
      questionType: "Arrays and Hashing",
      difficulty: "Hard",
      description: "Check if the hash map representation of a list is symmetric.",
      constraints: "- Strings contain only lowercase English letters\n- All input integers are in the range [-10^5, 10^5]",
      examples: "Test Case 1:\nInput: pairs = [[1, 2], [2, 1], [3, 4], [4, 3]]\nOutput: true\n\nTest Case 2:\nInput: pairs = [[1, 2], [3, 4], [2, 1]]\nOutput: false"
    },
    "Chain Map Sequence": {
      id: 6,
      question: "Chain Map Sequence",
      questionType: "Arrays and Hashing",
      difficulty: "Hard",
      description: "Given a mapping of keys to values, determine if there's a cycle in the map chain.",
      constraints: "- Elements may be negative\n- 1 <= n <= 10^4",
      examples: "Test Case 1:\nInput: mapping = {'a': 'b', 'b': 'c', 'c': 'a'}\nOutput: true\n\nTest Case 2:\nInput: mapping = {'a': 'b', 'b': 'c', 'c': 'd'}\nOutput: false"
    },
    "Rare Element Finder": {
      id: 7,
      question: "Rare Element Finder",
      questionType: "Arrays and Hashing",
      difficulty: "Hard",
      description: "Find elements that appear only once in an array of large size efficiently.",
      constraints: "- Input array is sorted\n- Strings contain only lowercase English letters",
      examples: "Test Case 1:\nInput: nums = [1, 2, 2, 3, 3, 4, 5, 5]\nOutput: [1, 4]\n\nTest Case 2:\nInput: nums = [7, 8, 8, 9, 9, 10]\nOutput: [7, 10]"
    },
    "Max Coverage Intervals": {
      id: 8,
      question: "Max Coverage Intervals",
      questionType: "Arrays and Hashing",
      difficulty: "Hard",
      description: "Determine the maximum number of overlapping intervals using hash buckets.",
      constraints: "- Elements may be negative\n- 1 <= n <= 10^4",
      examples: "Test Case 1:\nInput: intervals = [[1, 3], [2, 4], [3, 5], [4, 6]]\nOutput: 3\n\nTest Case 2:\nInput: intervals = [[1, 2], [3, 4], [5, 6]]\nOutput: 1"
    }
  },

  "Two Pointers": {
    "Opposite Ends Match": {
      id: 1,
      question: "Opposite Ends Match",
      questionType: "Two Pointers",
      difficulty: "Easy",
      description: "Check if characters at opposing ends of a string match based on a condition.",
      constraints: `- Input array is sorted
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: s = "racecar"
Output: true

Test Case 2:
Input: s = "hello"
Output: false`
    },
    "Sorted Merge Points": {
      id: 2,
      question: "Sorted Merge Points",
      questionType: "Two Pointers",
      difficulty: "Easy",
      description: "Merge two sorted arrays into a new sorted array using two pointers.",
      constraints: `- 1 <= n <= 10^4
- Elements may be negative`,
      examples: `Test Case 1:
Input: arr1 = [1, 3, 5], arr2 = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]

Test Case 2:
Input: arr1 = [1, 2, 3], arr2 = [4, 5, 6]
Output: [1, 2, 3, 4, 5, 6]`
    },
    "Middle Anchor": {
      id: 3,
      question: "Middle Anchor",
      questionType: "Two Pointers",
      difficulty: "Medium",
      description: "Anchor one pointer at the center and expand to compare values symmetrically.",
      constraints: `- Strings contain only lowercase English letters
- Elements may be negative`,
      examples: `Test Case 1:
Input: s = "abcba"
Output: true

Test Case 2:
Input: s = "abcd"
Output: false`
    },
    "Skip Duplicates": {
      id: 4,
      question: "Skip Duplicates",
      questionType: "Two Pointers",
      difficulty: "Medium",
      description: "Remove duplicates from a sorted list using two pointers.",
      constraints: `- 1 <= n <= 10^4
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: nums = [1, 1, 2, 2, 3, 4, 4, 5]
Output: [1, 2, 3, 4, 5]

Test Case 2:
Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: [0, 1, 2, 3, 4]`
    },
    "Balanced Tails": {
      id: 5,
      question: "Balanced Tails",
      questionType: "Two Pointers",
      difficulty: "Hard",
      description: "Check if sum of head and tail sections of array are equal.",
      constraints: `- All input integers are in the range [-10^5, 10^5]
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: nums = [1, 2, 3, 4, 5, 5]
Output: true

Test Case 2:
Input: nums = [1, 2, 3, 4, 5, 6]
Output: false`
    },
    "Direction Match": {
      id: 6,
      question: "Direction Match",
      questionType: "Two Pointers",
      difficulty: "Hard",
      description: "Determine if two strings can be made equal by reversing substrings.",
      constraints: `- Strings contain only lowercase English letters
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: s1 = "abcdef", s2 = "fedcba"
Output: true

Test Case 2:
Input: s1 = "abc", s2 = "def"
Output: false`
    },
    "Converging Sum Check": {
      id: 7,
      question: "Converging Sum Check",
      questionType: "Two Pointers",
      difficulty: "Hard",
      description: "Use two pointers to find matching subarrays from start and end of array.",
      constraints: `- Elements may be negative
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: nums = [1, 2, 3, 4, 3, 2, 1]
Output: true

Test Case 2:
Input: nums = [1, 2, 3, 4, 5, 6]
Output: false`
    },
    "Sliding Equal Sections": {
      id: 8,
      question: "Sliding Equal Sections",
      questionType: "Two Pointers",
      difficulty: "Hard",
      description: "Check if there are two equal-sized contiguous subarrays in an array.",
      constraints: `- Strings contain only lowercase English letters
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: nums = [1, 2, 3, 1, 2, 3]
Output: true

Test Case 2:
Input: nums = [1, 2, 3, 4, 5, 6]
Output: false`
    }
  },

  "Sliding Window": {
    "Max Sum Subarray": {
      id: 1,
      question: "Max Sum Subarray",
      questionType: "Sliding Window",
      difficulty: "Easy",
      description: "Find the maximum sum of any contiguous subarray of size k.",
      constraints: `- Strings contain only lowercase English letters
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: nums = [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4
Output: 39

Test Case 2:
Input: nums = [2, 1, 5, 1, 3, 2], k = 3
Output: 9`
    },
    "Fixed Window Average": {
      id: 2,
      question: "Fixed Window Average",
      questionType: "Sliding Window",
      difficulty: "Easy",
      description: "Compute average of all subarrays of fixed size.",
      constraints: `- All input integers are in the range [-10^5, 10^5]
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: nums = [1, 3, 2, 6, -1, 4, 1, 8, 2], k = 5
Output: [2.2, 2.8, 2.4, 3.6, 2.8]

Test Case 2:
Input: nums = [1, 2, 3, 4, 5], k = 3
Output: [2.0, 3.0, 4.0]`
    },
    "Variable Size Window": {
      id: 3,
      question: "Variable Size Window",
      questionType: "Sliding Window",
      difficulty: "Medium",
      description: "Find longest subarray with sum less than or equal to target.",
      constraints: `- Input array is sorted
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: nums = [1, 2, 3, 4, 5], target = 8
Output: 3

Test Case 2:
Input: nums = [1, 1, 1, 1, 1], target = 3
Output: 3`
    },
    "Count Distinct in Window": {
      id: 4,
      question: "Count Distinct in Window",
      questionType: "Sliding Window",
      difficulty: "Medium",
      description: "Count distinct elements in every window of size k.",
      constraints: `- Input array is sorted
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: nums = [1, 2, 1, 3, 4, 2, 3], k = 4
Output: [3, 4, 4, 3]

Test Case 2:
Input: nums = [1, 1, 2, 2, 3, 3], k = 3
Output: [2, 2, 2, 2]`
    },
    "Longest Substring With Unique Chars": {
      id: 5,
      question: "Longest Substring With Unique Chars",
      questionType: "Sliding Window",
      difficulty: "Hard",
      description: "Find longest substring with all unique characters.",
      constraints: `- Strings contain only lowercase English letters
- Input array is sorted`,
      examples: `Test Case 1:
Input: s = "abcabcbb"
Output: 3

Test Case 2:
Input: s = "bbbbb"
Output: 1`
    },
    "Min Window of Target Sum": {
      id: 6,
      question: "Min Window of Target Sum",
      questionType: "Sliding Window",
      difficulty: "Hard",
      description: "Find smallest subarray with a sum greater than a given value.",
      constraints: `- 1 <= n <= 10^4
- Input array is sorted`,
      examples: `Test Case 1:
Input: nums = [2, 1, 2, 4, 3, 1], target = 7
Output: 2

Test Case 2:
Input: nums = [1, 4, 4], target = 4
Output: 1`
    },
    "Substring Anagram Check": {
      id: 7,
      question: "Substring Anagram Check",
      questionType: "Sliding Window",
      difficulty: "Hard",
      description: "Check how many substrings of a string are anagrams of another.",
      constraints: `- All input integers are in the range [-10^5, 10^5]
- Input array is sorted`,
      examples: `Test Case 1:
Input: s = "abab", p = "ab"
Output: 3

Test Case 2:
Input: s = "cbaebabacd", p = "abc"
Output: 2`
    },
    "Weighted Max Window": {
      id: 8,
      question: "Weighted Max Window",
      questionType: "Sliding Window",
      difficulty: "Hard",
      description: "Find the maximum weighted sum window for a given weight array.",
      constraints: `- Input array is sorted
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: nums = [1, 2, 3, 4], weights = [0.1, 0.2, 0.3, 0.4], k = 2
Output: 2.5

Test Case 2:
Input: nums = [5, 1, 3, 9], weights = [0.5, 0.1, 0.2, 0.2], k = 3
Output: 3.0`
    }
  },

  "Binary Search": {
    "Find Target in Sorted Array": {
      id: 1,
      question: "Find Target in Sorted Array",
      questionType: "Binary Search",
      difficulty: "Easy",
      description: "Search for a target number in a sorted array.",
      constraints: `- Input array is sorted
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4

Test Case 2:
Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1`
    },
    "Check Element Exists": {
      id: 2,
      question: "Check Element Exists",
      questionType: "Binary Search",
      difficulty: "Easy",
      description: "Determine whether an element exists in a binary search manner.",
      constraints: `- Elements may be negative
- Input array is sorted`,
      examples: `Test Case 1:
Input: nums = [1, 3, 5, 7, 9, 11], target = 5
Output: true

Test Case 2:
Input: nums = [1, 3, 5, 7, 9, 11], target = 4
Output: false`
    },
    "First True Condition": {
      id: 3,
      question: "First True Condition",
      questionType: "Binary Search",
      difficulty: "Medium",
      description: "Find the first index where a condition becomes true.",
      constraints: `- Elements may be negative
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: arr = [false, false, true, true, true]
Output: 2

Test Case 2:
Input: arr = [false, false, false, false, true]
Output: 4`
    },
    "Binary Search on Function": {
      id: 4,
      question: "Binary Search on Function",
      questionType: "Binary Search",
      difficulty: "Medium",
      description: "Apply binary search to a monotonic function to find root or threshold.",
      constraints: `- Elements may be negative
- Input array is sorted`,
      examples: `Test Case 1:
Input: function f(x) = x^2 - 4, range = [0, 10]
Output: 2

Test Case 2:
Input: function f(x) = x - 5, range = [0, 10]
Output: 5`
    },
    "Minimum in Rotated Array": {
      id: 5,
      question: "Minimum in Rotated Array",
      questionType: "Binary Search",
      difficulty: "Hard",
      description: "Find the minimum element in a rotated sorted array.",
      constraints: `- 1 <= n <= 10^4
- Input array is sorted`,
      examples: `Test Case 1:
Input: nums = [3, 4, 5, 1, 2]
Output: 1

Test Case 2:
Input: nums = [4, 5, 6, 7, 0, 1, 2]
Output: 0`
    },
    "Peak Element Finder": {
      id: 6,
      question: "Peak Element Finder",
      questionType: "Binary Search",
      difficulty: "Hard",
      description: "Find a peak element using binary search strategy.",
      constraints: `- Input array is sorted
- Elements may be negative`,
      examples: `Test Case 1:
Input: nums = [1, 2, 3, 1]
Output: 2

Test Case 2:
Input: nums = [1, 2, 1, 3, 5, 6, 4]
Output: 5`
    },
    "Search in Infinite Array": {
      id: 7,
      question: "Search in Infinite Array",
      questionType: "Binary Search",
      difficulty: "Hard",
      description: "Search for a value in a conceptual infinite sorted array.",
      constraints: `- Strings contain only lowercase English letters
- Input array is sorted`,
      examples: `Test Case 1:
Input: arr = [1, 2, 3, 4, 5, 6, 7, ...], target = 5
Output: 4

Test Case 2:
Input: arr = [1, 3, 5, 7, 9, 11, 13, ...], target = 9
Output: 4`
    },
    "Optimal Threshold Finder": {
      id: 8,
      question: "Optimal Threshold Finder",
      questionType: "Binary Search",
      difficulty: "Hard",
      description: "Binary search to find a threshold value satisfying multiple constraints.",
      constraints: `- 1 <= n <= 10^4
- Elements may be negative`,
      examples: `Test Case 1:
Input: constraints = [x >= 5, x <= 10, x % 2 == 0]
Output: 6

Test Case 2:
Input: constraints = [x >= 1, x <= 100, x^2 <= 50]
Output: 7`
    }
  },

  "Linked List": {
    "Insert at Head": {
      id: 1,
      question: "Insert at Head",
      questionType: "Linked List",
      difficulty: "Easy",
      description: "Insert a new node at the beginning of a singly linked list.",
      constraints: `- All input integers are in the range [-10^5, 10^5]
- Elements may be negative`,
      examples: `Test Case 1:
Input: head = [1, 2, 3], newVal = 0
Output: [0, 1, 2, 3]

Test Case 2:
Input: head = [], newVal = 5
Output: [5]`
    },
    "Find Tail Node": {
      id: 2,
      question: "Find Tail Node",
      questionType: "Linked List",
      difficulty: "Easy",
      description: "Find the last node of a linked list.",
      constraints: `- Elements may be negative
- Input array is sorted`,
      examples: `Test Case 1:
Input: head = [1, 2, 3, 4, 5]
Output: 5

Test Case 2:
Input: head = [10]
Output: 10`
    },
    "Reverse Subsection": {
      id: 3,
      question: "Reverse Subsection",
      questionType: "Linked List",
      difficulty: "Medium",
      description: "Reverse a subsection of a singly linked list.",
      constraints: `- Input array is sorted
- Elements may be negative`,
      examples: `Test Case 1:
Input: head = [1, 2, 3, 4, 5], left = 2, right = 4
Output: [1, 4, 3, 2, 5]

Test Case 2:
Input: head = [5], left = 1, right = 1
Output: [5]`
    },
    "Merge Two Lists": {
      id: 4,
      question: "Merge Two Lists",
      questionType: "Linked List",
      difficulty: "Medium",
      description: "Merge two sorted linked lists into a single list.",
      constraints: `- Strings contain only lowercase English letters
- Input array is sorted`,
      examples: `Test Case 1:
Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
Output: [1, 1, 2, 3, 4, 4]

Test Case 2:
Input: list1 = [], list2 = [0]
Output: [0]`
    },
    "Cycle Detection": {
      id: 5,
      question: "Cycle Detection",
      questionType: "Linked List",
      difficulty: "Hard",
      description: "Detect if a cycle exists in a linked list.",
      constraints: `- Strings contain only lowercase English letters
- Input array is sorted`,
      examples: `Test Case 1:
Input: head = [3, 2, 0, -4], pos = 1
Output: true

Test Case 2:
Input: head = [1, 2], pos = 0
Output: true`
    },
    "Reorder List": {
      id: 6,
      question: "Reorder List",
      questionType: "Linked List",
      difficulty: "Hard",
      description: "Reorder linked list in a specific pattern.",
      constraints: `- Strings contain only lowercase English letters
- Input array is sorted`,
      examples: `Test Case 1:
Input: head = [1, 2, 3, 4]
Output: [1, 4, 2, 3]

Test Case 2:
Input: head = [1, 2, 3, 4, 5]
Output: [1, 5, 2, 4, 3]`
    },
    "Skip List Search": {
      id: 7,
      question: "Skip List Search",
      questionType: "Linked List",
      difficulty: "Hard",
      description: "Efficiently search in a skip list using linked list structure.",
      constraints: `- Elements may be negative
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: skipList = [[1, 3, 5], [1, 5], [1]], target = 3
Output: true

Test Case 2:
Input: skipList = [[1, 3, 5], [1, 5], [1]], target = 4
Output: false`
    },
    "Deep Clone List": {
      id: 8,
      question: "Deep Clone List",
      questionType: "Linked List",
      difficulty: "Hard",
      description: "Create a deep copy of a linked list with random pointers.",
      constraints: `- 1 <= n <= 10^4
- Elements may be negative`,
      examples: `Test Case 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Test Case 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]`
    }
  },

  "Trees": {
    "Find Leaf Nodes": {
      id: 1,
      question: "Find Leaf Nodes",
      questionType: "Trees",
      difficulty: "Easy",
      description: "Identify all the leaf nodes in a binary tree.",
      constraints: `- Strings contain only lowercase English letters
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: root = [1, 2, 3, 4, 5, null, 6]
Output: [4, 5, 6]

Test Case 2:
Input: root = [1, 2, 3]
Output: [2, 3]`
    },
    "Tree Height Calculator": {
      id: 2,
      question: "Tree Height Calculator",
      questionType: "Trees",
      difficulty: "Easy",
      description: "Calculate the height of a binary tree.",
      constraints: `- Elements may be negative
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: root = [3, 9, 20, null, null, 15, 7]
Output: 3

Test Case 2:
Input: root = [1, null, 2]
Output: 2`
    },
    "Balanced Tree Check": {
      id: 3,
      question: "Balanced Tree Check",
      questionType: "Trees",
      difficulty: "Medium",
      description: "Check if a binary tree is height-balanced.",
      constraints: `- All input integers are in the range [-10^5, 10^5]
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: root = [3, 9, 20, null, null, 15, 7]
Output: true

Test Case 2:
Input: root = [1, 2, 2, 3, 3, null, null, 4, 4]
Output: false`
    },
    "Mirror Tree": {
      id: 4,
      question: "Mirror Tree",
      questionType: "Trees",
      difficulty: "Medium",
      description: "Create a mirror image of a binary tree.",
      constraints: `- Strings contain only lowercase English letters
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: root = [4, 2, 7, 1, 3, 6, 9]
Output: [4, 7, 2, 9, 6, 3, 1]

Test Case 2:
Input: root = [2, 1, 3]
Output: [2, 3, 1]`
    },
    "Path Sum": {
      id: 5,
      question: "Path Sum",
      questionType: "Trees",
      difficulty: "Hard",
      description: "Check if there's a root-to-leaf path that adds up to a given sum.",
      constraints: `- All input integers are in the range [-10^5, 10^5]
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22
Output: true

Test Case 2:
Input: root = [1, 2, 3], targetSum = 5
Output: false`
    },
    "Common Ancestor": {
      id: 6,
      question: "Common Ancestor",
      questionType: "Trees",
      difficulty: "Hard",
      description: "Find the lowest common ancestor of two nodes.",
      constraints: `- 1 <= n <= 10^4
- Input array is sorted`,
      examples: `Test Case 1:
Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
Output: 3

Test Case 2:
Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4
Output: 5`
    },
    "Serialize and Deserialize Tree": {
      id: 7,
      question: "Serialize and Deserialize Tree",
      questionType: "Trees",
      difficulty: "Hard",
      description: "Convert a binary tree to a string and back.",
      constraints: `- 1 <= n <= 10^4
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: root = [1, 2, 3, null, null, 4, 5]
Output: "1,2,3,null,null,4,5"

Test Case 2:
Input: root = []
Output: ""`
    },
    "Tree Diameter": {
      id: 8,
      question: "Tree Diameter",
      questionType: "Trees",
      difficulty: "Hard",
      description: "Find the longest path between any two nodes in a tree.",
      constraints: `- Elements may be negative
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: root = [1, 2, 3, 4, 5]
Output: 3

Test Case 2:
Input: root = [1, 2]
Output: 1`
    }
  },

  "Heap and Priority Queue": {
    "Basic Heap Insert": {
      id: 1,
      question: "Basic Heap Insert",
      questionType: "Heap and Priority Queue",
      difficulty: "Easy",
      description: "Insert a value into a min-heap and maintain heap property.",
      constraints: `- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: heap = [1, 3, 6, 5, 2, 8], newVal = 2
Output: [1, 2, 6, 5, 3, 8, 2]

Test Case 2:
Input: heap = [2, 7, 26, 25, 19, 17, 1], newVal = 10
Output: [1, 7, 2, 25, 19, 17, 26, 10]`
    },
    "Top Element Extract": {
      id: 2,
      question: "Top Element Extract",
      questionType: "Heap and Priority Queue",
      difficulty: "Easy",
      description: "Extract the top element from a heap and rebalance.",
      constraints: `- Elements may be negative
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: heap = [1, 2, 3, 17, 19, 36, 7, 25, 100]
Output: extracted = 1, heap = [2, 17, 3, 25, 19, 36, 7, 100]

Test Case 2:
Input: heap = [5, 10, 15, 20, 25]
Output: extracted = 5, heap = [10, 20, 15, 25]`
    },
    "Stream Median": {
      id: 3,
      question: "Stream Median",
      questionType: "Heap and Priority Queue",
      difficulty: "Medium",
      description: "Find the median of a stream of numbers using heaps.",
      constraints: `- Elements may be negative
- 1 <= n <= 10^4`,
      examples: `Test Case 1:
Input: stream = [5, 15, 1, 3]
Output: [5.0, 10.0, 5.0, 4.0]

Test Case 2:
Input: stream = [1, 2, 3, 4, 5]
Output: [1.0, 1.5, 2.0, 2.5, 3.0]`
    },
    "Task Scheduler": {
      id: 4,
      question: "Task Scheduler",
      questionType: "Heap and Priority Queue",
      difficulty: "Medium",
      description: "Schedule tasks based on priority and cooldown period.",
      constraints: `- Strings contain only lowercase English letters
- Input array is sorted`,
      examples: `Test Case 1:
Input: tasks = ['A','A','A','B','B','B'], n = 2
Output: 8

Test Case 2:
Input: tasks = ['A','A','A','A','A','A','B','C','D','E','F','G'], n = 2
Output: 16`
    },
    "K Closest Points": {
      id: 5,
      question: "K Closest Points",
      questionType: "Heap and Priority Queue",
      difficulty: "Hard",
      description: "Find k closest points to the origin using a max heap.",
      constraints: `- All input integers are in the range [-10^5, 10^5]
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: points = [[1,1],[2,2],[3,3]], k = 2
Output: [[1,1],[2,2]]

Test Case 2:
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]`
    },
    "Event Processor": {
      id: 6,
      question: "Event Processor",
      questionType: "Heap and Priority Queue",
      difficulty: "Hard",
      description: "Process events by their priority and timestamp order.",
      constraints: `- Input array is sorted
- All input integers are in the range [-10^5, 10^5]`,
      examples: `Test Case 1:
Input: events = [[1, 'high'], [2, 'low'], [1, 'medium']]
Output: ['high', 'medium', 'low']

Test Case 2:
Input: events = [[5, 'A'], [1, 'B'], [3, 'C']]
Output: ['B', 'C', 'A']`
    },
    "Dynamic Range Median": {
      id: 7,
      question: "Dynamic Range Median",
      questionType: "Heap and Priority Queue",
      difficulty: "Hard",
      description: "Maintain median with insert/delete operations in a dynamic set.",
      constraints: `- Strings contain only lowercase English letters
- Input array is sorted`,
      examples: `Test Case 1:
Input: operations = [insert(1), insert(2), getMedian(), insert(3), getMedian()]
Output: [1.5, 2.0]

Test Case 2:
Input: operations = [insert(6), insert(10), insert(2), insert(6), insert(5), getMedian()]
Output: [6.0]`
    },
    "Merging K Sorted Streams": {
      id: 8,
      question: "Merging K Sorted Streams",
      questionType: "Heap and Priority Queue",
      difficulty: "Hard",
      description: "Merge k sorted input streams using a heap efficiently.",
      constraints: `- 1 <= n <= 10^4
- Strings contain only lowercase English letters`,
      examples: `Test Case 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]

Test Case 2:
Input: lists = []
Output: []`
    }
  }
}
