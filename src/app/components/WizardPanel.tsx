"use client";

import React from 'react';
// Импорт типов Direction, Grade, Mode из файла types.ts
import {Direction, Grade, Mode} from '../utils/types';

// Интерфейс для определения props компонента WizardPanel
interface WizardPanelProps {
    // Prop 'currentStep': Текущий шаг визарда (от 1 до 4)
    currentStep: number;
    // Prop 'mode': Выбранный режим генерации ('interview' или 'bot')
    mode: Mode;
    // Prop 'direction': Выбранное направление ('backend', 'frontend', 'ml', 'android')
    direction: Direction;
    // Prop 'subOption': Выбранный подвариант направления (например, 'react', 'java')
    subOption: string;
    // Prop 'grade': Выбранный грейд ('junior', 'middle', 'senior')
    grade: Grade;
    // Prop 'subOptionMapping': Mapping подвариантов для каждого направления
    subOptionMapping: Record<Direction, string[]>;
    // Prop 'getSubOptionLabel': Функция для получения лейбла подварианта в зависимости от направления
    getSubOptionLabel: (dir: Direction) => string;
    // Prop 'setMode': Функция для установки режима генерации
    setMode: (mode: Mode) => void;
    // Prop 'handleDirectionChange': Функция для обработки изменения направления
    handleDirectionChange: (dir: Direction) => void;
    // Prop 'setSubOption': Функция для установки подварианта
    setSubOption: (option: string) => void;
    // Prop 'setGrade': Функция для установки грейда
    setGrade: (grade: Grade) => void;
    // Prop 'handlePrevStep': Функция для перехода к предыдущему шагу визарда
    handlePrevStep: () => void;
    // Prop 'handleNextStep': Функция для перехода к следующему шагу визарда
    handleNextStep: () => void;
    // Prop 'handleGenerate': Функция для запуска процесса генерации вопросов
    handleGenerate: () => void;
}

// Компонент WizardPanel: реализует пошаговый интерфейс (визард) для выбора параметров генерации вопросов.
const WizardPanel: React.FC<WizardPanelProps> = (
    {
        currentStep,
        mode,
        direction,
        subOption,
        grade,
        subOptionMapping,
        getSubOptionLabel,
        setMode,
        handleDirectionChange,
        setSubOption,
        setGrade,
        handlePrevStep,
        handleNextStep,
        handleGenerate
    }) => {
    return (
        // Основной div-контейнер для панели визарда, стилизованный
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            {/* Индикация текущего шага визарда */}
            <div className="mb-6">
                <p className="text-sm text-gray-500">Шаг {currentStep} из 4</p>
            </div>
            {/* Шаг 1 визарда: Выбор режима генерации */}
            {currentStep === 1 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Режим генерации:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // Значение select привязано к состоянию 'mode'
                        value={mode}
                        // Обработчик изменения режима
                        onChange={e => setMode(e.target.value as Mode)}
                    >
                        <option value="interview">Интервью</option>
                        <option value="bot">Bot</option>
                    </select>
                </div>
            )}
            {/* Шаг 2 визарда: Выбор направления */}
            {currentStep === 2 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Выберите направление:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // Значение select привязано к состоянию 'direction'
                        value={direction}
                        // Обработчик изменения направления
                        onChange={e => handleDirectionChange(e.target.value as Direction)}
                    >
                        <option value="backend">Backend</option>
                        <option value="frontend">Frontend</option>
                        <option value="ml">ML</option>
                        <option value="android">Android</option>
                    </select>
                </div>
            )}
            {/* Шаг 3 визарда: Выбор подварианта направления (фреймворка, языка и т.д.) */}
            {currentStep === 3 && (
                <div className="mb-6">
                    <label
                        className="block text-sm font-medium mb-2">{getSubOptionLabel(direction)}:</label> {/* Лейбл зависит от выбранного направления */}
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // Значение select привязано к состоянию 'subOption'
                        value={subOption}
                        // Обработчик изменения подварианта
                        onChange={e => setSubOption(e.target.value)}
                    >
                        {/* Динамическое отображение опций подварианта на основе выбранного направления */}
                        {subOptionMapping[direction].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            )}
            {/* Шаг 4 визарда: Выбор грейда */}
            {currentStep === 4 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Выберите грейд:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // Значение select привязано к состоянию 'grade'
                        value={grade}
                        // Обработчик изменения грейда
                        onChange={e => setGrade(e.target.value as Grade)}
                    >
                        <option value="junior">Junior</option>
                        <option value="middle">Middle</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
            )}

            {/* Панель навигации и действий внизу визарда */}
            <div className="flex justify-between">
                {/* Кнопка "Назад" (отображается, начиная со второго шага) */}
                {currentStep > 1 ? (
                    <button
                        // Обработчик для перехода на предыдущий шаг
                        onClick={handlePrevStep}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Назад
                    </button>
                ) : (<div/>)} {/* Пустой div, чтобы сохранить выравнивание кнопки "Далее" */}

                {/* Кнопка "Далее" или "Сгенерировать" в зависимости от текущего шага */}
                {currentStep < 4 ? (
                    <button
                        // Обработчик для перехода на следующий шаг
                        onClick={handleNextStep}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Далее
                    </button>
                ) : (
                    <button
                        // Обработчик для запуска генерации вопросов
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

// Экспорт компонента WizardPanel для использования в других частях приложения
export default WizardPanel;