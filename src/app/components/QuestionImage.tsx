"use client";

import React, {useState, useEffect, JSX} from 'react';

// Интерфейс для определения props компонента QuestionImage
interface QuestionImageProps {
    //Текст вопроса, который нужно отобразить в виде изображения
    text: string;
}

// Компонент QuestionImage: Отображает текст вопроса как изображение, используя canvas.
function QuestionImage({text}: QuestionImageProps): JSX.Element {
    const [dataUrl, setDataUrl] = useState<string>(''); // Состояние для хранения Data URL изображения, созданного canvas

    useEffect(() => {
        // Создание элемента canvas в DOM
        const canvas = document.createElement('canvas');
        // Установка фиксированной ширины canvas
        canvas.width = 400;
        // Установка фиксированной высоты canvas
        canvas.height = 100;
        // Получение 2D-контекста рисования canvas
        const context = canvas.getContext('2d');

        // Проверка, что контекст рисования получен успешно
        if (context) {
            // Установка белого цвета заливки
            context.fillStyle = '#ffffff';
            // Заливка canvas белым цветом (фон)
            context.fillRect(0, 0, canvas.width, canvas.height);
            // Установка цвета обводки для границы
            context.strokeStyle = '#e5e7eb';
            // Рисование границы вокруг canvas
            context.strokeRect(0, 0, canvas.width, canvas.height);
            // Установка шрифта для текста
            context.font = '16px sans-serif';
            // Установка цвета текста
            context.fillStyle = '#111827';
            // Установка базовой линии текста на верхнюю границу
            context.textBaseline = 'top';

            // Максимальная ширина текста с учетом отступов
            const maxWidth = canvas.width - 20;
            // Разбиение текста вопроса на слова
            const words = text.split(' ');
            // Переменная для хранения текущей строки текста
            let line = '';
            // Начальная вертикальная позиция для текста
            let y = 10;
            // Высота строки текста
            const lineHeight = 20;

            // Логика для переноса текста по словам, чтобы текст не выходил за maxWidth canvas
            for (let n = 0; n < words.length; n++) {
                // Формирование строки для проверки ширины
                const testLine = line + words[n] + ' ';
                // Измерение ширины тестовой строки
                const metrics = context.measureText(testLine);
                // Получение измеренной ширины
                const testWidth = metrics.width;
                // Если строка слишком длинная и это не первое слово в строке
                if (testWidth > maxWidth && n > 0) {
                    // Вывод накопленной строки на canvas
                    context.fillText(line, 10, y);
                    // Начать новую строку с текущего слова
                    line = words[n] + ' ';
                    // Увеличение вертикальной позиции для следующей строки
                    y += lineHeight;
                } else {
                    // Иначе, добавить слово к текущей строке
                    line = testLine;
                }
            }
            // Вывод последней строки текста на canvas
            context.fillText(line, 10, y);
            // Преобразование canvas в Data URL и сохранение в состоянии
            setDataUrl(canvas.toDataURL());
        }
    }, [text]); // useEffect зависит от 'text': эффект срабатывает при изменении текста вопроса

    // Возвращает JSX: изображение, если dataUrl есть, иначе - сообщение о генерации изображения
    return dataUrl ? <img src={dataUrl} alt={text} className="rounded shadow-md"/> :
        <div className="bg-gray-100 p-4 text-center">Generating image...</div>;
}

// Экспорт компонента QuestionImage для использования в других компонентах
export default QuestionImage;