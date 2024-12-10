import { createContext, useState } from "react";

// Context to hold the user's inputs from the description form
export const DescriptionContext = createContext();
    
export const DescriptionProvider = ({children}) => {
    const [title, setTitle] = useState("Title");
    const [designer, setDesigner] = useState("Designer Name");
    const [department, setDepartment] = useState("Department");
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