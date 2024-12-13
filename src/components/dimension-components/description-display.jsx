import React, {useContext} from "react";
import { DescriptionContext } from "../../contexts/description-context";
import { EquipmentContext } from "../../contexts/equipment-context";

function DescriptionDisplay() {
    const {
        title,
        designer,
        department,
        date } = useContext(DescriptionContext);

    const {
        screen
    } = useContext(EquipmentContext);

    return(
        <div className="description-display" style={{
            
        }}>
            <div className="description-item">
                <label>Title: </label>
                <p>{title}</p>
            </div>
            <div className="description-item">
                <label>Designer: </label>
                <p>{designer}</p>
            </div>
            <div className="description-item">
                <label>Department: </label>
                <p>{department}</p>
            </div>
            <div className="description-item">
                <label>Screen Size (inches): </label>
                <p>{screen?.['Screen Size'] || ""}</p>
            </div>
            <div className="description-item">
                <label>Date: </label>
                <p>{date}</p>
            </div>
        </div>
    )
    
}

export default DescriptionDisplay;