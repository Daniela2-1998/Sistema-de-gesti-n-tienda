import styled from 'styled-components';

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


export {ContenedorGeneralLogin, ContenedorEspacioBlancoLogin, ContenedorFormularioLogin, LogoLoginEstilos,
  TituloLogin, FormularioLogin, LabelLogin, InputLogin, BotonIngresoLogin
};