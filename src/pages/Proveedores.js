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
import PDFTablaDemo from '../components/PDFTablaDemo';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




const Proveedores = () => {

    // Variables
    const [proveedores, setProveedores] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('Listado completo');

    const { usuario } = useParams();

    const navigate = useNavigate();

    const proveedoresCollection = collection(db, "proveedores");


    // Funciones
    // Generales
    const obtenerProveedores = async () => {
        const data = await getDocs(proveedoresCollection);
        setProveedores(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerProveedores();
    }, []);


    const eliminarProveedor = async (id) => {
        const proveedorRegistrado = doc(proveedoresCollection, id);
        await deleteDoc(proveedorRegistrado);
        obtenerProveedores();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar al proveedor?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                eliminarProveedor(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }


    // Específicas
    const obtenerProveedoresByProveedor = async () => {
        const dataFiltrada = await getDocs(query(proveedoresCollection, where("proveedor", '==', busqueda)));
        setProveedores(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProveedoresByNombreContacto = async () => {
        const dataFiltrada = await getDocs(query(proveedoresCollection, where("contacto", '==', busqueda)));
        setProveedores(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProveedoresByMail = async () => {
        const dataFiltrada = await getDocs(query(proveedoresCollection, where("mail", '==', busqueda)));
        setProveedores(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProveedoresByNumero = async () => {
        const dataFiltrada = await getDocs(query(proveedoresCollection, where("numero", '==', busqueda)));
        setProveedores(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProveedoresByEstado = async () => {
        const dataFiltrada = await getDocs(query(proveedoresCollection, where("estado", '==', busqueda)));
        setProveedores(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }



    const realizarFiltrado = (e) => {
        e.preventDefault();

        if (filtro === 'Listado completo') {
            obtenerProveedores();
        } else if (filtro === 'Proveedor') {
            obtenerProveedoresByProveedor();
        } else if (filtro === 'Nombre de contacto') {
            obtenerProveedoresByNombreContacto();
        } else if (filtro === 'Mail') {
            obtenerProveedoresByMail();
        } else if (filtro === 'Número') {
            obtenerProveedoresByNumero();
        } else if (filtro === 'Estado') {
            obtenerProveedoresByEstado();
        }

    }

    // Enlaces
    const irAAgregarProveedores = () => {
        navigate(`/proveedores/agregar/${usuario}`);
    }

    const regresar = () => {
        navigate(`/inicio/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Proveedores</title>
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
                                        tipo='proveedores'
                                        filtro={filtro}
                                        setFiltro={setFiltro}
                                    />
                                    <InputHeaderTabla
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </ContenedorFiltroHeaderTabla>

                                <BotonHeaderTabla tipo='agregar' onClick={irAAgregarProveedores} ><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar proveedor</BotonHeaderTabla>
                            </ContenedorHeaderTabla>

                            <Tabla className='table table-ligth table-hover'>
                                <thead>
                                    <tr>
                                        <EncabezadoTabla>ID</EncabezadoTabla>
                                        <EncabezadoTabla>Proveedor</EncabezadoTabla>
                                        <EncabezadoTabla>CUIT</EncabezadoTabla>
                                        <EncabezadoTabla>Contacto</EncabezadoTabla>
                                        <EncabezadoTabla>Mail</EncabezadoTabla>
                                        <EncabezadoTabla>N°</EncabezadoTabla>
                                        <EncabezadoTabla>Estado</EncabezadoTabla>
                                        <EncabezadoTabla>Acciones</EncabezadoTabla>
                                    </tr>
                                </thead>
                                <tbody className='borde-tabla'>

                                    {proveedores.map((proveedor) => (
                                        <tr key={proveedor.id}>
                                            <RegistroTabla>{proveedor.id}</RegistroTabla>
                                            <RegistroTabla>{proveedor.proveedor}</RegistroTabla>
                                            <RegistroTabla>{proveedor.CUIT}</RegistroTabla>
                                            <RegistroTabla>{proveedor.contacto}</RegistroTabla>
                                            <RegistroTabla>{proveedor.mail}</RegistroTabla>
                                            <RegistroTabla>{proveedor.numero}</RegistroTabla>
                                            <RegistroTabla>{proveedor.estado}</RegistroTabla>
                                            <RegistroTabla>
                                                <Link to={`/proveedores/modificar/${usuario}/${proveedor.id}`} className="iconos-blancos"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmacionEliminar(proveedor.id) }} className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
                                            </RegistroTabla>
                                        </tr>
                                    ))}
                                </tbody>
                            </Tabla>

                            <ContenedorOpcionesTabla>
                                <BotonHeaderTabla tipo='regresar' onClick={regresar}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonHeaderTabla>
                            </ContenedorOpcionesTabla>
                        </div>
                    </div>
                </div>
            </ContenedorGeneral >
        </>
    )
}

export default Proveedores;