import React, { useState } from 'react';

import styled from 'styled-components';
import theme from '../theme';
//import { ReactComponent as IconDown } from '../images/down.svg';


function SelectFiltros({ tipo, filtro, setFiltro }) {

    const [mostrarSelect, cambiarMostrarSelect] = useState(false);

    const filtrosProducto = [
        { id: 'listado completo', texto: 'Listado completo' },
        { id: 'nombre producto', texto: 'Nombre producto' },
        { id: 'categoría', texto: 'Categoría' },
        { id: 'disponibilidad', texto: 'Disponibilidad' },
        { id: 'descuento', texto: 'Descuento' },
        { id: 'código de producto', texto: 'Código de producto' },
        { id: 'tipo de producto', texto: 'Tipo de producto' },
    ];

    const handleClick = (e) => {
        setFiltro(e.currentTarget.dataset.valor);
    }


    return (
        <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
            <></>
            <OpcionSeleccionada>
                {filtro}
                { /* <IconDown /> */}
            </OpcionSeleccionada>

            {mostrarSelect &&
                <Opciones>
                    {
                        tipo == 'productos' ?
                            filtrosProducto.map((filtrosProducto) => {
                                return <Opcion
                                    key={filtrosProducto.id}
                                    data-valor={filtrosProducto.id}
                                    onClick={handleClick}
                                >
                                    {filtrosProducto.texto}
                                </Opcion>
                            })
                            : ''
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


export default SelectFiltros;