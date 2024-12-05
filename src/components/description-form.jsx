import React, { useState } from "react";

// A form component so the user can describe the project
function DescriptionForm({props}) {
    const [title, setTitle] = useState("");
    const [designer, setDesigner] = useState("");
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState(Date.now());

    const handleSubmit = () => {
        e.preventDefault();
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Project Title: </label>
                    <input type="text" name="title" value={title} onChange={(e) => setEventName(e.target.value)}/>
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
                    <label>Screen Size: </label>
                    <input type="text" name="screensize" value={"Fill with props."} readOnly/>
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