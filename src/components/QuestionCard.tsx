import React, { useState, useEffect } from 'react';
import { Question } from '../types/question';
import ProgressBar from './ProgressBar';
import AnswerOption from './AnswerOption';
import Explanation from './Explanation';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  total: number;
  savedAnswer: "A" | "B" | "C" | "D" | undefined;
  isSubmitted: boolean;
  onAnswerSubmit: (answer: "A" | "B" | "C" | "D") => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  total,
  savedAnswer,
  isSubmitted,
  onAnswerSubmit,
  onNext,
  onPrevious
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | "C" | "D" | undefined>(savedAnswer);

  // Sync state if question changes or savedAnswer updates
  useEffect(() => {
    setSelectedAnswer(savedAnswer);
  }, [question, savedAnswer]);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">AWS Solutions Architect - Associate</h2>
        <ProgressBar current={currentIndex + 1} total={total} />
      </div>

      <div className="card p-6 md:p-8">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-aws-blue text-white text-xs font-semibold rounded-full mb-4">
            Topic: {question.topic}
          </span>
          <h3 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
            {question.question}
          </h3>
        </div>

        <div className="space-y-3 mb-8">
          {(["A", "B", "C", "D"] as const).map(letter => (
            <AnswerOption
              key={letter}
              letter={letter}
              text={question.options[letter]}
              selected={selectedAnswer === letter}
              onSelect={setSelectedAnswer}
              disabled={isSubmitted}
            />
          ))}
        </div>

        {isSubmitted && selectedAnswer && (
          <Explanation question={question} userAnswer={selectedAnswer} />
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button 
          onClick={onPrevious} 
          disabled={currentIndex === 0}
          className="btn-secondary"
        >
          Previous
        </button>

        {!isSubmitted ? (
          <button 
            onClick={handleSubmit} 
            disabled={!selectedAnswer}
            className="btn-primary"
          >
            Submit Answer
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="btn-primary bg-green-600 hover:bg-green-700"
          >
            {currentIndex === total - 1 ? 'Finish Exam' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
