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
        <div className='specification-display'>
            <div className='display-container'>
                <label className='specification-label'>Screen Dimensions (in)</label>
                <div className='display-items'>
                    <div className='display-item'>
                        <label>H: </label>
                        <p>{screen?.['Height']}</p>
                    </div>
                    <div className='display-item'>
                        <label>W: </label>
                        <p>{screen?.['Width']}</p>
                    </div>
                    <div className='display-item'>
                        <label>D: </label>
                        <p>{screen?.['Depth']}</p>
                    </div>
                </div>
            </div>
            <div className='display-container'>
                <label className='specification-label'>Mount Dimensions (in)</label>
                <div className='display-items'>
                    <div className='display-item'>
                        <label>H: </label>
                        <p>{mount?.['Height (in)']}</p>
                    </div>
                    <div className='display-item'>
                        <label>W: </label>
                        <p>{mount?.['Width (in)']}</p>
                    </div>
                    <div className='display-item'>
                        <label>D: </label>
                        <p>{mount?.['Depth (in)']}</p>
                    </div>
                </div>
            </div>
            <div className='display-container'>
                <label className='specification-label'>Media Player Dimensions (in)</label>
                <div className='display-items'>
                    <div className='display-item'>
                        <label>H: </label>
                        <p>{mediaPlayer?.['Height']}</p>
                    </div>
                    <div className='display-item'>
                        <label>W: </label>
                        <p>{mediaPlayer?.['Width']}</p>
                    </div>
                    <div className='display-item'>
                        <label>D: </label>
                        <p>{mediaPlayer?.['Depth']}</p>
                    </div>
                </div>
            </div>
            <div className='display-container'>
                <label className='specification-label'>Receptacle Dimensions (in)</label>
                <div className='display-items'>
                    <div className='display-item'>
                        <label>H: </label>
                        <p>{receptacle?.['Height (in)']}</p>
                    </div>
                    <div className='display-item'>
                        <label>W: </label>
                        <p>{receptacle?.['Width (in)']}</p>
                    </div>
                    <div className='display-item'>
                        <label>D: </label>
                        <p>{receptacle?.['Depth (in)']}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificationDisplay;