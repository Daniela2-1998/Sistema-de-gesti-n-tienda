import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { collection, getDoc, getDocs, setDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';


// Imports styles
import '../App.css';
import { ContenedorGeneral, Header } from '../components/InicioComponentes';
import {
    ContenedorHeaderTabla, ContenedorFiltroHeaderTabla, BotonHeaderTabla, InputHeaderTabla, Tabla, EncabezadoTabla, RegistroTabla,
    ContenedorOpcionesTabla } from '../components/TablasComponentes';
import { ContenedorBusquedaFormulario, TituloFormularioRegistro, InputFormularioRegistro, ContenedorCampoFormularioRegistro
 } from '../components/FormulariosComponentes';
import SelectFiltros from '../components/SelectFiltros';
import styled from 'styled-components';

// Imports de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Imports PDF.
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFOperaciones from '../components/PDFOperaciones';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




const Operaciones = () => {

    // Variables
    const [operaciones, setOperaciones] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('Listado completo');

    const [nombreEmpresa, setNombreEmpresa] = useState('');

    // PDF
    const fechaActual = new Date().toLocaleDateString();
    const nombrePDF = "listaOperaciones-" + fechaActual + ".pdf";


    // Operación recuperada
    const [empleado, setEmpleado] = useState('');
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [fechaOperacion, setFechaOperacion] = useState('');
    const [participante, setParticipante] = useState('');
    const [productos, setProductos] = useState([]);
    const [tipoOperacion, setTipoOperacion] = useState('');
    const [total, setTotal] = useState('');
    const [medioDePago, setMedioDePago] = useState('');
    const [modalidadPago, setModalidadPago] = useState('');
    const [estado, setEstado] = useState('');


    const operacionesCollection = collection(db, "operaciones");


    const { usuario } = useParams();

    const navigate = useNavigate();


    const recuperarConfiguracion = async () => {
        const configuracionFirebase = await getDoc(doc(db, "configuracion", "establecida"));

        if (configuracionFirebase.exists) {
            setNombreEmpresa(configuracionFirebase.data().nombreEmpresa);
        }
    }

    // Funciones
    // Generales
    const obtenerOperaciones = async () => {
        const data = await getDocs(query(operacionesCollection, orderBy("fechaOperacion", "desc")));
        setOperaciones(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerOperaciones();
        recuperarConfiguracion();
    }, []);


    const eliminarOperaciones = async (id) => {
        const operacionRegistrada = doc(operacionesCollection, id);
        await deleteDoc(operacionRegistrada);
        obtenerOperaciones();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar la operación?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                eliminarOperaciones(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }


    // Específicas
    const obtenerOperacionesByNombreParticipante = async () => {
        const dataFiltrada = await getDocs(query(operacionesCollection, where("participante", '==', busqueda)));
        setOperaciones(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerOperacionesByEmpleado = async () => {
        const dataFiltrada = await getDocs(query(operacionesCollection, where("empleado", '==', busqueda)));
        setOperaciones(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerOperacionesByFechaRegistro = async () => {
        const dataFiltrada = await getDocs(query(operacionesCollection, where("fechaOperacion", '==', new Date().toLocaleDateString())));
        setOperaciones(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerOperacionesByFechaFinalización = async () => {
        const dataFiltrada = await getDocs(query(operacionesCollection, where("fechaFinalizacion", '==', busqueda)));
        setOperaciones(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerOperacionesByTipoOperacion = async () => {
        const dataFiltrada = await getDocs(query(operacionesCollection, where("tipoOperacion", '==', busqueda)));
        setOperaciones(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerOperacionesByEstado = async () => {
        const dataFiltrada = await getDocs(query(operacionesCollection, where("estado", '==', busqueda)));
        setOperaciones(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const realizarFiltrado = (e) => {
        e.preventDefault();

        if (filtro === 'Listado completo') {
            obtenerOperaciones();
        } else if (filtro === 'Nombre participante') {
            obtenerOperacionesByNombreParticipante();
        } else if (filtro === 'Empleado') {
            obtenerOperacionesByEmpleado();
        } else if (filtro === 'Fecha de registro') {
            obtenerOperacionesByFechaRegistro();
        } else if (filtro === 'Fecha de finalización') {
            obtenerOperacionesByFechaFinalización();
        } else if (filtro === 'Tipo de operación') {
            obtenerOperacionesByTipoOperacion();
        } else if (filtro === 'Estado') {
            obtenerOperacionesByEstado();
        }

    }

    // Enlaces
    const irAAgregarOperaciones = () => {
        navigate(`/operaciones/agregar/${usuario}`);
    }

    const irAListadoOperaciones = () => {
        navigate(`/operaciones/listado/${usuario}`);
    }

    const irADescargarFactura = () => {
        navigate(`/operaciones/descargar-factura/${usuario}`);
    }

    const regresar = () => {
        navigate(`/inicio/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Operaciones</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>

            <ContenedorGeneral>

                <Header tipo='tablas'>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>

                            <ContenedorHeaderTabla>

                                <ContenedorFiltroHeaderTabla>
                                    <BotonHeaderTabla tipo='filtro' onClick={realizarFiltrado}>Filtrar búsqueda</BotonHeaderTabla>
                                    <SelectFiltros
                                        tipo='operaciones'
                                        filtro={filtro}
                                        setFiltro={setFiltro}
                                    />
                                    <InputHeaderTabla
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </ContenedorFiltroHeaderTabla>

                                <BotonHeaderTabla tipo='agregar' onClick={irAAgregarOperaciones} ><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar operación</BotonHeaderTabla>
                            </ContenedorHeaderTabla>

                            <Tabla className='table table-ligth table-hover'>
                                <thead>
                                    <tr>
                                        <EncabezadoTabla>ID</EncabezadoTabla>
                                        <EncabezadoTabla>Fecha</EncabezadoTabla>
                                        <EncabezadoTabla>Participante</EncabezadoTabla>
                                        <EncabezadoTabla>Empleado</EncabezadoTabla>
                                        <EncabezadoTabla>Productos</EncabezadoTabla>
                                        <EncabezadoTabla>Fecha de Finalización</EncabezadoTabla>
                                        <EncabezadoTabla>Tipo</EncabezadoTabla>
                                        <EncabezadoTabla>Estado</EncabezadoTabla>
                                        <EncabezadoTabla>Acciones</EncabezadoTabla>
                                    </tr>
                                </thead>
                                <tbody className='borde-tabla'>

                                    {operaciones.map((operacion) => (
                                        <tr key={operacion.id}>
                                            <RegistroTabla>{operacion.id}</RegistroTabla>
                                            <RegistroTabla>{operacion.fechaOperacion}</RegistroTabla>
                                            <RegistroTabla>{operacion.participante}</RegistroTabla>
                                            <RegistroTabla>{operacion.empleado}</RegistroTabla>
                                            <RegistroTabla>
                                                {
                                                    operacion.productos.map((p) => (

                                                        <label>{p.producto}  -  </label>

                                                    ))
                                                }
                                            </RegistroTabla>
                                            <RegistroTabla>{operacion.fechaFinalizacion}</RegistroTabla>
                                            {
                                                operacion.tipoOperacion === 'Compra'
                                                    ?
                                                    <RegistroTabla tipo='egreso'>{operacion.tipoOperacion}</RegistroTabla>
                                                    : operacion.tipoOperacion === 'Venta'
                                                        ?
                                                        <RegistroTabla tipo='ingreso'>{operacion.tipoOperacion}</RegistroTabla>
                                                        : ''
                                            }
                                            <RegistroTabla>{operacion.estado}</RegistroTabla>
                                            <RegistroTabla>
                                                <Link to={`/operaciones/modificar/${usuario}/${operacion.id}`} className="iconos-blancos"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmacionEliminar(operacion.id) }} className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
                                            </RegistroTabla>
                                        </tr>
                                    ))}
                                </tbody>
                            </Tabla>

                            <ContenedorOpcionesTabla>
                                <PDFDownloadLink className='boton-descarga' document={<PDFOperaciones operaciones={operaciones} nombreEmpresa={nombreEmpresa} fechaActual={fechaActual} />} fileName={nombrePDF}>
                                    <BotonHeaderTabla tipo='descarga'>Descargar PDF</BotonHeaderTabla>
                                </PDFDownloadLink>
                                {/*
                                <BotonHeaderTabla tipo='agregar-subcategoria' onClick={irADescargarFactura}>Descargar factura</BotonHeaderTabla>
                                */}
                                <BotonHeaderTabla tipo='agregar-subcategoria' onClick={irAListadoOperaciones}>Listado de operaciones</BotonHeaderTabla>

                                <BotonHeaderTabla tipo='regresar' onClick={regresar}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonHeaderTabla>
                            </ContenedorOpcionesTabla>
                        </div>
                    </div>
                </div>


            </ContenedorGeneral >
        </>
    )
}


export default Operaciones;