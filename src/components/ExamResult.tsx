import React from 'react';
import { ExamState } from '../types/question';

interface ExamResultProps {
  examState: ExamState;
  onReview: () => void;
  onRetry: () => void;
}

const ExamResult: React.FC<ExamResultProps> = ({ examState, onReview, onRetry }) => {
  const total = examState.questions.length;
  const percentage = Math.round((examState.score / total) * 100);
  
  const correctCount = examState.score;
  const incorrectCount = total - examState.score;

  return (
    <div className="max-w-md mx-auto mt-20 card p-8 text-center">
      <h1 className="text-3xl font-bold mb-2 text-aws-blue">Exam Complete</h1>
      
      <div className="my-8">
        <div className="text-6xl font-extrabold text-aws-orange mb-2">{percentage}%</div>
        <div className="text-xl text-gray-600 font-medium">{correctCount} / {total}</div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-700 font-medium">Correct</span>
          <span className="text-green-600 font-bold">{correctCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Incorrect</span>
          <span className="text-red-600 font-bold">{incorrectCount}</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={onReview}
          className="w-full btn-primary"
        >
          Review Answers
        </button>
        <button 
          onClick={onRetry}
          className="w-full btn-secondary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ExamResult;
