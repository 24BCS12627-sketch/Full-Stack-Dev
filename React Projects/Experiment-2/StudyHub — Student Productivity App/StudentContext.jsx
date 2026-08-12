import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const student = {
    name: "Priya Nair",
    email: "priya@gmail.com",
    year: "3rd Year"
  };

  return (
    <StudentContext.Provider
      value={{ student, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useUser() {
  return useContext(StudentContext);
}