import './App.css'
import { AppRouter } from './routes';
import { BrowserRouter} from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}
