import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// this function takes the name of the question you are solving and "initalizes" the IDE to have some code written already
export function boilerplateCode(questionName: string) {
    const func_name = questionName[0].toLowerCase().replace(/ /g, "_");
    return (`def ${func_name}():\n\treturn 1+1\n\nprint(${func_name}())`);
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

interface ApiInterview {
  userId: string;
  question: string;
  code: string;
  communication: string;
  result: string;
}

interface ApiModal {
  code: string;
  interviewData: Question;
}

type ApiData = ApiInterview | ApiModal;

export interface Topic {
  title_name: string;
  description: string;
  completed: string;
}

export interface Question {
  id: number;
  questionType: string;
  difficulty: string;
  description: string;
  constraints: string;
  test_cases: TestCase[];
}

export interface TestCase {
  input: string;
  output: string;
}

export interface Question {
  id: number;
  questionType: string;
  difficulty: string;
  description: string;
  constraints: string;
  test_cases: TestCase[];
}

export interface TestCase {
  input: string;
  output: string;
}

export async function sendApiRequest(apiUrl: string, apiMethod: string, apiParams?: ApiData) {
  try {
    const fetchOptions: RequestInit = {
      method: apiMethod,
      headers: {
        "Content-Type": "application/json"
      }
    }

    if (apiMethod == "POST" || apiMethod == "PUT") { 
      fetchOptions.body = JSON.stringify(apiParams);
    }

    const data = await fetch(apiUrl, fetchOptions);

    const response = await data.json();
    return response;
  } catch {
    console.error("Error in sendApiRequest");
  }
}

export const arraysAndHashing: Record<string, Question> = {
  "Find Pair Sum": {
    id: 1,
    questionType: "Arrays and Hashing",
    difficulty: "Easy",
    description: "Given an array of integers and a target sum, find if there exists a pair of numbers in the array that adds up to the target. Return true if such a pair exists, false otherwise.",
    constraints: "1 <= array.length <= 1000, -1000 <= array[i] <= 1000, -2000 <= target <= 2000",
    test_cases: [
      {
        input: "array = [3, 5, 2, 8, 1], target = 10",
        output: "True"
      },
      {
        input: "array = [1, 2, 3, 4], target = 10",
        output: "False"
      },
      {
        input: "array = [5, 5], target = 10",
        output: "True"
      }
    ]
  },
  "Find Duplicates": {
    id: 2,
    questionType: "Arrays and Hashing",
    difficulty: "Easy",
    description: "Given an array of integers, find all numbers that appear more than once. Return an array of the duplicate numbers in any order.",
    constraints: "1 <= array.length <= 5000, 1 <= array[i] <= 1000",
    test_cases: [
      {
        input: "array = [4, 3, 2, 7, 8, 2, 3, 1]",
        output: "[2, 3]"
      },
      {
        input: "array = [1, 1, 2]",
        output: "[1]"
      },
      {
        input: "array = [1, 2, 3, 4, 5]",
        output: "[]"
      }
    ]
  },
  "Character Frequency": {
    id: 3,
    questionType: "Arrays and Hashing",
    difficulty: "Easy",
    description: "Given a string, return a hash map where keys are characters and values are their frequencies in the string. Only include alphabetic characters and ignore case.",
    constraints: "1 <= string.length <= 1000, string contains only alphabetic characters and spaces",
    test_cases: [
      {
        input: "string = \"Hello World\"",
        output: "{\"h\": 1, \"e\": 1, \"l\": 3, \"o\": 2, \"w\": 1, \"r\": 1, \"d\": 1}"
      },
      {
        input: "string = \"Programming\"",
        output: "{\"p\": 1, \"r\": 2, \"o\": 1, \"g\": 2, \"a\": 1, \"m\": 2, \"i\": 1, \"n\": 2}"
      },
      {
        input: "string = \"aaa\"",
        output: "{\"a\": 3}"
      }
    ]
  },
  "Array Intersection": {
    id: 4,
    questionType: "Arrays and Hashing",
    difficulty: "Medium",
    description: "Given two arrays, find their intersection (elements that appear in both arrays). Each element in the result should appear as many times as it shows up in both arrays. Return the result in any order.",
    constraints: "0 <= array1.length, array2.length <= 1000, 0 <= array1[i], array2[i] <= 1000",
    test_cases: [
      {
        input: "array1 = [1, 2, 2, 1], array2 = [2, 2]",
        output: "[2, 2]"
      },
      {
        input: "array1 = [4, 9, 5], array2 = [9, 4, 9, 8, 4]",
        output: "[4, 9]"
      },
      {
        input: "array1 = [1, 2, 3], array2 = [4, 5, 6]",
        output: "[]"
      }
    ]
  },
  "Subarray Sum": {
    id: 5,
    questionType: "Arrays and Hashing",
    difficulty: "Medium",
    description: "Given an array of integers and a target sum, find the number of continuous subarrays whose sum equals the target.",
    constraints: "1 <= array.length <= 2000, -1000 <= array[i] <= 1000, -10^7 <= target <= 10^7",
    test_cases: [
      {
        input: "array = [1, 1, 1], target = 2",
        output: "2"
      },
      {
        input: "array = [1, 2, 3], target = 3",
        output: "2"
      },
      {
        input: "array = [1, -1, 0], target = 0",
        output: "3"
      }
    ]
  },
  "Longest Substring": {
    id: 6,
    questionType: "Arrays and Hashing",
    difficulty: "Medium",
    description: "Given a string, find the length of the longest substring without repeating characters using a sliding window and hash set approach.",
    constraints: "0 <= string.length <= 5000, string consists of English letters, digits, symbols and spaces",
    test_cases: [
      {
        input: "string = \"abcabcbb\"",
        output: "3"
      },
      {
        input: "string = \"bbbbb\"",
        output: "1"
      },
      {
        input: "string = \"pwwkew\"",
        output: "3"
      }
    ]
  },
  "Word Pattern": {
    id: 7,
    questionType: "Arrays and Hashing",
    difficulty: "Medium",
    description: "Given a pattern and a string of words, determine if the words follow the same pattern. Each letter in the pattern should map to exactly one unique word, and each word should map to exactly one unique letter.",
    constraints: "1 <= pattern.length <= 300, pattern contains only lowercase letters, 1 <= words.length <= 300, words contains only lowercase letters and spaces",
    test_cases: [
      {
        input: "pattern = \"abba\", words = \"dog cat cat dog\"",
        output: "true"
      },
      {
        input: "pattern = \"abba\", words = \"dog cat cat fish\"",
        output: "false"
      },
      {
        input: "pattern = \"aaaa\", words = \"dog dog dog dog\"",
        output: "true"
      }
    ]
  },
  "Max Subarray Length": {
    id: 8,
    questionType: "Arrays and Hashing",
    difficulty: "Hard",
    description: "Given an array of integers, find the length of the longest subarray where no element appears more than twice. Use a sliding window approach with frequency tracking.",
    constraints: "1 <= array.length <= 10^5, 1 <= array[i] <= 10^4",
    test_cases: [
      {
        input: "array = [1, 2, 3, 1, 2, 3, 1, 2]",
        output: "6"
      },
      {
        input: "array = [1, 2, 1, 2, 1, 2, 1, 2]",
        output: "4"
      },
      {
        input: "array = [5, 5, 5, 5, 5]",
        output: "2"
      }
    ]
  },
  "Min Window Substring": {
    id: 9,
    questionType: "Arrays and Hashing",
    difficulty: "Hard",
    description: "Given two strings source and target, find the minimum window substring in source that contains all characters of target (including duplicates). If no such window exists, return an empty string.",
    constraints: "1 <= source.length, target.length <= 10^5, source and target consist of uppercase and lowercase English letters",
    test_cases: [
      {
        input: "source = \"ADOBECODEBANC\", target = \"ABC\"",
        output: "\"BANC\""
      },
      {
        input: "source = \"a\", target = \"a\"",
        output: "\"a\""
      },
      {
        input: "source = \"a\", target = \"aa\"",
        output: "\"\""
      }
    ]
  }
};

export const twoPointers: Record<string, Question> = {
  "Palindrome Check": {
    id: 10,
    questionType: "Two Pointers",
    difficulty: "Easy",
    description: "Given a string, determine if it reads the same forward and backward. Ignore spaces, punctuation, and case sensitivity.",
    constraints: "1 <= string.length <= 1000, string contains only alphanumeric characters and spaces",
    test_cases: [
      {
        input: "string = \"A man a plan a canal Panama\"",
        output: "True"
      },
      {
        input: "string = \"race a car\"",
        output: "False"
      },
      {
        input: "string = \"Madam\"",
        output: "True"
      }
    ]
  },
  "Remove Duplicates": {
    id: 11,
    questionType: "Two Pointers",
    difficulty: "Easy",
    description: "Given a sorted array, remove duplicates in-place and return the new length. The order of elements should be maintained.",
    constraints: "0 <= array.length <= 3000, -100 <= array[i] <= 100, array is sorted in non-decreasing order",
    test_cases: [
      {
        input: "array = [1, 1, 2]",
        output: "2"
      },
      {
        input: "array = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]",
        output: "5"
      },
      {
        input: "array = [1, 2, 3, 4, 5]",
        output: "5"
      }
    ]
  },
  "Three Sum Zero": {
    id: 12,
    questionType: "Two Pointers",
    difficulty: "Easy",
    description: "Given an array of integers, find if there exists a triplet that sums to zero. Return true if such a triplet exists, false otherwise.",
    constraints: "3 <= array.length <= 1000, -1000 <= array[i] <= 1000",
    test_cases: [
      {
        input: "array = [-1, 0, 1, 2, -1, -4]",
        output: "True"
      },
      {
        input: "array = [0, 1, 1]",
        output: "False"
      },
      {
        input: "array = [0, 0, 0]",
        output: "True"
      }
    ]
  },
  "Container Water": {
    id: 13,
    questionType: "Two Pointers",
    difficulty: "Medium",
    description: "Given an array of heights representing vertical lines, find two lines that together with the x-axis forms a container that holds the most water.",
    constraints: "2 <= heights.length <= 10^5, 0 <= heights[i] <= 10^4",
    test_cases: [
      {
        input: "heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        output: "49"
      },
      {
        input: "heights = [1, 1]",
        output: "1"
      },
      {
        input: "heights = [4, 3, 2, 1, 4]",
        output: "16"
      }
    ]
  },
  "Sort Colors": {
    id: 14,
    questionType: "Two Pointers",
    difficulty: "Medium",
    description: "Given an array containing only 0s, 1s, and 2s, sort the array in-place. Use a three-pointer approach to solve in one pass.",
    constraints: "1 <= array.length <= 300, array[i] is either 0, 1, or 2",
    test_cases: [
      {
        input: "array = [2, 0, 2, 1, 1, 0]",
        output: "[0, 0, 1, 1, 2, 2]"
      },
      {
        input: "array = [2, 0, 1]",
        output: "[0, 1, 2]"
      },
      {
        input: "array = [0]",
        output: "[0]"
      }
    ]
  },
  "Reverse Words": {
    id: 15,
    questionType: "Two Pointers",
    difficulty: "Medium",
    description: "Given a string containing words separated by spaces, reverse the order of characters in each word while preserving the word order and spacing.",
    constraints: "1 <= string.length <= 5000, string contains only printable ASCII characters",
    test_cases: [
      {
        input: "string = \"Let's take LeetCode contest\"",
        output: "\"s'teL ekat edoCteeL tsetnoc\""
      },
      {
        input: "string = \"God Ding\"",
        output: "\"doG gniD\""
      },
      {
        input: "string = \"a\"",
        output: "\"a\""
      }
    ]
  },
  "Four Sum Target": {
    id: 16,
    questionType: "Two Pointers",
    difficulty: "Hard",
    description: "Given an array of integers and a target sum, find all unique quadruplets that sum to the target. Return all unique combinations without duplicates.",
    constraints: "1 <= array.length <= 200, -10^9 <= array[i] <= 10^9, -10^9 <= target <= 10^9",
    test_cases: [
      {
        input: "array = [1, 0, -1, 0, -2, 2], target = 0",
        output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]"
      },
      {
        input: "array = [2, 2, 2, 2, 2], target = 8",
        output: "[[2, 2, 2, 2]]"
      },
      {
        input: "array = [1, 2, 3], target = 6",
        output: "[]"
      }
    ]
  },
  "Trapping Rain Water": {
    id: 17,
    questionType: "Two Pointers",
    difficulty: "Hard",
    description: "Given an array representing elevation heights, calculate how much rainwater can be trapped after it rains using two pointers approach.",
    constraints: "0 <= heights.length <= 2000, 0 <= heights[i] <= 3000",
    test_cases: [
      {
        input: "heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        output: "6"
      },
      {
        input: "heights = [4, 2, 0, 3, 2, 5]",
        output: "9"
      },
      {
        input: "heights = [1, 2, 3, 4, 5]",
        output: "0"
      }
    ]
  },
  "Substring Permutation": {
    id: 18,
    questionType: "Two Pointers",
    difficulty: "Hard",
    description: "Given two strings source and pattern, determine if source contains any permutation of pattern as a substring using two pointers technique.",
    constraints: "1 <= source.length, pattern.length <= 10^4, source and pattern consist of lowercase English letters",
    test_cases: [
      {
        input: "source = \"ab\", pattern = \"ab\"",
        output: "True"
      },
      {
        input: "source = \"eidboaoo\", pattern = \"ab\"",
        output: "False"
      },
      {
        input: "source = \"eidboaoo\", pattern = \"aoo\"",
        output: "True"
      }
    ]
  }
};

