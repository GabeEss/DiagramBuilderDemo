import React, {useContext} from "react";
import { DataContext } from "./contexts/data-context";
import EquipmentForm from "./components/equipment-form";
import ConfigurationForm from "./components/configuration-form";
import DescriptionForm from "./components/description-form";

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
      <ConfigurationForm/>
      <DescriptionForm/>
    </>
  )
}

export default App
