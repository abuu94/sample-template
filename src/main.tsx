import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import AppFoodWithForm from './AppFoodWithForm.tsx'

// import AppFood from './AppFood.tsx'
import App from './App.tsx'
// import AppFoodWithForm from './AppFoodWithForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <AppFood /> */}
    {/* <AppFoodWithForm/> */}
  </StrictMode>,
)
