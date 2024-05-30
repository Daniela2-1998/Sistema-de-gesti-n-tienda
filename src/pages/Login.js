import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helmet
import { Helmet } from "react-helmet";

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Componentes e imágenes.
import {
    ContenedorGeneralLogin, ContenedorEspacioBlancoLogin, ContenedorFormularioLogin, LogoLoginEstilos,
    TituloLogin, FormularioLogin, LabelLogin, InputLogin, BotonIngresoLogin
} from '../components/FormulariosComponentes';

import LogoLogin from '../images/Logo.svg';



function Login() {

    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");


    const navigate = useNavigate();


    const handleChange = (e) => {
        if (e.target.name === 'usuario') {
            setUsuario(e.target.value);
        } else if (e.target.name === 'contraseña') {
            setContraseña(e.target.value);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = getAuth();


        await signInWithEmailAndPassword(auth, usuario, contraseña)
            .then(() => {
                navigate(`/inicio/${usuario}`);
            })
            .catch((error) => {
                console.log(error);
                navigate("/");
            });
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Login</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>

            <ContenedorGeneralLogin>
                {/*Contenedor lado izquierdo */}
                <ContenedorEspacioBlancoLogin>
                </ContenedorEspacioBlancoLogin>

                {/*Contenedor lado derecho */}
                <ContenedorFormularioLogin>
                    <LogoLoginEstilos src={LogoLogin} alt="Logo de inicio de sesión" />

                    <TituloLogin>¡Bienvenido/a a System Solutions!</TituloLogin>

                    <FormularioLogin onSubmit={handleSubmit}>
                        <LabelLogin>Usuario:</LabelLogin>
                        <InputLogin
                            type="text"
                            name='usuario'
                            value={usuario}
                            onChange={handleChange}
                            required
                        />

                        <LabelLogin>Contraseña:</LabelLogin>
                        <InputLogin
                            type="password"
                            name='contraseña'
                            value={contraseña}
                            onChange={handleChange}
                            required
                        />

                        <BotonIngresoLogin type='submit'>Iniciar sesión</BotonIngresoLogin>
                    </FormularioLogin>

                </ContenedorFormularioLogin>


            </ContenedorGeneralLogin>
        </>
    )
}

export default Login;