"use client";

// Импорт React и хука useState для управления состоянием
import React, {JSX, useState} from 'react';
// Импорт компонента WizardPanel - панель пошагового мастера
import WizardPanel from './components/WizardPanel';
// Импорт компонента TelegramBotLinkPanel - панель ссылки на Telegram бот
import TelegramBotLinkPanel from './components/TelegramBotLinkPanel';
// Импорт GeneratedQuestionsSection - секция с сгенерированными вопросами
import GeneratedQuestionsSection from './components/GeneratedQuestionsSection';
// Импорт типов и интерфейсов
import {Direction, Grade, Mode, InterviewItem, BotItem, subOptionMapping} from './utils/types';
// Импорт функций для генерации вопросов и ID
import {createInterviewQuestions, createBotQuestions, generateUniqueId} from './utils/questionGenerators';

// HomePage - главный компонент страницы, отвечающий за генерацию и отображение вопросов.
export default function HomePage(): JSX.Element {
    // Объявление состояний компонента HomePage с помощью хука useState:
    // Режим генерации ('interview' или 'bot'), по умолчанию 'interview'
    const [mode, setMode] = useState<Mode>('interview');
    // Направление, по умолчанию 'backend'
    const [direction, setDirection] = useState<Direction>('backend');
    // Подвид направления (технология), по умолчанию первый элемент из mapping для backend
    const [subOption, setSubOption] = useState<string>(subOptionMapping.backend[0]);
    // Грейд (уровень), по умолчанию 'junior'
    const [grade, setGrade] = useState<Grade>('junior');
    // Текущий шаг мастера, по умолчанию 1
    const [currentStep, setCurrentStep] = useState<number>(1);
    // Массив сгенерированных вопросов для интервью
    const [interviewQuestions, setInterviewQuestions] = useState<InterviewItem[]>([]);
    // Массив сгенерированных вопросов для бота
    const [botQuestions, setBotQuestions] = useState<BotItem[]>([]);
    // Уникальный ID для списка вопросов
    const [uniqueId, setUniqueId] = useState<string>('');
    // Состояние развернутости блока с вопросами, по умолчанию развернут
    const [isQnABlockExpanded, setIsQnABlockExpanded] = useState<boolean>(true);
    // Массив состояний развернутости ответов на каждый вопрос
    const [expandedAnswers, setExpandedAnswers] = useState<boolean[]>([]);

    // Функция handleGenerate: обрабатывает генерацию вопросов в зависимости от выбранного режима.
    const handleGenerate = () => {
        // Генерация уникального ID для текущего списка вопросов
        const newUniqueId = generateUniqueId();
        // Обновление состояния uniqueId
        setUniqueId(newUniqueId);

        // Если выбран режим "Интервью"
        if (mode === 'interview') {
            // Генерация вопросов для интервью
            const generatedInterview = createInterviewQuestions(direction, subOption, grade);
            // Обновление состояния interviewQuestions
            setInterviewQuestions(generatedInterview);
            // Сброс botQuestions, т.к. режим "Интервью"
            setBotQuestions([]);
            // Сброс состояний развернутости ответов для новых вопросов
            setExpandedAnswers(Array(generatedInterview.length).fill(false));
            // Развернуть блок с вопросами
            setIsQnABlockExpanded(true);
        } else { // Если выбран режим "Bot"
            // Генерация вопросов для бота
            const generatedBot = createBotQuestions(direction, subOption, grade);
            // Обновление состояния botQuestions
            setBotQuestions(generatedBot);
            // Сброс interviewQuestions, т.к. режим "Bot"
            setInterviewQuestions([]);
            // Сброс состояний развернутости ответов для новых вопросов
            setExpandedAnswers(Array(generatedBot.length).fill(false));
            // Развернуть блок с вопросами
            setIsQnABlockExpanded(true);
        }
        // Возврат к первому шагу мастера
        setCurrentStep(1);
    };

    // Функция handleReset: сбрасывает сгенерированные вопросы и состояния.
    const handleReset = () => {
        // Очистка массива вопросов для интервью
        setInterviewQuestions([]);
        // Очистка массива вопросов для бота
        setBotQuestions([]);
        // Очистка состояний развернутости ответов
        setExpandedAnswers([]);
        // Свернуть блок с вопросами
        setIsQnABlockExpanded(false);
        // Возврат к первому шагу мастера
        setCurrentStep(1);
    };

    // Функция handleDownload: обрабатывает скачивание вопросов для режима "Интервью" в виде текстового файла.
    const handleDownload = () => {
        // Выход из функции, если нет вопросов для скачивания
        if (interviewQuestions.length === 0) return;
        // Начало контента файла
        let content = 'Сгенерированные вопросы (Интервью):\n\n';
        interviewQuestions.forEach((item, index) => { // Итерация по массиву вопросов интервью
            // Добавление вопроса в контент
            content += `Вопрос ${index + 1}: ${item.question}\n`;
            // Добавление ответа в контент
            content += `Ответ: ${item.answer}\n\n`;
        });
        // Создание Blob-объекта для скачивания файла
        const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
        // Создание URL для Blob-объекта
        const url = URL.createObjectURL(blob);
        // Создание элемента-ссылки для скачивания
        const anchor = document.createElement('a');
        // Установка URL для скачивания
        anchor.href = url;
        // Установка имени файла для скачивания
        anchor.download = 'interview_questions.txt';
        // Добавление ссылки в DOM
        document.body.appendChild(anchor);
        // Программный клик по ссылке для запуска скачивания
        anchor.click();
        // Удаление ссылки из DOM
        document.body.removeChild(anchor);
        // Освобождение URL, созданного для Blob-объекта
        URL.revokeObjectURL(url);
    };

    // Функция handleNextStep: переходит к следующему шагу мастера.
    const handleNextStep = () => {
        // Увеличение номера шага, если не последний шаг
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    // Функция handlePrevStep: переходит к предыдущему шагу мастера.
    const handlePrevStep = () => {
        // Уменьшение номера шага, если не первый шаг
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Функция handleDirectionChange: обрабатывает изменение направления и сбрасывает подвариант.
    const handleDirectionChange = (dir: Direction) => {
        // Обновление состояния direction
        setDirection(dir);
        // Сброс подварианта на первый элемент из mapping для нового направления
        setSubOption(subOptionMapping[dir][0]);
    };

    // Функция getSubOptionLabel: возвращает лейбл для подварианта в зависимости от выбранного направления.
    const getSubOptionLabel = (dir: Direction) => {
        // Switch-case для выбора лейбла в зависимости от направления
        switch (dir) {
            case 'backend':
                return 'Выберите язык программирования';
            case 'frontend':
                return 'Выберите фреймворк';
            case 'ml':
                return 'Выберите ML-фреймворк';
            case 'android':
                return 'Выберите технологию для Android';
            default:
                return ''; // Лейбл по умолчанию - пустая строка
        }
    };

    // Функция handleToggleAnswer: переключает состояние развернутости ответа для вопроса по индексу.
    const handleToggleAnswer = (index: number) => {
        // Обновление состояния expandedAnswers на основе предыдущего состояния
        setExpandedAnswers(prev => {
            // Создание копии предыдущего массива состояний
            const updated = [...prev];
            // Инвертирование состояния для элемента по индексу
            updated[index] = !updated[index];
            // Возврат обновленного массива состояний
            return updated;
        });
    };

    // Формирование ссылки на Telegram-бота с параметрами, включая уникальный ID списка вопросов.
    const telegramLink = `https://t.me/MyTestBot?start=${direction}_${subOption}_${grade}_qid-${uniqueId}`;

    return (
        // Основной контейнер страницы
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
            <header className="bg-white shadow-lg">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex flex-col"> {/* Удален класс items-center */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.svg" alt="Логотип" className="h-16 w-auto"/>
                        <p className="text-md text-gray-700 mt-1 text-left">
                            TestHub Service
                        </p>
                    </div>
                    <nav className="flex space-x-6">
                        <span className="text-gray-900 hover:underline cursor-pointer">Генератор вопросов</span>
                        <span className="text-gray-900 hover:underline cursor-pointer">Банк вопросов</span>
                    </nav>
                </div>
            </header>

            {/* Основной контент страницы (Main Content) */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                <h2 className="text-4xl font-light mb-8 text-center">Генератор вопросов</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* WizardPanel - компонент для панели мастера выбора параметров генерации */}
                    <WizardPanel
                        currentStep={currentStep}
                        mode={mode}
                        direction={direction}
                        subOption={subOption}
                        grade={grade}
                        subOptionMapping={subOptionMapping}
                        getSubOptionLabel={getSubOptionLabel}
                        setMode={setMode}
                        handleDirectionChange={handleDirectionChange}
                        setSubOption={setSubOption}
                        setGrade={setGrade}
                        handlePrevStep={handlePrevStep}
                        handleNextStep={handleNextStep}
                        handleGenerate={handleGenerate}
                    />

                    {/* TelegramBotLinkPanel - компонент для панели ссылки на Telegram бот */}
                    <TelegramBotLinkPanel mode={mode} telegramLink={telegramLink}/>
                </div>

                {/* GeneratedQuestionsSection - компонент для секции отображения сгенерированных вопросов */}
                <GeneratedQuestionsSection
                    mode={mode}
                    interviewQuestions={interviewQuestions}
                    botQuestions={botQuestions}
                    isQnABlockExpanded={isQnABlockExpanded}
                    expandedAnswers={expandedAnswers}
                    setIsQnABlockExpanded={setIsQnABlockExpanded}
                    handleToggleAnswer={handleToggleAnswer}
                    handleDownload={handleDownload}
                    handleReset={handleReset}
                />
            </main>
        </div>
    );
}