export interface Topic {
  title_name: string;
  description: string;
  completed: string;
}

export interface Question {
  question: string;
  questionType: string;
  difficulty: string;
  constraints: string;
}

export interface InterviewInfo {
  question_title: string;
  question: string;
  constraints: string;
  examples: Array<Example>;
  test_cases: Array<TestCase>;
}

type Example = {
  input: string;
  expected_output: string;
}

type TestCase = {
  input: string;
  expected_output: string;
}
