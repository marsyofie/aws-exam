import { Question, Difficulty } from '../types/question';

export const fetchQuestions = async (examId: string, count: number, difficulty: Difficulty): Promise<Question[]> => {
  try {
    // In a real scenario, this might fetch a specific file based on examId
    // For now, we fetch our sample set-001.json
    const response = await fetch(`/questions/${examId}/set-001.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }
    const data: Question[] = await response.json();

    // Filter by difficulty if not 'mixed'
    let filteredData = data;
    if (difficulty !== 'mixed') {
      filteredData = data.filter(q => q.difficulty === difficulty);
    }

    // Shuffle and pick
    const shuffled = [...filteredData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
