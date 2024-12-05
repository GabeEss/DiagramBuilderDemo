import { DescriptionProvider } from "./contexts/description-context";
import { EquipmentProvider } from "./contexts/equipment-context";
import { ConfigurationProvider } from "./contexts/configuration-context";

function App() {
  return (
    <DescriptionProvider>
      <EquipmentProvider>
        <ConfigurationProvider>
          <>
            
          </>
        </ConfigurationProvider>
      </EquipmentProvider>
    </DescriptionProvider>
  )
}

export default App
