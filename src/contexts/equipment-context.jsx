import { createContext, useState } from "react";

// Context to hold the user's inputs from the equipment form
export const EquipmentContext = createContext();

export const EquipmentProvider = ({children}) => {
    const [screen, setScreen] = useState();
    const [mount, setMount] = useState();
    const [mediaPlayer, setMediaPlayer] = useState();
    const [receptacle, setReceptacle] = useState();

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