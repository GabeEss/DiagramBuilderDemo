import React, {useContext} from "react";
import { DataContext } from "./contexts/data-context";
import EquipmentForm from "./components/equipment-form";

function App() {
  const {
    mediaPlayerData, 
    mountData, 
    receptacleData, 
    screenData} = useContext(DataContext);

  return (
    <>
      {/* {JSON.stringify(mediaPlayerData)} */}
      {/* {JSON.stringify(mountData)} */}
      {/* {JSON.stringify(receptacleData)} */}
      {/* {JSON.stringify(screenData)} */}
      <EquipmentForm/>
    </>
  )
}

export default App
