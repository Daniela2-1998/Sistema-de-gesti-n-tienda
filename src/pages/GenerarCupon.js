import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from "../components/InicioComponentes";
import { InputFormularioRegistro, BotonFormularioRegistro, ContenedorGeneralBusquedaFormulario, ContenedorBusquedaFormulario } from "../components/FormulariosComponentes";
import SelectOpciones from "../components/SelectOpciones";

// Imports Firebase
import { setDoc, doc, getDoc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import styled from "styled-components";


const MySwal = withReactContent(Swal);


const GenerarCupon = () => {

    const { usuario } = useParams();

    // Variables
    const [cupon, setCupon] = useState('');
    const [tipoCupon, setTipoCupon] = useState('10%');
    const [valor, setValor] = useState();
    const [operacion, setOperacion] = useState();

    const navigate = useNavigate();


    const vincularCuponConValor = () => {
        switch (tipoCupon) {
            case "10%":
                setValor(parseFloat(0.10));
                setOperacion("multiplicar");
                break;
            case "15%":
                setValor(parseFloat(0.15));
                setOperacion("multiplicar");
                break;
            case "20%":
                setValor(parseFloat(0.20));
                setOperacion("multiplicar");
                break;
            case "25%":
                setValor(parseFloat(0.25));
                setOperacion("multiplicar");
                break;
            case "30%":
                setValor(parseFloat(0.30));
                setOperacion("multiplicar");
                break;
            case "40%":
                setValor(parseFloat(0.40));
                setOperacion("multiplicar");
                break;
            case "50%":
                setValor(parseFloat(0.50));
                setOperacion("multiplicar");
                break;
            case "$1000":
                setValor(parseFloat(1000));
                setOperacion("restar");
                break;
            case "$5000":
                setValor(parseFloat(5000));
                setOperacion("restar");
                break;
            case "$10000":
                setValor(parseFloat(10000));
                setOperacion("restar");
                break;
            case "$20000":
                setValor(parseFloat(20000));
                setOperacion("restar");
                break;
            case "$50000":
                setValor(parseFloat(500000));
                setOperacion("restar");
                break;
            default:
                break;
        }
    }


    const moverAleatorio = (array) => {
        let posicionActual = array.length;

        while (0 !== posicionActual) {
            const posicionAleatoria = Math.floor(Math.random() * posicionActual);
            posicionActual--;
            //"truco" para intercambiar los valores sin necesidad de una variable auxiliar
            [array[posicionActual], array[posicionAleatoria]] = [
                array[posicionAleatoria], array[posicionActual]];
        }
        return array;
    }

    const generarCuponAleatorio = async () => {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
        moverAleatorio(caracteres);
        setCupon(caracteres.slice(0, 6).join(""));
    }

    const guardarCupon = async (e) => {
        e.preventDefault();


        await setDoc(doc(db, "cupones", cupon), { cupon: cupon, valor: valor, operacion: operacion, estado: "sin usar" });

        new MySwal({
            title: "Ingreso éxitoso",
            text: "El cupon " + cupon + " fue agregado al sistema.",
            icon: "success",
            button: "aceptar",
        });

    }

    const irAAdmin = () => {
        navigate(`/administrador/${usuario}`);
    }


    useEffect( () => {
        vincularCuponConValor();
    }, [guardarCupon]);

    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Generar cupon</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>
                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Generar cupon:</Titulo>

                <ContenedorGeneralBusquedaFormulario>

                    <ContenedorBusquedaFormulario tipo='cupon' onSubmit={guardarCupon}>
                        <ContenedorRow>
                            <InputFormularioRegistro
                                placeholder="Ingresa el código del cupon"
                                tipo='agregar subcategoria'
                                type="text"
                                value={cupon}
                                onChange={(e) => setCupon(e.target.value)}
                            />
                            <BotonFormularioRegistro tipo='generar cupon'>Guardar</BotonFormularioRegistro >

                        </ContenedorRow>

                        <ContenedorSelect>
                            <LabelInformacion>Descripción cupon:</LabelInformacion>
                            <SelectOpciones
                                tipo='cupones'
                                opciones={tipoCupon}
                                setOpciones={setTipoCupon}
                            />
                        </ContenedorSelect>

                    </ContenedorBusquedaFormulario>

                    <BotonFormularioRegistro tipo='a-inicio' onClick={irAAdmin}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>

                </ContenedorGeneralBusquedaFormulario>

                <BotonFormularioRegistro tipo='generar aleatorio' onClick={generarCuponAleatorio}>Generar aleatorio</BotonFormularioRegistro>

            </ContenedorGeneral>

        </>
    )

}


const ContenedorRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContenedorSelect = styled.div`
  width: 55%;
  margin-top: -5%;
  margin-left: 5%;
`;

const LabelInformacion = styled.label`
  width: 25%;
  color: #ED8936;
  font-weight: normal;


  @media(max-width: 600px){
    width: 90%;
  }
`;


export default GenerarCupon;