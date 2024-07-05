import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Helmet
import { Helmet } from "react-helmet";

// Firebase
import db from '../firebase/FirebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

// Estilos
import { ContenedorGeneral, ContenedorCards, Cards, ImagenesCards, BotonesCards, Header } from '../components/InicioComponentes';



function Inicio() {

  // Variables
  const { usuario } = useParams();

  const [rol, setRol] = useState("");

  const [usuarioActivo, setUsuarioActivo] = useState([]);


  const navigate = useNavigate();


  // Función para recuperar los datos del usuario de Firebase
  const recuperarDatosDeUsuarioFirebase = async () => {
    const usuarioFirebase = await getDoc(doc(db, "usuarios", usuario));
    if (usuarioFirebase.exists()) {
      setRol(usuarioFirebase.data().rol);
      usuarioActivo.push({
        usuario: usuario,
        nombre: usuarioFirebase.data().nombre,
        apellido: usuarioFirebase.data().apellido,
        cargo: usuarioFirebase.data().cargo,
        rol: usuarioFirebase.data().rol,
        genero: usuarioFirebase.data().genero,
        experiencia: usuarioFirebase.data().experiencia,
        sucursal: usuarioFirebase.data().sucursal,
        ventas: usuarioFirebase.data().ventas,
        estado: usuarioFirebase.data().estado
      });
    } else {
      console.log("Usuario inválido o inexistente.");
      <div>
        <p>Usuario inválido o inexistente, por favor vuelve a intentarlo.</p>
      </div>
    }
  };



  // Al recargar página
  useEffect(() => {
    recuperarDatosDeUsuarioFirebase();
  }, []);


  // Enlaces
  const irAProductos = () => {
    navigate(`/productos/${usuario}`);
  }

  const irAProveedores = () => {
    navigate(`/proveedores/${usuario}`);
  }

  const irAClientes = () => {
    navigate(`/clientes/${usuario}`);
  }

  const irAOperaciones = () => {
    navigate(`/operaciones/${usuario}`);
  }

  const irAEmpleados = () => {
    navigate(`/empleados/${usuario}`);
  }

  const irAAdministrador = () => {
    navigate(`/administrador/${usuario}`);
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


        <ContenedorCards>

          <Cards>
            <ImagenesCards className='imagen imagen-productos' />
            <BotonesCards onClick={irAProductos}>Productos</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-proveedores' />
            <BotonesCards onClick={irAProveedores}>Proveedores</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-clientes' />
            <BotonesCards onClick={irAClientes}>Clientes</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-operaciones' />
            <BotonesCards onClick={irAOperaciones}>Operaciones</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-empleados' />
            <BotonesCards onClick={irAEmpleados}>Empleados</BotonesCards>
          </Cards>

          {rol === 'Administrador'
            ?
            <Cards>
              <ImagenesCards className='imagen imagen-administrador' />
              <BotonesCards onClick={irAAdministrador}>Administrador</BotonesCards>
            </Cards>
            :
            ''
          }

        </ContenedorCards>
      </ContenedorGeneral>
    </>
  )
}

export default Inicio;