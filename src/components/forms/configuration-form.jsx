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
            setMaxHeight(distanceToCenterY * 4);
        } else if (orientation === 'vertical') {
            setDistanceFloor(distanceToCenterX);
            setMinDistanceFloor(distanceToCenterX);
            setMaxHeight(distanceToCenterX * 2.5);
        }
    }, [screen, orientation]);

    const handleOrientationChange = (value) => {
        setOrientation(value);
    }

    const handleFloorChange = (e) => {
        const value = parseFloat(e.target.value);
        // From floor to 55 inches range, removing the maximum will cause the page to stretch
        // with larger distance inputs
        if(value >= minDistanceFloor && value <= maxHeight) {
            setDistanceFloor(value);
        }
    }

    const handleNicheChange = (value) => {
        setNiche(value);
    }
    
    // Changing the depth will change the value of the wall installation in the config context
    const handleDepthChange = (e) => {
        const value = parseFloat(e.target.value);

        // From 0 - 2 inches range
        if(value >= .5 && value <= 2) {
            setNicheDepth(value);
        }
    }

    return(
        <form className="configuration-container">
            <div className="configuration-item">
                <button
                    type='button'
                    className={orientation === "horizontal" ? "selected" : ""}
                    onClick={() => handleOrientationChange("horizontal")}
                >
                    Horizontal
                </button>
                <button
                    type='button'
                    className={orientation === "vertical" ? "selected" : ""}
                    onClick={() => handleOrientationChange("vertical")}
                >
                    Vertical
                </button>
            </div>
            <div className="configuration-item">
                <button
                    type='button'
                    className={niche === "flat" ? "selected" : ""}
                    onClick={() => handleNicheChange("flat")}
                >
                    Flat
                </button>
                <button
                    type='button'
                    className={niche === "niche" ? "selected" : ""}
                    onClick={() => handleNicheChange("niche")}
                >
                    Niche
                </button>
            </div>
            <div className="configuration-item">
                <label>Niche Depth</label>
                <input 
                    type="number" 
                    onChange={handleDepthChange} 
                    value={nicheDepth || 0} 
                    min=".5"
                    max="2"
                    step={.5}
                    className={niche === "flat" ? "disabled" : ""}
                    disabled={niche === 'flat'}
                />
            </div>
            <div className="configuration-item">
                <label>Floor Distance</label>
                <input 
                    type='number' 
                    onChange={handleFloorChange}
                    value={distanceFloor || 0} 
                    min={minDistanceFloor || 0}
                    max={maxHeight || 0}
                />
            </div>

        </form>
    )
}

export default ConfigurationForm;