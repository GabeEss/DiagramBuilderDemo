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
        <div className="description-container">
            <div className="description-title-container">
                <div className="description-title-item">Logo</div>
                <div className="description-title-item">Company Address</div>
                <div className="description-title-item">
                    <label>Description: </label>
                    <p>{title}</p>
                </div>
            </div>
            <div className="description-display">
                <div className="description-display-upper-layer">
                    <div className="description-item">
                        <p className="description-label" style={{
                            borderRight: "1px solid black",
                            borderBottom: "1px solid black",
                        }}>Designer</p>
                        <p className="description-text" style={{
                            borderRight: "1px solid black"
                        }}>{designer}</p>
                    </div>
                    <div className="description-item">
                        <p className="description-label" style={{
                            borderBottom: "1px solid black",
                        }}>Screen Size (inches)</p>
                        <p className="description-text">{screen?.['Screen Size'] || ""}</p>
                    </div>
                </div>
                <div className="description-display-layer">
                    <div className="description-item">
                        <p className="description-label" style={{
                            borderTop: "1px solid black",
                            borderRight: "1px solid black",
                            borderBottom: "1px solid black",
                        }}>Date</p>
                        <p className="description-text" style={{
                            borderRight: "1px solid black",
                        }}>{date}</p>
                    </div>
                    <div className="description-item">
                        <p className="description-label" style={{
                            borderTop: "1px solid black",
                            borderBottom: "1px solid black"
                        }}>Department</p>
                        <p className="description-text">{department}</p>
                    </div>
                </div>
            </div> 
        </div>
    )
    
}

export default DescriptionDisplay;