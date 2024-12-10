import React, {useRef, useContext} from "react";
import { DataContext } from "./contexts/data-context";
import DiagramDisplay from "./components/diagram-display";
import EquipmentForm from "./components/forms/equipment-form";
import ConfigurationForm from "./components/forms/configuration-form";
import DescriptionForm from "./components/forms/description-form";
import DownloadButton from "./components/download-button";

function App() {
  const {
    mediaPlayerData, 
    mountData, 
    receptacleData, 
    screenData} = useContext(DataContext);

    const pdfContainerRef = useRef(null);

  // While data is not defined, loading element
  if(!screenData || !receptacleData || !mountData || !mediaPlayerData) return <div>Loading...</div>

  return (
    <div className="app">
      <div className="app-container"> 
        <DiagramDisplay pdfContainerRef={pdfContainerRef}/>
        <div className="forms-container">
          <EquipmentForm/>
          <br/>
          <ConfigurationForm/>
          <br/>
          <DescriptionForm/>
          <br/>
          <DownloadButton pdfContainerRef={pdfContainerRef}/>
        </div>
      </div>
      {/* <label style={{
        position: "absolute",
        transform: 'translateY(-500%) translateX(50%)',
      }}>Floor</label> */}
    </div>
  )
}

export default App
