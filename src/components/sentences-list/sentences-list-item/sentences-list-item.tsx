import React, { FC } from "react";
import { Span } from "./span/span";

interface SentencesListItemProps {
    id: string;
    words: string[];
}

export const SentencesListItem: FC<SentencesListItemProps> = ({ id, words }) => {
    
    return (
        <li onClick={handleSentenceClicked}>

        </li>
    );
}