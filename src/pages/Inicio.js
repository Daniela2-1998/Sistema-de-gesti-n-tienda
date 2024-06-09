import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Helmet
import { Helmet } from "react-helmet";

// Firebase
import db from '../firebase/FirebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

// Estilos
import { ContenedorGeneral, Header, ContenedorCards, Cards, ImagenesCards, BotonesCards } from '../components/InicioComponentes';



function Inicio() {

  // Variables
  const { usuario } = useParams();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cargo, setCargo] = useState("");
  const [rol, setRol] = useState("");
  const [genero, setGenero] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [ventas, setVentas] = useState(0);
  const [estado, setEstado] = useState("");

  let [usuarioSesion, setUsuarioSesion] = useState({});

  const navigate = useNavigate();


  // Función para recuperar los datos del usuario de Firebase
  const recuperarDatosDeUsuarioFirebase = async () => {
    const usuarioFirebase = await getDoc(doc(db, "usuarios", usuario));
    if (usuarioFirebase.exists()) {
      setNombre(usuarioFirebase.data().nombre);
      setApellido(usuarioFirebase.data().apellido);
      setCargo(usuarioFirebase.data().cargo);
      setRol(usuarioFirebase.data().rol);
      setGenero(usuarioFirebase.data().genero);
      setExperiencia(usuarioFirebase.data().experiencia);
      setSucursal(usuarioFirebase.data().sucursal);
      setVentas(usuarioFirebase.data().ventas);
      setEstado(usuarioFirebase.data().estado);
    } else {
      console.log("Usuario inválido o inexistente.");
      <div>
        <p>Usuario inválido o inexistente, por favor vuelve a intentarlo.</p>
      </div>
    }
  };

  // Función para guardar la sesión del usuario
  const guardarSesionUsuario = () => {
    recuperarDatosDeUsuarioFirebase();
    setUsuarioSesion = {
      usuario: usuario,
      nombre: nombre,
      apellido: apellido,
      cargo: cargo,
      rol: rol,
      genero: genero,
      experiencia: experiencia,
      sucursal: sucursal,
      ventas: ventas,
      estado: estado
    };
  }


  // Al recargar página
  useEffect(() => {
    guardarSesionUsuario();
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
            <BotonesCards onClick={irAProductos} guardarSesionUsuario={usuarioSesion}>Productos</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-proveedores' />
            <BotonesCards onClick={irAProveedores} guardarSesionUsuario={usuarioSesion}>Proveedores</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-clientes' />
            <BotonesCards onClick={irAClientes} guardarSesionUsuario={usuarioSesion}>Clientes</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-operaciones' />
            <BotonesCards onClick={irAOperaciones} guardarSesionUsuario={usuarioSesion}>Operaciones</BotonesCards>
          </Cards>

          <Cards>
            <ImagenesCards className='imagen imagen-empleados' />
            <BotonesCards onClick={irAEmpleados} guardarSesionUsuario={usuarioSesion}>Empleados</BotonesCards>
          </Cards>

          {rol === 'Administrador'
            ?
            <Cards>
              <ImagenesCards className='imagen imagen-administrador' />
              <BotonesCards onClick={irAAdministrador} guardarSesionUsuario={usuarioSesion}>Administrador</BotonesCards>
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