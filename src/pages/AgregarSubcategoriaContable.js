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


const AgregarSubcategoriaContable = () => {

    const { usuario } = useParams();

    // Variables
    const [subcategoria, setSubcategoria] = useState('');

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const navigate = useNavigate();


    // Funciones
    const guardarNuevaSubcategoria = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (subcategoria === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Ingresa un nombre para la subcategoría.'
            });
            return;
        }

        await setDoc(doc(db, "subcategoriasRegistrosContables", subcategoria), { subcategoria: subcategoria });

        new MySwal({
            title: "Ingreso éxitoso",
            text: "La subcategoría " + subcategoria + " fue agregada al sistema.",
            icon: "success",
            button: "aceptar",
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarNuevaSubcategoria(e);
    }

    const irAAdmin = () => {
        navigate(`/administrador/${usuario}`);
    }




    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Agregar subcategoría - contabilidad</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>
                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Agregar subcategoría contable:</Titulo>

                <ContenedorGeneralBusquedaFormulario>

                    <ContenedorBusquedaFormulario onSubmit={handleSubmit}>
                        <InputFormularioRegistro
                            placeholder="Ingresa la subcategoría"
                            tipo='agregar subcategoria'
                            type="text"
                            value={subcategoria}
                            onChange={(e) => setSubcategoria(e.target.value)}
                        />
                        <BotonFormularioRegistro tipo='agregar subcategoria'>Agregar</BotonFormularioRegistro >
                    </ContenedorBusquedaFormulario>

                    <BotonFormularioRegistro tipo='a-inicio' onClick={irAAdmin}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>

                </ContenedorGeneralBusquedaFormulario>

                <Listado contenidoListado='subcategorias contables'/>

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

export default AgregarSubcategoriaContable;