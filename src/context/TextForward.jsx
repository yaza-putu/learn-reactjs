import {createContext, useState} from "react";

const TextForwardContext = createContext()

const TextForwardProvider = ({children}) => {
    const [text, setText] = useState("")
    console.log(text)
    return (
       <TextForwardContext.Provider value={{text, setText}}>
           {children}
       </TextForwardContext.Provider>
    )
}

export const TexForwardContext = TextForwardContext
export default TextForwardProvider