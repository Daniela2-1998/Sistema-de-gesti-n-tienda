import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from "../components/InicioComponentes";
import {
    InputFormularioRegistro, BotonFormularioRegistro, ContenedorGeneralBusquedaFormulario, ContenedorBusquedaFormulario,
    TituloBuscadorFormulario, CartelAvisoColorFormulario, ContenedorCantidadFormularioRegistro, LabelFormularioRegistro
} from "../components/FormulariosComponentes";
import Alerta from "../components/Alerta";

// Imports Firebase
import { getDoc, getDocs, updateDoc, doc, query, collection, where } from "firebase/firestore";
import db from "../firebase/FirebaseConfig";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);


const EditarCantidadProducto = () => {

    const { usuario } = useParams();

    // Variables
    const [producto, setProducto] = useState('');
    const [codigo, setCodigo] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');
    var [cantidad, setCantidad] = useState(0);
    var [nuevaCantidad, setNuevaCantidad] = useState(0);



    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const navigate = useNavigate();


    // Funciones
    const obtenerProductoById = async () => {
        const productoFirebase = await getDoc(doc(db, "productos", codigo));

        if (productoFirebase.exists) {
            setProducto(productoFirebase.data().producto);
            setCodigo(productoFirebase.data().codigo);
            setDisponibilidad(productoFirebase.data().disponibilidad);
            setCantidad(productoFirebase.data().cantidad);
        } else {
            console.log("No existe el producto solicitado.");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        obtenerProductoById();
    }


    // Funciones suma y resta
    const sumarCantidad = (e) => {
        e.preventDefault();
        nuevaCantidad = parseInt(nuevaCantidad);
        cantidad = parseInt(cantidad);

        setCantidad(cantidad + nuevaCantidad)
    }

    const restarCantidad = (e) => {
        e.preventDefault();
        nuevaCantidad = parseInt(nuevaCantidad);
        cantidad = parseInt(cantidad);

        setCantidad(cantidad - nuevaCantidad);
    }


    const actualizarProducto = async (e) => {
        e.preventDefault();

        if (cantidad <= 0) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "La cantidad debe ser 0 o positiva."
            });
            return;
        }

        const productoRecuperado = doc(db, "productos", codigo)
        const dataActualizada = { cantidad: cantidad };
        await updateDoc(productoRecuperado, dataActualizada);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se agregaron " + nuevaCantidad + " unidades",
            icon: "success",
            button: "aceptar",
        });

        navigate(`/productos/${usuario}`);
    }


    const volverAtras = () => {
        navigate(`/productos/${usuario}`);
    }




    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Modificar cantidad - productos</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>
                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Modificar cantidad:</Titulo>

                <ContenedorGeneralBusquedaFormulario>

                    <ContenedorBusquedaFormulario onSubmit={handleSubmit}>
                        <BotonFormularioRegistro tipo='buscar'>Buscar</BotonFormularioRegistro >
                        <InputFormularioRegistro
                            placeholder="Ingresa el código del producto"
                            tipo='buscar-codigo'
                            type="text"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </ContenedorBusquedaFormulario>

                    <BotonFormularioRegistro tipo='a-inicio' onClick={volverAtras}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>

                </ContenedorGeneralBusquedaFormulario>

                {codigo ?
                    <ContenedorBusquedaFormulario tipo='data-formulario' onSubmit={actualizarProducto}>
                        <TituloBuscadorFormulario>{producto} - ({codigo})</TituloBuscadorFormulario>

                        {
                        disponibilidad === 'en stock' ?
                            <CartelAvisoColorFormulario tipo='stock'>
                                <p tipo='stock'>{disponibilidad}</p>
                            </CartelAvisoColorFormulario>

                            : disponibilidad === 'sin stock' ?
                                <CartelAvisoColorFormulario tipo='sin-stock'>
                                    <p tipo='sin-stock'>{disponibilidad}</p>
                                </CartelAvisoColorFormulario>

                                : disponibilidad === 'próximo ingreso' ?
                                    <CartelAvisoColorFormulario tipo='próximo ingreso'>
                                        <p tipo='próximo ingreso'>{disponibilidad}</p>
                                    </CartelAvisoColorFormulario>

                                    : disponibilidad === 'preventa' ?
                                        <CartelAvisoColorFormulario tipo='preventa'>
                                            <p tipo='preventa'>{disponibilidad}</p>
                                        </CartelAvisoColorFormulario>
                                        :
                                        ''
                        }

                        <CartelAvisoColorFormulario tipo='unidades'>
                            <p tipo='unidades'>U: {cantidad}</p>
                        </CartelAvisoColorFormulario>

                        <ContenedorCantidadFormularioRegistro>
                            <InputFormularioRegistro
                                tipo='cantidad'
                                type="number"
                                value={nuevaCantidad}
                                onChange={(e) => setNuevaCantidad(e.target.value)}
                            />
                            <BotonFormularioRegistro tipo='sumar-restar' onClick={sumarCantidad}>+</BotonFormularioRegistro>
                            <BotonFormularioRegistro tipo='sumar-restar' onClick={restarCantidad}>-</BotonFormularioRegistro>

                            <BotonFormularioRegistro tipo='modificar-cantidad' type="submit">Modificar</BotonFormularioRegistro>
                        </ContenedorCantidadFormularioRegistro>

                        <LabelFormularioRegistro>Cantidad nueva: {cantidad}</LabelFormularioRegistro>
                    </ContenedorBusquedaFormulario>
                    : ''}

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

export default EditarCantidadProducto;