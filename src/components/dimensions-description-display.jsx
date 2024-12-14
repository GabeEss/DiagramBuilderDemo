import React from 'react';
import NicheDimensionDisplay from './dimension-components/niche-dimension-display';
import ScreenDimensionDisplay from './dimension-components/screen-dimensions-display';
import ReceptacleDimensionDisplay from './dimension-components/receptacle-dimensions.display';
import DescriptionDisplay from './dimension-components/description-display';

// A component to display the project's dimensions and description.
function DimensionsDescriptionDisplay() {
    return(
        <div className='dimensions-description-container'>
            <div className='dimensions-display-container'>
                <NicheDimensionDisplay/>
                <ScreenDimensionDisplay/>
            </div>
            <div className='receptacle-description-container'>
                <ReceptacleDimensionDisplay/>
                <DescriptionDisplay/>
            </div>
        </div>
    )
}

export default DimensionsDescriptionDisplay;