import React, { FC, useState, useMemo } from "react";
import { Span } from "./span/span";
import { useGetSentenceSpans } from "../../../hooks/use-sentences-api";
import { SentenceSpan } from "../../../contracts";
import classNames from "classnames";
import "./sentences-list-item.scss";
import { Spinner } from "../../spinner/spinner";

interface SentencesListItemProps {
    sentenceId: string;
    words: string[];
}

function constructAnotatedSentence(spans: SentenceSpan[], words: string[]) {
    if(!spans || spans.length === 0) {
        return <Span words={words} />;
    }
    const spansToRender = [];
    let previouseSpanEnd = 0;
    for (let i = 0; i < spans.length; i++) {
        const { label, start, end } = spans[i];
        const notAnotatedSpan = words.slice(previouseSpanEnd, start);
        if (notAnotatedSpan.length > 0) {
            spansToRender.push(<Span key={previouseSpanEnd} words={notAnotatedSpan} />);
        }
        const anotatedSpan = words.slice(start, end);
        if (anotatedSpan.length > 0) {
            spansToRender.push(<Span key={start} words={anotatedSpan} label={label} />);
        }
        if(i === spans.length - 1) {
            const notAnotatedSpanAtEnd = words.slice(end);
            if (notAnotatedSpanAtEnd.length > 0) {
                spansToRender.push(<Span key={end} words={notAnotatedSpanAtEnd} />);
            }
        }
        previouseSpanEnd = end;
    }
    return spansToRender;
}

export const SentencesListItem: FC<SentencesListItemProps> = ({ sentenceId, words }) => {
    const [ disableFetch, setDisableFetch ] = useState(true);
    const [ showAnotations, setShowAnotations ] = useState(false);
    const { response: spans, isLoading } = useGetSentenceSpans(sentenceId, disableFetch);
    console.log(isLoading)
    const spansToRender = useMemo(() => 
        constructAnotatedSentence(spans, words), 
        [spans, words]
    );

    function handleSentenceClicked() {
        setDisableFetch(false);
        setShowAnotations(prevShow => !prevShow);
    }

    const listItemClassName = classNames(
        "sentence-list-item", 
        {"anotations-hidden": !showAnotations}
    );

    return (
        <li className={listItemClassName} onClick={handleSentenceClicked}>
            {isLoading ? <Spinner /> : null}
            {spansToRender}
        </li>
    );
}