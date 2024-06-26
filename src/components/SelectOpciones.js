import React, { useState, useEffect } from 'react';

import db from '../firebase/FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';


import styled from 'styled-components';
import theme from '../theme';


function SelectOpciones({ tipo, opciones, setOpciones, setFuncion }) {

    const [mostrarSelect, cambiarMostrarSelect] = useState(false);


    // Usuarios
    const opcionesRoles = [
        { id: 'Empleado', texto: 'Empleado' },
        { id: 'Administrador', texto: 'Administrador' },
    ];

    const opcionesEstado = [
        { id: 'Activo', texto: 'Activo' },
        { id: 'Suspendido', texto: 'Suspendido' },
        { id: 'Inactivo', texto: 'Inactivo' },
    ];


    const [opcionesSucursales, setOpcionesSucursales] = useState([]);
    const sucursalesCollection = collection(db, "sucursales");

    const obtenerSucursales = async () => {
        const data = await getDocs(sucursalesCollection);
        setOpcionesSucursales(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    const [listadoUsuarios, setListadoUsuarios] = useState([]);
    const usuariosCollection = collection(db, "usuarios");

    const obtenerUsuarios = async () => {
        const data = await getDocs(usuariosCollection);
        setListadoUsuarios(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    // Empleados
    const [listadoEmpleados, setListadoEmpleados] = useState([]);
    const empleadosCollection = collection(db, "empleados");

    const obtenerEmpleados = async () => {
        const data = await getDocs(empleadosCollection);
        setListadoEmpleados(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    // Clientes
    const opcionesTipoCliente = [
        { id: 'Particular', texto: 'Particular' },
        { id: 'Empresa', texto: 'Empresa' },
    ];

    const opcionesRangoCliente = [
        { id: 'General', texto: 'General' },
        { id: 'Empresa', texto: 'Empresa' },
        { id: 'VIP', texto: 'VIP' },
    ];


    // Productos
    const opcionesDisponibilidad = [
        { id: 'en stock', texto: 'En stock' },
        { id: 'sin stock', texto: 'Sin stock' },
        { id: 'próximo ingreso', texto: 'Próximo ingreso' },
        { id: 'preventa', texto: 'Preventa' },
    ];

    const opcionesCategorias = [
        { id: 'General', texto: 'General' },
        { id: 'Electrónicos', texto: 'Electrónicos' },
        { id: 'Hogar', texto: 'Hogar' },
        { id: 'Patio/Jardín', texto: 'Patio/Jardín' },
        { id: 'Alimentos', texto: 'Alimentos' },
        { id: 'Bebidas', texto: 'Bebidas' },
        { id: 'Ropa', texto: 'Ropa' },
    ];


    const [opcionesSubCategorias, setOpcionesSubCategorias] = useState([]);
    const subCategoriasCollection = collection(db, "subcategorias");

    const obtenerSubCategorias = async () => {
        const data = await getDocs(subCategoriasCollection);
        setOpcionesSubCategorias(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    // Operaciones
    const opcionesEstadoOperacion = [
        { id: 'Ingresado', texto: 'Ingresado' },
        { id: 'Entregado', texto: 'Entregado' },
        { id: 'En transito', texto: 'En transito' },
        { id: 'Reservado', texto: 'Reservado' },
        { id: 'En preparación', texto: 'En preparación' },
        { id: 'En control/limpieza', texto: 'En control/limpieza' },
        { id: 'Separado por error, rotura u otro incidente', texto: 'Separado por error, rotura u otro incidente' },
        { id: 'Cancelado', texto: 'Cancelado' },
    ];

    const opcionesTipoOperacion = [
        { id: 'Compra', texto: 'Compra' },
        { id: 'Venta', texto: 'Venta' },
        { id: 'Compra de suministros', texto: 'Compra de suministros' },
        { id: 'Importación', texto: 'Importación' },
        { id: 'Exportación', texto: 'Exportación' },
        { id: 'Transporte nacional', texto: 'Transporte nacional' },
        { id: 'Transporte internacional', texto: 'Transporte internacional' },
        { id: 'Deposito', texto: 'Deposito' },
        { id: 'Limpieza', texto: 'Limpieza' },
        { id: 'Reparación', texto: 'Reparación' },
    ];

    const opcionesInvolucradoEnOperacion = [
        { id: 'Producto propio', texto: 'Producto propio' },
        { id: 'Producto externo', texto: 'Producto externo' },
        { id: 'Servicio propio', texto: 'Servicio propio' },
        { id: 'Servicio externo', texto: 'Servicio externo' },
    ];


    // Cupones
    const opcionesCupones = [
        { id: '10%', texto: '10%' },
        { id: '15%', texto: '15%' },
        { id: '20%', texto: '20%' },
        { id: '25%', texto: '25%' },
        { id: '30%', texto: '30%' },
        { id: '40%', texto: '40%' },
        { id: '50%', texto: '50%' },
        { id: '$1000', texto: '$1000' },
        { id: '$5000', texto: '$5000' },
        { id: '$10000', texto: '$10000' },
        { id: '$20000', texto: '$20000' },
        { id: '$50000', texto: '$50000' },
    ];


    useEffect(() => {
        obtenerSubCategorias();
        obtenerSucursales();
        obtenerUsuarios();
        obtenerEmpleados();
    }, []);




    const handleClick = (e) => {
        setOpciones(e.currentTarget.dataset.valor);
    }


    return (
        <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
            <></>
            <OpcionSeleccionada>
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                {opciones}
            </OpcionSeleccionada>


            {mostrarSelect &&
                <Opciones>
                    {
                        tipo === 'disponibilidad' ?
                            opcionesDisponibilidad.map((opcionDisponibilidad) => {
                                return <Opcion
                                    key={opcionDisponibilidad.id}
                                    data-valor={opcionDisponibilidad.id}
                                    onClick={handleClick}
                                >
                                    {opcionDisponibilidad.texto}
                                </Opcion>
                            })
                            : tipo === 'categorias' ?
                                opcionesCategorias.map((opcionCategorias) => {
                                    return <Opcion
                                        key={opcionCategorias.id}
                                        data-valor={opcionCategorias.id}
                                        onClick={handleClick}
                                    >
                                        {opcionCategorias.texto}
                                    </Opcion>
                                })
                                : tipo === 'subcategorias' ?
                                    opcionesSubCategorias.map((opcionSubCategorias) => {
                                        return <Opcion
                                            key={opcionSubCategorias.id}
                                            data-valor={opcionSubCategorias.id}
                                            onClick={handleClick}
                                        >
                                            {opcionSubCategorias.subcategoria}
                                        </Opcion>
                                    })

                                    : tipo === 'sucursales' ?
                                        opcionesSucursales.map((opcionSucursal) => {
                                            return <Opcion
                                                key={opcionSucursal.id}
                                                data-valor={opcionSucursal.id}
                                                onClick={handleClick}
                                            >
                                                {opcionSucursal.sucursal}
                                            </Opcion>
                                        })
                                        : tipo === 'roles' ?
                                            opcionesRoles.map((opcionRol) => {
                                                return <Opcion
                                                    key={opcionRol.id}
                                                    data-valor={opcionRol.id}
                                                    onClick={handleClick}
                                                >
                                                    {opcionRol.texto}
                                                </Opcion>
                                            })
                                            : tipo === 'estado' ?
                                                opcionesEstado.map((opcionEstado) => {
                                                    return <Opcion
                                                        key={opcionEstado.id}
                                                        data-valor={opcionEstado.id}
                                                        onClick={handleClick}
                                                    >
                                                        {opcionEstado.texto}
                                                    </Opcion>
                                                })
                                                : tipo === 'listado-usuarios' ?
                                                listadoUsuarios.map((usuarioListado) => {
                                                    return <Opcion
                                                        key={usuarioListado.id}
                                                        data-valor={usuarioListado.id}
                                                        onClick={handleClick}
                                                    >
                                                        {usuarioListado.mail}
                                                    </Opcion>
                                                })
                                                : tipo === 'tipos-cliente' ?
                                                opcionesTipoCliente.map((tipoCliente) => {
                                                    return <Opcion
                                                        key={tipoCliente.id}
                                                        data-valor={tipoCliente.id}
                                                        onClick={handleClick}
                                                    >
                                                        {tipoCliente.texto}
                                                    </Opcion>
                                                })
                                                : tipo === 'rangos-cliente' ?
                                                opcionesRangoCliente.map((rangoCliente) => {
                                                    return <Opcion
                                                        key={rangoCliente.id}
                                                        data-valor={rangoCliente.id}
                                                        onClick={handleClick}
                                                    >
                                                        {rangoCliente.texto}
                                                    </Opcion>
                                                })
                                                : tipo === 'estados-operacion' ?
                                                opcionesEstadoOperacion.map((estadoOperacion) => {
                                                    return <Opcion
                                                        key={estadoOperacion.id}
                                                        data-valor={estadoOperacion.id}
                                                        onClick={handleClick}
                                                    >
                                                        {estadoOperacion.texto}
                                                    </Opcion>
                                                })
                                                : tipo === 'tipos-operacion' ?
                                                opcionesTipoOperacion.map((tipoOperacion) => {
                                                    return <Opcion
                                                        key={tipoOperacion.id}
                                                        data-valor={tipoOperacion.id}
                                                        onClick={handleClick}
                                                    >
                                                        {tipoOperacion.texto}
                                                    </Opcion>
                                                })
                                                : tipo === 'involucrado-operacion' ?
                                                opcionesInvolucradoEnOperacion.map((involucradoOperacion) => {
                                                    return <Opcion
                                                        key={involucradoOperacion.id}
                                                        data-valor={involucradoOperacion.id}
                                                        onClick={handleClick}
                                                    >
                                                        {involucradoOperacion.texto}
                                                    </Opcion>
                                                })
                                                : tipo === 'listado-empleados' ?
                                                listadoEmpleados.map((empleado) => {
                                                    return <Opcion
                                                        key={empleado.id}
                                                        data-valor={empleado.nombre}
                                                        onClick={handleClick}
                                                    >
                                                        {empleado.nombre} - {empleado.usuarioAsociado}
                                                    </Opcion>
                                                })
                                                : tipo === 'cupones' ?
                                                opcionesCupones.map((cupones) => {
                                                    return <Opcion
                                                        key={cupones.id}
                                                        data-valor={cupones.id}
                                                        onClick={handleClick}
                                                    >
                                                        {cupones.texto}
                                                    </Opcion>
                                                })
                                                :
                                    
                                                ''
                    }
                </Opciones>
            }
        </ContenedorSelect>

    )
}

const ContenedorSelect = styled.div`
    height: 50px;
    width: 80%;
    border-radius: 10px;
    background: #fff;
    color: #ED8936;
    cursor: pointer;
    padding: 0px 20px; 
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
`;


const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const Opciones = styled.div`
    width: 24%;
    height: 120px;
    margin-top: 10%;
    background: #fff;
    position: absolute;
    overflow-y: auto;
`;


const Opcion = styled.div`
    padding: 20px;
    display: flex;
`;

//export { ContenedorSelect, OpcionSeleccionada, Opciones, Opcion };
export default SelectOpciones;