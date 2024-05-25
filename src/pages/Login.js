import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Helmet
import { Helmet } from "react-helmet";

// Firebase
import db from '../firebase/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

import GuardarUsuario from '../firebase/UsuarioSesion';

// Componentes e imágenes.
import {
    ContenedorGeneralLogin, ContenedorEspacioBlancoLogin, ContenedorFormularioLogin, LogoLoginEstilos,
    TituloLogin, FormularioLogin, LabelLogin, InputLogin, BotonIngresoLogin
} from '../components/FormulariosComponentes';

import LogoLogin from '../images/Logo.svg';
import { usuarioContext } from '../contexts/UsuarioContexto';




function Login() {

    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    const [usuarioInfo, setUsuarioInfo] = useState(useContext(usuarioContext));

    const navigate = useNavigate();



    const handleChange = (e) => {
        if (e.target.name === 'usuario') {
            setUsuario(e.target.value);
        } else if (e.target.name === 'contraseña') {
            setContraseña(e.target.value);
        }
    }

    /*
    const buscarUsuarioFirebase = async (usuario) => {
        const usuarioRecuperado = await getDoc(doc(db, "usuarios", usuario));
        console.log(usuarioRecuperado);
        if (usuarioRecuperado.exists()) {
            setUsuarioInfo(usuarioRecuperado);
            localStorage.setItem('usuarioSesion', usuarioInfo);


            console.log(usuarioInfo," y ahora storage", localStorage.getItem);
            
            //navigate("/inicio");
        } else {
            console.log("Usuario no encontrado");
            navigate("/");
        }
    }

*/
    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = getAuth();


        await signInWithEmailAndPassword(auth, usuario, contraseña)
            .then(() => {

                /*const consulta = query(
                    collection(db, 'usuarios'),
                    where('usuario', '==', usuario),
                );
            
                const usuarioSesion = getDoc(consulta);
                setUsuarioInfo(
                    usuarioSesion.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
          
    
                console.log("El usuario es:" + usuarioSesion);
                    setUsuarioInfo(usuarioSesion.data().contraseña);
                    localStorage.setItem('usuarioInfo', usuarioInfo);


                    console.log(usuarioInfo, " y ahora storage", localStorage.getItem);
*/
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