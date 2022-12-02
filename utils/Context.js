import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({});
  const setGlobalState = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <Context.Provider value={[state, setGlobalState]}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
