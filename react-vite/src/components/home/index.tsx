import './home.css'
import { CgPill } from "react-icons/cg";

export function HomeComponent(){
    return (
        <div className="home-component">
            <div className="home-title">
                <CgPill className='icon-pill'/>
                <h1>Está na hora da BadTrip?</h1>
            </div>
            <div className='home-description'>
                <p>
                    Use a nossa ferramenta para criar ip loggers realistas para rastrear golpistas. Capture dados do dispositivo, localizações e até mesmo fotos da câmera do usuário.
                </p>
            </div>
            <div className='home-button'>
                <a href="/create">Criar IP Logger</a>
            </div>
        </div>
    );
}