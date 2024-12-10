import React, {useState, useContext, useEffect} from 'react';
import { ConfigurationContext } from '../../contexts/configuration-context';
import { EquipmentContext } from '../../contexts/equipment-context';

// A form component so the user can alter the dimensions of the project
function ConfigurationForm() {

    // Context to handle the configuration state
    const {
        orientation, setOrientation,
        niche, setNiche,
        distanceFloor, setDistanceFloor,
        minDistanceFloor, setMinDistanceFloor,
        nicheDepth, setNicheDepth,
    } = useContext(ConfigurationContext);

    const [maxHeight, setMaxHeight] = useState(55);

    // Get screen
    const {
        screen,
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

            // Arbitrary max height
            if(minDistanceFloor > 55)
                setMaxHeight(minDistanceFloor + 55);
            else
                setMaxHeight(55);
        } else if (orientation === 'vertical') {
            setDistanceFloor(distanceToCenterX);
            setMinDistanceFloor(distanceToCenterX);

            // Arbitrary max height
            if(minDistanceFloor > 55)
                setMaxHeight(minDistanceFloor + 55);
            else
                setMaxHeight(55);
        }
    }, [screen, orientation]);

    const handleOrientationChange = (e) => {
        e.preventDefault();
        setOrientation(e.target.value);
    }

    const handleFloorChange = (e) => {
        const value = parseFloat(e.target.value);
        // From floor to 55 inches range, removing the maximum will cause the page to stretch
        // with larger distance inputs
        if(value >= minDistanceFloor && value <= maxHeight) {
            setDistanceFloor(value);
        }
    }

    const handleNicheChange = (e) => {
        setNiche(e.target.value);
    }
    
    // Changing the depth will change the value of the wall installation in the config context
    const handleDepthChange = (e) => {
        const value = parseFloat(e.target.value);

        // From 0 - 5 inches range
        if(value >= 6 && value <= 8) {
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
                <select value={niche} onChange={handleNicheChange}>
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
                    max={maxHeight}
                />
            </div>
            <div className="form-item">
                <label>Niche Depth (inches)</label>
                <input 
                    type="number" 
                    onChange={handleDepthChange} 
                    value={nicheDepth} 
                    min="6"
                    max="8"
                />
            </div>
        </form>
    )
}

export default ConfigurationForm;