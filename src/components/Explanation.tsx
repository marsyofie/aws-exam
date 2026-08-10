import React from 'react';
import { Question } from '../types/question';

interface ExplanationProps {
  question: Question;
  userAnswer: "A" | "B" | "C" | "D";
}

const Explanation: React.FC<ExplanationProps> = ({ question, userAnswer }) => {
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className={`mt-6 p-6 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
      <div className="flex items-center mb-4">
        {isCorrect ? (
          <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        ) : (
          <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        )}
        <h3 className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </h3>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700">Your answer:</p>
        <p className="text-sm text-gray-900 mt-1">{userAnswer}. {question.options[userAnswer]}</p>
      </div>

      {!isCorrect && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700">Correct answer:</p>
          <p className="text-sm text-gray-900 mt-1">{question.correctAnswer}. {question.options[question.correctAnswer]}</p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Explanation:</p>
        <p className="text-sm text-gray-800">{question.explanation}</p>
      </div>

      {question.whyOthersAreWrong && Object.keys(question.whyOthersAreWrong).length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Why the other answers are wrong:</p>
          <ul className="space-y-2">
            {(["A", "B", "C", "D"] as const).map(letter => {
              if (letter !== question.correctAnswer && question.whyOthersAreWrong?.[letter]) {
                return (
                  <li key={letter} className="text-sm text-gray-800">
                    <span className="font-semibold">{letter}:</span> {question.whyOthersAreWrong[letter]}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Explanation;
