"use client";

import React from 'react';
import { BotItem } from '../utils/types';
import QuestionImage from './QuestionImage';

interface BotQuestionItemProps {
    item: BotItem;
    expandedAnswer: boolean;
    handleToggleAnswer: () => void;
}

const BotQuestionItem: React.FC<BotQuestionItemProps> = ({ item, expandedAnswer, handleToggleAnswer }) => {
    return (
        <div className="border border-gray-200 rounded-md p-4 hover:shadow transition">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={handleToggleAnswer}
            >
                <QuestionImage text={item.question}/>
                <span className="text-blue-600 font-bold">
                    {expandedAnswer ? '–' : '+'}
                </span>
            </div>
            {expandedAnswer && (
                <ul className="mt-3 ml-5 list-decimal space-y-1 text-gray-700">
                    {item.answers.map((answer, idx) => (
                        <li key={idx}>{answer}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BotQuestionItem;