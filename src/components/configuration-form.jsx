import React, {useContext} from 'react';

// A form component so the user can alter the dimensions of the project
function ConfigurationForm() {
    return(
        <div className="form-container">
            <div className="form-item">
                <label>Screen Orientation</label>
                <select>

                </select>
            </div>
            <div className="form-item">
                <label>Wall Installation</label>
                <select>

                </select>
            </div>
            <div className="form-item">
                <label>Distance to Floor</label>
                <input type='number'></input>
            </div>
            <div className="form-item">
                <label>Niche Depth</label>
                <input type="number"></input>
            </div>
        </div>
    )
}

export default ConfigurationForm;