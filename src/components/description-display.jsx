import React, {useContext} from "react";
import { DescriptionContext } from "../contexts/description-context";
import { EquipmentContext } from "../contexts/equipment-context";

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
        <div className="description-display">
            <div className="display-item">
                <label>Project Title</label>
                <h2>{title}</h2>
            </div>
            <div className="display-item">
                <label>Project Designer</label>
                <h3>{designer}</h3>
            </div>
            <div className="display-item">
                <label>Department</label>
                <p>{department}</p>
            </div>
            <div className="display-item">
                <label>Date</label>
                <p>{date}</p>
            </div>
            <div className="display-item">
                <label>Screen Size (inches)</label>
                <p>{screen?.['Screen Size'] || ""}</p>
            </div>
        </div>
    )
    
}

export default DescriptionDisplay;