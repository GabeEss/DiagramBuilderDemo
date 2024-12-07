import { createContext, useState, useContext } from "react";
import { DataContext } from "./data-context";

// Context to hold the user's inputs from the equipment form
export const EquipmentContext = createContext();

export const EquipmentProvider = ({children}) => {
    const {
        mediaPlayerData,
        mountData,
        receptacleData,
        screenData
    } = useContext(DataContext);

    // Initialize with the first object in the array
    const [screen, setScreen] = useState(screenData[0]);
    const [mount, setMount] = useState(mountData[0]);
    const [mediaPlayer, setMediaPlayer] = useState(mediaPlayerData[0]);
    const [receptacle, setReceptacle] = useState(receptacleData[0]);

    return(
        <EquipmentContext.Provider value={{
            screen, setScreen,
            mount, setMount,
            mediaPlayer, setMediaPlayer,
            receptacle, setReceptacle
        }}>
            {children}
        </EquipmentContext.Provider>
    )
}