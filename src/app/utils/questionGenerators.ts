import { Direction, Grade, InterviewItem, BotItem } from './types';

export function createInterviewQuestions(dir: Direction, opt: string, gr: Grade): InterviewItem[] {
    const result: InterviewItem[] = [];
    for (let i = 1; i <= 10; i++) {
        result.push({
            question: `(Интервью) Вопрос №${i}: направление: ${dir}, вариант: ${opt}, грейд: ${gr}`,
            answer: `Полноценный ответ на вопрос №${i} для ${dir} (${opt}), уровень: ${gr}.`
        });
    }
    return result;
}

export function createBotQuestions(dir: Direction, opt: string, gr: Grade): BotItem[] {
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

export function generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 10);
}