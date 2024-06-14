import React, { useState, useEffect, act } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { getDoc, doc, updateDoc } from 'firebase/firestore';
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



const ModificarProveedor = () => {

    const { usuario } = useParams();
    const { id } = useParams();

    // Variables
    const [identificacion, setIdentificacion] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [CUIT, setCUIT] = useState('');
    const [contacto, setContacto] = useState('');
    const [mail, setMail] = useState('');
    const [numero, setNumero] = useState('');
    const [estado, setEstado] = useState('');

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const irAProveedores = () => {
        navigate(`/proveedores/${usuario}`);
    }

    const obtenerProveedorById = async (id) => {
        const proveedorFirebase = await getDoc( doc(db, "proveedores", id) );

        if(proveedorFirebase.exists) {
            setIdentificacion(proveedorFirebase.data().id);
            setProveedor(proveedorFirebase.data().proveedor);
            setCUIT(proveedorFirebase.data().CUIT);
            setContacto(proveedorFirebase.data().contacto);
            setMail(proveedorFirebase.data().mail);
            setNumero(proveedorFirebase.data().numero);
            setEstado(proveedorFirebase.data().estado);
        }else{
            console.log("No existe el proveedor solicitado.");
        }
    }

    useEffect( () => {
        obtenerProveedorById(id);
    }, []);


    const actualizarProveedor = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (identificacion === '' || proveedor === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar los campos básicos.'
            });
            return;
        }

        const proveedorRecuperado = doc(db, "proveedores", id);
        const proveedorActualizado = { proveedor: proveedor, CUIT: CUIT, contacto: contacto, mail: mail, numero: numero, estado: estado };

        await updateDoc(proveedorRecuperado, proveedorActualizado);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se modificó el proveedor solicitado.",
            icon: "success",
            button: "aceptar",
        });

        irAProveedores();
    }
    


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Agregar proveedor</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Modificar proveedor al sistema:</Titulo>

                <ContenedorFormularioRegistro onSubmit={actualizarProveedor}>

                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Identificación:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={identificacion}
                                onChange={(e) => setIdentificacion(e.target.value)}
                                placeholder='Ingresa el nombre de identificación, este no podrá ser modificado posteriormente.'
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Proveedor:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={proveedor}
                                onChange={(e) => setProveedor(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Nombre del contacto:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={contacto}
                                onChange={(e) => setContacto(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>CUIT:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={CUIT}
                                onChange={(e) => setCUIT(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Mail:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Número:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

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
                        <BotonFormularioRegistro tipo='regresar' onClick={irAProveedores}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
                        <BotonFormularioRegistro tipo='ingresar' typeof='submit'>Modificar</BotonFormularioRegistro>
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

export default ModificarProveedor;