export const slidingWindow: Record<string, Question> = {
  "Maximum Sum Subarray": {
    id: 19,
    questionType: "Sliding Window",
    difficulty: "Easy",
    description: "Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.",
    constraints: "1 <= array.length <= 10^5, 1 <= k <= array.length, -1000 <= array[i] <= 1000",
    test_cases: [
      {
        input: "array = [2, 1, 5, 1, 3, 2], k = 3",
        output: "9"
      },
      {
        input: "array = [2, 3, 4, 1, 5], k = 2",
        output: "7"
      },
      {
        input: "array = [1, 2, 3, 4, 5], k = 1",
        output: "5"
      }
    ]
  },
  "Contains Duplicate II": {
    id: 20,
    questionType: "Sliding Window",
    difficulty: "Easy",
    description: "Given an array of integers and an integer k, return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i - j) <= k.",
    constraints: "1 <= array.length <= 10^5, -10^9 <= array[i] <= 10^9, 0 <= k <= 10^5",
    test_cases: [
      {
        input: "array = [1, 2, 3, 1], k = 3",
        output: "true"
      },
      {
        input: "array = [1, 0, 1, 1], k = 1",
        output: "true"
      },
      {
        input: "array = [1, 2, 3, 1, 2, 3], k = 2",
        output: "false"
      }
    ]
  },
  "Average of Subarrays": {
    id: 21,
    questionType: "Sliding Window",
    difficulty: "Easy",
    description: "Given an array of integers and a number k, find the average of all contiguous subarrays of size k.",
    constraints: "1 <= array.length <= 10^5, 1 <= k <= array.length, -10^4 <= array[i] <= 10^4",
    test_cases: [
      {
        input: "array = [1, 3, 2, 6, -1, 4, 1, 8, 2], k = 5",
        output: "[2.2, 2.8, 2.4, 3.6, 2.8]"
      },
      {
        input: "array = [1, 2, 3, 4], k = 2",
        output: "[1.5, 2.5, 3.5]"
      },
      {
        input: "array = [5], k = 1",
        output: "[5.0]"
      }
    ]
  },
  "Longest Substring K Distinct": {
    id: 22,
    questionType: "Sliding Window",
    difficulty: "Medium",
    description: "Given a string and a number k, find the length of the longest substring that contains at most k distinct characters.",
    constraints: "1 <= string.length <= 5000, 1 <= k <= 26, string consists of lowercase English letters",
    test_cases: [
      {
        input: "string = \"araaci\", k = 2",
        output: "4"
      },
      {
        input: "string = \"araaci\", k = 1",
        output: "2"
      },
      {
        input: "string = \"cbbebi\", k = 3",
        output: "5"
      }
    ]
  },
  "Minimum Window Substring": {
    id: 23,
    questionType: "Sliding Window",
    difficulty: "Medium",
    description: "Given two strings source and target, find the minimum window substring in source that contains all characters of target. Return the substring or empty string if no such window exists.",
    constraints: "1 <= source.length, target.length <= 10^5, source and target consist of uppercase and lowercase English letters",
    test_cases: [
      {
        input: "source = \"ADOBECODEBANC\", target = \"ABC\"",
        output: "\"BANC\""
      },
      {
        input: "source = \"a\", target = \"a\"",
        output: "\"a\""
      },
      {
        input: "source = \"a\", target = \"aa\"",
        output: "\"\""
      }
    ]
  },
  "Fruit Into Baskets": {
    id: 24,
    questionType: "Sliding Window",
    difficulty: "Medium",
    description: "Given an array representing fruit trees, where each element is a type of fruit, find the maximum number of fruits you can collect with at most 2 baskets (each basket can hold one type of fruit).",
    constraints: "1 <= fruits.length <= 10^5, 0 <= fruits[i] <= fruits.length",
    test_cases: [
      {
        input: "fruits = [1, 2, 1]",
        output: "3"
      },
      {
        input: "fruits = [0, 1, 2, 2]",
        output: "3"
      },
      {
        input: "fruits = [1, 2, 3, 2, 2]",
        output: "4"
      }
    ]
  },
  "Permutation in String": {
    id: 25,
    questionType: "Sliding Window",
    difficulty: "Medium",
    description: "Given two strings source and pattern, return true if source contains a permutation of pattern as a substring, using sliding window technique.",
    constraints: "1 <= source.length, pattern.length <= 10^4, source and pattern consist of lowercase English letters",
    test_cases: [
      {
        input: "source = \"ab\", pattern = \"ab\"",
        output: "true"
      },
      {
        input: "source = \"eidboaoo\", pattern = \"ab\"",
        output: "false"
      },
      {
        input: "source = \"eidboaoo\", pattern = \"aoo\"",
        output: "true"
      }
    ]
  },
  "Longest Repeating Character": {
    id: 26,
    questionType: "Sliding Window",
    difficulty: "Hard",
    description: "Given a string and an integer k, find the length of the longest substring that can be obtained by replacing at most k characters with any character.",
    constraints: "1 <= string.length <= 10^5, 0 <= k <= string.length, string consists of uppercase English letters",
    test_cases: [
      {
        input: "string = \"ABAB\", k = 2",
        output: "4"
      },
      {
        input: "string = \"AABABBA\", k = 1",
        output: "4"
      },
      {
        input: "string = \"ABCDE\", k = 1",
        output: "2"
      }
    ]
  },
  "Sliding Window Maximum": {
    id: 27,
    questionType: "Sliding Window",
    difficulty: "Hard",
    description: "Given an array of integers and a sliding window of size k, find the maximum value in each window as it slides from left to right.",
    constraints: "1 <= array.length <= 10^5, 1 <= k <= array.length, -10^4 <= array[i] <= 10^4",
    test_cases: [
      {
        input: "array = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        output: "[3, 3, 5, 5, 6, 7]"
      },
      {
        input: "array = [1], k = 1",
        output: "[1]"
      },
      {
        input: "array = [1, -1], k = 1",
        output: "[1, -1]"
      }
    ]
  },
  "Minimum Size Subarray Sum": {
    id: 28,
    questionType: "Sliding Window",
    difficulty: "Hard",
    description: "Given an array of positive integers and a target sum, find the minimal length of a contiguous subarray whose sum is greater than or equal to target. Return 0 if no such subarray exists.",
    constraints: "1 <= target <= 10^9, 1 <= array.length <= 10^5, 1 <= array[i] <= 10^4",
    test_cases: [
      {
        input: "target = 7, array = [2, 3, 1, 2, 4, 3]",
        output: "2"
      },
      {
        input: "target = 4, array = [1, 4, 4]",
        output: "1"
      },
      {
        input: "target = 11, array = [1, 1, 1, 1, 1, 1, 1, 1]",
        output: "0"
      }
    ]
  }
};

