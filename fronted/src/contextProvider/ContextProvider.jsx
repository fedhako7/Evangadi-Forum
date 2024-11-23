import React, { createContext, useState } from 'react'
export const dataContext = createContext('')


function ContextProvider({children}) {
  const [username, setUsername] = useState(null)
  return <dataContext.Provider value={{username, setUsername}}>{children}</dataContext.Provider>
}

export default ContextProvider