import { createContext, useState } from "react";

// Context to hold the user's inputs from the description form
export const DescriptionContext = createContext();
    
export const DescriptionProvider = ({children}) => {
    const [title, setTitle] = useState("");
    const [designer, setDesigner] = useState("");
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState((new Date().toISOString().split('T')[0]));

    return(
        <DescriptionContext.Provider value={{
            title, setTitle,
            designer, setDesigner,
            department, setDepartment,
            date, setDate
        }}>
            {children}
        </DescriptionContext.Provider>
    )
}