export const linkedList: Record<string, Question> = {
  "Reverse Linked List": {
    id: 29,
    questionType: "Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, reverse the list and return the new head.",
    constraints: "0 <= list.length <= 5000, -5000 <= Node.val <= 5000",
    test_cases: [
      {
        input: "head = [1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]"
      },
      {
        input: "head = [1, 2]",
        output: "[2, 1]"
      },
      {
        input: "head = []",
        output: "[]"
      }
    ]
  },
  "Merge Two Sorted Lists": {
    id: 30,
    questionType: "Linked List",
    difficulty: "Easy",
    description: "Given two sorted linked lists, merge them into one sorted linked list by splicing together the nodes.",
    constraints: "0 <= list1.length, list2.length <= 50, -100 <= Node.val <= 100, both lists are sorted in non-decreasing order",
    test_cases: [
      {
        input: "list1 = [1, 2, 4], list2 = [1, 3, 4]",
        output: "[1, 1, 2, 3, 4, 4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]"
      }
    ]
  },
  "Delete Node": {
    id: 31,
    questionType: "Linked List",
    difficulty: "Easy",
    description: "Given a node (not the tail) in a singly linked list, delete it. You only have access to the node to be deleted, not the head of the list.",
    constraints: "2 <= list.length <= 1000, -1000 <= Node.val <= 1000, the given node is not the tail",
    test_cases: [
      {
        input: "head = [4, 5, 1, 9], node = 5",
        output: "[4, 1, 9]"
      },
      {
        input: "head = [4, 5, 1, 9], node = 1",
        output: "[4, 5, 9]"
      },
      {
        input: "head = [1, 2, 3, 4], node = 3",
        output: "[1, 2, 4]"
      }
    ]
  },
  "Middle of Linked List": {
    id: 32,
    questionType: "Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.",
    constraints: "1 <= list.length <= 100, 1 <= Node.val <= 100",
    test_cases: [
      {
        input: "head = [1, 2, 3, 4, 5]",
        output: "[3, 4, 5]"
      },
      {
        input: "head = [1, 2, 3, 4, 5, 6]",
        output: "[4, 5, 6]"
      },
      {
        input: "head = [1]",
        output: "[1]"
      }
    ]
  },
  "Remove Duplicates": {
    id: 33,
    questionType: "Linked List",
    difficulty: "Medium",
    description: "Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.",
    constraints: "0 <= list.length <= 300, -100 <= Node.val <= 100, the list is sorted in ascending order",
    test_cases: [
      {
        input: "head = [1, 2, 3, 3, 4, 4, 5]",
        output: "[1, 2, 5]"
      },
      {
        input: "head = [1, 1, 1, 2, 3]",
        output: "[2, 3]"
      },
      {
        input: "head = [1, 2, 2]",
        output: "[1]"
      }
    ]
  },
  "Add Two Numbers": {
    id: 34,
    questionType: "Linked List",
    difficulty: "Medium",
    description: "Given two non-empty linked lists representing two non-negative integers stored in reverse order, add the two numbers and return the sum as a linked list.",
    constraints: "1 <= list.length <= 100, 0 <= Node.val <= 9, numbers do not contain leading zeros except the number 0 itself",
    test_cases: [
      {
        input: "l1 = [2, 4, 3], l2 = [5, 6, 4]",
        output: "[7, 0, 8]"
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]"
      },
      {
        input: "l1 = [9, 9, 9, 9, 9, 9, 9], l2 = [9, 9, 9, 9]",
        output: "[8, 9, 9, 9, 0, 0, 0, 1]"
      }
    ]
  },
  "Rotate Right": {
    id: 35,
    questionType: "Linked List",
    difficulty: "Medium",
    description: "Given the head of a linked list, rotate the list to the right by k places.",
    constraints: "0 <= list.length <= 500, -100 <= Node.val <= 100, 0 <= k <= 2*10^9",
    test_cases: [
      {
        input: "head = [1, 2, 3, 4, 5], k = 2",
        output: "[4, 5, 1, 2, 3]"
      },
      {
        input: "head = [0, 1, 2], k = 4",
        output: "[2, 0, 1]"
      },
      {
        input: "head = [1], k = 1",
        output: "[1]"
      }
    ]
  },
  "Reorder List": {
    id: 36,
    questionType: "Linked List",
    difficulty: "Medium",
    description: "Given a singly linked list L: L0→L1→…→Ln-1→Ln, reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…",
    constraints: "1 <= list.length <= 5*10^4, 1 <= Node.val <= 1000",
    test_cases: [
      {
        input: "head = [1, 2, 3, 4]",
        output: "[1, 4, 2, 3]"
      },
      {
        input: "head = [1, 2, 3, 4, 5]",
        output: "[1, 5, 2, 4, 3]"
      },
      {
        input: "head = [1, 2]",
        output: "[1, 2]"
      }
    ]
  },
  "Merge k Sorted Lists": {
    id: 37,
    questionType: "Linked List",
    difficulty: "Hard",
    description: "Given an array of k linked lists, each linked list is sorted in ascending order. Merge all the linked lists into one sorted linked list.",
    constraints: "k == lists.length, 0 <= k <= 10^4, 0 <= lists[i].length <= 500, -10^4 <= Node.val <= 10^4",
    test_cases: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]"
      },
      {
        input: "lists = []",
        output: "[]"
      },
      {
        input: "lists = [[]]",
        output: "[]"
      }
    ]
  },
  "Reverse Nodes in k-Group": {
    id: 38,
    questionType: "Linked List",
    difficulty: "Hard",
    description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. If the number of nodes is not a multiple of k, leave the remaining nodes as they are.",
    constraints: "1 <= list.length <= 5000, 0 <= Node.val <= 1000, 1 <= k <= list.length",
    test_cases: [
      {
        input: "head = [1,2,3,4,5], k = 2",
        output: "[2,1,4,3,5]"
      },
      {
        input: "head = [1,2,3,4,5], k = 3",
        output: "[3,2,1,4,5]"
      },
      {
        input: "head = [1,2,3,4,5], k = 1",
        output: "[1,2,3,4,5]"
      }
    ]
  },
  "Copy List with Random Pointer": {
    id: 39,
    questionType: "Linked List",
    difficulty: "Hard",
    description: "Given a linked list where each node contains an additional random pointer that could point to any node in the list or null, return a deep copy of the list.",
    constraints: "0 <= list.length <= 1000, -10^4 <= Node.val <= 10^4, random pointer points to a node in the list or null",
    test_cases: [
      {
        input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
        output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]"
      },
      {
        input: "head = [[1,1],[2,1]]",
        output: "[[1,1],[2,1]]"
      },
      {
        input: "head = [[3,null],[3,0],[3,null]]",
        output: "[[3,null],[3,0],[3,null]]"
      }
    ]
  },
  "LRU Cache": {
    id: 40,
    questionType: "Linked List",
    difficulty: "Hard",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache using a doubly linked list and hash map.",
    constraints: "1 <= capacity <= 3000, 0 <= key <= 10^4, 0 <= value <= 10^5, at most 2*10^5 calls to get and put",
    test_cases: [
      {
        input: "LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); put(4,4); get(1); get(3); get(4)",
        output: "[null,null,null,1,null,-1,null,-1,3,4]"
      },
      {
        input: "LRUCache(1); put(1,1); put(2,2); get(1); get(2)",
        output: "[null,null,null,-1,2]"
      },
      {
        input: "LRUCache(2); get(1); put(1,1); get(1)",
        output: "[null,-1,null,1]"
      }
    ]
  }
};

