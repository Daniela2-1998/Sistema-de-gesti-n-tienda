import React, { useState, useEffect } from 'react';

import db from '../firebase/FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';


import styled from 'styled-components';
import theme from '../theme';


function SelectOpciones({ tipo, opciones, setOpciones }) {

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


    useEffect(() => {
        obtenerSubCategorias();
        obtenerSucursales();
        obtenerUsuarios();
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