import './App.css'
import { ProvedorAutenticacao } from './contexts/authContext'
import { AppRoutes } from './routes'

function App() {
  return (
    <ProvedorAutenticacao>
      <AppRoutes />
    </ProvedorAutenticacao>
  )
}

export default App
