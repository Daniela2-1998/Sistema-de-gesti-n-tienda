import React, { useState, useEffect } from 'react';

import db from '../firebase/FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

import styled from 'styled-components';
import theme from '../theme';


function ListadoDeProductosOperacion({ productos, fechaActual, fechaFinalizacion, operacion, empleado, participante, total, descuento, estado }) {


  useEffect(() => {
  }, []);

  return (
    <>
      <ContenedorListado>
        <Titulo>Información de la operación actual</Titulo>

        <ContenedorDetallesOperacion>
          <FechaActual>{fechaActual}</FechaActual>
          <InformacionDetalles>Tipo de operación: {operacion}</InformacionDetalles>

          {
            operacion === 'Compra' || operacion === 'Compra de suministros' ?
              <InformacionDetalles>Comprador: {empleado}</InformacionDetalles>
              : operacion === 'Venta' ?
                <InformacionDetalles>Vendedor: {empleado}</InformacionDetalles>
                : operacion === 'Importación' ?
                  <InformacionDetalles>Importador: {empleado}</InformacionDetalles>
                  : operacion === 'Exportación' ?
                    <InformacionDetalles>Exportador: {empleado}</InformacionDetalles>
                    : operacion === 'Transporte nacional' || operacion === 'Transporte internacional' ?
                      <InformacionDetalles>Contratador del transporte: {empleado}</InformacionDetalles>
                      : operacion === 'Deposito' || operacion === 'Limpieza' || operacion === 'Reparación' ?
                        <InformacionDetalles>Contratador beneficiario: {empleado}</InformacionDetalles>
                        :
                        ''
          }

          {
            operacion === 'Compra' || operacion === 'Compra de suministros' ?
              <InformacionDetalles>Vendedor: {participante}</InformacionDetalles>
              : operacion === 'Venta' ?
                <InformacionDetalles>Comprador: {participante}</InformacionDetalles>
                : operacion === 'Importación' ?
                  <InformacionDetalles>Exportador: {participante}</InformacionDetalles>
                  : operacion === 'Exportación' ?
                    <InformacionDetalles>Importador: {participante}</InformacionDetalles>
                    : operacion === 'Transporte nacional' || operacion === 'Transporte internacional' ?
                      <InformacionDetalles>Proveedor del transporte: {participante}</InformacionDetalles>
                      : operacion === 'Deposito' || operacion === 'Limpieza' || operacion === 'Reparación' ?
                        <InformacionDetalles>Proveedor beneficiario: {participante}</InformacionDetalles>
                        :
                        ''
          }

          <InformacionDetalles>Fecha de finalización: {fechaFinalizacion}</InformacionDetalles>
          <InformacionDetalles>Estado: {estado}</InformacionDetalles>
        </ContenedorDetallesOperacion>

        <ContenedorProductos>
          <thead>
            <ContenedorTitulos>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </ContenedorTitulos>
          </thead>

          <tbody>

          </tbody>

          {productos.map((produ) => (
            <ContenedorContenidoTabla key={produ.idProducto}>
              <ContenidoTabla>{produ.idProducto}</ContenidoTabla>
              <ContenidoTabla>{produ.producto}</ContenidoTabla>
              <ContenidoTabla>{produ.precio}</ContenidoTabla>
              <ContenidoTabla>{produ.cantidad}</ContenidoTabla>
              <ContenidoTabla>
                <button className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
              </ContenidoTabla>
            </ContenedorContenidoTabla>
          ))}
        </ContenedorProductos>

        <ContenedorTotal>
          <h3>Total: ${total}</h3>
          <h3>Descuento: {descuento}</h3>
        </ContenedorTotal>

      </ContenedorListado>
    </>
  )

};


const ContenedorListado = styled.div`
    height: auto;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 7%;
    border-radius: 20px;
    border: 2px dashed #ED8936;
    background-color: ${theme.grisClaro};
    color: #ED8936;
    box-shadow: 10px 10px 5px lightblue;
`;

const Titulo = styled.h1`
    margin-left: 32%;
`;

const ContenedorDetallesOperacion = styled.div`
    margin-left: 5%;
    display: flex;
    flex-direction: column;
`;

const FechaActual = styled.label`
    margin-left: 90%;
    font-size: 20px;
`;

const InformacionDetalles = styled.label`
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 1%;
`;

const ContenedorProductos = styled.table`  
    width: 80%;
    font-size: 15px;
    font-weight: normal;
    margin-top: 7%;
    margin-left: 5%;
    margin-bottom: 5%;
    justify-content: space-between;
`;

const ContenedorTitulos = styled.tr`
    width: 100%;
    font-size: 17px;
    font-weight: bold;

    th{
      text-transform: uppercase;
    }
`;

const ContenedorContenidoTabla = styled.tr`
    width: 100%;
    justify-content: space-between;
    font-size: 16px;  
    font-weight: normal;
`;

const ContenidoTabla = styled.th`
  border-top: 2px dashed #ED8936;
`;

const ContenedorTotal = styled.div`
  border-top: 2px dashed #ED8936;
  display: flex;
  flex-direction: space-between;
  
  h3{
     margin-left: 5%;
  }   
`;



export default ListadoDeProductosOperacion;