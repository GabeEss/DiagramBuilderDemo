import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataProvider } from "./contexts/data-context";
import { DescriptionProvider } from "./contexts/description-context";
import { EquipmentProvider } from "./contexts/equipment-context";
import { ConfigurationProvider } from "./contexts/configuration-context";
import App from './App.jsx'
import './styles/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <EquipmentProvider>
        <DescriptionProvider>
          <ConfigurationProvider>
            <App />
          </ConfigurationProvider>
        </DescriptionProvider>
      </EquipmentProvider>
    </DataProvider>
  </StrictMode>,
)
