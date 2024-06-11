import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



const ModificarUsuario = () => {

    const { usuario } = useParams();
    const { id } = useParams();

    // Variables
    const [mail, setMail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('');
    const [cargo, setCargo] = useState('');
    const [añoIngreso, setAñoIngreso] = useState();
    const [salario, setSalario] = useState('');
    const [estado, setEstado] = useState('');


    const navigate = useNavigate();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const obtenerUsuarioById = async (id) => {
        const usuarioFirebase = await getDoc( doc(db, "usuarios", id) );

        if(usuarioFirebase.exists) {
            setMail(usuarioFirebase.data().mail);
            setContraseña(usuarioFirebase.data().contraseña);
            setNombre(usuarioFirebase.data().nombre);
            setRol(usuarioFirebase.data().rol);
            setCargo(usuarioFirebase.data().cargo);
            setAñoIngreso(usuarioFirebase.data().añoIngreso);
            setSalario(usuarioFirebase.data().salario);
            setEstado(usuarioFirebase.data().estado);
        }else{
            console.log("No existe el usuario solicitado.");
        }
    }

    useEffect( () => {
        obtenerUsuarioById(id);
    }, []);


    const actualizarUsuario = async (e) => {
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
        
        

        const usuarioRecuperado = doc(db, "usuarios", id);
        const usuarioActualizado = { mail: mail, nombre: nombre, contraseña: contraseña, rol: rol,
            cargo: cargo, añoIngreso: añoIngreso, estado: estado, salario: salario };

        await updateDoc(usuarioRecuperado, usuarioActualizado);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se modificó el usuario solicitado.",
            icon: "success",
            button: "aceptar",
        });

        irAProductos();
    }


    const irAUsuarios = () => {
        navigate(`/admin/usuarios/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Modificar usuarios</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Modificar usuario:</Titulo>

                <ContenedorFormularioRegistro onSubmit={actualizarUsuario}>

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

export default ModificarUsuario;