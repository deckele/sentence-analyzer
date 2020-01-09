import React, { FC, useContext } from "react";
import classNames from "classnames";
import "./span.scss";
import { labelColorsContext } from "../../sentences-list";

interface SpanProps {
    label?: string;
    words: string[];
}
export const Span: FC<SpanProps> = ({ label, words }) => {
    const getColorForLabel = useContext(labelColorsContext);
    const color = label && getColorForLabel?.(label);
    const spanWords = words.join(" ");
    return (
        <span className={classNames(
            "span-wrapper", 
            {"labeled-span": !!label})}
        >
            {label && <span className="span-label" style={{backgroundColor: color}}>{label}</span>}
            <span className="span-words">{spanWords}</span>
        </span>
    );
}