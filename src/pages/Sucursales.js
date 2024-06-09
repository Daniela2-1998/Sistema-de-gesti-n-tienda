import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from "../components/InicioComponentes";
import { InputFormularioRegistro, BotonFormularioRegistro, ContenedorGeneralBusquedaFormulario, ContenedorBusquedaFormulario } from "../components/FormulariosComponentes";
import Alerta from "../components/Alerta";

// Imports Firebase
import { setDoc, doc, getDoc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Listado from "../components/Listado";


const MySwal = withReactContent(Swal);


const Sucursales = () => {

    const { usuario } = useParams();

    // Variables
    const [sucursal, setSucursal] = useState('');

    // ventas, empleados, productos

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const navigate = useNavigate();

    const verificarNoExistenciaDeSucursal = async () => {
        const sucursalFirebase = await getDoc(doc(db, "sucursales", sucursal));

        if (sucursalFirebase.exists()) {
            // AGREGAR ALERTA
            console.log("Sucursal existente");
        } else {
            console.log("No existe la sucursal solicitada.");
        }
    }

    const iniciarStockSucursal = async () => {

    }



    // Funciones
    const guardarNuevaSucursal = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (sucursal === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Ingresa un nombre para la sucursal.'
            });
            return;
        }

        verificarNoExistenciaDeSucursal();

        await setDoc(doc(db, "sucursales", sucursal), { sucursal: sucursal });

        new MySwal({
            title: "Ingreso éxitoso",
            text: "La sucursal " + sucursal + " fue agregada al sistema.",
            icon: "success",
            button: "aceptar",
        });

        irAAdministrador();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarNuevaSucursal(e);
    }


    const irAAdministrador = () => {
        navigate(`/administrador/${usuario}`);
    }




    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Sucursales</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>
                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Agregar sucursal:</Titulo>

                <ContenedorGeneralBusquedaFormulario>

                    <ContenedorBusquedaFormulario onSubmit={handleSubmit}>
                        <InputFormularioRegistro
                            placeholder="Ingresa la sucursal"
                            tipo='agregar subcategoria'
                            type="text"
                            value={sucursal}
                            onChange={(e) => setSucursal(e.target.value)}
                        />
                        <BotonFormularioRegistro tipo='agregar subcategoria'>Agregar</BotonFormularioRegistro >
                    </ContenedorBusquedaFormulario>

                    <BotonFormularioRegistro tipo='a-inicio' onClick={irAAdministrador}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>

                </ContenedorGeneralBusquedaFormulario>

                <Listado contenidoListado='sucursales'/>

            </ContenedorGeneral>

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />

        </>
    )
}


export default Sucursales;