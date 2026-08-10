export type Difficulty = "easy" | "medium" | "hard" | "mixed";

export interface Question {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  whyOthersAreWrong?: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
  };
  topic: string;
  difficulty: Difficulty;
  tags: string[];
}

export interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, "A" | "B" | "C" | "D">;
  submittedQuestions: Record<string, boolean>; // true if correct, false if wrong
  score: number;
  phase: "setup" | "exam" | "result" | "review";
}
