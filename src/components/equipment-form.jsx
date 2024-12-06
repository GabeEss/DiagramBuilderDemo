import React, {useContext} from "react";
import { EquipmentContext } from "../contexts/equipment-context";

// An equipment component to adjust the equipment of the project.
function EquipmentForm() {
    
    const {
        screen, setScreen,
        mount, setMount,
        mediaPlayer, setMediaPlayer,
        receptacle, setReceptacle
    } = useContext(EquipmentContext);

    return(
        <div className="form-container">
            <div className="form-item">
                <label>Screen</label>
                <select>

                </select>
            </div>
            <div className="form-item">
                <label>Mount</label>
                <select>

                </select>
            </div>
            <div className="form-item">
                <label>Media Player</label>
                <select>

                </select>
            </div>
            <div className="form-item">
                <label>Receptacle</label>
                <select>

                </select>
            </div>
        </div>
    )
}

export default EquipmentForm;