"use client";

import React from 'react';
import { Mode, InterviewItem, BotItem } from '../utils/types';
import InterviewQuestionItem from './InterviewQuestionItem';
import BotQuestionItem from './BotQuestionItem';

interface GeneratedQuestionsSectionProps {
    mode: Mode;
    interviewQuestions: InterviewItem[];
    botQuestions: BotItem[];
    isQnABlockExpanded: boolean;
    expandedAnswers: boolean[];
    setIsQnABlockExpanded: (expanded: boolean) => void;
    handleToggleAnswer: (index: number) => void;
    handleDownload: () => void;
    handleReset: () => void;
}

const GeneratedQuestionsSection: React.FC<GeneratedQuestionsSectionProps> = ({
                                                                                 mode, interviewQuestions, botQuestions, isQnABlockExpanded, expandedAnswers, setIsQnABlockExpanded,
                                                                                 handleToggleAnswer, handleDownload, handleReset
                                                                             }) => {
    return (
        <div className="mt-10 bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => setIsQnABlockExpanded(!isQnABlockExpanded)}
            >
                <h3 className="text-2xl font-light">
                    {mode === 'interview'
                        ? 'Сгенерированные вопросы с ответами (Интервью)'
                        : 'Сгенерированные вопросы и варианты ответов (Bot)'}
                </h3>
                <span className="text-blue-600 text-2xl">
                    {isQnABlockExpanded ? '–' : '+'}
                </span>
            </div>
            {isQnABlockExpanded && (
                <div className="mt-6 space-y-4">
                    {mode === 'interview' ? (
                        interviewQuestions.length > 0 ? (
                            interviewQuestions.map((item, index) => (
                                <InterviewQuestionItem
                                    key={index}
                                    item={item}
                                    expandedAnswer={expandedAnswers[index]}
                                    handleToggleAnswer={() => handleToggleAnswer(index)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">Нет вопросов. Заполните все шаги и нажмите
                                «Сгенерировать».</p>
                        )
                    ) : (
                        botQuestions.length > 0 ? (
                            botQuestions.map((item, index) => (
                                <BotQuestionItem
                                    key={index}
                                    item={item}
                                    expandedAnswer={expandedAnswers[index]}
                                    handleToggleAnswer={() => handleToggleAnswer(index)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">Нет вопросов. Заполните все шаги и нажмите
                                «Сгенерировать».</p>
                        )
                    )}

                    {(interviewQuestions.length > 0 || botQuestions.length > 0) && (
                        <div className="mt-6 flex justify-end space-x-4">
                            {mode === 'interview' && interviewQuestions.length > 0 && (
                                <button
                                    onClick={handleDownload}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Скачать
                                </button>
                            )}
                            <button
                                onClick={handleReset}
                                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                            >
                                Сгенерировать заново
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GeneratedQuestionsSection;