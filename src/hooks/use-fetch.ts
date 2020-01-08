import { useEffect, useReducer, Reducer } from "react";
import { useDebounce } from "./use-debounce";

interface RequestState<T> {
  response: T;
  isLoading: boolean;
  error: any;
}
type RequestAction<T> =
  | { type: "SUCCEEDED"; response: T }
  | { type: "FAILED"; error: any }
  | { type: "REQUEST" };
type RequestReducer<T> = Reducer<RequestState<T>, RequestAction<T>>;

function stateInitializer<T>(initialValue: T): RequestState<T> {
  return {
    response: initialValue,
    isLoading: false,
    error: null
  };
}
function reducer<T>(
  state: RequestState<T>,
  action: RequestAction<T>
): RequestState<T> {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case "SUCCEEDED":
      return {
        ...state,
        response: action.response,
        isLoading: false,
        error: null
      };
    case "FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}
type UseFetchOptions<T> = {
  initialValue?: T;
  extractor?: (val: any) => T;
  debounceMS?: number;
  disable?: boolean;
} & RequestInit;

export function useFetch<T = any>(
  url: string,
  { initialValue, extractor, debounceMS, disable, body, ...rest }: UseFetchOptions<T>
) {
  const [state, dispatch] = useReducer<RequestReducer<T>, T>(reducer, initialValue as T, stateInitializer);
  const debouncedUrl = useDebounce(url, debounceMS);

  useEffect(() => {
    let cancelFetch = false;
    async function startFetch() {
      dispatch({ type: "REQUEST" });
      try {
        const response = await fetch(url, rest);
        const json = await response.json();
        if (!cancelFetch) {
          const extractedValue: T = extractor ? extractor(json) : json;
          dispatch({ type: "SUCCEEDED", response: extractedValue });
        }
      } catch (e) {
        console.log("Fetch Error: ", e);
        dispatch({ type: "FAILED", error: e });
      }
    }
    if (!disable && debouncedUrl) {
      startFetch();
    }

    return () => {
      cancelFetch = true;
    };
  }, [debouncedUrl, disable, body]);
  return state;
}
