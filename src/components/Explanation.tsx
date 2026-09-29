import React from 'react';
import { Question } from '../types/question';

interface ExplanationProps {
  question: Question;
  userAnswer: string[];
}

const Explanation: React.FC<ExplanationProps> = ({ question, userAnswer }) => {
  const isCorrect = 
    userAnswer.length === question.correctAnswers.length &&
    userAnswer.every(a => question.correctAnswers.includes(a));

  return (
    <div className={`mt-6 p-6 rounded-lg border ${isCorrect ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'}`}>
      <div className="flex items-center mb-4">
        {isCorrect ? (
          <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        ) : (
          <svg className="w-6 h-6 text-red-500 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        )}
        <h3 className={`text-lg font-bold ${isCorrect ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </h3>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your answer{userAnswer.length > 1 ? 's' : ''}:</p>
        <ul className="mt-1 space-y-1">
          {userAnswer.map(ans => (
            <li key={ans} className="text-sm text-gray-900 dark:text-gray-100">{ans}. {question.options[ans]}</li>
          ))}
        </ul>
      </div>

      {!isCorrect && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Correct answer{question.correctAnswers.length > 1 ? 's' : ''}:</p>
          <ul className="mt-1 space-y-1">
            {question.correctAnswers.map(ans => (
              <li key={ans} className="text-sm text-gray-900 dark:text-gray-100">{ans}. {question.options[ans]}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Explanation:</p>
        <p className="text-sm text-gray-800 dark:text-gray-200">{question.explanation}</p>
      </div>

      {question.whyOthersAreWrong && Object.keys(question.whyOthersAreWrong).length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Why the other answers are wrong:</p>
          <ul className="space-y-2">
            {Object.keys(question.options).map(letter => {
              if (!question.correctAnswers.includes(letter) && question.whyOthersAreWrong?.[letter]) {
                return (
                  <li key={letter} className="text-sm text-gray-800 dark:text-gray-200">
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
