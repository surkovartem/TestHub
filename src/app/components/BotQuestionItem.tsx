"use client";

import React from 'react';
import {BotItem} from '../utils/types';
import QuestionImage from './QuestionImage';

interface BotQuestionItemProps {
    // Данные вопроса и вариантов ответа для отображения
    item: BotItem;
    // Флаг, определяющий, развернуты ли варианты ответа
    expandedAnswer: boolean;
    // Функция для переключения состояния развернутости ответа
    handleToggleAnswer: () => void;
}

//Отображает вопрос для режима "Бот" и список вариантов ответов.
const BotQuestionItem: React.FC<BotQuestionItemProps> = ({item, expandedAnswer, handleToggleAnswer}) => {
    return (
        // Основной контейнер элемента списка вопросов для режима "Бот"
        <div className="border border-gray-200 rounded-md p-4 hover:shadow transition">
            {/* Контейнер для строки вопроса и кнопки развертывания/свертывания вариантов ответов */}
            <div
                className="flex justify-between items-center cursor-pointer"
                // Обработчик клика для развертывания/свертывания вариантов ответов
                onClick={handleToggleAnswer}
            >
                {/* Отображает текст вопроса в виде изображения */}
                <QuestionImage text={item.question}/>
                {/* Индикатор состояния развернутости вариантов ответов (плюс или минус) */}
                <span className="text-blue-600 font-bold">
                    {expandedAnswer ? '–' : '+'}
                </span>
            </div>
            {/* Условный рендеринг списка вариантов ответов (отображается только если expandedAnswer === true) */}
            {expandedAnswer && (
                // Список вариантов ответов в виде нумерованного списка
                <ul className="mt-3 ml-5 list-decimal space-y-1 text-gray-700">
                    {/* Итерируем по массиву вариантов ответов и отображаем каждый вариант */}
                    {item.answers.map((answer, idx) => (
                        <li key={idx}>{answer}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BotQuestionItem;