import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from '../components/InicioComponentes';
import {
    ContenedorFormularioRegistro, TituloFormularioRegistro, ContenedorCamposTriplesFormularioRegistro,
    ContenedorCampoFormularioRegistro, InputFormularioRegistro, TextAreaFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
    BotonFormularioRegistro
} from '../components/FormulariosComponentes';
import SelectOpciones from '../components/SelectOpciones';
import Alerta from '../components/Alerta';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const MySwal = withReactContent(Swal);



const AgregarUsuario = () => {

    const { usuario } = useParams();

    const fechaActual =  new Date().toLocaleDateString();

    // Variables
    const [mail, setMail] = useState('');
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('Empleado');
    const [cargo, setCargo] = useState('');
    const [añoIngreso, setAñoIngreso] = useState(fechaActual);
    const [estado, setEstado] = useState('Activo');
    const [salario, setSalario] = useState('');


    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const almacenarUsuario = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (mail === '' || nombre === '' || contraseña === '' || rol === '' || cargo === '' || estado === '' || añoIngreso === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar los campos básicos.'
            });
            return;
        }

        const expresionRegularMail = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        if (!expresionRegularMail.test(mail)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "Por favor ingresa un mail válido para el usuario."
            });
            return;
        }

        if(contraseña.length  < 8){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "La contraseña debe tener al menos 8 caracteres."
            });
            return;
        }

       /* 
        if(añoIngreso > fechaActual){
            new MySwal({
                title: "Fecha incorrecta",
                text: "La fecha de ingreso debe ser previa a la fecha actual " + fechaActual,
                icon: "warning",
                button: "aceptar",
            });
        }
            */

        await setDoc(doc(db, "usuarios", mail),
            {
                mail: mail, nombre: nombre, contraseña: contraseña, rol: rol,
                cargo: cargo, añoIngreso: añoIngreso, estado: estado, salario: salario
            });

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, mail, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

        new MySwal({
            title: "Ingreso éxitoso",
            text: "Usuario ingresado al sistema y autorizado.",
            icon: "success",
            button: "aceptar",
        });

        irAUsuarios();
    }


    const irAUsuarios = () => {
        navigate(`/admin/usuarios/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Agregar usuarios</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Ingresar usuario al sistema:</Titulo>

                <ContenedorFormularioRegistro onSubmit={almacenarUsuario}>

                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Nombre completo:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Mail:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Contraseña:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)} 
                                placeholder='La contraseña debe tener al menos 8 caracteres.'      
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Rol:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='roles'
                                opciones={rol}
                                setOpciones={setRol}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Cargo:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Salario:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={salario}
                                onChange={(e) => setSalario(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Año de ingreso:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="date"
                                value={añoIngreso}
                                onChange={(e) => setAñoIngreso(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Estado:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='estado'
                                opciones={estado}
                                setOpciones={setEstado}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>


                    <ContenedorBotonesDoblesFormularioRegistro>
                        <BotonFormularioRegistro tipo='regresar' onClick={irAUsuarios}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
                        <BotonFormularioRegistro tipo='ingresar' typeof='submit'>Ingresar</BotonFormularioRegistro>
                    </ContenedorBotonesDoblesFormularioRegistro>
                </ContenedorFormularioRegistro>

            </ContenedorGeneral>

            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />

        </>
    )
}

export default AgregarUsuario;