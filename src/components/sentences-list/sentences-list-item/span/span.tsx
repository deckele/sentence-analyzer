import React, { FC } from "react";

interface SpanProps {
    label: string;
    words: string[];
}
export const Span: FC<SpanProps> = ({ label, words }) => {
    return (
        <span className="span-wrapper">
            <span className="span-label">{label}</span>
            {words.map(word => <span className="span-word">{word}</span>)}
        </span>
    );
}