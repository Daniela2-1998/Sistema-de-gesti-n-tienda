import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Helmet
import { Helmet } from "react-helmet";

// Firebase
import db from '../firebase/FirebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

// Estilos
import { ContenedorGeneral, Header, ContenedorCards, Cards, ImagenesCards, BotonesCards } from '../components/InicioComponentes';



function Administrador() {

  // Variables
  const { usuario } = useParams();

  const navigate = useNavigate();

  // Enlaces
  const irAEmpleadosAdmin = () => {
    navigate(`/admin/empleados/${usuario}`);
  }

  const irAUsuarios = () => {
    navigate(`/admin/usuarios/${usuario}`);
  }

  const irASucursales = () => {
    navigate(`/admin/sucursales/${usuario}`);
  }

  const irAContabilidad = () => {
    navigate(`/admin/contabilidad/${usuario}`);
  }

  const irAPedidos = () => {
    navigate(`/admin/pedidos/${usuario}`);
  }

  const irAConfiguracion = () => {
    navigate(`/admin/configuracion/${usuario}`);
  }

  const irACupones = () => {
    navigate(`/admin/cupones/${usuario}`);
  }

  const irAInicio = () => {
    navigate(`/inicio/${usuario}`);
  }




  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>System Solutions - Inicio</title>
        <link rel="icon" href="../images/Logo.svg" />
      </Helmet>

      <ContenedorGeneral>
        <Header>
          <h1>Sistema de gestión comercial</h1>
        </Header>

        <ContenedorCards tipo='admin'>

          <Cards>
            <ImagenesCards className='imagen imagen-empleados' />
            <BotonesCards onClick={irAEmpleadosAdmin}>Empleados</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-usuarios' />
            <BotonesCards onClick={irAUsuarios}>Usuarios</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-sucursales' />
            <BotonesCards onClick={irASucursales}>Sucursales</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-contabilidad' />
            <BotonesCards onClick={irAContabilidad}>Contabilidad</BotonesCards>
          </Cards>

          { /*
          <Cards>
            <ImagenesCards className='imagen imagen-pedidos' />
            <BotonesCards onClick={irAPedidos}>Pedidos</BotonesCards>
          </Cards>
          */}

          <Cards>
            <ImagenesCards className='imagen imagen-configuracion' />
            <BotonesCards onClick={irAConfiguracion}>Configuracion</BotonesCards>
          </Cards>
        
          <Cards>
            <ImagenesCards className='imagen imagen-cupones' />
            <BotonesCards onClick={irACupones}>Cupones</BotonesCards>
          </Cards>

        </ContenedorCards>
        
      </ContenedorGeneral>
    </>
  )
}

export default Administrador;