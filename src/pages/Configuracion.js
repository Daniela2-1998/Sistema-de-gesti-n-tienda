import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from "../components/InicioComponentes";
import {
    InputFormularioRegistro, ContenedorBusquedaFormulario, ContenedorCampoFormularioRegistro, TituloFormularioRegistro,
    ContenedorBotonesDoblesFormularioRegistro, BotonFormularioRegistro
} from "../components/FormulariosComponentes";
import SelectOpciones from "../components/SelectOpciones";
import Alerta from "../components/Alerta";

// Imports Firebase
import { getDoc, doc, setDoc, updateDoc, collection } from "firebase/firestore";
import db from "../firebase/FirebaseConfig";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);


const Configuracion = () => {

    const { usuario } = useParams();

    // Variables
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [sector, setSector] = useState('');
    const [sitioWeb, setSitioWeb] = useState('');
    const [administradorGeneral, setAdministradorGeneral] = useState('');
    const [casaCentral, setCasaCentral] = useState('V Ninguna');


    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const navigate = useNavigate();



    const recuperarConfiguracion = async () => {
        const configuracionFirebase = await getDoc( doc(db, "configuracion", "establecida") );

        if(configuracionFirebase.exists) {
            setNombreEmpresa(configuracionFirebase.data().nombreEmpresa);
            setSector(configuracionFirebase.data().sector);
            setSitioWeb(configuracionFirebase.data().sitioWeb);
            setAdministradorGeneral(configuracionFirebase.data().administradorGeneral);
            setCasaCentral(configuracionFirebase.data().casaCentral);
        }else{
            console.log("Error al recuperar configuración.");
        }
    }

    useEffect( () => {
        recuperarConfiguracion();
    }, []);



    const actualizarConfiguracion = async (e) => {
        e.preventDefault();

        const configuracionRecuperada = doc(db, "configuracion", "establecida");
        const configuracionActualizada = {
            nombreEmpresa: nombreEmpresa, sector: sector, sitioWeb: sitioWeb, administradorGeneral: administradorGeneral,
            casaCentral: casaCentral, configuracion: "establecida"
        };

        await updateDoc(configuracionRecuperada, configuracionActualizada);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se modificó la configuración.",
            icon: "success",
            button: "aceptar",
        });

        volverAtras();
    }


    const volverAtras = () => {
        navigate(`/administrador/${usuario}`);
    }





    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Configuracion</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>
                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Configuración:</Titulo>

                <ContenedorBusquedaFormulario tipo='configuracion' onSubmit={actualizarConfiguracion}>

                    <ContenedorCampoFormularioRegistro tipo='configuracion'>
                        <TituloFormularioRegistro>Nombre empresa:</TituloFormularioRegistro>
                        <InputFormularioRegistro
                            type="text"
                            value={nombreEmpresa}
                            onChange={(e) => setNombreEmpresa(e.target.value)}
                        />
                    </ContenedorCampoFormularioRegistro>

                    <ContenedorCampoFormularioRegistro tipo='configuracion'>
                        <TituloFormularioRegistro>Administrador General:</TituloFormularioRegistro>
                        <InputFormularioRegistro
                            type="text"
                            value={administradorGeneral}
                            onChange={(e) => setAdministradorGeneral(e.target.value)}
                        />
                    </ContenedorCampoFormularioRegistro>

                    <ContenedorCampoFormularioRegistro tipo='configuracion'>
                        <TituloFormularioRegistro>Casa central:</TituloFormularioRegistro>
                        <SelectOpciones
                                tipo='sucursales'
                                opciones={casaCentral}
                                setOpciones={setCasaCentral}
                            />
                    </ContenedorCampoFormularioRegistro>

                    <ContenedorCampoFormularioRegistro tipo='configuracion'>
                        <TituloFormularioRegistro>Sitio web:</TituloFormularioRegistro>
                        <InputFormularioRegistro
                            type="text"
                            value={sitioWeb}
                            onChange={(e) => setSitioWeb(e.target.value)}
                        />
                    </ContenedorCampoFormularioRegistro>

                    <ContenedorCampoFormularioRegistro tipo='configuracion'>
                        <TituloFormularioRegistro>Sector:</TituloFormularioRegistro>
                        <InputFormularioRegistro
                            type="text"
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                        />
                    </ContenedorCampoFormularioRegistro>


                    <ContenedorBotonesDoblesFormularioRegistro tipo='configuracion'>
                        <BotonFormularioRegistro tipo='regresar-configuracion' onClick={volverAtras}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
                        <BotonFormularioRegistro tipo='ingresar' typeof='submit'>Confirmar</BotonFormularioRegistro>
                    </ContenedorBotonesDoblesFormularioRegistro>

                </ContenedorBusquedaFormulario>


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

export default Configuracion;