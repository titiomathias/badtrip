import './App.css'
import { AppRouter } from './routes';
import { BrowserRouter} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

export default function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </CookiesProvider>
  )
}
