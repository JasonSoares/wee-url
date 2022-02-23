import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, typeof setValue] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      const parsedItem = JSON.parse(item)
      return parsedItem || initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])

  return [value, setValue]
}
