import { Question } from '../types/question';

export interface QuestionSet {
  id: string;
  name: string;
}

export const fetchQuestionSets = async (examId: string): Promise<QuestionSet[]> => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`${import.meta.env.BASE_URL}questions/${examId}/index.json?t=${timestamp}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch question sets: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching question sets:", error);
    return [];
  }
};

export const fetchQuestions = async (examId: string, setId: string): Promise<Question[]> => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`${import.meta.env.BASE_URL}questions/${examId}/${setId}.json?t=${timestamp}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }
    const data: Question[] = await response.json();

    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
