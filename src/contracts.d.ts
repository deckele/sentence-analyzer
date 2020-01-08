export interface Sentence {
    id: string;
    words: string[];
}

export interface SentenceSpan {
    label: string;
    start: number;
    end: number;
}