import styled from 'styled-components';
import theme from '../theme';

// FORMULARIO LOGIN IN
// Contenedores
const ContenedorGeneralLogin = styled.div`
  width: 100%;
  height: 727px;
  display: flex;
`;

const ContenedorEspacioBlancoLogin = styled.div`
  width: 55%;
  height: 727px;


  @media (max-width: 600px) {
    width: 10%;
  }
`;


const ContenedorFormularioLogin = styled.div`
  width: 45%;
  height: 727px;
  background-color: #ED8936;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

// Logo
const LogoLoginEstilos = styled.img`
  width: 30%;
  margin-top: 7%;
  margin-left: 34%;


  @media (max-width: 900px) {
    margin-left: 36%;
  }
`;

// Titulo
const TituloLogin = styled.h2`
  margin-left: 23%;
  color: #fff;
  font-weight: bolder;


  @media (max-width: 900px) {
    margin-left: 13%;
  }
`;

// Formulario
const FormularioLogin = styled.form`
  width: 70%;
  margin-left: 15%;
  display: flex;
  flex-direction: column;
`;

const LabelLogin = styled.label`
  color: #fff;
  font-weight: bold;
  margin-bottom: 2%;
`;

const InputLogin = styled.input`
  height: 40px;
  margin-bottom: 5%;
  padding-left: 2%;
  border: none;
  border-radius: 10px;
  color: #ED8936;
`;

const BotonIngresoLogin = styled.button`
  width: 50%;
  height: 50px;
  margin-left: 24%;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  color: #ED8936;
  font-weight: bolder;
  font-size: 16px;

  &:hover{
    background-color: #e7e6e6;
  }


  @media (max-width: 900px) {
    margin-top: 15%;
  }
`;


// FORMULARIOS REGISTROS
const ContenedorFormularioRegistro = styled.form`
  width: 90%;
  height: 580px;
  margin-left: 5%;
  border: 2px dashed #ED8936;
  border-radius: 20px;
  background: ${theme.grisClaro};
`;

const ContenedorCamposTriplesFormularioRegistro = styled.div`
  width: 95%;
  height: 120px;
  margin-left: 4%;
  margin-bottom: 3%;
  display: flex;
`;

const ContenedorCampoFormularioRegistro = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
`;

const TituloFormularioRegistro = styled.h3`
  color: #ED8936;
`;

const InputFormularioRegistro = styled.input`
  width: 90%;
  height: 50px;
  padding: 1%;
  color: #ED8936;
  border: none;
  border-radius: 10px;

  &::placeholder{
    color: #ED8936;
  }

  ${(props) => {
    if (props.tipo === 'buscar-codigo') {
      return 'height: 45px; margin-top: 4%; margin-left: 0%; width: 74%; border-top-left-radius: 0px; border-bottom-left-radius: 0px;';
    } else if (props.tipo === 'cantidad') {
      return 'width: 35%; height: 45px; margin-top: 5%; margin-left: 7%; border-top-right-radius: 0px; border-bottom-right-radius: 0px;';
    } 
  }}

`;

const TextAreaFormularioRegistro = styled.textarea`
  width: 24%;
  height: 100px;
  resize: vertical;
  max-height: 200px;
  margin-top: 4%;
  padding: 1%;
  position: absolute;
  border: none;
  border-radius: 10px;
  color: #ED8936;
`;

const ContenedorBotonesDoblesFormularioRegistro = styled.div`
  height: 60px;
  width: 100%;-
  display: flex;
`;

