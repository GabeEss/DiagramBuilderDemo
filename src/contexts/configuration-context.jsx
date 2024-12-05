import { createContext, useState } from "react";

// Context to hold the user's project configurations.
export const ConfigurationContext = createContext();

export const ConfigurationProvider = ({children}) => {
    const [orientation, setOrientation] = useState("vertical");
    const [niche, setNiche] = useState("flat");
    const [distanceFloor, setDistanceFloor] = useState(10);
    const [nicheDepth, setNicheDepth] = useState(0);
    
    return(
        <ConfigurationContext.Provider value={{
            orientation, setOrientation,
            niche, setNiche,
            distanceFloor, setDistanceFloor,
            nicheDepth, setNicheDepth
        }}>
            {children}
        </ConfigurationContext.Provider>
    )
}