"use client";

import React from 'react';
// Импорт интерфейса InterviewItem из файла types.ts для типизации props
import {InterviewItem} from '../utils/types';

// Интерфейс для определения props компонента InterviewQuestionItem
interface InterviewQuestionItemProps {
    // Prop 'item': Данные вопроса интервью (тип InterviewItem), включая текст вопроса и ответ
    item: InterviewItem;
    // Prop 'expandedAnswer': Булево значение, указывающее, развернут ли ответ на вопрос
    expandedAnswer: boolean;
    // Prop 'handleToggleAnswer': Функция, вызываемая для переключения состояния отображения ответа
    handleToggleAnswer: () => void;
}

// Компонент InterviewQuestionItem: Отображает вопрос и ответ для режима "Интервью".
const InterviewQuestionItem: React.FC<InterviewQuestionItemProps> = ({item, expandedAnswer, handleToggleAnswer}) => {
    return (
        // Основной div-контейнер для элемента вопроса интервью, стилизованный рамкой, тенью и курсором указателя
        <div
            className="border border-gray-200 rounded-md p-4 hover:shadow transition cursor-pointer"
            // Обработчик клика на контейнер, вызывает функцию handleToggleAnswer для показа/скрытия ответа
            onClick={handleToggleAnswer}
        >
            {/* Flex-контейнер для строки с вопросом и индикатором развертывания/свертывания ответа */}
            <div className="flex justify-between items-center">
                {/* Отображение текста вопроса */}
                <p className="font-medium">{item.question}</p>
                {/* Индикатор состояния развернутости ответа (+ или -) */}
                <span className="text-blue-600 font-bold">
                    {expandedAnswer ? '–' : '+'} {/* Отображает '-' если ответ развернут, иначе '+' */}
                </span>
            </div>
            {/* Условный рендеринг блока с ответом (отображается только если expandedAnswer === true) */}
            {expandedAnswer && (
                // Абзац для отображения текста ответа
                <p className="mt-3 text-gray-700">{item.answer}</p>
            )}
        </div>
    );
};

// Экспорт компонента InterviewQuestionItem, чтобы его можно было использовать в других частях приложения
export default InterviewQuestionItem;