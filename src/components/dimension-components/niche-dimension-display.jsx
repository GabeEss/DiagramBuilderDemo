import React, {useContext} from 'react';
import { EquipmentContext } from '../../contexts/equipment-context';
import { ConfigurationContext } from '../../contexts/configuration-context';

// A component to display the project's niche specifications.
function NicheDimensionDisplay() {
    const {
        screen,
        mount,
        mediaPlayer,
        receptacle
    } = useContext(EquipmentContext);

    const {
        totalNicheDepth,
        minDistanceFloor
    } = useContext(ConfigurationContext);

    return(
        <div className='dimension-display'>
            <h3 className='dimension-display-header'>Niche Dimensions</h3>
            <div className='dimension-display-item'>
                <label>Height</label>
                <p>{(Number(screen?.['Height']) + (totalNicheDepth/2)).toFixed(2) || 0}"</p>
            </div>
            <div className='dimension-display-item'>
                <label>Width</label>
                <p>{(Number(screen?.['Width']) + (totalNicheDepth/2)).toFixed(2) || 0}"</p>
            </div>
            <div className='dimension-display-item'>
                <label>Depth</label>
                <p>{(Number(totalNicheDepth/4)).toFixed(2)}"</p>
            </div>
        </div>
    )
}

export default NicheDimensionDisplay;