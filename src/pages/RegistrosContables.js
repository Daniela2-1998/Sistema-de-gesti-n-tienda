import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';


// Imports styles
import { ContenedorGeneral, Header } from '../components/InicioComponentes';
import {
    ContenedorHeaderTabla, ContenedorFiltroHeaderTabla, BotonHeaderTabla, InputHeaderTabla, Tabla, EncabezadoTabla, RegistroTabla,
    ContenedorOpcionesTabla,
    BusquedaDescargaPDF
} from '../components/TablasComponentes';
import SelectFiltros from '../components/SelectFiltros';


// Imports de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Imports PDF.
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFRegistrosContables from '../components/PDFRegistrosContables';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




const RegistrosContables = () => {

    // Variables
    const [registrosC, setRegistrosC] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('Listado completo');

    const [nombreEmpresa, setNombreEmpresa] = useState('');

    // PDF
    const fechaActual = new Date().toLocaleDateString();
    const nombrePDF = "listaRegistrosContables-" + fechaActual + ".pdf";

    const { usuario } = useParams();

    const navigate = useNavigate();

    const registrosContablesCollection = collection(db, "registrosContables");


    // Funciones
    // Generales
    const obtenerRegistros = async () => {
        const data = await getDocs(collection(db, "registrosContables"));
        setRegistrosC(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    
    useEffect(() => {
       obtenerRegistros();
     }, []);

    const eliminarRegistros = async (id) => {
        const registroContableRegistrado = doc(db, "registrosContables", id);
        await deleteDoc(registroContableRegistrado);
        obtenerRegistros();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar el registro contable?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                eliminarRegistros(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }


    // Específicas
    const obtenerRegistrosByConcepto = async () => {
        const dataFiltrada = await getDocs(query(registrosContablesCollection, where("concepto", '==', busqueda)));
        setRegistrosC(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerRegistrosByCategoría = async () => {
        const dataFiltrada = await getDocs(query(registrosContablesCollection, where("categoria", '==', busqueda)));
        setRegistrosC(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerRegistrosBySubcategoría = async () => {
        const dataFiltrada = await getDocs(query(registrosContablesCollection, where("subcategoria", '==', busqueda)));
        setRegistrosC(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerRegistrosByFechaRegistro = async () => {
        const dataFiltrada = await getDocs(query(registrosContablesCollection, where("fecha", '==', new Date().toLocaleDateString())));
        setRegistrosC(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerRegistrosByFormaDePago = async () => {
        const dataFiltrada = await getDocs(query(registrosContablesCollection, where("formaDePago", '==', busqueda)));
        setRegistrosC(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerRegistrosByEstado = async () => {
        const dataFiltrada = await getDocs(query(registrosContablesCollection, where("estado", '==', busqueda)));
        setRegistrosC(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    const realizarFiltrado = (e) => {
        e.preventDefault();

        if (filtro === 'Listado completo') {
            obtenerRegistros();
        } else if (filtro === 'Concepto') {
            obtenerRegistrosByConcepto();
        } else if (filtro === 'Categoría') {
            obtenerRegistrosByCategoría();
        } else if (filtro === 'Subcategoría') {
            obtenerRegistrosBySubcategoría();
        } else if (filtro === 'Fecha de registro') {
            obtenerRegistrosByFechaRegistro();
        }else if (filtro === 'Forma de pago') {
            obtenerRegistrosByFormaDePago();
        } else if (filtro === 'Estado') {
            obtenerRegistrosByEstado();
        }

    }




    // Enlaces
    const irAAgregarRegistros = () => {
        navigate(`/admin/contabilidad/registros/agregar/${usuario}`);
    }

    const irAListadoRegistros = () => {
        navigate(`/admin/contabilidad/registros/listado/${usuario}`);
    }

    const irAAgregarSubcategoriaContable = () => {
        navigate(`/admin/contabilidad/agregar-subcategoria/${usuario}`);
    }

    const regresar = () => {
        navigate(`/inicio/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Registros contables</title>
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
                                        tipo='registros contables'
                                        filtro={filtro}
                                        setFiltro={setFiltro}
                                    />
                                    <InputHeaderTabla
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </ContenedorFiltroHeaderTabla>

                                <BotonHeaderTabla tipo='agregar' onClick={irAAgregarRegistros} ><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar registro</BotonHeaderTabla>
                            </ContenedorHeaderTabla>

                            <Tabla className='table table-ligth table-hover'>
                                <thead>
                                    <tr>
                                        <EncabezadoTabla>ID</EncabezadoTabla>
                                        <EncabezadoTabla>Fecha</EncabezadoTabla>
                                        <EncabezadoTabla>Importe</EncabezadoTabla>
                                        <EncabezadoTabla>Concepto</EncabezadoTabla>
                                        <EncabezadoTabla>Categoría</EncabezadoTabla>
                                        <EncabezadoTabla>Subcategoría</EncabezadoTabla>
                                        <EncabezadoTabla>Medio de pago</EncabezadoTabla>
                                        <EncabezadoTabla>Modalidad de pago</EncabezadoTabla>
                                        <EncabezadoTabla>Estado</EncabezadoTabla>
                                        <EncabezadoTabla>Acciones</EncabezadoTabla>
                                    </tr>
                                </thead>
                                <tbody className='borde-tabla'>

                                    {registrosC.map((regC) => (
                                        <tr key={regC.id}>
                                            <RegistroTabla>{regC.id}</RegistroTabla>
                                            <RegistroTabla>{regC.fecha}</RegistroTabla>
                                            {
                                                regC.categoria === 'Gasto'
                                                    ?
                                                    <RegistroTabla tipo='egreso'>${regC.importe}</RegistroTabla>
                                                    : regC.categoria === 'Ingreso'
                                                        ?
                                                        <RegistroTabla tipo='ingreso'>${regC.importe}</RegistroTabla>
                                                        : 
                                                        <RegistroTabla>${regC.importe}</RegistroTabla>
                                            }
                                            <RegistroTabla>{regC.concepto}</RegistroTabla>
                                            {
                                                regC.categoria === 'Gasto'
                                                    ?
                                                    <RegistroTabla tipo='egreso'>{regC.categoria}</RegistroTabla>
                                                    : regC.categoria === 'Ingreso'
                                                        ?
                                                        <RegistroTabla tipo='ingreso'>{regC.categoria}</RegistroTabla>
                                                        : 
                                                        <RegistroTabla>{regC.categoria}</RegistroTabla>
                                            }
                                            <RegistroTabla>{regC.subCategoria}</RegistroTabla>
                                            <RegistroTabla>{regC.medioDePago}</RegistroTabla>
                                            <RegistroTabla>{regC.modalidadDePago}</RegistroTabla>
                                            <RegistroTabla>{regC.estado}</RegistroTabla>
                                            <RegistroTabla>
                                                <Link to={`/admin/contabilidad/registros/modificar/${usuario}/${regC.id}`} className="iconos-blancos"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmacionEliminar(regC.id) }} className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
                                            </RegistroTabla>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </Tabla>

                            <ContenedorOpcionesTabla>
                                <PDFDownloadLink document={<PDFRegistrosContables registros={registrosC} nombreEmpresa={nombreEmpresa} fechaActual={fechaActual} />} fileName={nombrePDF}>
                                    <BotonHeaderTabla tipo='descarga'>Descargar PDF</BotonHeaderTabla>
                                </PDFDownloadLink>
                                
                                <BotonHeaderTabla tipo='agregar-subcategoria' onClick={irAListadoRegistros}>Listado de registros</BotonHeaderTabla>
                                <BotonHeaderTabla tipo='agregar-subcategoria' onClick={irAAgregarSubcategoriaContable}>Agregar subcategoría</BotonHeaderTabla>


                                <BotonHeaderTabla tipo='regresar' onClick={regresar}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonHeaderTabla>
                            </ContenedorOpcionesTabla>
                        </div>
                    </div>
                </div>
            </ContenedorGeneral >
        </>
    )
}

export default RegistrosContables;