import { createContext } from "react"

const initialValue = {
  data:[]
}

export const Context = createContext();

Provider = ({children}) => {
  return <Context.Provider>{children}</Context.Provider>
}

export default Provider;