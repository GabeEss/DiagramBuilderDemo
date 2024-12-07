import React, {useContext} from "react";
import { DataContext } from "./contexts/data-context";
import EquipmentForm from "./components/forms/equipment-form";
import ConfigurationForm from "./components/forms/configuration-form";
import DescriptionForm from "./components/forms/description-form";
import DescriptionDisplay from "./components/description-display";

function App() {
  const {
    mediaPlayerData, 
    mountData, 
    receptacleData, 
    screenData} = useContext(DataContext);

  // While data is not defined, loading element
  if(!screenData || !receptacleData || !mountData || !mediaPlayerData) return <div>Loading...</div>

  return (
    <>
      <EquipmentForm/>
      <br/>
      <ConfigurationForm/>
      <br/>
      <DescriptionForm/>
      <br/>
      <DescriptionDisplay/>
    </>
  )
}

export default App
