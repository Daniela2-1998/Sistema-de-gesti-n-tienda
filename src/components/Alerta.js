import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import theme from '../theme';


const efectoAlerta = keyframes`

    0% {
        transform: translateY(-20px); 
        opacity: 0;
    }
 
    10% {
        transform: translateY(20px);
        opacity: 1;
    }
    
    90% {
        transform: translateY(20px7);
        opacity: 1;
    }
 
    100% {
        transform: translateY(20px);
        opacity: 0;
    }

`;
 

// Contenedor alerta.
const ContenedorAlerta = styled.div`
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 20px; /* 20px */
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${efectoAlerta} 4s ease forwards;
 
    p {
 
        background: ${(props) => {
            if(props.tipo === 'error'){
                return theme.rojo;
            } else if (props.tipo === 'exito') {
                return theme.verde;
            } else {
                return '#000';
            }
        }};
        color: #fff;
        padding: 1.25rem 2.5rem; /* 20px 40px */
        border-radius: 0.31rem; /* 5px */
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
    }
`;


// Función para la generación de la alerta.
const Alerta = ({tipo, mensaje, estadoAlerta, cambiarEstadoAlerta}) => {
    
    // Se ejecuta sólo cuando cambia el estado.
    useEffect( () => {
        let tiempo;

        if(estadoAlerta === true){
            tiempo = setTimeout( () => {
                cambiarEstadoAlerta(false);
            }, 4000);
        }

        // Limpieza.
        return(() => clearTimeout(tiempo));

    }, [estadoAlerta, cambiarEstadoAlerta]);


    // Código del front que retorna dentro del tiempo establecido como alerta.
    return (
        <>
            {estadoAlerta &&
                <ContenedorAlerta tipo={tipo}>
                    <p>{mensaje}</p>
                </ContenedorAlerta>
            }
        </>
    );
}
 
export default Alerta;