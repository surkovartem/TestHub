"use client";

import React, {useState, useEffect, JSX} from 'react';

// Component to render question as an image using canvas (for bot mode questions)
function QuestionImage({text}: { text: string }): JSX.Element {
    const [dataUrl, setDataUrl] = useState<string>('');

    useEffect(() => {
        const canvas = document.createElement('canvas');
        // Set fixed dimensions
        canvas.width = 400;
        canvas.height = 100;
        const context = canvas.getContext('2d');
        if (context) {
            // Fill background with white
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            // Draw border
            context.strokeStyle = '#e5e7eb';
            context.strokeRect(0, 0, canvas.width, canvas.height);
            // Set text styles
            context.font = '16px sans-serif';
            context.fillStyle = '#111827';
            context.textBaseline = 'top';
            // Wrap text
            const maxWidth = canvas.width - 20;
            const words = text.split(' ');
            let line = '';
            let y = 10;
            const lineHeight = 20;
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = context.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, 10, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            context.fillText(line, 10, y);
            setDataUrl(canvas.toDataURL());
        }
    }, [text]);

    return dataUrl ? <img src={dataUrl} alt={text} className="rounded shadow-md"/> :
        <div className="bg-gray-100 p-4 text-center">Generating image...</div>;
}

// Next.js page component at pages/index.tsx
export default function HomePage(): JSX.Element {
    // Define types
    type Direction = 'backend' | 'frontend' | 'ml' | 'android';
    type Grade = 'junior' | 'middle' | 'senior';
    type Mode = 'interview' | 'bot';

    interface InterviewItem {
        question: string;
        answer: string;
    }

    interface BotItem {
        question: string;
        answers: string[];
    }

    // Mapping for sub-options
    const subOptionMapping: Record<Direction, string[]> = {
        backend: ['java', 'cpp', 'python', 'golang', 'csharp'],
        frontend: ['react', 'angular', 'vue'],
        ml: ['tensorflow', 'pytorch', 'sklearn'],
        android: ['kotlin', 'java']
    };

    // Global states for parameters
    const [mode, setMode] = useState<Mode>('interview');
    const [direction, setDirection] = useState<Direction>('backend');
    const [subOption, setSubOption] = useState<string>(subOptionMapping.backend[0]);
    const [grade, setGrade] = useState<Grade>('junior');

    // Sequential wizard step: 1 to 4
    const [currentStep, setCurrentStep] = useState<number>(1);

    // States for generated questions
    const [interviewQuestions, setInterviewQuestions] = useState<InterviewItem[]>([]);
    const [botQuestions, setBotQuestions] = useState<BotItem[]>([]);

    // Unique ID for questions list and accordion states
    const [uniqueId, setUniqueId] = useState<string>('');
    const [isQnABlockExpanded, setIsQnABlockExpanded] = useState<boolean>(true);
    const [expandedAnswers, setExpandedAnswers] = useState<boolean[]>([]);

    // Functions to generate questions
    function createInterviewQuestions(dir: Direction, opt: string, gr: Grade): InterviewItem[] {
        const result: InterviewItem[] = [];
        for (let i = 1; i <= 10; i++) {
            result.push({
                question: `(Интервью) Вопрос №${i}: направление: ${dir}, вариант: ${opt}, грейд: ${gr}`,
                answer: `Полноценный ответ на вопрос №${i} для ${dir} (${opt}), уровень: ${gr}.`
            });
        }
        return result;
    }

    function createBotQuestions(dir: Direction, opt: string, gr: Grade): BotItem[] {
        const result: BotItem[] = [];
        for (let i = 1; i <= 10; i++) {
            result.push({
                question: `(Bot) Вопрос №${i}: направление: ${dir}, вариант: ${opt}, грейд: ${gr}`,
                answers: [
                    `Вариант 1 для вопроса №${i} (${dir}, ${opt}, ${gr})`,
                    `Вариант 2 для вопроса №${i} (${dir}, ${opt}, ${gr})`,
                    `Вариант 3 для вопроса №${i} (${dir}, ${opt}, ${gr})`,
                    `Вариант 4 для вопроса №${i} (${dir}, ${opt}, ${gr})`
                ]
            });
        }
        return result;
    }

    function generateUniqueId(): string {
        return Math.random().toString(36).substring(2, 10);
    }

    // Handler for generating questions (used in wizard panel)
    const handleGenerate = () => {
        const newUniqueId = generateUniqueId();
        setUniqueId(newUniqueId);

        if (mode === 'interview') {
            const generatedInterview = createInterviewQuestions(direction, subOption, grade);
            setInterviewQuestions(generatedInterview);
            setBotQuestions([]);
            setExpandedAnswers(Array(generatedInterview.length).fill(false));
            setIsQnABlockExpanded(true);
        } else {
            const generatedBot = createBotQuestions(direction, subOption, grade);
            setBotQuestions(generatedBot);
            setInterviewQuestions([]);
            setExpandedAnswers(Array(generatedBot.length).fill(false));
            setIsQnABlockExpanded(true);
        }
        setCurrentStep(1);
    };

    // Handler for "Сгенерировать заново" which clears the generated questions block
    const handleReset = () => {
        setInterviewQuestions([]);
        setBotQuestions([]);
        setExpandedAnswers([]);
        setIsQnABlockExpanded(false);
        setCurrentStep(1);
    };

    // Handler for downloading interview questions as a text file
    const handleDownload = () => {
        if (interviewQuestions.length === 0) return;
        let content = 'Сгенерированные вопросы (Интервью):\n\n';
        interviewQuestions.forEach((item, index) => {
            content += `Вопрос ${index + 1}: ${item.question}\n`;
            content += `Ответ: ${item.answer}\n\n`;
        });
        const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'interview_questions.txt';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    };

    // Wizard navigation handlers
    const handleNextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleDirectionChange = (dir: Direction) => {
        setDirection(dir);
        setSubOption(subOptionMapping[dir][0]);
    };

    const getSubOptionLabel = (dir: Direction) => {
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
                return '';
        }
    };

    const handleToggleAnswer = (index: number) => {
        setExpandedAnswers(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    // Update the telegram link to include the unique id of the questions list
    const telegramLink = `https://t.me/MyTestBot?start=${direction}_${subOption}_${grade}_qid-${uniqueId}`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
            {/* Header with gradient background */}
            <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">NordClan: TestHub</h1>
                    <nav className="flex space-x-6">
                        <span className="text-white hover:underline cursor-pointer">Генератор вопросов</span>
                        <span className="text-white hover:underline cursor-pointer">Банк вопросов</span>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                <h2 className="text-4xl font-light mb-8 text-center">Генератор вопросов</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Wizard Panel */}
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

                    {/* Telegram Bot Link Panel for Bot Mode */}
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
                </div>

                {/* Generated Questions Section */}
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
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-md p-4 hover:shadow transition cursor-pointer"
                                            onClick={() => handleToggleAnswer(index)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium">{item.question}</p>
                                                <span className="text-blue-600 font-bold">
                          {expandedAnswers[index] ? '–' : '+'}
                        </span>
                                            </div>
                                            {expandedAnswers[index] && (
                                                <p className="mt-3 text-gray-700">{item.answer}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Нет вопросов. Заполните все шаги и нажмите
                                        «Сгенерировать».</p>
                                )
                            ) : (
                                botQuestions.length > 0 ? (
                                    botQuestions.map((item, index) => (
                                        <div key={index}
                                             className="border border-gray-200 rounded-md p-4 hover:shadow transition">
                                            <div
                                                className="flex justify-between items-center cursor-pointer"
                                                onClick={() => handleToggleAnswer(index)}
                                            >
                                                {/* Render question as image for bot mode */}
                                                <QuestionImage text={item.question}/>
                                                <span className="text-blue-600 font-bold">
                          {expandedAnswers[index] ? '–' : '+'}
                        </span>
                                            </div>
                                            {expandedAnswers[index] && (
                                                <ul className="mt-3 ml-5 list-decimal space-y-1 text-gray-700">
                                                    {item.answers.map((answer, idx) => (
                                                        <li key={idx}>{answer}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Нет вопросов. Заполните все шаги и нажмите
                                        «Сгенерировать».</p>
                                )
                            )}

                            {/* Buttons: Download (for interview mode) and Reset */}
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
            </main>
        </div>
    );
}
