import React, { useContext } from "react";
import { DescriptionContext } from "../contexts/description-context";
import { EquipmentContext } from "../contexts/equipment-context";

// A form component so the user can describe the project
function DescriptionForm() {
    const {
        title, setTitle,
        designer, setDesigner,
        department, setDepartment,
        date, setDate } = useContext(DescriptionContext);

    const {
        screen
    } = useContext(EquipmentContext);

    const handleSubmit = () => {
        e.preventDefault();
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Project Title: </label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-item">
                    <label>Designer: </label>
                    <input type="text" name="designer" value={designer} onChange={(e) => setDesigner(e.target.value)}/>
                </div>
                <div className="form-item">
                    <label>Department: </label>
                    <input type="text" name="department" value={department} onChange={(e) => setDepartment(e.target.value)}/>
                </div>
                <div className="form-item">
                    <label>Screen Size (inches): </label>
                    <input type="text" name="screensize" value={screen?.['Screen Size'] || ""} disabled/>
                </div>
                <div className="form-item">
                    <label>Date: </label>
                    <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default DescriptionForm;