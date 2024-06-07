import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from '../components/InicioComponentes';
import {
    ContenedorFormularioRegistro, TituloFormularioRegistro, ContenedorCamposTriplesFormularioRegistro,
    ContenedorCampoFormularioRegistro, InputFormularioRegistro, TextAreaFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
    BotonFormularioRegistro
} from '../components/FormulariosComponentes';
import SelectOpciones from '../components/SelectOpciones';
import Alerta from '../components/Alerta';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



const ModificarProducto = () => {

    const { usuario } = useParams();
    const { id } = useParams();

    // Variables
    const [producto, setProducto] = useState('');
    const [codigo, setCodigo] = useState('');
    const [categoria, setCategoria] = useState('General');
    const [tipo, setTipo] = useState('Muebles');
    const [descripcion, setDescripcion] = useState('');
    const [descuento, setDescuento] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');
    const [precio, setPrecio] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [promocion, setPromocion] = useState(0.00);

    const navigate = useNavigate();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const obtenerProductoById = async (id) => {
        const productoFirebase = await getDoc( doc(db, "productos", id) );

        if(productoFirebase.exists) {
            setProducto(productoFirebase.data().producto);
            setCodigo(productoFirebase.data().codigo);
            setCategoria(productoFirebase.data().categoria);
            setTipo(productoFirebase.data().tipo);
            setDescripcion(productoFirebase.data().descripcion);
            setDescuento(productoFirebase.data().descuento);
            setDisponibilidad(productoFirebase.data().disponibilidad);
            setPrecio(productoFirebase.data().precio);
            setCantidad(productoFirebase.data().cantidad);
            setPromocion(productoFirebase.data().promocion);
        }else{
            console.log("No existe el producto solicitado.");
        }
    }

    useEffect( () => {
        obtenerProductoById(id);
    }, []);


    const aplicarDescuento = () => {
        const descuentoBase = parseFloat(descuento);
        const descuentoAAplicar = parseFloat(1 - descuentoBase);
        const precioConDescuento = parseFloat(precio * descuentoAAplicar);
        setPromocion(precioConDescuento);
    }



    const actualizarProducto = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (producto === '' || codigo === '' || precio === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar los campos básicos.'
            });
            return;
        }

        setPrecio(parseFloat(precio));
        
        if(cantidad < 0){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "La cantidad debe ser 0 o positiva."
            });
            return;
        }
          if(precio < 0){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "La precio debe ser positivo."
            });
            return;
        }
        
        setDescuento(parseFloat(descuento));


        const productoRecuperado = doc(db, "productos", id);
        const productoActualizado = { producto: producto, codigo: codigo, categoria: categoria, tipo: tipo, descripcion: descripcion, cantidad: cantidad,
            descuento: descuento, disponibilidad: disponibilidad, precio: precio, promocion: promocion };

        await updateDoc(productoRecuperado, productoActualizado);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se modificó el producto solicitado.",
            icon: "success",
            button: "aceptar",
        });

        irAProductos();
    }


    const irAProductos = () => {
        navigate(`/productos/${usuario}`);
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Modificar productos</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Modificar producto del sistema:</Titulo>

                <ContenedorFormularioRegistro onSubmit={actualizarProducto}>

                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Nombre del producto:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={producto}
                                onChange={(e) => setProducto(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Cantidad:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Descuento:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={descuento}
                                onChange={(e) => {setDescuento(e.target.value); aplicarDescuento();}}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Código del producto:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Precio:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Tipo de producto:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='subcategorias'
                                opciones={tipo}
                                setOpciones={setTipo}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Disponibilidad:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='disponibilidad'
                                opciones={disponibilidad}
                                setOpciones={setDisponibilidad}
                                cantidad={cantidad}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Descripcion:</TituloFormularioRegistro>
                            <TextAreaFormularioRegistro
                                type="text"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Categoría del producto:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='categorias'
                                opciones={categoria}
                                setOpciones={setCategoria}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>


                    <ContenedorBotonesDoblesFormularioRegistro>
                        <BotonFormularioRegistro tipo='regresar' onClick={irAProductos}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
                        <BotonFormularioRegistro tipo='ingresar' typeof='submit'>Modificar</BotonFormularioRegistro>
                    </ContenedorBotonesDoblesFormularioRegistro>
                </ContenedorFormularioRegistro>

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

export default ModificarProducto;