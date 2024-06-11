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




const Usuarios = () => {

    // Variables
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('Listado completo');

    const { usuario } = useParams();

    const navigate = useNavigate();

    const usuariosCollection = collection(db, "usuarios");


    // Funciones
    // Generales
    const obtenerUsuarios = async () => {
        const data = await getDocs(usuariosCollection);
        setUsuarios(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerUsuarios();
    }, []);


    const eliminarUsuario = async (id) => {
        const usuarioRegistrado = doc(usuariosCollection, id);
        await deleteDoc(usuarioRegistrado);
        obtenerUsuarios();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar al usuario?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                eliminarUsuario(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }


    // Específicas
    const obtenerUsuariosByNombre = async () => {
        const dataFiltrada = await getDocs(query(usuariosCollection, where("nombre", '==', busqueda)));
        setUsuarios(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerUsuariosByMail = async () => {
        const dataFiltrada = await getDocs(query(usuariosCollection, where("mail", '==', busqueda)));
        setUsuarios(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerUsuariosByRol = async () => {
        const dataFiltrada = await getDocs(query(usuariosCollection, where("rol", '==', busqueda)));
        setUsuarios(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerUsuariosByCargo = async () => {
        const dataFiltrada = await getDocs(query(usuariosCollection, where("cargo", '==', busqueda)));
        setUsuarios(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerUsuariosByAñoIngreso = async () => {
        const dataFiltrada = await getDocs(query(usuariosCollection, where("añoIngreso", '==', busqueda)));
        setUsuarios(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerUsuariosByEstado = async () => {
        const dataFiltrada = await getDocs(query(usuariosCollection, where("estado", '==', busqueda)));
        setUsuarios(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }



    const realizarFiltrado = (e) => {
        e.preventDefault();

        if (filtro === 'Listado completo') {
            obtenerUsuarios();
        } else if (filtro === 'Nombre') {
            obtenerUsuariosByNombre();
        } else if (filtro === 'Mail/Usuario') {
            obtenerUsuariosByMail();
        } else if (filtro === 'Rol') {
            obtenerUsuariosByRol();
        } else if (filtro === 'Cargo') {
            obtenerUsuariosByCargo();
        } else if (filtro === 'Fecha de ingreso') {
            obtenerUsuariosByAñoIngreso();
        } else if (filtro === 'Estado') {
            obtenerUsuariosByEstado();
        }

    }

    // Enlaces
    const irAAgregarUsuarios = () => {
        navigate(`/admin/usuarios/agregar/${usuario}`);
    }

    const regresar = () => {
        navigate(`/administrador/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Usuarios</title>
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
                                        tipo='usuarios'
                                        filtro={filtro}
                                        setFiltro={setFiltro}
                                    />
                                    <InputHeaderTabla
                                        type="text"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </ContenedorFiltroHeaderTabla>

                                <BotonHeaderTabla tipo='agregar' onClick={irAAgregarUsuarios} ><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar usuario</BotonHeaderTabla>
                            </ContenedorHeaderTabla>

                            <Tabla className='table table-ligth table-hover'>
                                <thead>
                                    <tr>
                                        <EncabezadoTabla>ID / Usuario</EncabezadoTabla>
                                        <EncabezadoTabla>Nombre</EncabezadoTabla>
                                        <EncabezadoTabla>Cargo</EncabezadoTabla>
                                        <EncabezadoTabla>Rol</EncabezadoTabla>
                                        <EncabezadoTabla>Estado</EncabezadoTabla>
                                        <EncabezadoTabla>Acciones</EncabezadoTabla>
                                    </tr>
                                </thead>
                                <tbody className='borde-tabla'>

                                    {usuarios.map((usuarioM) => (
                                        <tr key={usuarioM.id}>
                                            <RegistroTabla>{usuarioM.mail}</RegistroTabla>
                                            <RegistroTabla>{usuarioM.nombre}</RegistroTabla>
                                            <RegistroTabla>{usuarioM.cargo}</RegistroTabla>
                                            <RegistroTabla>{usuarioM.rol}</RegistroTabla>
                                            <RegistroTabla>{usuarioM.estado}</RegistroTabla>
                                            <RegistroTabla>
                                                <Link to={`/admin/usuarios/modificar/${usuario}/${usuarioM.id}`} className="iconos-blancos"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmacionEliminar(usuarioM.id) }} className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
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

export default Usuarios;