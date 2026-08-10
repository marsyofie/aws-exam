import React, { useState, useEffect } from 'react';
import { Question } from '../types/question';
import ProgressBar from './ProgressBar';
import AnswerOption from './AnswerOption';
import Explanation from './Explanation';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  total: number;
  savedAnswer: string[] | undefined;
  isSubmitted: boolean;
  onAnswerSubmit: (answer: string[]) => void;
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
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(savedAnswer || []);

  // Sync state if question changes or savedAnswer updates
  useEffect(() => {
    setSelectedAnswers(savedAnswer || []);
  }, [question, savedAnswer]);

  const handleSelect = (letter: string) => {
    if (question.answerType === 'single') {
      setSelectedAnswers([letter]);
    } else {
      setSelectedAnswers(prev => {
        if (prev.includes(letter)) {
          return prev.filter(a => a !== letter);
        } else {
          return [...prev, letter].sort();
        }
      });
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length > 0) {
      onAnswerSubmit(selectedAnswers);
    }
  };

  const isSubmitDisabled = question.answerType === 'multiple' 
    ? selectedAnswers.length !== question.correctAnswers.length 
    : selectedAnswers.length === 0;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">AWS Solutions Architect - Associate</h2>
        <ProgressBar current={currentIndex + 1} total={total} />
      </div>

      <div className="card p-6 md:p-8">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-aws-blue text-white text-xs font-semibold rounded-full mb-4 mr-2">
            Topic: {question.topic}
          </span>
          {question.answerType === 'multiple' && (
             <span className="inline-block px-3 py-1 bg-aws-orange text-white text-xs font-semibold rounded-full mb-4">
               Choose {question.correctAnswers.length}
             </span>
          )}
          <h3 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
            {question.question}
          </h3>
          {question.answerInstruction && (
            <p className="mt-2 text-sm text-gray-600 font-medium">{question.answerInstruction}</p>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {Object.keys(question.options).map(letter => (
            <AnswerOption
              key={letter}
              letter={letter}
              text={question.options[letter]}
              selected={selectedAnswers.includes(letter)}
              onSelect={handleSelect}
              disabled={isSubmitted}
              type={question.answerType === 'multiple' ? 'checkbox' : 'radio'}
            />
          ))}
        </div>

        {isSubmitted && selectedAnswers.length > 0 && (
          <Explanation question={question} userAnswer={selectedAnswers} />
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
            disabled={isSubmitDisabled}
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
