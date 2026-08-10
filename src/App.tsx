import { useState } from 'react';
import ExamSetup from './components/ExamSetup';
import QuestionCard from './components/QuestionCard';
import ExamResult from './components/ExamResult';
import ReviewAnswers from './components/ReviewAnswers';
import { ExamState } from './types/question';
import { fetchQuestions } from './utils/questionUtils';

const initialState: ExamState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  submittedQuestions: {},
  score: 0,
  phase: "setup"
};

function App() {
  const [examState, setExamState] = useState<ExamState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startExam = async (examId: string, setId: string) => {
    setLoading(true);
    setError(null);
    try {
      const questions = await fetchQuestions(examId, setId);
      if (questions.length === 0) {
        setError("No questions found for the selected criteria.");
        setLoading(false);
        return;
      }
      setExamState({
        ...initialState,
        questions,
        phase: "exam"
      });
    } catch (err) {
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = (answer: string[]) => {
    const currentQ = examState.questions[examState.currentQuestionIndex];
    
    // Check if the lengths match and every selected answer is in the correctAnswers array
    const isCorrect = 
      answer.length === currentQ.correctAnswers.length &&
      answer.every(a => currentQ.correctAnswers.includes(a));
    
    setExamState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQ.id]: answer
      },
      submittedQuestions: {
        ...prev.submittedQuestions,
        [currentQ.id]: isCorrect
      },
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextQuestion = () => {
    setExamState(prev => {
      if (prev.currentQuestionIndex < prev.questions.length - 1) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 };
      } else {
        return { ...prev, phase: "result" };
      }
    });
  };

  const previousQuestion = () => {
    setExamState(prev => {
      if (prev.currentQuestionIndex > 0) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
      }
      return prev;
    });
  };

  const resetExam = () => {
    setExamState(initialState);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <header className="max-w-4xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-extrabold text-aws-blue cursor-pointer" onClick={resetExam}>
          AWS <span className="text-aws-orange">Exam Practice</span>
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        {loading && <div className="text-center mt-20 text-gray-500">Loading questions...</div>}
        
        {error && (
          <div className="max-w-md mx-auto mt-20 card p-6 bg-red-50 border-red-200">
            <p className="text-red-700 text-center">{error}</p>
            <button onClick={() => setError(null)} className="btn-secondary w-full mt-4">Try Again</button>
          </div>
        )}

        {!loading && !error && examState.phase === "setup" && (
          <ExamSetup onStart={startExam} />
        )}

        {!loading && !error && examState.phase === "exam" && examState.questions.length > 0 && (
          <QuestionCard
            question={examState.questions[examState.currentQuestionIndex]}
            currentIndex={examState.currentQuestionIndex}
            total={examState.questions.length}
            savedAnswer={examState.answers[examState.questions[examState.currentQuestionIndex].id]}
            isSubmitted={examState.submittedQuestions[examState.questions[examState.currentQuestionIndex].id] !== undefined}
            onAnswerSubmit={handleAnswerSubmit}
            onNext={nextQuestion}
            onPrevious={previousQuestion}
          />
        )}

        {!loading && !error && examState.phase === "result" && (
          <ExamResult 
            examState={examState} 
            onReview={() => setExamState(prev => ({ ...prev, phase: "review" }))}
            onRetry={resetExam}
          />
        )}

        {!loading && !error && examState.phase === "review" && (
          <ReviewAnswers 
            examState={examState}
            onBackToResult={() => setExamState(prev => ({ ...prev, phase: "result" }))}
          />
        )}
      </main>
    </div>
  );
}

export default App;
