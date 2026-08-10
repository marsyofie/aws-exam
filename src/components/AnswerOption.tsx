import React from 'react';

type OptionLetter = "A" | "B" | "C" | "D";

interface AnswerOptionProps {
  letter: OptionLetter;
  text: string;
  selected: boolean;
  onSelect: (letter: OptionLetter) => void;
  disabled?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ letter, text, selected, onSelect, disabled }) => {
  return (
    <label 
      className={`
        flex items-start p-4 border rounded-lg cursor-pointer transition-colors
        ${selected ? 'border-aws-orange bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}
        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      <div className="flex items-center h-5">
        <input 
          type="radio"
          name="answer"
          className="focus:ring-aws-orange h-4 w-4 text-aws-orange border-gray-300"
          checked={selected}
          onChange={() => !disabled && onSelect(letter)}
          disabled={disabled}
        />
      </div>
      <div className="ml-3 text-sm">
        <span className="font-semibold text-gray-700 mr-2">{letter}.</span>
        <span className="text-gray-900">{text}</span>
      </div>
    </label>
  );
};

export default AnswerOption;
