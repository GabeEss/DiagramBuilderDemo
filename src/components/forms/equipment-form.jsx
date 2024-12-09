import React, {useContext, useEffect} from "react";
import { EquipmentContext } from "../../contexts/equipment-context";
import { DataContext } from "../../contexts/data-context";
import { ConfigurationContext } from "../../contexts/configuration-context";

// A form component to adjust the equipment of the project.
function EquipmentForm() {

    // Context to handle the equipment state
    const {
        screen, setScreen,
        mount, setMount,
        mediaPlayer, setMediaPlayer,
        receptacle, setReceptacle
    } = useContext(EquipmentContext);

    // Context to populate dropdown menus
    const {
        mediaPlayerData,
        mountData,
        receptacleData,
        screenData
    } = useContext(DataContext);

    // Context to adjust floor distance with screen height and screen scale
    const {
        setDistanceFloor, setMinDistanceFloor, setScalingFactor
    } = useContext(ConfigurationContext);

    // Handles user screen selection
    const handleScreenChange = (event) => {
        event.preventDefault();
        const selectedScreenMFR = event.target.value;

        // Find the screen object with the screen mfr
        const selectedScreen = screenData.find(screen => 
            screen['Screen MFR'] === selectedScreenMFR.valueOf());

        // Update screen state
        setScreen(selectedScreen);
    }

    const handleMountChange = (event) => {
        event.preventDefault();
        const selectedMountMFG = event.target.value;

        // Find mount object
        const selectedMount = mountData.find(mount => 
            mount['MFG. PART'] === selectedMountMFG.valueOf());
        
        setMount(selectedMount);
    } 

    const handleMediaChange = (event) => {
        event.preventDefault();
        const selectedMediaMFG = event.target.value;

        // Find media player object
        const selectedMedia = mediaPlayerData.find(media => 
            media['MFG. PART'] === selectedMediaMFG.valueOf());
        
        setMediaPlayer(selectedMedia);
    }

    const handleReceptacleChange = (event) => {
        event.preventDefault();
        const selectedReceptacleMFG = event.target.value;

        // Find receptacle object
        const selectedReceptacle = receptacleData.find(receptacle => 
            receptacle['MFG. PART'] === selectedReceptacleMFG.valueOf());

        setReceptacle(selectedReceptacle);
    }

    // Initialize equipment with the first object on mount
    useEffect(() => {
        setScreen(screenData[0]);
        setMediaPlayer(mediaPlayerData[0]);
        setMount(mountData[0]);
        setReceptacle(receptacleData[0]);
        setMinDistanceFloor(screenData[0]?.["Height"] / 2);
        setDistanceFloor(screenData[0]?.["Height"] / 2);
        setScalingFactor(6);
    }, []);

    return(
        <form className="form-container">
            <div className="form-item">
                <label>Screen</label>
                <select onChange={handleScreenChange} value={screen?.['Screen MFR']}>
                    {screenData.map((screen, index) => (
                        <option key={index} value={screen?.['Screen MFR']}>
                            {screen?.['Screen MFR']} {screen?.['Make']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-item">
                <label>Mount</label>
                <select onChange={handleMountChange} value={mount?.['MFG. PART']}>
                    {mountData.map((mount, index) => (
                        <option key={index} value={mount?.['MFG. PART']}>
                            {mount?.['MFG. PART']} {mount?.['Brand']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-item">
                <label>Media Player</label>
                <select onChange={handleMediaChange} value={mediaPlayer?.['MFG. PART']}>
                    {mediaPlayerData.map((media, index) => (
                        <option key={index} value={media?.['MFG. PART']}>
                            {media?.['MFG. PART']} {media?.['Make']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-item">
                <label>Receptacle</label>
                <select onChange={handleReceptacleChange} value={receptacle?.['MFG. PART']}>
                    {receptacleData.map((receptacle, index) => (
                        <option key={index} value={receptacle?.['MFG. PART']}>
                            {receptacle?.['MFG. PART']} {receptacle?.['Brand']}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    )
}

export default EquipmentForm;