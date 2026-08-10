import React, { useState } from 'react';
import { Difficulty } from '../types/question';

interface ExamSetupProps {
  onStart: (examId: string, count: number, difficulty: Difficulty) => void;
}

const ExamSetup: React.FC<ExamSetupProps> = ({ onStart }) => {
  const [examId, setExamId] = useState('saa');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('mixed');

  const handleStart = () => {
    onStart(examId, count, difficulty);
  };

  return (
    <div className="max-w-md mx-auto mt-20 card p-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-aws-blue">AWS Exam Practice</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
          <select 
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-aws-orange focus:border-aws-orange sm:text-sm rounded-md border"
          >
            <option value="saa">Solutions Architect - Associate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
          <select 
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-aws-orange focus:border-aws-orange sm:text-sm rounded-md border"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-aws-orange focus:border-aws-orange sm:text-sm rounded-md border"
          >
            <option value="mixed">Mixed</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button 
          onClick={handleStart}
          className="w-full btn-primary mt-8"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default ExamSetup;