const BotonFormularioRegistro = styled.button`
  height: 60px;
  margin-top: 10%;
  margin-bottom: 10%;
  border: none;
  border-radius: 10px;
  background-color: #ED8936;
  color: #fff;
  font-weight: bolder;
  font-size: 18px;

  i{
    margin-right: 5%;
  }

  &:hover{
    background-color: #cf762d;
    color: #fff;
    cursor: pointer;
  }

  ${(props) => {
    if (props.tipo === 'regresar') {
      return 'width: 12%; margin-left: 5%;';
    } else if (props.tipo === 'ingresar'){
      return 'width: 25%; margin-left: 21%;';
    } else if (props.tipo === 'a-inicio'){
      return 'width: 15%; margin-top: 2%; margin-left: 10%;';
    } else if (props.tipo === 'buscar'){
      return 'width: 15%; margin-top: 4%; margin-left: 5%; background-color: #fff; color: #ED8936; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-right: 1px solid';
    } else if (props.tipo === 'sumar-restar'){
      return 'width: 10%; background-color: #ED8936; color: #fff; margin-top: 5%; border-radius: 0%; font-size: 45px;';
    } else if (props.tipo === 'modificar-cantidad'){
      return 'width: 20%; background-color: #ED8936; color: #fff; margin-top: 5%; margin-left: 8%;';
    }
  }}


`;


// Modificar cantidad y agregar subcategoría
const ContenedorGeneralBusquedaFormulario = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
`;

const ContenedorBusquedaFormulario = styled.form`
  width: 50%;
  height: 120px;
  margin-left: 20%;
  margin-bottom: 5%;
  display: flex;
  background: ${theme.grisClaro};
  border: none;
  border-radius: 10px;

  ${(props) => {
    if (props.tipo === 'data-formulario') {
      return 'height: 450px; margin-top: 5%; display: flex; flex-direction: column;';
    } 
  }}

`;

const ContenedorBuscadorFormulario = styled.div`
  display: flex;
`;

const TituloBuscadorFormulario = styled.h3`
  color: #ED8936;
  font-weight: bolder;
  margin-left: 35%;
`;

const CartelAvisoColorFormulario = styled.div`
  width: 25%;
  height: 50px;
  padding: 0.5%;
  border-radius: 20px;
  text-aling: center;
  text-transform: uppercase;

  p{ ${(props) => {
    if (props.tipo === 'sin-stock') {
      return 'margin-left: 25%;';
    } else if (props.tipo === 'stock') {
      return 'margin-left: 30%;';
    } else if (props.tipo === 'preventa') {
        return 'margin-left: 30%;';
    } else if (props.tipo === 'próximo ingreso') {
      return 'margin-left: 12%;';
    } else if (props.tipo === 'unidades') {
      return 'margin-left: 5%; font-weight: bolder; color: #ED8936; ';
    } 
  }}}


  ${(props) => {
    if (props.tipo === 'sin-stock') {
      return 'color: #fff; background-color: rgb(247, 15, 15); margin-left: 37%;';
    } else if (props.tipo === 'stock') {
      return 'color: #fff; background-color: rgb(23, 176, 23); margin-left: 37%;';
    } else if (props.tipo === 'preventa') {
      return 'color: #fff; background-color: rgb(42, 42, 172); margin-left: 37%;';
    } else if (props.tipo === 'próximo ingreso') {
      return 'color: #fff; background-color: rgb(51, 50, 50); margin-left: 37%;';
    } else if (props.tipo === 'unidades') {
      return 'background-color: #fff; color: #ED8936; margin-top: 5%; margin-left: 37%;';
    }
  }}

`;

const ContenedorCantidadFormularioRegistro = styled.div`
  display: flex;
`;

const LabelFormularioRegistro = styled.label`
  color: #ED8936;
  font-weight: bold;
  margin-left: 35%;

`;


export {ContenedorGeneralLogin, ContenedorEspacioBlancoLogin, ContenedorFormularioLogin, LogoLoginEstilos,
  TituloLogin, FormularioLogin, LabelLogin, InputLogin, BotonIngresoLogin,

  ContenedorFormularioRegistro, TituloFormularioRegistro, ContenedorCamposTriplesFormularioRegistro, 
  ContenedorCampoFormularioRegistro, InputFormularioRegistro, TextAreaFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
  BotonFormularioRegistro,


  ContenedorGeneralBusquedaFormulario, ContenedorBusquedaFormulario, ContenedorBuscadorFormulario,
  TituloBuscadorFormulario, CartelAvisoColorFormulario, ContenedorCantidadFormularioRegistro,
  LabelFormularioRegistro

};