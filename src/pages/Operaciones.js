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




const Operaciones = () => {

    // Variables
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('Listado completo');

    const { usuario } = useParams();

    const navigate = useNavigate();

    const clientesCollection = collection(db, "clientes");


    // Funciones
    // Generales
    const obtenerClientes = async () => {
        const data = await getDocs(clientesCollection);
        setClientes(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerClientes();
    }, []);


    const eliminarClientes = async (id) => {
        const clientesRegistrado = doc(clientesCollection, id);
        await deleteDoc(clientesRegistrado);
        obtenerClientes();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar al cliente?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                eliminarClientes(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }


    // Específicas
    const obtenerClientesByNombre = async () => {
        const dataFiltrada = await getDocs(query(clientesCollection, where("nombre", '==', busqueda)));
        setClientes(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerClientesByMail = async () => {
        const dataFiltrada = await getDocs(query(clientesCollection, where("mail", '==', busqueda)));
        setClientes(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerClientesByNumero = async () => {
        const dataFiltrada = await getDocs(query(clientesCollection, where("numero", '==', busqueda)));
        setClientes(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerClientesByFecha = async () => {
        const dataFiltrada = await getDocs(query(clientesCollection, where("fechaNacimiento", '==', busqueda)));
        setClientes(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerClientesByTipoCliente = async () => {
        const dataFiltrada = await getDocs(query(clientesCollection, where("tipo", '==', busqueda)));
        setClientes(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerClientesByRango = async () => {
        const dataFiltrada = await getDocs(query(clientesCollection, where("rando", '==', busqueda)));
        setClientes(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    const obtenerClientesByEstado = async () => {
        const dataFiltrada = await getDocs(query(clientesCollection, where("estado", '==', busqueda)));
        setClientes(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }



    const realizarFiltrado = (e) => {
        e.preventDefault();

        if (filtro === 'Listado completo') {
            obtenerClientes();
        } else if (filtro === 'Nombre') {
            obtenerClientesByNombre();
        } else if (filtro === 'Mail') {
            obtenerClientesByMail();
        } else if (filtro === 'Número') {
            obtenerClientesByNumero();
        } else if (filtro === 'Fecha de nacimiento') {
            obtenerClientesByFecha();
        }else if (filtro === 'Tipo de cliente') {
            obtenerClientesByTipoCliente();
        }  else if (filtro === 'Rango o categoría') {
            obtenerClientesByRango();
        } else if (filtro === 'Estado') {
            obtenerClientesByEstado();
        }

    }

    // Enlaces
    const irAAgregarClientes = () => {
        navigate(`/clientes/agregar/${usuario}`);
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
                                        tipo='clientes'
                                        filtro={filtro}
                                        setFiltro={setFiltro}
                                    />
                                    <InputHeaderTabla
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </ContenedorFiltroHeaderTabla>

                                <BotonHeaderTabla tipo='agregar' onClick={irAAgregarClientes} ><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar cliente</BotonHeaderTabla>
                            </ContenedorHeaderTabla>

                            <Tabla className='table table-ligth table-hover'>
                                <thead>
                                    <tr>
                                        <EncabezadoTabla>Nombre</EncabezadoTabla>
                                        <EncabezadoTabla>DNI/CUIT</EncabezadoTabla>
                                        <EncabezadoTabla>Mail</EncabezadoTabla>
                                        <EncabezadoTabla>Número</EncabezadoTabla>
                                        <EncabezadoTabla>Fecha de nacimiento</EncabezadoTabla>
                                        <EncabezadoTabla>Tipo</EncabezadoTabla>
                                        <EncabezadoTabla>Rango</EncabezadoTabla>
                                        <EncabezadoTabla>Estado</EncabezadoTabla>
                                        <EncabezadoTabla>Acciones</EncabezadoTabla>
                                    </tr>
                                </thead>
                                <tbody className='borde-tabla'>

                                    {clientes.map((cliente) => (
                                        <tr key={cliente.id}>
                                            <RegistroTabla>{cliente.nombre}</RegistroTabla>
                                            <RegistroTabla>{cliente.DNI}</RegistroTabla>
                                            <RegistroTabla>{cliente.mail}</RegistroTabla>
                                            <RegistroTabla>{cliente.numero}</RegistroTabla>
                                            <RegistroTabla>{cliente.fechaNacimiento}</RegistroTabla>
                                            <RegistroTabla>{cliente.tipo}</RegistroTabla>
                                            <RegistroTabla>{cliente.rango}</RegistroTabla>
                                            <RegistroTabla>{cliente.estado}</RegistroTabla>
                                            <RegistroTabla>
                                                <Link to={`/clientes/modificar/${usuario}/${cliente.id}`} className="iconos-blancos"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmacionEliminar(cliente.id) }} className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
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

export default Operaciones;