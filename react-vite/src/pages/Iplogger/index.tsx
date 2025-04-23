import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Definindo a interface para os dados do IP Logger
interface IIpLogger {
  template: Record<string, unknown>;
  title_preview: string;
  description_preview: string;
  image_preview: Record<string, unknown>;
  device_data: boolean;
  location_data: boolean;
  cam_data: boolean;
}

export function IpLoggerPage() {
  const { id } = useParams();
  const [iplogger, setIplogger] = useState<IIpLogger | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIplogger() {
      try {
        setLoading(true);
        const response = await api.get<IIpLogger>(`/iplogger/?id=${id}`);
        setIplogger(response.data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar por logger:", error);
        setError("Não foi possível carregar os dados do IP Logger");
      } finally {
        setLoading(false);
      }
    }

    fetchIplogger();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!iplogger) {
    return <div>Nenhum dado encontrado para este IP Logger</div>;
  }

  return (
    <div className="ip-logger-container">
      <h1>{iplogger.title_preview}</h1>
      <p>{iplogger.description_preview}</p>
      
      <div className="logger-details">
        <h2>Configurações do Logger:</h2>
        <ul>
          <li>Coleta de dados do dispositivo: {iplogger.device_data ? "Ativado" : "Desativado"}</li>
          <li>Coleta de localização: {iplogger.location_data ? "Ativado" : "Desativado"}</li>
          <li>Acesso à câmera: {iplogger.cam_data ? "Ativado" : "Desativado"}</li>
        </ul>
      </div>
    </div>
  );
}