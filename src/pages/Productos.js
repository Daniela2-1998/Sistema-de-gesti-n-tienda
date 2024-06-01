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
    ContenedorBusquedaCompleta, BusquedaCompleta,
    BusquedaDescargaPDF
} from '../components/TablasComponentes';
import SelectFiltros from '../components/SelectFiltros';


// Imports de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Imports PDF.
//import { PDFDownloadLink} from '@react-pdf/renderer';
//import PDFTablaDemo from '../components/PDFTablaDemo';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




const Productos = () => {

    // Variables
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('Listado completo');

    const { usuario } = useParams();

    const navigate = useNavigate();

    const productosCollection = collection(db, "productos");

    const consultaBusqueda = query(productosCollection, where(filtro, '==', busqueda));


    // Funciones
    // Generales
    const obtenerProductos = async () => {
        const data = await getDocs(productosCollection);
        setProductos(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerProductos();
    }, [])


    const eliminarProducto = async (id) => {
        const productoRegistrado = doc(productosCollection, id);
        await deleteDoc(productoRegistrado);
        obtenerProductos();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar el producto?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                // Uso de la función para eliminar registro.
                eliminarProducto(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }


    // Específicas
    const obtenerProductosByNombre = async () => {
        setFiltro("producto");
        const dataFiltrada = await getDocs(consultaBusqueda);
        setProductos(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProductosByCategoria = async () => {
        setFiltro("categoria");
        const dataFiltrada = await getDocs(consultaBusqueda);
        setProductos(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProductosByDisponibilidad = async () => {
        setFiltro("disponibilidad");
        const dataFiltrada = await getDocs(consultaBusqueda);
        setProductos(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProductosByDescuento = async () => {
        setFiltro("descuento");
        const dataFiltrada = await getDocs(consultaBusqueda);
        setProductos(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProductosByCodigo = async () => {
        setFiltro("codigo");
        const dataFiltrada = await getDocs(consultaBusqueda);
        setProductos(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const obtenerProductosByTipo = async () => {
        setFiltro("tipo");
        const dataFiltrada = await getDocs(consultaBusqueda);
        setProductos(
            dataFiltrada.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }



    const realizarFiltrado = (e) => {
        e.preventDefault();

        if (filtro === 'Listado completo') {
            obtenerProductos();
        } else if (filtro === 'Nombre producto') {
            obtenerProductosByNombre();
        } else if (filtro === 'Categoría') {
            obtenerProductosByCategoria();
        } else if (filtro === 'Disponibilidad') {
            obtenerProductosByDisponibilidad();
        } else if (filtro === 'Descuento') {
            obtenerProductosByDescuento();
        } else if (filtro === 'Código de producto') {
            obtenerProductosByCodigo();
        } else if (filtro === 'Tipo de producto') {
            obtenerProductosByTipo();
        }
    }

    // Enlaces
    const irAAgregarProductos = () => {
        navigate(`/productos/agregar/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Productos</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>

            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>

                            <ContenedorHeaderTabla>

                                <ContenedorFiltroHeaderTabla>
                                    <BotonHeaderTabla onClick={realizarFiltrado}>Filtrar búsqueda</BotonHeaderTabla>
                                    <SelectFiltros
                                        tipo='productos'
                                        filtro={filtro}
                                        setFiltro={setFiltro}
                                    />
                                    <InputHeaderTabla
                                        type="text"
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </ContenedorFiltroHeaderTabla>

                                <BotonHeaderTabla tipo='agregar' onClick={irAAgregarProductos} ><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar producto</BotonHeaderTabla>
                            </ContenedorHeaderTabla>

                            <Tabla className='table table-ligth table-hover'>
                                <thead>
                                    <tr>
                                        <EncabezadoTabla>Código</EncabezadoTabla>
                                        <EncabezadoTabla>Producto</EncabezadoTabla>
                                        <EncabezadoTabla>Categoría</EncabezadoTabla>
                                        <EncabezadoTabla>Stock</EncabezadoTabla>
                                        <EncabezadoTabla>Precio</EncabezadoTabla>
                                        <EncabezadoTabla>Acciones</EncabezadoTabla>
                                    </tr>
                                </thead>
                                <tbody className='borde-tabla'>

                                    {productos.map((producto) => (
                                        <tr key={producto.id}>
                                            <RegistroTabla>{producto.codigo}</RegistroTabla>
                                            <RegistroTabla>{producto.producto}</RegistroTabla>
                                            <RegistroTabla>{producto.categoria}</RegistroTabla>
                                            <RegistroTabla>${producto.precio}</RegistroTabla>
                                            <RegistroTabla>{producto.disponibilidad}</RegistroTabla>
                                            <RegistroTabla>
                                                <Link to={`/editar-producto/${usuario}`} className="icono btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmacionEliminar(producto.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                            </RegistroTabla>
                                        </tr>
                                    ))}
                                </tbody>
                            </Tabla>

                            <ContenedorBusquedaCompleta>
                                <BusquedaCompleta onClick={obtenerProductos} className='btn boton-registro'>Tabla completa</BusquedaCompleta>
                            </ContenedorBusquedaCompleta>


                        </div>
                    </div>
                </div>
                { /* FALTA AGREGAR PDF Y CANTIDAD */}
            </ContenedorGeneral>
        </>
    )
}

export default Productos;