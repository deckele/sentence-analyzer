import * as React from "react";
import { FC, createContext } from "react";
import { useGetSentences } from "../../hooks/use-sentences-api";
import { SentencesListItem } from "./sentences-list-item/sentences-list-item";
import { useRegistry } from "../../hooks/use-registry";
import "./sentences-list.scss";

interface SentencesListProps {
  search: string;
}

function getRandomColor(opacity: number) {
  let randomColors = [];
  for (let i = 0; i < 3; i++) {
      randomColors.push(Math.floor(Math.random() * 255));
  }
  const color = `rgba(${randomColors.join(",")},${opacity})`;
  return color;
}
const OPACITY_CONFIG = 0.5;
export const labelColorsContext = createContext<{(key: string):string}|null>(null);
const Provider = labelColorsContext.Provider;

export const SentencesList: FC<SentencesListProps> = ({ search }) => {
  const getColor = useRegistry(getRandomColor, OPACITY_CONFIG);
  const { response: sentences } = useGetSentences(search);

  return (
    <Provider value={getColor}>
      <ul className="sentences-list">
        {sentences.map(({ id, words }) => 
          <SentencesListItem 
            key={id} 
            sentenceId={id} 
            words={words} 
          />)
        }
      </ul>
    </Provider>
  );
};
