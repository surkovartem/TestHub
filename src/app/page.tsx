"use client";

import React, {JSX, useState} from 'react';
import WizardPanel from './components/WizardPanel';
import TelegramBotLinkPanel from './components/TelegramBotLinkPanel';
import GeneratedQuestionsSection from './components/GeneratedQuestionsSection';
import { Direction, Grade, Mode, InterviewItem, BotItem, subOptionMapping } from './utils/types';
import { createInterviewQuestions, createBotQuestions, generateUniqueId } from './utils/questionGenerators';

export default function HomePage(): JSX.Element {
    const [mode, setMode] = useState<Mode>('interview');
    const [direction, setDirection] = useState<Direction>('backend');
    const [subOption, setSubOption] = useState<string>(subOptionMapping.backend[0]);
    const [grade, setGrade] = useState<Grade>('junior');
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [interviewQuestions, setInterviewQuestions] = useState<InterviewItem[]>([]);
    const [botQuestions, setBotQuestions] = useState<BotItem[]>([]);
    const [uniqueId, setUniqueId] = useState<string>('');
    const [isQnABlockExpanded, setIsQnABlockExpanded] = useState<boolean>(true);
    const [expandedAnswers, setExpandedAnswers] = useState<boolean[]>([]);

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

    const handleReset = () => {
        setInterviewQuestions([]);
        setBotQuestions([]);
        setExpandedAnswers([]);
        setIsQnABlockExpanded(false);
        setCurrentStep(1);
    };

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

    const telegramLink = `https://t.me/MyTestBot?start=${direction}_${subOption}_${grade}_qid-${uniqueId}`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
            <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">NordClan: TestHub</h1>
                    <nav className="flex space-x-6">
                        <span className="text-white hover:underline cursor-pointer">Генератор вопросов</span>
                        <span className="text-white hover:underline cursor-pointer">Банк вопросов</span>
                    </nav>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-10">
                <h2 className="text-4xl font-light mb-8 text-center">Генератор вопросов</h2>
                <div className="grid md:grid-cols-2 gap-6">
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

                    <TelegramBotLinkPanel mode={mode} telegramLink={telegramLink}/>
                </div>

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