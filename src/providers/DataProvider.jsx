import { useState } from "react";
import { DataContext } from "../hooks/DataContext";

export function DataProvider({ children }) {
  const [ideas, setIdeas] = useState([]);



 
  const value = {
    ideas
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
