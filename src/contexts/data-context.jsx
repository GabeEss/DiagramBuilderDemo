import { createContext, useState, useEffect } from "react";
import { fetchCsvData } from "../utils/parse-data";
import csvMediaPlayer from "../data/media-player.csv";
import csvMounts from "../data/mounts.csv";
import csvReceptacleBox from "../data/receptacle-box.csv";
import csvScreen from "../data/screen.csv";

// This file stores the parsed csv data when the page loads.
export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [mediaPlayerData, setMediaPlayerData] = useState("");
    const [mountData, setMountData] = useState("");
    const [receptacleData, setReceptacleData] = useState("");
    const [screenData, setScreenData] = useState("");

    // Get and set data on mount. 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Don't set unless all the data has been parsed and returned properly.
                const [media, mount, receptacle, screen] = await Promise.all([
                    fetchCsvData(csvMediaPlayer),
                    fetchCsvData(csvMounts),
                    fetchCsvData(csvReceptacleBox),
                    fetchCsvData(csvScreen),
                ]);
                    

                setScreenData(screen);
                setReceptacleData(receptacle);
                setMountData(mount);
                setMediaPlayerData(media);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return(
        <DataContext.Provider value={{
            mediaPlayerData,
            mountData,
            receptacleData,
            screenData,
        }}>
            {children}
        </DataContext.Provider>
    )
}