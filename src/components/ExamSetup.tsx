import React, { useState, useEffect } from 'react';
import { QuestionSet, fetchQuestionSets } from '../utils/questionUtils';

interface ExamSetupProps {
  onStart: (examId: string, setId: string, examName: string, setName: string) => void;
}

const ExamSetup: React.FC<ExamSetupProps> = ({ onStart }) => {
  const [examId, setExamId] = useState('saa');
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [selectedSet, setSelectedSet] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSets = async () => {
      setLoading(true);
      const fetchedSets = await fetchQuestionSets(examId);
      setSets(fetchedSets);
      if (fetchedSets.length > 0) {
        setSelectedSet(fetchedSets[0].id);
      }
      setLoading(false);
    };
    loadSets();
  }, [examId]);

  const handleStart = () => {
    if (selectedSet) {
      const selectedSetObj = sets.find(s => s.id === selectedSet);
      const setName = selectedSetObj ? selectedSetObj.name : selectedSet;
      // Map examId to name manually since it's hardcoded in select for now
      let examName = "Solutions Architect - Associate";
      if (examId === 'saa') examName = "AWS Solutions Architect - Associate";
      
      onStart(examId, selectedSet, examName, setName);
    }
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Set</label>
          <select 
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
            disabled={loading || sets.length === 0}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-aws-orange focus:border-aws-orange sm:text-sm rounded-md border disabled:bg-gray-100"
          >
            {loading ? (
              <option>Loading sets...</option>
            ) : sets.length > 0 ? (
              sets.map(set => (
                <option key={set.id} value={set.id}>{set.name}</option>
              ))
            ) : (
              <option>No sets available</option>
            )}
          </select>
        </div>

        <button 
          onClick={handleStart}
          disabled={loading || sets.length === 0}
          className="w-full btn-primary mt-8"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default ExamSetup;
