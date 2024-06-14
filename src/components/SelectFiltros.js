import React, { useState } from 'react';

import styled from 'styled-components';
import theme from '../theme';



function SelectFiltros({ tipo, filtro, setFiltro }) {

    const [mostrarSelect, cambiarMostrarSelect] = useState(false);

    const filtrosProducto = [
        { id: 'Listado completo', texto: 'Listado completo' },
        { id: 'Nombre producto', texto: 'Nombre producto' },
        { id: 'Categoría', texto: 'Categoría' },
        { id: 'Disponibilidad', texto: 'Disponibilidad' },
        { id: 'Descuento', texto: 'Descuento' },
        { id: 'Código de producto', texto: 'Código de producto' },
        { id: 'Tipo de producto', texto: 'Tipo de producto' },
    ];

    const filtrosUsuario = [
        { id: 'Listado completo', texto: 'Listado completo' },
        { id: 'Nombre', texto: 'Nombre' },
        { id: 'Mail/Usuario', texto: 'Mail/Usuario' },
        { id: 'Rol', texto: 'Rol' },
        { id: 'Cargo', texto: 'Cargo' },
        { id: 'Fecha de ingreso', texto: 'Fecha de ingreso' },
        { id: 'Estado', texto: 'Estado' },
    ];

    const filtrosEmpleado = [
        { id: 'Listado completo', texto: 'Listado completo' },
        { id: 'Nombre', texto: 'Nombre' },
        { id: 'Mail/Usuario', texto: 'Mail/Usuario' },
        { id: 'ID', texto: 'ID' },
        { id: 'DNI', texto: 'DNI' },
        { id: 'Sucursal', texto: 'Sucursal' },
        { id: 'Estado', texto: 'Estado' },
    ];

    const filtrosProveedor = [
        { id: 'Listado completo', texto: 'Listado completo' },
        { id: 'Proveedor', texto: 'Proveedor' },
        { id: 'Nombre de contacto', texto: 'Nombre de contacto' },
        { id: 'Mail', texto: 'Mail' },
        { id: 'Número', texto: 'Número' },
        { id: 'Estado', texto: 'Estado' },
    ];


    const handleClick = (e) => {
        setFiltro(e.currentTarget.dataset.valor);
    }


    return (
        <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
            <></>
            <OpcionSeleccionada>
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                {filtro}
            </OpcionSeleccionada>

            {mostrarSelect &&
                <Opciones>
                    {
                        tipo === 'productos' ?
                            filtrosProducto.map((filtrosProducto) => {

                                setFiltro(filtrosProducto.texto);

                                return <Opcion
                                    key={filtrosProducto.id}
                                    data-valor={filtrosProducto.id}
                                    onClick={handleClick}
                                >
                                    {filtrosProducto.texto}
                                </Opcion>
                            })
                            : tipo === 'usuarios' ?
                            filtrosUsuario.map((filtrosUsuario) => {

                                setFiltro(filtrosUsuario.texto);

                                return <Opcion
                                    key={filtrosUsuario.id}
                                    data-valor={filtrosUsuario.id}
                                    onClick={handleClick}
                                >
                                    {filtrosUsuario.texto}
                                </Opcion>
                            })
                            : tipo === 'empleados' ?
                            filtrosEmpleado.map((filtrosEmpleado) => {

                                setFiltro(filtrosEmpleado.texto);

                                return <Opcion
                                    key={filtrosEmpleado.id}
                                    data-valor={filtrosEmpleado.id}
                                    onClick={handleClick}
                                >
                                    {filtrosEmpleado.texto}
                                </Opcion>
                            })
                            : tipo === 'proveedores' ?
                            filtrosProveedor.map((filtrosProveedor) => {

                                setFiltro(filtrosProveedor.texto);

                                return <Opcion
                                    key={filtrosProveedor.id}
                                    data-valor={filtrosProveedor.id}
                                    onClick={handleClick}
                                >
                                    {filtrosProveedor.texto}
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
    width: 25%;
    background: ${theme.grisClaro};
    color: #ED8936;
    cursor: pointer;
    padding: 0px 20px; 
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;

    &:hover {
        background: ${theme.grisClaro2};
    }
`;


const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const Opciones = styled.div`
    width: 22%;
    height: 100px;
    background: ${theme.grisClaro};
    position: absolute;
    top: 260px;
    left: 270px;
     
    overflow-y: auto;
`;


const Opcion = styled.div`
    padding: 20px;
    display: flex;

    &:hover {
        background: ${theme.grisClaro2};
    }
`;


export default  SelectFiltros;