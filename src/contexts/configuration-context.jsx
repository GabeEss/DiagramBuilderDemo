import { createContext, useState, useEffect } from "react";

// Context to hold the user's project configurations.
export const ConfigurationContext = createContext();

export const ConfigurationProvider = ({children}) => {
    const [orientation, setOrientation] = useState("horizontal");
    const [niche, setNiche] = useState("flat");
    const [minDistanceFloor, setMinDistanceFloor] = useState(0);
    const [distanceFloor, setDistanceFloor] = useState(0);
    const [nicheDepth, setNicheDepth] = useState(0);

    // The scaling that needs to be done to fit all the screens within the pdf container
    const [scalingFactor, setScalingFactor] = useState(0);
    // The totalNicheDepth will include:
    // Screen depth + Max(Media player depth, Mount depth) + Depth variance
    const [totalNicheDepth, setTotalNicheDepth] = useState(0);

    useEffect(() => {
        if(niche === "flat") setNicheDepth(0);
    }, [niche]);

    useEffect(() => {
        if(nicheDepth > 0) setNiche("niche");
        if(nicheDepth == 0) setNiche('flat');
    }, [nicheDepth]);
    
    return(
        <ConfigurationContext.Provider value={{
            orientation, setOrientation,
            niche, setNiche,
            distanceFloor, setDistanceFloor,
            minDistanceFloor, setMinDistanceFloor,
            nicheDepth, setNicheDepth,
            scalingFactor, setScalingFactor,
            totalNicheDepth, setTotalNicheDepth
        }}>
            {children}
        </ConfigurationContext.Provider>
    )
}