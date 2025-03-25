import { useState, useEffect } from 'react';

export function useLocalStorageState(inital, key) {
    const [savedValue, setSavedValue] = useState(
        function () {
            const storedMovie = localStorage.getItem(key);
         return storedMovie ? JSON.parse(storedMovie) : inital;
        }
    )
    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(savedValue));
    },[key, savedValue])
    return [savedValue, setSavedValue]
}