"use client";

import React from 'react';
// Импорт типов для режимов, вопросов интервью и вопросов для бота
import {Mode, InterviewItem, BotItem} from '../utils/types';
// Импорт компонента для отображения вопроса интервью
import InterviewQuestionItem from './InterviewQuestionItem';
// Импорт компонента для отображения вопроса для бота
import BotQuestionItem from './BotQuestionItem';

// Интерфейс для описания props компонента GeneratedQuestionsSection
interface GeneratedQuestionsSectionProps {
    // Режим генерации вопросов ('interview' или 'bot')
    mode: Mode;
    // Массив сгенерированных вопросов для режима 'interview'
    interviewQuestions: InterviewItem[];
    // Массив сгенерированных вопросов для режима 'bot'
    botQuestions: BotItem[];
    // Состояние, определяющее, развернут ли блок с вопросами
    isQnABlockExpanded: boolean;
    // Массив состояний развернутости ответов/вариантов для каждого вопроса
    expandedAnswers: boolean[];
    // Функция для установки состояния развернутости блока с вопросами
    setIsQnABlockExpanded: (expanded: boolean) => void;
    // Функция для переключения состояния развернутости ответа/вариантов ответа для вопроса по индексу
    handleToggleAnswer: (index: number) => void;
    // Функция для обработки скачивания вопросов (только для режима 'interview')
    handleDownload: () => void;
    // Функция для обработки сброса (генерации заново) вопросов
    handleReset: () => void;
}

// Компонент GeneratedQuestionsSection: Отображает секцию с сгенерированными вопросами (интервью или для бота).
const GeneratedQuestionsSection: React.FC<GeneratedQuestionsSectionProps> = (
    {
        mode,
        interviewQuestions,
        botQuestions,
        isQnABlockExpanded,
        expandedAnswers,
        setIsQnABlockExpanded,
        handleToggleAnswer,
        handleDownload,
        handleReset
    }) => {
    return (
        // Основной контейнер для секции сгенерированных вопросов
        <div className="mt-10 bg-white p-8 rounded-lg shadow-md border border-gray-200">
            {/* Заголовок секции, который можно свернуть/развернуть при клике */}
            <div
                className="flex justify-between items-center cursor-pointer mb-4"
                // Переключает состояние развернутости секции при клике
                onClick={() => setIsQnABlockExpanded(!isQnABlockExpanded)}
            >
                <h3 className="text-2xl font-light">
                    {mode === 'interview'
                        ? 'Сгенерированные вопросы с ответами (Интервью)' // Заголовок для режима "Интервью"
                        : 'Сгенерированные вопросы и варианты ответов (Bot)'} {/* Заголовок для режима "Бот" */}
                </h3>
                {/* Индикатор состояния развернутости секции (+/-) */}
                <span className="text-blue-600 text-2xl">
                    {isQnABlockExpanded ? '–' : '+'}
                </span>
            </div>
            {/* Условный рендеринг содержимого секции, если isQnABlockExpanded === true */}
            {isQnABlockExpanded && (
                <div className="mt-6 space-y-4">
                    {/* Условный рендеринг списка вопросов в зависимости от режима */}
                    {mode === 'interview' ? ( // Рендеринг для режима "Интервью"
                        // Проверка, есть ли сгенерированные вопросы для интервью
                        interviewQuestions.length > 0 ? (
                            // Маппинг массива вопросов интервью и рендеринг InterviewQuestionItem для каждого вопроса
                            interviewQuestions.map((item, index) => (
                                <InterviewQuestionItem
                                    key={index}
                                    // Передача данных вопроса в компонент InterviewQuestionItem
                                    item={item}
                                    // Передача состояния развернутости ответа
                                    expandedAnswer={expandedAnswers[index]}
                                    // Передача функции для переключения ответа
                                    handleToggleAnswer={() => handleToggleAnswer(index)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">Нет вопросов. Заполните все шаги и нажмите
                                «Сгенерировать».
                            </p> // Сообщение, если нет вопросов для интервью
                        )
                    ) : (
                        // Рендеринг для режима "Бот"
                        botQuestions.length > 0 ? ( // Проверка, есть ли сгенерированные вопросы для бота
                            // Маппинг массива вопросов для бота и рендеринг BotQuestionItem для каждого вопроса
                            botQuestions.map((item, index) => (
                                <BotQuestionItem
                                    key={index}
                                    // Передача данных вопроса в компонент BotQuestionItem
                                    item={item}
                                    // Передача состояния развернутости вариантов ответа
                                    expandedAnswer={expandedAnswers[index]}
                                    // Передача функции для переключения вариантов ответа
                                    handleToggleAnswer={() => handleToggleAnswer(index)}
                                />
                            ))
                        ) : (
                            // Сообщение, если нет вопросов для бота
                            <p className="text-gray-500">Нет вопросов. Заполните все шаги и нажмите
                                «Сгенерировать».
                            </p>
                        )
                    )}

                    {/* Условный рендеринг кнопок "Скачать" и "Сгенерировать заново", если есть сгенерированные вопросы */}
                    {(interviewQuestions.length > 0 || botQuestions.length > 0) && (
                        <div className="mt-6 flex justify-end space-x-4">
                            {/* Кнопка "Скачать" (отображается только в режиме "Интервью" и если есть вопросы интервью) */}
                            {mode === 'interview' && interviewQuestions.length > 0 && (
                                <button
                                    // Обработчик для скачивания вопросов интервью
                                    onClick={handleDownload}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Скачать
                                </button>
                            )}
                            {/* Кнопка "Сгенерировать заново" (отображается всегда, если есть вопросы любого режима) */}
                            <button
                                // Обработчик для сброса и генерации новых вопросов
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