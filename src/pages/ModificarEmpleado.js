import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from '../components/InicioComponentes';
import {
    ContenedorFormularioRegistro, TituloFormularioRegistro, ContenedorCamposTriplesFormularioRegistro,
    ContenedorCampoFormularioRegistro, InputFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
    BotonFormularioRegistro
} from '../components/FormulariosComponentes';
import SelectOpciones from '../components/SelectOpciones';
import Alerta from '../components/Alerta';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const MySwal = withReactContent(Swal);



const ModificarEmpleado = () => {

    const { usuario } = useParams();
    const { id } = useParams();


    // Variables
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [dni, setDni] = useState('');
    const [idRecuperado, setIdRecuperado] = useState('');

    const [usuarioAsociado, setUsuarioAsociado] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [ventas, setVentas] = useState(0);

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const obtenerEmpleadoById = async (id) => {
        const empleadoFirebase = await getDoc( doc(db, "empleados", id) );

        if(empleadoFirebase.exists) {
            setIdRecuperado(empleadoFirebase.data().id);
            setNombre(empleadoFirebase.data().nombre);
            setGenero(empleadoFirebase.data().genero);
            setDni(empleadoFirebase.data().dni);
            setUsuarioAsociado(empleadoFirebase.data().usuarioAsociado);
            setSucursal(empleadoFirebase.data().sucursal);
            setVentas(empleadoFirebase.data().ventas);
            setEstado(empleadoFirebase.data().estado);
        }else{
            console.log("No existe el empleado solicitado.");
        }
    }

    useEffect( () => {
        obtenerEmpleadoById(id);
    }, []);


    const actualizarEmpleado = async (e) => {
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

        const empleadoRecuperado = doc(db, "empleados", id);
        const empleadoActualizado =   { nombre: nombre, genero: genero, usuarioAsociado: usuarioAsociado,
            sucursal: sucursal, ventas: ventas, dni: dni, estado: estado };

        await updateDoc(empleadoRecuperado, empleadoActualizado);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se modificó el empleado solicitado.",
            icon: "success",
            button: "aceptar",
        });

        irAEmpleados();
    }
    

    const irAEmpleados = () => {
        navigate(`/admin/empleados/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Modifcar empleados</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Modificar empleado:</Titulo>

                <ContenedorFormularioRegistro onSubmit={actualizarEmpleado}>

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

export default ModificarEmpleado;