import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import "./MainPage.css";

const MainPage = () => {
    return (
        <PageContent headerTitle="Pagina Principal">
            <CardMain />
        </PageContent>
    );
};

const CardMain = () => {
    const navigate = useNavigate();
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleAuthSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                // Si la respuesta es 200 OK, redirigir al módulo de alumnos
                const data = await response.json();
                if (data.message === "Autenticación exitosa.") {
                    setError(""); // Limpiar el error si la autenticación es exitosa
                    navigate("/student");
                }
            } else {
                // Si la respuesta no es OK, mostrar un error
                const data = await response.json();
                setError(data.message || "Error desconocido");
            }
        } catch (err) {
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="card-style">
            <h1
                className="title-main"
                onClick={() => setShowAuthForm(true)} // Mostrar formulario
            >
                Módulo Alumnos
            </h1>
            {showAuthForm && (
                <>
                    <div className="auth-overlay" onClick={() => setShowAuthForm(false)}></div>
                    <div className="auth-form">
                        <h2>Autenticación</h2>
                        <form onSubmit={handleAuthSubmit}>
                            <div>
                                <label htmlFor="username">Usuario:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={credentials.username}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, username: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={(e) =>
                                        setCredentials({ ...credentials, password: e.target.value })
                                    }
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit">Iniciar Sesión</button>
                            <button type="button" onClick={() => setShowAuthForm(false)}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default MainPage;