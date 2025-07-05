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
export const twoPointers: Record<string, Question[]> = {
  "Palindrome Check": [
    {
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
    }
  ],
  "Remove Duplicates": [
    {
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
    }
  ],
  "Three Sum Zero": [
    {
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
    }
  ],
  "Container Water": [
    {
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
    }
  ],
  "Sort Colors": [
    {
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
    }
  ],
  "Reverse Words": [
    {
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
    }
  ],
  "Four Sum Target": [
    {
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
    }
  ],
  "Trapping Rain Water": [
    {
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
    }
  ],
  "Substring Permutation": [
    {
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
  ]
};
