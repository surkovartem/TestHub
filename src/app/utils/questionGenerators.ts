// Импорт типов Direction, Grade, InterviewItem, BotItem из файла types.ts
import {Direction, Grade, InterviewItem, BotItem} from './types';

// Функция createInterviewQuestions: генерирует массив объектов InterviewItem (вопросы для интервью).
export function createInterviewQuestions(dir: Direction, opt: string, gr: Grade): InterviewItem[] {
    // Инициализация пустого массива для хранения объектов InterviewItem
    const result: InterviewItem[] = [];
    // Цикл для создания 10 вопросов для интервью
    for (let i = 1; i <= 10; i++) {
        // Добавление нового объекта InterviewItem в массив result
        result.push({
            // Формирование текста вопроса, включающего номер, направление, вариант и грейд
            question: `(Интервью) Вопрос №${i}: направление: ${dir}, вариант: ${opt}, грейд: ${gr}`,
            // Формирование текста-заглушки для ответа, также включающего параметры вопроса
            answer: `Полноценный ответ на вопрос №${i} для ${dir} (${opt}), уровень: ${gr}.`
        });
    }
    // Возвращение массива сгенерированных объектов InterviewItem
    return result;
}

// Функция createBotQuestions: генерирует массив объектов BotItem (вопросы для бота с вариантами ответов).
export function createBotQuestions(dir: Direction, opt: string, gr: Grade): BotItem[] {
    // Инициализация пустого массива для хранения объектов BotItem
    const result: BotItem[] = [];
    // Цикл для создания 10 вопросов для бота
    for (let i = 1; i <= 10; i++) {
        // Добавление нового объекта BotItem в массив result
        result.push({
            // Формирование текста вопроса для бота, включающего номер, направление, вариант и грейд
            question: `(Bot) Вопрос №${i}: направление: ${dir}, вариант: ${opt}, грейд: ${gr}`,
            // Массив вариантов ответов для вопроса бота
            answers: [
                // Вариант ответа 1 (заглушка, включает параметры вопроса)
                `Вариант 1 для вопроса №${i} (${dir}, ${opt}, ${gr})`,
                // Вариант ответа 2 (заглушка, включает параметры вопроса)
                `Вариант 2 для вопроса №${i} (${dir}, ${opt}, ${gr})`,
                // Вариант ответа 3 (заглушка, включает параметры вопроса)
                `Вариант 3 для вопроса №${i} (${dir}, ${opt}, ${gr})`,
                // Вариант ответа 4 (заглушка, включает параметры вопроса)
                `Вариант 4 для вопроса №${i} (${dir}, ${opt}, ${gr})`
            ]
        });
    }
    // Возвращение массива сгенерированных объектов BotItem
    return result;
}

// Функция generateUniqueId: генерирует уникальный строковый идентификатор.
export function generateUniqueId(): string {
    // Генерация случайной строки на основе Math.random и преобразование в base36 для краткости
    return Math.random().toString(36).substring(2, 10);
}