export interface Question {
  id: string;
  exam: string;
  question: string;
  answerType: "single" | "multiple";
  answerInstruction: string;
  options: Record<string, string>;
  correctAnswers: string[];
  explanation: string;
  whyOthersAreWrong?: Record<string, string>;
  topic: string;
  tags: string[];
  learningObjective?: string;
}

export interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  submittedQuestions: Record<string, boolean>; // true if correct, false if wrong
  score: number;
  phase: "setup" | "exam" | "result" | "review";
}
