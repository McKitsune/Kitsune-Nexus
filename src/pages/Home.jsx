import React, { useState } from "react";

function Home() {
    const [uploadUrl, setUploadUrl] = useState("");

    // Función para obtener la URL pre-firmada de S3
    const fetchS3Url = async () => {
        try {
            // Llamada al backend usando la ruta del proxy '/api'
            const response = await fetch(
                "/api/get-s3-url?filename=test.jpg&filetype=image/jpeg"
            );
            const data = await response.json();
            setUploadUrl(data.uploadURL);
            console.log("URL pre-firmada:", data.uploadURL);
        } catch (error) {
            console.error("Error fetching S3 URL:", error);
        }
    };

    return (
        <div>
            <h1>Generador de URLs de S3</h1>
            <button onClick={fetchS3Url}>Obtener URL pre-firmada</button>
            {uploadUrl && <p>URL: {uploadUrl}</p>}
        </div>
    );
}

export default Home;
