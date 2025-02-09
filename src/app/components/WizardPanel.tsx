"use client";

import React from 'react';
import { Direction, Grade, Mode } from '../utils/types';

interface WizardPanelProps {
    currentStep: number;
    mode: Mode;
    direction: Direction;
    subOption: string;
    grade: Grade;
    subOptionMapping: Record<Direction, string[]>;
    getSubOptionLabel: (dir: Direction) => string;
    setMode: (mode: Mode) => void;
    handleDirectionChange: (dir: Direction) => void;
    setSubOption: (option: string) => void;
    setGrade: (grade: Grade) => void;
    handlePrevStep: () => void;
    handleNextStep: () => void;
    handleGenerate: () => void;
}

const WizardPanel: React.FC<WizardPanelProps> = ({
                                                     currentStep, mode, direction, subOption, grade, subOptionMapping, getSubOptionLabel,
                                                     setMode, handleDirectionChange, setSubOption, setGrade, handlePrevStep, handleNextStep, handleGenerate
                                                 }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="mb-6">
                <p className="text-sm text-gray-500">Шаг {currentStep} из 4</p>
            </div>
            {currentStep === 1 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Режим генерации:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={mode}
                        onChange={e => setMode(e.target.value as Mode)}
                    >
                        <option value="interview">Интервью</option>
                        <option value="bot">Bot</option>
                    </select>
                </div>
            )}

            {currentStep === 2 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Выберите направление:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={direction}
                        onChange={e => handleDirectionChange(e.target.value as Direction)}
                    >
                        <option value="backend">Backend</option>
                        <option value="frontend">Frontend</option>
                        <option value="ml">ML</option>
                        <option value="android">Android</option>
                    </select>
                </div>
            )}

            {currentStep === 3 && (
                <div className="mb-6">
                    <label
                        className="block text-sm font-medium mb-2">{getSubOptionLabel(direction)}:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={subOption}
                        onChange={e => setSubOption(e.target.value)}
                    >
                        {subOptionMapping[direction].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            )}

            {currentStep === 4 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Выберите грейд:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={grade}
                        onChange={e => setGrade(e.target.value as Grade)}
                    >
                        <option value="junior">Junior</option>
                        <option value="middle">Middle</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
            )}

            <div className="flex justify-between">
                {currentStep > 1 ? (
                    <button
                        onClick={handlePrevStep}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Назад
                    </button>
                ) : (<div/>)}

                {currentStep < 4 ? (
                    <button
                        onClick={handleNextStep}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Далее
                    </button>
                ) : (
                    <button
                        onClick={handleGenerate}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Сгенерировать
                    </button>
                )}
            </div>
        </div>
    );
};

export default WizardPanel;