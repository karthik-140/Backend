import { useState, useEffect } from "react";

const useDebounce = (value, delay = 250) => {
	const [debounceValue, setDebounceValue] = useState(value)
  
	useEffect(() => {
		let timeout = setTimeout(() => {
			setDebounceValue(value)
		}, delay)
		return () => {
			clearTimeout(timeout)
		}
	}, [value, delay])

	return debounceValue
}

export default useDebounce
