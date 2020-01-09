import { useRef } from "react";

export function useRegistry<T>(valueFactory: (...args: any[]) => T, ...args: any[]) {
    const registry = useRef<{[key: string]: T}>({});
    function getValue(key: string) {
        const val = registry.current[key];
        if (val !== undefined && val !== null) {
            return val;
        }
        const newEntry = valueFactory(...args);
        registry.current[key] = newEntry;
        return newEntry;
    }
    return getValue;
}