import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { setDoc, doc } from 'firebase/firestore';
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



const MySwal = withReactContent(Swal);



const AgregarGastoIngreso = () => {

    const { usuario } = useParams();

    // Variables
    const [id, setId] = useState('');
    const [concepto, setConcepto] = useState('');
    const [importe, setImporte] = useState(0);
    const [categoria, setCategoria] = useState('Ingreso');
    const [subCategoria, setSubcategoria] = useState('Venta');
    const [estado, setEstado] = useState('');
    const [formaDePago, setFormaDePago] = useState('Efectivo');
    const [modalidadPago, setModalidadPago] = useState("1 pago");

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');



    const almacenarRegistroContable = async (e) => {
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

        await setDoc(doc(db, "registrosContables", id),
            {
                concepto: concepto, importe: importe, categoria: categoria, subCategoria: subCategoria, 
                estado: estado, formaDePago: formaDePago, modalidadPago: modalidadPago
            });

        new MySwal({
            title: "Ingreso éxitoso",
            text: "Registro contable ingresado al sistema.",
            icon: "success",
            button: "aceptar",
        });

        irAAdmin();
    }

    const irAAdmin = () => {
        navigate(`/administrador/${usuario}`);
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

                <ContenedorFormularioRegistro tipo='pago' onSubmit={almacenarRegistroContable}>

                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>ID:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
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
                        <BotonFormularioRegistro tipo='regresar' onClick={irAAdmin}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
                        <BotonFormularioRegistro tipo='ingresar' typeof='submit'>Ingresar</BotonFormularioRegistro>
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

export default AgregarGastoIngreso;