export const binarySearch: Record<string, Question> = {
  "Binary Search": {
    id: 41,
    questionType: "Binary Search",
    difficulty: "Easy",
    description: "Given a sorted array of integers and a target value, return the index of the target if it exists, otherwise return -1.",
    constraints: "1 <= array.length <= 10^4, -10^4 <= array[i], target <= 10^4, all elements in array are unique and sorted in ascending order",
    test_cases: [
      {
        input: "array = [-1, 0, 3, 5, 9, 12], target = 9",
        output: "4"
      },
      {
        input: "array = [-1, 0, 3, 5, 9, 12], target = 2",
        output: "-1"
      },
      {
        input: "array = [5], target = 5",
        output: "0"
      }
    ]
  },
  "First Bad Version": {
    id: 42,
    questionType: "Binary Search",
    difficulty: "Easy",
    description: "Given n versions [1, 2, ..., n] and a function isBadVersion(version) that returns true if version is bad, find the first bad version using binary search.",
    constraints: "1 <= bad <= n <= 2^31 - 1",
    test_cases: [
      {
        input: "n = 5, bad = 4",
        output: "4"
      },
      {
        input: "n = 1, bad = 1",
        output: "1"
      },
      {
        input: "n = 10, bad = 3",
        output: "3"
      }
    ]
  },
  "Search Insert Position": {
    id: 43,
    questionType: "Binary Search",
    difficulty: "Easy",
    description: "Given a sorted array and a target value, return the index where the target should be inserted to maintain sorted order.",
    constraints: "1 <= array.length <= 10^4, -10^4 <= array[i] <= 10^4, array is sorted in ascending order, -10^4 <= target <= 10^4",
    test_cases: [
      {
        input: "array = [1, 3, 5, 6], target = 5",
        output: "2"
      },
      {
        input: "array = [1, 3, 5, 6], target = 2",
        output: "1"
      },
      {
        input: "array = [1, 3, 5, 6], target = 7",
        output: "4"
      }
    ]
  },
  "Square Root": {
    id: 44,
    questionType: "Binary Search",
    difficulty: "Easy",
    description: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer using binary search.",
    constraints: "0 <= x <= 2^31 - 1",
    test_cases: [
      {
        input: "x = 4",
        output: "2"
      },
      {
        input: "x = 8",
        output: "2"
      },
      {
        input: "x = 16",
        output: "4"
      }
    ]
  },
  "Find Peak Element": {
    id: 45,
    questionType: "Binary Search",
    difficulty: "Medium",
    description: "Given an array where adjacent elements are not equal, find any peak element (an element that is greater than its neighbors). Use binary search in O(log n) time.",
    constraints: "1 <= array.length <= 1000, -2^31 <= array[i] <= 2^31 - 1, array[i] != array[i+1] for all valid i",
    test_cases: [
      {
        input: "array = [1, 2, 3, 1]",
        output: "2"
      },
      {
        input: "array = [1, 2, 1, 3, 5, 6, 4]",
        output: "1 or 5"
      },
      {
        input: "array = [1]",
        output: "0"
      }
    ]
  },
  "Search in Rotated Array": {
    id: 46,
    questionType: "Binary Search",
    difficulty: "Medium",
    description: "Given a sorted array that has been rotated at some pivot, search for a target value. All values are unique. Return the index or -1 if not found.",
    constraints: "1 <= array.length <= 5000, -10^4 <= array[i] <= 10^4, all values are unique, array is rotated at some pivot",
    test_cases: [
      {
        input: "array = [4, 5, 6, 7, 0, 1, 2], target = 0",
        output: "4"
      },
      {
        input: "array = [4, 5, 6, 7, 0, 1, 2], target = 3",
        output: "-1"
      },
      {
        input: "array = [1], target = 0",
        output: "-1"
      }
    ]
  },
  "Find Minimum in Rotated Array": {
    id: 47,
    questionType: "Binary Search",
    difficulty: "Medium",
    description: "Given a sorted array that has been rotated at some pivot, find the minimum element. All elements are unique.",
    constraints: "1 <= array.length <= 5000, -5000 <= array[i] <= 5000, all elements are unique, array is rotated at some pivot",
    test_cases: [
      {
        input: "array = [3, 4, 5, 1, 2]",
        output: "1"
      },
      {
        input: "array = [4, 5, 6, 7, 0, 1, 2]",
        output: "0"
      },
      {
        input: "array = [11, 13, 15, 17]",
        output: "11"
      }
    ]
  },
  "Search 2D Matrix": {
    id: 48,
    questionType: "Binary Search",
    difficulty: "Medium",
    description: "Given a matrix where each row is sorted and the first integer of each row is greater than the last integer of the previous row, search for a target value.",
    constraints: "1 <= matrix.length, matrix[i].length <= 100, -10^4 <= matrix[i][j], target <= 10^4",
    test_cases: [
      {
        input: "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 5",
        output: "true"
      },
      {
        input: "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 13",
        output: "false"
      },
      {
        input: "matrix = [[1]], target = 1",
        output: "true"
      }
    ]
  },
  "Koko Eating Bananas": {
    id: 49,
    questionType: "Binary Search",
    difficulty: "Medium",
    description: "Given piles of bananas and h hours, find the minimum eating speed k such that all bananas can be eaten within h hours. Use binary search on the answer.",
    constraints: "1 <= piles.length <= 10^4, piles.length <= h <= 10^9, 1 <= piles[i] <= 10^9",
    test_cases: [
      {
        input: "piles = [3, 6, 7, 11], h = 8",
        output: "4"
      },
      {
        input: "piles = [30, 11, 23, 4, 20], h = 5",
        output: "30"
      },
      {
        input: "piles = [30, 11, 23, 4, 20], h = 6",
        output: "23"
      }
    ]
  },
  "Find Median of Two Sorted Arrays": {
    id: 50,
    questionType: "Binary Search",
    difficulty: "Hard",
    description: "Given two sorted arrays, find the median of the combined arrays in O(log(min(m,n))) time using binary search.",
    constraints: "0 <= m, n <= 1000, 1 <= m + n <= 2000, -10^6 <= array1[i], array2[i] <= 10^6",
    test_cases: [
      {
        input: "array1 = [1, 3], array2 = [2]",
        output: "2.0"
      },
      {
        input: "array1 = [1, 2], array2 = [3, 4]",
        output: "2.5"
      },
      {
        input: "array1 = [0, 0], array2 = [0, 0]",
        output: "0.0"
      }
    ]
  },
  "Split Array Largest Sum": {
    id: 51,
    questionType: "Binary Search",
    difficulty: "Hard",
    description: "Given an array and integer k, split the array into k non-empty subarrays to minimize the largest sum among the subarrays. Use binary search on the answer.",
    constraints: "1 <= array.length <= 1000, 1 <= k <= min(50, array.length), 0 <= array[i] <= 10^6",
    test_cases: [
      {
        input: "array = [7, 2, 5, 10, 8], k = 2",
        output: "18"
      },
      {
        input: "array = [1, 2, 3, 4, 5], k = 2",
        output: "9"
      },
      {
        input: "array = [1, 4, 4], k = 3",
        output: "4"
      }
    ]
  },
  "Median of Data Stream": {
    id: 52,
    questionType: "Binary Search",
    difficulty: "Hard",
    description: "Design a data structure that supports adding integers and finding the median. Use binary search with sorted container or two heaps approach.",
    constraints: "-10^5 <= num <= 10^5, at most 5*10^4 calls to addNum and findMedian",
    test_cases: [
      {
        input: "addNum(1); addNum(2); findMedian(); addNum(3); findMedian()",
        output: "[null, null, 1.5, null, 2.0]"
      },
      {
        input: "addNum(6); findMedian(); addNum(10); findMedian(); addNum(2); findMedian()",
        output: "[null, 6.0, null, 8.0, null, 6.0]"
      },
      {
        input: "addNum(1); addNum(2); addNum(3); addNum(4); addNum(5); findMedian()",
        output: "[null, null, null, null, null, 3.0]"
      }
    ]
  }
};

