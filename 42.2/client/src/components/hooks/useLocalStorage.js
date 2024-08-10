import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = null) {
  const [item, setItem] = useState(() => {
    const savedItem = localStorage.getItem(key);
    return savedItem !== null ? JSON.parse(savedItem) : initialValue;
  });

  useEffect(() => {
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
