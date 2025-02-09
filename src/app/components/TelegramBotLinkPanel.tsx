"use client";

import React from 'react';
// Импорт типа Mode из файла types.ts для типизации props
import {Mode} from '../utils/types';

// Интерфейс для определения props компонента TelegramBotLinkPanel
interface TelegramBotLinkPanelProps {
    // Prop 'mode': Режим генерации, определяющий, показывать ли ссылку на бот
    mode: Mode;
    // Prop 'telegramLink': Ссылка на Telegram-бот, которая будет отображаться
    telegramLink: string;
}

// Компонент TelegramBotLinkPanel: Отображает ссылку на Telegram-бот, если выбран режим "Bot".
const TelegramBotLinkPanel: React.FC<TelegramBotLinkPanelProps> = ({mode, telegramLink}) => {
    return (
        // Основной div-контейнер для панели ссылки на Telegram-бот, стилизованный
        <div
            className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center justify-center">
            {/* Условный рендеринг содержимого панели в зависимости от режима 'mode' */}
            {mode === 'bot' ? ( // Если режим 'bot', отображаем ссылку и информацию для режима бота
                <>
                    <h3 className="text-xl font-medium mb-4">Ссылка на Telegram-бот</h3> {/* Заголовок панели */}
                    <p className="text-sm text-gray-500 mb-2 text-center">Уникальная ссылка на основе
                        выбранных параметров.
                    </p> {/* Описание ссылки */}
                    <a
                        // Ссылка на Telegram-бот, значение из props
                        href={telegramLink}
                        // Открывать ссылку в новой вкладке
                        target="_blank"
                        // Атрибуты для безопасности при открытии внешней ссылки
                        rel="noreferrer"
                        // Стилизация ссылки
                        className="break-all text-blue-600 underline text-center"
                    >
                        {telegramLink} {/* Отображение самой ссылки */}
                    </a>
                    <p className="text-sm text-gray-500 mt-4 text-center">Сгенерируйте вопросы для
                        обновления ссылки.</p> {/* Инструкция для пользователя */}
                    <div className="mt-6">
                        <div
                            className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg w-16 h-16"/>
                        {/* Placeholder для QR-кода (можно добавить функциональность QR-кода) */}
                    </div>
                </>
            ) : ( // Если режим не 'bot' (например, 'interview'), отображаем сообщение, что ссылка не показывается
                <div className="text-center text-gray-500">
                    <p className="text-sm mb-4">В режиме интервью ссылка не
                        отображается.</p> {/* Сообщение для режима интервью */}
                    <div
                        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg w-16 h-16 mx-auto"/>
                    {/* Placeholder, визуально похоже на placeholder QR-кода */}
                </div>
            )}
        </div>
    );
};

// Экспорт компонента TelegramBotLinkPanel для использования в других частях приложения
export default TelegramBotLinkPanel;