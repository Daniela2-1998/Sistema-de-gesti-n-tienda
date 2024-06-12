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



const AgregarEmpleado = () => {

    const { usuario } = useParams();

    const fechaActual =  new Date().toLocaleDateString();

    // Variables
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [dni, setDni] = useState('');


    const [usuarioAsociado, setUsuarioAsociado] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [ventas, setVentas] = useState(0);

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const irAEmpleados = () => {
        navigate(`/admin/empleados/${usuario}`);
    }


    const almacenarEmpleado = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (nombre === '' || genero === '' || usuarioAsociado === '' || sucursal === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar los campos básicos.'
            });
            return;
        }


        await setDoc(doc(db, "empleados", id),
            {
                nombre: nombre, genero: genero, usuarioAsociado: usuarioAsociado,
                sucursal: sucursal, ventas: ventas, dni: dni, estado: estado }
            )

        new MySwal({
            title: "Ingreso éxitoso",
            text: "Empleado ingresado al sistema.",
            icon: "success",
            button: "aceptar",
        });

        irAEmpleados();
    }
    

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Agregar empleados</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Ingresar empleado al sistema:</Titulo>

                <ContenedorFormularioRegistro onSubmit={almacenarEmpleado}>

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
                            <TituloFormularioRegistro>ID:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Usuario asociado:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='listado-usuarios'
                                opciones={usuarioAsociado}
                                setOpciones={setUsuarioAsociado}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Sucursal:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='sucursales'
                                opciones={sucursal}
                                setOpciones={setSucursal}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Ventas:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="number"
                                value={ventas}
                                onChange={(e) => setVentas(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Género:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>DNI:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
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
                        <BotonFormularioRegistro tipo='regresar' onClick={irAEmpleados}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
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

export default AgregarEmpleado;