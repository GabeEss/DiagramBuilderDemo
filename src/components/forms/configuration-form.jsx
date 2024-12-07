import React, {useContext} from 'react';
import { ConfigurationContext } from '../../contexts/configuration-context';

// A form component so the user can alter the dimensions of the project
function ConfigurationForm() {

    // Context to handle the configuration state
    const {
        orientation, setOrientation,
        niche,
        distanceFloor, setDistanceFloor,
        nicheDepth, setNicheDepth
    } = useContext(ConfigurationContext);

    const handleOrientationChange = (e) => {
        e.preventDefault();
        setOrientation(e.target.value);
    }

    const handleFloorChange = (e) => {
        const value = parseFloat(e.target.value);

        // From 0 - 50 inches range
        if(value >= 0 && value <= 50) {
            setDistanceFloor(value);
        }
    }
    
    // Changing the depth will change the value of the wall installation in the config context
    const handleDepthChange = (e) => {
        const value = parseFloat(e.target.value);

        // From 0 - 5 inches range
        if(value >= 0 && value <= 5) {
            setNicheDepth(value);
        }
    }

    return(
        <form className="form-container">
            <div className="form-item">
                <label>Screen Orientation</label>
                <select onChange={handleOrientationChange} value={orientation}>
                    <option value={"horizontal"}>Horizontal</option>
                    <option value={"vertical"}>Vertical</option>
                </select>
            </div>
            <div className="form-item">
                <label>Wall Installation</label>
                <select value={niche} disabled>
                    <option value={"flat"}>Flat</option>
                    <option value={"niche"}>Niche</option>
                </select>
            </div>
            <div className="form-item">
                <label>Distance to Floor (inches)</label>
                <input 
                    type='number' 
                    onChange={handleFloorChange} 
                    value={distanceFloor} 
                    min="0"
                    max="50"
                />
            </div>
            <div className="form-item">
                <label>Niche Depth (inches)</label>
                <input 
                    type="number" 
                    onChange={handleDepthChange} 
                    value={nicheDepth} 
                    min="0"
                    max="5"
                />
            </div>
        </form>
    )
}

export default ConfigurationForm;