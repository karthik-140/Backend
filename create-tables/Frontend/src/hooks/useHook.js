import { useState, useEffect } from "react";

const useHook = (text, delay = 1000) => {
    const [ debounceText, setDebounceText ] = useState('')
    
    useEffect(() => {
        let timeout = setTimeout(() => {
            setDebounceText(text)
        }, delay)

        return () => {
            clearTimeout(timeout)
        }
    }, [text, delay])

    return debounceText
}

export default useHook
