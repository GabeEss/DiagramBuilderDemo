import React, {useContext} from 'react';
import { EquipmentContext } from '../contexts/equipment-context';
import { ConfigurationContext } from '../contexts/configuration-context';

// A component to display the project's specifications.
function SpecificationDisplay() {
    const {
        screen,
        mount,
        mediaPlayer,
        receptacle
    } = useContext(EquipmentContext);

    const {
        nicheDepth,
        minDistanceFloor
    } = useContext(ConfigurationContext);

    return(
        <div className='specification-display spec' style={{
            // position: "absolute",
            display: 'flex',
            flexDirection: "column"
        }}>
            <div className='display-container'>
                <label>Screen Specifications</label>
                <div className='display-item'>
                    <label>Height (in): </label>
                    <p>{screen?.['Height']}</p>
                </div>
                <div className='display-item'>
                    <label>Width (in): </label>
                    <p>{screen?.['Width']}</p>
                </div>
                <div className='display-item'>
                    <label>Depth (in): </label>
                    <p>{screen?.['Depth']}</p>
                </div>
            </div>
            <div className='display-container'>
                <label>Mount Specifications</label>
                <div className='display-item'>
                    <label>Height (in): </label>
                    <p>{mount?.['Height (in)']}</p>
                </div>
                <div className='display-item'>
                    <label>Width (in): </label>
                    <p>{mount?.['Width (in)']}</p>
                </div>
                <div className='display-item'>
                    <label>Depth (in): </label>
                    <p>{mount?.['Depth (in)']}</p>
                </div>
            </div>
            <div className='display-container'>
                <label>Media Player Specifications</label>
                <div className='display-item'>
                    <label>Height (in): </label>
                    <p>{mediaPlayer?.['Height']}</p>
                </div>
                <div className='display-item'>
                    <label>Width (in): </label>
                    <p>{mediaPlayer?.['Width']}</p>
                </div>
                <div className='display-item'>
                    <label>Depth (in): </label>
                    <p>{mediaPlayer?.['Depth']}</p>
                </div>
            </div>
            <div className='display-container'>
                <label>Receptacle Specifications</label>
                <div className='display-item'>
                    <label>Height (in): </label>
                    <p>{receptacle?.['Height (in)']}</p>
                </div>
                <div className='display-item'>
                    <label>Width (in): </label>
                    <p>{receptacle?.['Width (in)']}</p>
                </div>
                <div className='display-item'>
                    <label>Depth (in): </label>
                    <p>{receptacle?.['Depth (in)']}</p>
                </div>
            </div>
            <div className='display-container'>
                <label>Other Specifications</label>
                <div className='display-item'>
                    <label>Variable Niche (in): </label>
                    <p>{nicheDepth}</p>
                </div>
                <div className='display-item'>
                    <label>Minimum Floor Distance (in): </label>
                    <p>{minDistanceFloor}</p>
                </div>
            </div>
        </div>
    )
}

export default SpecificationDisplay;