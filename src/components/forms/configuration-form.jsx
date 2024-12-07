import React, {useState, useContext, useEffect} from 'react';
import { ConfigurationContext } from '../../contexts/configuration-context';
import { EquipmentContext } from '../../contexts/equipment-context';

// A form component so the user can alter the dimensions of the project
function ConfigurationForm() {

    // Context to handle the configuration state
    const {
        orientation, setOrientation,
        niche,
        distanceFloor, setDistanceFloor,
        minDistanceFloor, setMinDistanceFloor,
        nicheDepth, setNicheDepth
    } = useContext(ConfigurationContext);

    // Get screen
    const {
        screen
    } = useContext(EquipmentContext);

    // Initialize the distanceFloor with distanceToCenterX/Y
    useEffect(() => {
        const distanceToCenterX = screen?.["Width"] / 2;
        const distanceToCenterY = screen?.["Height"] / 2;

        // If screen is horisontal, distance to floor is the height
        // If screen is vertical, distance to floor is the width
        if (orientation === 'horizontal') {
            setDistanceFloor(distanceToCenterY);
            setMinDistanceFloor(distanceToCenterY);
        } else if (orientation === 'vertical') {
            setDistanceFloor(distanceToCenterX);
            setMinDistanceFloor(distanceToCenterX);
        }
    }, [screen, orientation]);

    const handleOrientationChange = (e) => {
        e.preventDefault();
        setOrientation(e.target.value);
    }

    const handleFloorChange = (e) => {
        const value = parseFloat(e.target.value);
        // From floor to 60 inches range
        if(value >= minDistanceFloor || 0 && value <= 60) {
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
                <label>Distance from Center to Floor (inches)</label>
                <input 
                    type='number' 
                    onChange={handleFloorChange}
                    value={distanceFloor || 0} 
                    min={minDistanceFloor || 0}
                    max="60"
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