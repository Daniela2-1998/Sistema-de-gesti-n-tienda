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
    ContenedorOpcionesTabla
} from '../components/TablasComponentes';
import {
    ContenedorBusquedaFormulario, TituloFormularioRegistro, InputFormularioRegistro, ContenedorCampoFormularioRegistro
} from '../components/FormulariosComponentes';
import SelectFiltros from '../components/SelectFiltros';
import styled from 'styled-components';

// Imports de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Imports PDF.
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFOperaciones from '../components/PDFOperaciones';
import Factura from '../components/Factura';




// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




const DescargarFactura = () => {


    // Comprobante
    const [numeroComprobante, setNumeroComprobante] = useState('');
    const [busquedaFactura, setBusquedaFactura] = useState('');


    // Operación recuperada
    const [nombreEmpresa, setNombreEmpresa] = useState('');
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

    // Factura PDF
    const nombrePDFFactura = "factura - " + fechaOperacion + ".pdf";


    const { usuario } = useParams();

    const navigate = useNavigate();


    const recuperarConfiguracion = async () => {
        const configuracionFirebase = await getDoc(doc(db, "configuracion", "establecida"));

        if (configuracionFirebase.exists) {
            setNombreEmpresa(configuracionFirebase.data().nombreEmpresa);
        }
    }

    const asociarNumeroComprobanteDePagoConOperaciones = async () => {
        await setDoc(doc(db, "facturas", numeroComprobante), { numeroComprobante: numeroComprobante, operacion: busquedaFactura });
        console.log(numeroComprobante - busquedaFactura)
    }

    const obtenerOperacionById = async () => {
        const registroFirebase = await getDoc(doc(db, "operaciones", busquedaFactura));

        if (registroFirebase.exists) {
            setEmpleado(registroFirebase.data().empleado);
            setFechaFinalizacion(registroFirebase.data().fechaFinalizacion);
            setFechaOperacion(registroFirebase.data().fechaOperacion);
            setParticipante(registroFirebase.data().participante);
            setProductos(registroFirebase.data().productos);
            setTipoOperacion(registroFirebase.data().tipoOperacion);
            setTotal(registroFirebase.data().valorTotal);
            setMedioDePago(registroFirebase.data().medioDePago);
            setModalidadPago(registroFirebase.data().modalidadDePago);
            setEstado(registroFirebase.data().estado);
        } else {
            console.log("No existe el registro solicitado.");
        }
    }

    const handleSubmit =  (e) => {
        e.preventeDefault();

        asociarNumeroComprobanteDePagoConOperaciones();
        obtenerOperacionById();
    }



    useEffect(() => {
        recuperarConfiguracion();
    }, []);


    const regresar = () => {
        navigate(`/inicio/operaciones/${usuario}`);
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
                <ContenedorBusquedaFormulario tipo='formulario factura'>

                    <ContenedorDescuento>
                        <ContenedorCampoFormularioRegistro tipo='descuento'>
                            <TituloFormularioRegistro>Número de comprobante:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                tipo='descuento'
                                type="text"
                                value={numeroComprobante}
                                onChange={(e) => setNumeroComprobante(e.target.value)}
                                placeholder='Ingrese N° que quiere que represente el comprobante.'
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro tipo='descuento'>
                            <TituloFormularioRegistro>ID operación:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                tipo='descuento'
                                type="text"
                                value={busquedaFactura}
                                onChange={(e) => setBusquedaFactura(e.target.value)}
                                placeholder='Ingrese ID de la operación a buscar.'
                            />
                        </ContenedorCampoFormularioRegistro>
                    </ContenedorDescuento>

                    <BotonHeaderTabla tipo='buscar operacion' onClick={obtenerOperacionById}>Buscar</BotonHeaderTabla>

                    <PDFDownloadLink className='boton-descarga-factura' document={
                        <Factura
                            fechaActual={fechaOperacion}
                            nombreEmpresa={nombreEmpresa}
                            numeroComprobante={numeroComprobante}
                            empleado={empleado}
                            fechaFinalizacion={fechaFinalizacion}
                            participante={participante}
                            productos={productos}
                            tipoOperacion={tipoOperacion}
                            total={total}
                            estado={estado}
                            medioDePago={medioDePago}
                            modalidadDePago={modalidadPago}
                        />
                    } fileName={nombrePDFFactura}>
                        <BotonHeaderTabla tipo='descarga factura'>Descargar factura</BotonHeaderTabla>
                    </PDFDownloadLink>

                </ContenedorBusquedaFormulario>

            </ContenedorGeneral>
        </>
    )


}

const ContenedorDescuento = styled.div`
  display: flex;
  flex-direction: row;


  @media(max-width: 1000px){
    height: 750px; 
    flex-direction: column;
  }

    @media(max-width: 1000px){
    height: 750px; 
    flex-direction: column;
  }
`;


export default DescargarFactura;