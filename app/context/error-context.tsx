"use client"
import { createContext, useContext, useState } from "react";

const ErrorContext = createContext({
    error: null as string | null,
    setError: (msg: string | null) => {}
});

export const ErrorProvider = ({children}: {children: React.ReactNode}) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <ErrorContext.Provider value={{error, setError}}>
            {children}
        </ErrorContext.Provider>
    );
}

export const useErrorContext = () => useContext(ErrorContext);



