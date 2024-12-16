import React, {useContext} from 'react';
import { EquipmentContext } from '../../contexts/equipment-context';
import { ConfigurationContext } from '../../contexts/configuration-context';

// A component to display the project's screen specifications.
function ScreenDimensionDisplay() {
    const {
        screen,
    } = useContext(EquipmentContext);

    const {
        totalNicheDepth,
        distanceFloor,
        orientation
    } = useContext(ConfigurationContext);

    return(
        <div className='dimension-display'>
                <h3 className='dimension-display-header'>Screen Dimensions</h3>
                <div className='dimension-display-item'>
                    <label>Height</label>
                    <p>{orientation === "horizontal" ? Number(screen?.['Height']).toFixed(2) : Number(screen?.['Width']).toFixed(2)}"</p>
                </div>
                <div className='dimension-display-item'>
                    <label>Width</label>
                    <p>{orientation === "horizontal" ? Number(screen?.['Width']).toFixed(2) : Number(screen?.['Height']).toFixed(2)}"</p>
                </div>
                <div className='dimension-display-item'>
                    <label>Floor Line</label>
                    <p>{Number(distanceFloor + totalNicheDepth/4).toFixed(2) }"</p>
                </div>
            </div>
    )
}

export default ScreenDimensionDisplay;