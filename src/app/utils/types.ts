// Direction - Тип-перечисление для возможных направлений разработки.
export type Direction = 'backend' | 'frontend' | 'ml' | 'android';
// Grade - Тип-перечисление для уровней квалификации (грейдов) разработчиков.
export type Grade = 'junior' | 'middle' | 'senior';

// Mode - Тип-перечисление для режимов генерации вопросов (Интервью или Бот).
export type Mode = 'interview' | 'bot';

// InterviewItem - Интерфейс для объекта, представляющего вопрос для интервью.
export interface InterviewItem {
    question: string; // Текст вопроса для интервью (строка)
    answer: string;   // Ответ на вопрос для интервью (строка)
}

// BotItem - Интерфейс для объекта, представляющего вопрос для бота с вариантами ответов.
export interface BotItem {
    question: string; // Текст вопроса для бота (строка)
    answers: string[]; // Массив вариантов ответов на вопрос для бота (массив строк)
}

// subOptionMapping - Константа (mapping), связывающая направления с массивами подвариантов (технологий, фреймворков и т.д.).
// Record<Direction, string[]> - Типизация: Record, где ключи - это тип Direction, а значения - массивы строк.
export const subOptionMapping: Record<Direction, string[]> = {
    // Подварианты для направления "backend" - языки программирования
    backend: ['java', 'cpp', 'python', 'golang', 'csharp'],
    // Подварианты для направления "frontend" - фреймворки
    frontend: ['react', 'angular', 'vue'],
    // Подварианты для направления "ml" - ML-фреймворки
    ml: ['tensorflow', 'pytorch', 'sklearn'],
    // Подварианты для направления "android" - технологии Android-разработки
    android: ['kotlin', 'java']
};