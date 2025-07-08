import { useContext } from "react";
import { ClassesContext } from "../contexts/ClassesContext";

export function useClasses() {
  const classes = useContext(ClassesContext);

  if (!classes) {
    throw new Error("useClasses must be used within a ClassesContext.Provider");
  }

  return classes;
}
