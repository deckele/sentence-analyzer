import * as React from "react";
import { FC } from "react";
import { useGetSentences } from "../../hooks/use-sentences-api";
import { SentencesListItem } from "./sentences-list-item/sentences-list-item";

interface SentencesListProps {
  search: string;
}

export const SentencesList: FC<SentencesListProps> = ({ search }) => {
  const { response: sentences } = useGetSentences(search);

  return (
    <>
    <h3>Matching Sentences</h3>
    <ul>
      {sentences.map(({ id, words }) => 
        <SentencesListItem 
          key={id} 
          sentenceId={id} 
          words={words} 
        />)
      }
    </ul>
    </>
  );
};
