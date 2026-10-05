import { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [results, setResults] = useState([]);

  const addResults = (newResults) => {
    setResults((previous) => [
      ...previous,
      ...newResults,
    ]);
  };

  return (
    <InterviewContext.Provider
      value={{
        results,
        addResults,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}