import React from 'react';
import { ExamState } from '../types/question';
import Explanation from './Explanation';

interface ReviewAnswersProps {
  examState: ExamState;
  onBackToResult: () => void;
}

const ReviewAnswers: React.FC<ReviewAnswersProps> = ({ examState, onBackToResult }) => {
  const { questions, answers, submittedQuestions } = examState;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Review Answers</h2>
        <button onClick={onBackToResult} className="btn-secondary text-sm">
          Back to Results
        </button>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => {
          const userAnswer = answers[question.id] || [];
          const isCorrect = submittedQuestions[question.id];
          
          return (
            <div key={question.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="font-semibold text-gray-500">Question {index + 1}</span>
                <span className={`px-2 py-1 text-xs font-bold rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {question.question}
              </h3>

              <div className="space-y-2 mb-4">
                {Object.keys(question.options).map(letter => {
                  const isSelected = userAnswer.includes(letter);
                  const isActualCorrect = question.correctAnswers.includes(letter);
                  
                  let bgClass = "bg-gray-50 border-gray-200";
                  if (isSelected && isActualCorrect) bgClass = "bg-green-50 border-green-300";
                  else if (isSelected && !isActualCorrect) bgClass = "bg-red-50 border-red-300";
                  else if (isActualCorrect) bgClass = "bg-green-50 border-green-300 border-dashed";

                  return (
                    <div key={letter} className={`p-3 border rounded-md text-sm ${bgClass}`}>
                      <span className="font-bold mr-2">{letter}.</span>
                      {question.options[letter]}
                      {isSelected && <span className="ml-2 font-bold text-xs">(Your Answer)</span>}
                      {isActualCorrect && !isSelected && <span className="ml-2 font-bold text-xs text-green-600">(Correct Answer)</span>}
                    </div>
                  );
                })}
              </div>

              {userAnswer.length > 0 && (
                <Explanation question={question} userAnswer={userAnswer} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewAnswers;
