"use client";

import React from 'react';
import { Mode } from '../utils/types';

interface TelegramBotLinkPanelProps {
    mode: Mode;
    telegramLink: string;
}

const TelegramBotLinkPanel: React.FC<TelegramBotLinkPanelProps> = ({ mode, telegramLink }) => {
    return (
        <div
            className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center justify-center">
            {mode === 'bot' ? (
                <>
                    <h3 className="text-xl font-medium mb-4">Ссылка на Telegram-бот</h3>
                    <p className="text-sm text-gray-500 mb-2 text-center">Уникальная ссылка на основе
                        выбранных параметров.</p>
                    <a
                        href={telegramLink}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-blue-600 underline text-center"
                    >
                        {telegramLink}
                    </a>
                    <p className="text-sm text-gray-500 mt-4 text-center">Сгенерируйте вопросы для
                        обновления ссылки.</p>
                    <div className="mt-6">
                        <div
                            className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg w-16 h-16"/>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">
                    <p className="text-sm mb-4">В режиме интервью ссылка не отображается.</p>
                    <div
                        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg w-16 h-16 mx-auto"/>
                </div>
            )}
        </div>
    );
};

export default TelegramBotLinkPanel;