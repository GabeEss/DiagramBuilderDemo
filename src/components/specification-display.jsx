import React, {useContext} from 'react';
import { EquipmentContext } from '../contexts/equipment-context';

// A component to display the project's specifications.
function SpecificationDisplay() {
    const {
        screen,
        mount,
        mediaPlayer,
        receptacle
    } = useContext(EquipmentContext);

    return(
        <div className='specification-display'>
            <div className='display-item'>
                <label>Screen Specifications</label>
                <div>
                    <label>Height (in): </label>
                    <p>{screen?.['Height']}</p>
                </div>
                <div>
                    <label>Width (in): </label>
                    <p>{screen?.['Width']}</p>
                </div>
                <div>
                    <label>Depth (in): </label>
                    <p>{screen?.['Depth']}</p>
                </div>
            </div>
            <div className='display-item'>
                <label>Mount Specifications</label>
                <div>
                    <label>Height (in): </label>
                    <p>{mount?.['Height (in)']}</p>
                </div>
                <div>
                    <label>Width (in): </label>
                    <p>{mount?.['Width (in)']}</p>
                </div>
                <div>
                    <label>Depth (in): </label>
                    <p>{mount?.['Depth (in)']}</p>
                </div>
            </div>
            <div className='display-item'>
                <label>Media Player Specifications</label>
                <div>
                    <label>Height (in): </label>
                    <p>{mediaPlayer?.['Height']}</p>
                </div>
                <div>
                    <label>Width (in): </label>
                    <p>{mediaPlayer?.['Width']}</p>
                </div>
                <div>
                    <label>Depth (in): </label>
                    <p>{mediaPlayer?.['Depth']}</p>
                </div>
            </div>
            <div className='display-item'>
                <label>Receptacle Specifications</label>
                <div>
                    <label>Height (in): </label>
                    <p>{receptacle?.['Height (in)']}</p>
                </div>
                <div>
                    <label>Width (in): </label>
                    <p>{receptacle?.['Width (in)']}</p>
                </div>
                <div>
                    <label>Depth (in): </label>
                    <p>{receptacle?.['Depth (in)']}</p>
                </div>
            </div>
        </div>
    )
}

export default SpecificationDisplay;