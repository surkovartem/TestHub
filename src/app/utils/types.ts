export type Direction = 'backend' | 'frontend' | 'ml' | 'android';
export type Grade = 'junior' | 'middle' | 'senior';
export type Mode = 'interview' | 'bot';

export interface InterviewItem {
    question: string;
    answer: string;
}

export interface BotItem {
    question: string;
    answers: string[];
}

export const subOptionMapping: Record<Direction, string[]> = {
    backend: ['java', 'cpp', 'python', 'golang', 'csharp'],
    frontend: ['react', 'angular', 'vue'],
    ml: ['tensorflow', 'pytorch', 'sklearn'],
    android: ['kotlin', 'java']
};