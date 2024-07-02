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
    ContenedorCampoFormularioRegistro, InputFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
    BotonFormularioRegistro
} from '../components/FormulariosComponentes';
import SelectOpciones from '../components/SelectOpciones';
import Alerta from '../components/Alerta';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const MySwal = withReactContent(Swal);



const ModificarGastoIngreso = () => {

    const { usuario } = useParams();
    const { id } = useParams();

    // Variables
    const [concepto, setConcepto] = useState('');
    const [importe, setImporte] = useState(0);
    const [categoria, setCategoria] = useState('Ingreso');
    const [subCategoria, setSubcategoria] = useState('Venta');
    const [estado, setEstado] = useState('');
    const [formaDePago, setFormaDePago] = useState('Efectivo');
    const [modalidadPago, setModalidadPago] = useState("1 pago");

    const fechaActual = new Date().toLocaleDateString();

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const obtenerRegistroById = async (id) => {
        const registroFirebase = await getDoc( doc(db, "registrosContables", id) );

        if(registroFirebase.exists) {
            setConcepto(registroFirebase.data().concepto);
            setImporte(registroFirebase.data().importe);
            setCategoria(registroFirebase.data().categoria);
            setSubcategoria(registroFirebase.data().subCategoria);
            setEstado(registroFirebase.data().estado);
            setFormaDePago(registroFirebase.data().formaDePago);
            setModalidadPago(registroFirebase.data().modalidadDePago);
        }else{
            console.log("No existe el registro solicitado.");
        }
    }

    useEffect( () => {
        obtenerRegistroById(id);
    }, []);

    const actualizarRegistro = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (concepto === '' || importe === '' || estado === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar los campos básicos.'
            });
            return;
        }

        const registroRecuperado = doc(db, "registrosContables", id);
        const registroActualizado = { concepto: concepto, importe: importe, categoria: categoria, subCategoria: subCategoria, 
            estado: estado, medioDePago: formaDePago, modalidadDePago: modalidadPago, fecha: fechaActual };

        await updateDoc(registroRecuperado, registroActualizado);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se modificó el registro solicitado.",
            icon: "success",
            button: "aceptar",
        });

        irAAtras();
    }


    const irAAtras = () => {
        navigate(`/admin/contabilidad/${usuario}`);
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Agregar contabilidad</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Ingresar registro contable al sistema:</Titulo>

                <ContenedorFormularioRegistro tipo='pago' onSubmit={actualizarRegistro}>

                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>ID:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={id}
                                readOnly
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Concepto:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={concepto}
                                onChange={(e) => setConcepto(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Importe:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={importe}
                                onChange={(e) => setImporte(e.target.value)}          
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro tipo='dobles'>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Categoría:</TituloFormularioRegistro>
                              <SelectOpciones
                              tipo='categorias contables'
                              opciones={categoria}
                              setOpciones={setCategoria}
                          />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Subcategoria:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='subcategorias contables'
                                opciones={subCategoria}
                                setOpciones={setSubcategoria}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Estado:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}          
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Forma de pago:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='medio de pago'
                                opciones={formaDePago}
                                setOpciones={setFormaDePago}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Modalidad de pago:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='modalidad de pago'
                                opciones={modalidadPago}
                                setOpciones={setModalidadPago}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>


                    <ContenedorBotonesDoblesFormularioRegistro>
                        <BotonFormularioRegistro tipo='regresar' onClick={irAAtras}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
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

export default ModificarGastoIngreso;