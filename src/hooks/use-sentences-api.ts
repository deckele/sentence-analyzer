import { useFetch } from "./use-fetch";
import { Sentence, SentenceSpan } from "../contracts";

const DEBOUNCE_MS_CONFIG = 300;
const BASE_URI = "http://35.246.136.197:8080/api/sentences";

export function useGetSentences(search: string) {
    const uri = `${BASE_URI}/?word=${search}`;
    return useFetch<Sentence[]>(uri, {
        initialValue: [],
        extractor: res => res.list,
        debounceMS: DEBOUNCE_MS_CONFIG
    });
}

export function useGetSentenceSpans(sentenceId: string, disableFetch: boolean) {
    const uri = `${BASE_URI}/${sentenceId}/annotate`;
    return useFetch<SentenceSpan[]>(uri, {
        method: "POST",
        initialValue: [],
        extractor: res => res.spans,
        disable: disableFetch
    });
}