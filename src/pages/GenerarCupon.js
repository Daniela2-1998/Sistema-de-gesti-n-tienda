import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from "../components/InicioComponentes";
import { InputFormularioRegistro, BotonFormularioRegistro, ContenedorGeneralBusquedaFormulario, ContenedorBusquedaFormulario } from "../components/FormulariosComponentes";

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

    const navigate = useNavigate();


    const moverAleatorio =  (array) => {
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
        setCupon(caracteres.slice(0,6).join(""));
    }

    // Funciones
    const guardarCupon = async (e) => {
        e.preventDefault();

        await setDoc(doc(db, "cupones", cupon), { cupon: cupon });

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

                    <ContenedorBusquedaFormulario onSubmit={guardarCupon}>
                        <LabelInformacion>En caso de no ingresar código, se generará aleatoriamente.</LabelInformacion>
                        <InputFormularioRegistro
                            placeholder="Ingresa el código del cupon"
                            tipo='agregar subcategoria'
                            type="text"
                            value={cupon}
                            onChange={(e) => setCupon(e.target.value)}
                        />
                        <BotonFormularioRegistro tipo='generar cupon'>Guardar</BotonFormularioRegistro >
                    </ContenedorBusquedaFormulario>

                    <BotonFormularioRegistro tipo='a-inicio' onClick={irAAdmin}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>

                </ContenedorGeneralBusquedaFormulario>

                <BotonFormularioRegistro tipo='generar aleatorio' onClick={generarCuponAleatorio}>Generar aleatorio</BotonFormularioRegistro>

            </ContenedorGeneral>

        </>
    )

}


const LabelInformacion = styled.label`
  width: 25%;
  color: #ED8936;
  font-weight: normal;
  margin-top: 2%;
  margin-left: 5%;


  @media(max-width: 600px){
    width: 90%;
  }
`;


export default GenerarCupon;