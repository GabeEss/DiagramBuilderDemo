import React, {useContext} from "react";
import { DataContext } from "./contexts/data-context";
import EquipmentForm from "./components/equipment-form";
import ConfigurationForm from "./components/configuration-form";

function App() {
  const {
    mediaPlayerData, 
    mountData, 
    receptacleData, 
    screenData} = useContext(DataContext);

  return (
    <>
      <EquipmentForm/>
      <ConfigurationForm/>
    </>
  )
}

export default App
