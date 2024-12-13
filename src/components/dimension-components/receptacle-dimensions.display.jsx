import React, {useContext} from 'react';
import { EquipmentContext } from '../../contexts/equipment-context';

// A component to display the project's receptacle specifications.
function ReceptacleDimensionDisplay() {

    const {
        receptacle
    } = useContext(EquipmentContext);

    return(
        <div className='receptacle-dimension-container'>
            <div className='receptacle-description'>
                <h3>Receptacle Notes</h3>
                <p>Install receptacle box with: </p>
                <p className='receptacle-text'>2x Terminated Power Outlets</p>
                <p className='receptacle-text'>1X Terminated Data CAT5 Ethernet Outlet</p>
            </div>
            <div className='receptacle-dimension-display'>
                <div className='receptacle-dimension-item'>
                    <label>Height</label>
                    <p>{Number(receptacle?.['Height (in)']) || 0}"</p>
                </div>
                <div className='receptacle-dimension-item'>
                    <label>Height</label>
                    <p>{Number(receptacle?.['Width (in)']) || 0}"</p>
                </div>
                <div className='receptacle-dimension-item'>
                    <label>Height</label>
                    <p>{Number(receptacle?.['Depth (in)'])|| 0}"</p>
                </div>
            </div>
        </div>
    )
}

export default ReceptacleDimensionDisplay;