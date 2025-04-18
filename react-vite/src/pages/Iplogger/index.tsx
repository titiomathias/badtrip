import { api } from "../../services/api.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function IpLoggerPage(){
    const {id} = useParams();
    const [iplogger, setIplogger] = useState(null);

    useEffect(() => {
        async function fetchIplogger() {
            try {
                const response = await api.get(`/iplogger/${id}`);
                setIplogger(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar por logger:", error);
            }
        }

        fetchIplogger();
    }, [id]);

    return (
        <>
            <h1></h1>
        </>
    );
}