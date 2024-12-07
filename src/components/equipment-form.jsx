import React, {useContext} from "react";
import { EquipmentContext } from "../contexts/equipment-context";
import { DataContext } from "../contexts/data-context";

// An equipment component to adjust the equipment of the project.
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

    const handleScreenChange = (event) => {
        event.preventDefault();
        setScreen(event.target.value);
    }

    const handleMountChange = (event) => {
        event.preventDefault();
        setMount(event.target.value);
    } 

    const handleMediaChange = (event) => {
        event.preventDefault();
        setMediaPlayer(event.target.value);
    }

    const handleReceptacleChange = (event) => {
        event.preventDefault();
        setReceptacle(event.target.value);
    }

    if(!screenData || !receptacleData || !mountData || !mediaPlayerData) return <div>Loading...</div>

    return(
        <form className="form-container">
            <div className="form-item">
                <label>Screen</label>
                <select onChange={handleScreenChange} value={screen}>
                    {screenData.map((screen, index) => (
                        <option key={index} value={screen?.['Screen MFR']}>
                            {screen?.['Screen MFR']} {screen?.['Make']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-item">
                <label>Mount</label>
                <select onChange={handleMountChange} value={mount}>
                    {mountData.map((mount, index) => (
                        <option key={index} value={mount?.['MFG. PART']}>
                            {mount?.['MFG. PART']} {mount?.['Brand']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-item">
                <label>Media Player</label>
                <select onChange={handleMediaChange} value={mediaPlayer}>
                    {mediaPlayerData.map((media, index) => (
                        <option key={index} value={media?.['MFG. PART']}>
                            {media?.['MFG. PART']} {media?.['Make']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-item">
                <label>Receptacle</label>
                <select onChange={handleReceptacleChange} value={receptacle}>
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