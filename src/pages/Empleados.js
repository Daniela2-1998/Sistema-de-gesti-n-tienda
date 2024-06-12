import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { collection, getDocs, getDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
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




const Empleados = () => {

    // Variables
    const [empleados, setEmpleados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('Listado completo');

    const { usuario } = useParams();

    const navigate = useNavigate();

    const empleadosCollection = collection(db, "empleados");



    // Funciones
    // Generales
    const obtenerEmpleados = async () => {
        const data = await getDocs(empleadosCollection);
        setEmpleados(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerEmpleados();
    }, []);


    const eliminarEmpleado = async (id) => {
        const empleadoRegistrado = doc(empleadosCollection, id);
        await deleteDoc(empleadoRegistrado);
        obtenerEmpleados();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar al empleado?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                eliminarEmpleado(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }


    // Específicas
    const obtenerEmpleadosByNombre = async () => {
        const dataFiltrada = await getDocs(query(empleadosCollection, where("nombre", '==', busqueda)));
        setEmpleados(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerEmpleadosByMail = async () => {
        const dataFiltrada = await getDocs(query(empleadosCollection, where("usuarioAsociado", '==', busqueda)));
        setEmpleados(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerEmpleadosByID = async () => {
        const dataFiltrada = await getDocs(query(empleadosCollection, where("id", '==', busqueda)));
        setEmpleados(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerEmpleadosByDNI = async () => {
        const dataFiltrada = await getDocs(query(empleadosCollection, where("dni", '==', busqueda)));
        setEmpleados(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerEmpleadosBySucursal = async () => {
        const dataFiltrada = await getDocs(query(empleadosCollection, where("sucursal", '==', busqueda)));
        setEmpleados(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerEmpleadosByEstado = async () => {
        const dataFiltrada = await getDocs(query(empleadosCollection, where("estado", '==', busqueda)));
        setEmpleados(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    const realizarFiltrado = (e) => {
        e.preventDefault();

        if (filtro === 'Listado completo') {
            obtenerEmpleados();
        } else if (filtro === 'Nombre') {
            obtenerEmpleadosByNombre();
        } else if (filtro === 'Mail/Usuario') {
            obtenerEmpleadosByMail();
        } else if (filtro === 'ID') {
            obtenerEmpleadosByID();
        } else if (filtro === 'DNI') {
            obtenerEmpleadosByDNI();
        } else if (filtro === 'Sucursal') {
            obtenerEmpleadosBySucursal();
        } else if (filtro === 'Estado') {
            obtenerEmpleadosByEstado();
        }

    }

    // Enlaces
    const irAAgregarEmpleados = () => {
        navigate(`/admin/empleados/agregar/${usuario}`);
    }

    const regresar = () => {
        navigate(`/administrador/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Empleados</title>
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
                                        tipo='empleados'
                                        filtro={filtro}
                                        setFiltro={setFiltro}
                                    />
                                    <InputHeaderTabla
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </ContenedorFiltroHeaderTabla>

                                <BotonHeaderTabla tipo='agregar' onClick={irAAgregarEmpleados} ><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar empleado</BotonHeaderTabla>
                            </ContenedorHeaderTabla>

                            <Tabla className='table table-ligth table-hover'>
                                <thead>
                                    <tr>
                                        <EncabezadoTabla>ID</EncabezadoTabla>
                                        <EncabezadoTabla>Usuario</EncabezadoTabla>
                                        <EncabezadoTabla>Nombre</EncabezadoTabla>
                                        <EncabezadoTabla>DNI</EncabezadoTabla>
                                        <EncabezadoTabla>Sucursal</EncabezadoTabla>
                                        <EncabezadoTabla>Ventas</EncabezadoTabla>
                                        <EncabezadoTabla>Estado</EncabezadoTabla>
                                        <EncabezadoTabla>Acciones</EncabezadoTabla>
                                    </tr>
                                </thead>
                                <tbody className='borde-tabla'>

                                    {empleados.map((empleado) => (
                                        <tr key={empleado.id}>
                                            <RegistroTabla>{empleado.id}</RegistroTabla>
                                            <RegistroTabla>{empleado.usuarioAsociado}</RegistroTabla>
                                            <RegistroTabla>{empleado.nombre}</RegistroTabla>
                                            <RegistroTabla>{empleado.dni}</RegistroTabla>
                                            <RegistroTabla>{empleado.sucursal}</RegistroTabla>
                                            <RegistroTabla>{empleado.ventas}</RegistroTabla>
                                            <RegistroTabla>{empleado.estado}</RegistroTabla>
                                            <RegistroTabla>
                                                <Link to={`/admin/empleados/modificar/${usuario}/${empleado.id}`} className="iconos-blancos"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmacionEliminar(empleado.id) }} className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
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

export default Empleados;