import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
}
