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
    ContenedorCampoFormularioRegistro, InputFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
    BotonFormularioRegistro
} from '../components/FormulariosComponentes';
import SelectOpciones from '../components/SelectOpciones';
import Alerta from '../components/Alerta';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);



const AgregarCliente = () => {

    const { usuario } = useParams();

    // Variables
    const [nombre, setNombre] = useState('');
    const [DNI, setDNI] = useState('');
    const [mail, setMail] = useState('');
    const [numero, setNumero] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [tipo, setTipo] = useState('Particular');
    const [rango, setRango] = useState('General');
    const [estado, setEstado] = useState('');


    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const irAClientes = () => {
        navigate(`/clientes/${usuario}`);
    }


    const almacenarCliente = async (e) => {
        e.preventDefault();

        // Verificaciones
        if (nombre === '' || mail === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar los campos básicos del cliente.'
            });
            return;
        }


        await setDoc(doc(db, "clientes", mail), 
        { 
            nombre: nombre, DNI: DNI, mail: mail, numero: numero, fechaNacimiento: fechaNacimiento, 
            tipo: tipo, rango: rango, estado: estado
        })

        new MySwal({
            title: "Ingreso éxitoso",
            text: "Cliente ingresado al sistema.",
            icon: "success",
            button: "aceptar",
        });

        irAClientes();
    }
    

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Agregar cliente</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Ingresar cliente al sistema:</Titulo>

                <ContenedorFormularioRegistro onSubmit={almacenarCliente}>

                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Nombre:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder='Nombre del particular o empresa cliente.'
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>DNI/CUIT:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={DNI}
                                onChange={(e) => setDNI(e.target.value)}
                                placeholder='Ingrese DNI o CUIT de identificación del cliente.'
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Mail:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Número:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Fecha de nacimiento/creación:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Tipo de cliente:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='tipos-cliente'
                                opciones={tipo}
                                setOpciones={setTipo}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                    <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Rango de cliente:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='rangos-cliente'
                                opciones={rango}
                                setOpciones={setRango}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Estado:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='estado'
                                opciones={estado}
                                setOpciones={setEstado}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>


                    <ContenedorBotonesDoblesFormularioRegistro>
                        <BotonFormularioRegistro tipo='regresar' onClick={irAClientes}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
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

export default AgregarCliente;