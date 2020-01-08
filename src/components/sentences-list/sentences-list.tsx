import * as React from "react";
import { FC } from "react";
import { useFetch } from "../../hooks/use-fetch";
import { Sentence } from "../../contracts";
interface SentencesListProps {
  search: string;
}
const DEBOUNCE_MS_CONFIG = 300;
export const SentencesList: FC<SentencesListProps> = ({ search }) => {
  const uri = `http://35.246.136.197:8080/api/sentences/?word=${search}`;
  const { response: sentences } = useFetch<Sentence[]>(uri, {
    initialValue: [],
    extractor: res => res.list,
    debounceMS: DEBOUNCE_MS_CONFIG
  });
  return <ul>{sentences}</ul>;
};
