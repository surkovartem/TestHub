"use client";

import React from 'react';
import { InterviewItem } from '../utils/types';

interface InterviewQuestionItemProps {
    item: InterviewItem;
    expandedAnswer: boolean;
    handleToggleAnswer: () => void;
}

const InterviewQuestionItem: React.FC<InterviewQuestionItemProps> = ({ item, expandedAnswer, handleToggleAnswer }) => {
    return (
        <div
            className="border border-gray-200 rounded-md p-4 hover:shadow transition cursor-pointer"
            onClick={handleToggleAnswer}
        >
            <div className="flex justify-between items-center">
                <p className="font-medium">{item.question}</p>
                <span className="text-blue-600 font-bold">
                    {expandedAnswer ? '–' : '+'}
                </span>
            </div>
            {expandedAnswer && (
                <p className="mt-3 text-gray-700">{item.answer}</p>
            )}
        </div>
    );
};

export default InterviewQuestionItem;