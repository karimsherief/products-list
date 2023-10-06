import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, intailValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const json = localStorage.getItem('products')
        if (json != null) {
            return JSON.parse(json)
        }
        if (typeof intailValue === 'function') {
            return (intailValue as () => T)()
        }
        return intailValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}