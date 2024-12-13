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

  // While data is not defined, show loading element
  if(!screenData || !receptacleData || !mountData || !mediaPlayerData) return <div>Loading...</div>

  return (
    <div className="app">
      <div className="app-container"> 
        <DiagramDisplay pdfContainerRef={pdfContainerRef}/>
        <div className="forms-container">
          <div className="equipment-config-container">
            <h4 className="configuration-header">Configuration</h4>
            <EquipmentForm/>
            <ConfigurationForm/>
          </div>
          <DescriptionForm/>
          <div className="download-container">
            <DownloadButton pdfContainerRef={pdfContainerRef}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
