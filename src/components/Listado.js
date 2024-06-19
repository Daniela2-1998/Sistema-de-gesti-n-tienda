import React, { useState, useEffect } from 'react';

import db from '../firebase/FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

import styled from 'styled-components';
import theme from '../theme';


function Listado({ contenidoListado }) {

    // Subcategorías
    const [subcategorias, setOpcionesSubCategorias] = useState([]);
    const [sucursales, setSucursales] = useState([]);

    const subCategoriasCollection = collection(db, "subcategorias");

    const obtenerSubCategorias = async () => {
        const data = await getDocs(subCategoriasCollection);
        setOpcionesSubCategorias(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    // Sucursales
    const sucursalesCollection = collection(db, "sucursales");

    const obtenerSucursales = async () => {
        const data = await getDocs(sucursalesCollection);
        setSucursales(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerSubCategorias();
        obtenerSucursales();
    }, []);



    return (
        <>
            {
                contenidoListado === 'subcategorias' ?
                    <ContenedorListado>
                        {subcategorias.map((subcategoria) => {
                            return <div
                                key={subcategoria.id}
                                data-valor={subcategoria.id}
                            >
                                {subcategoria.subcategoria}
                            </div>
                        })
                        }
                    </ContenedorListado>
                    : contenidoListado === 'sucursales' ?
                        <ContenedorListado>
                            {sucursales.map((sucursal) => {
                                return <div
                                    key={sucursal.id}
                                    data-valor={sucursal.id}
                                >
                                    {sucursal.sucursal}
                                </div>
                            })
                            }
                        </ContenedorListado>
                        :
                        ''

            }
        </>
    )

};


const ContenedorListado = styled.div`
  width: fit-content;   
  height: fit-content;
  margin-top: 5%;
  margin-left: 40%;
  padding: 2%;
  border-radius: 10px;
  background-color: ${theme.grisClaro};
  color: #ED8936;
  font-size: 18px;
  font-weight: normal;
  display: flex;
  flex-direction: column;


   @media(max-width: 600px){
  }
`;

export default Listado;