import styled from 'styled-components';
import theme from '../theme';


const ContenedorCards = styled.div`
  width: 100%;
  height: fit-content;  
  margin-top: 5%;
  justify-content: space-evenly;
  display: grid;
  grid-gap: 0%;
  grid-template-columns: 20% 20% 20%;
  grid-template-rows: fit-content;


  @media(max-width: 1300px){
    grid-template-columns: 25% 25% 25%;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 27% 27% 27%;
  }
  
  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Cards = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 15%;
  padding-bottom: 7%;
  border-radius: 20px;
  border: none;
  background-color: #EAEAEA;
  display: flex;
  flex-direction: column;

  &:hover{
    background-color: #dbdbdb;
    border: 2px solid #cccaca;
  }


  @media (max-width: 950px) {
    width: 50%;
    margin-left: 25%;
  }

  @media (max-width: 600px) {
    width: 60%;
    margin-left: 20%;
  }
  `;

const TituloCards = styled.h3`
  color: #ED8936;
  text-align: center;
  font-weight: bolder;
`;

const ContenedorLabelsCards = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;


const LabelCards = styled.div`
  width: 35%;
  height: 40px;
  padding-top: 3%;
  border-radius: 20px;
  text-align: center;
  text-transform: uppercase;
  background-color: #ED8936;
  color: #ffff;
`;

const ContenedorInformacionCards = styled.div`
  width: 85%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;

  @media(max-width: 1300px){
    margin-bottom: 10%;
  }
`;

const InformacionCards = styled.p`
  height: 0px;
  color: #ED8936;
`;


const DetalleProductosCards = styled.div`
  widht: 87%;
  margin-top: 12%;
  margin-left: 5%;
  margin-right: 4%;
  border-bottom: 2px solid #ED8936;
  color: #ED8936;
  justify-content: space-evenly;

  p{
    margin-top: 0%;
    margin-left: 5%;
  }
`;

const LabelProductosCards = styled.div`
  width: 25%;
  padding: 2%;
  margin-bottom: 5%;
  border-radius: 20px;
  background-color: #ED8936;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;

  ${(props) => {
    if (props.tipo === 'precio') {
      return 'width: 45%;';
    } else if (props.tipo === 'cantidad') {
      return 'width: 35%; margin-left: 5%; color: #ED8936; background-color: #fff';
    } else if (props.tipo === 'total') {
      return 'background-color: #ED8936;';
    } else if (props.tipo === 'compra') {
      return 'width: 30%; min-width: fit-content; max-width: 65%; height: 40px; padding-top: 5%; margin-top: 7%; margin-left: 32%; text-transform: uppercase; font-weight: bolder; background-color: #dc1212;';
    } else if (props.tipo === 'venta') {
      return 'width: 30%; min-width: fit-content; max-width: 65%; height: 40px; padding-top: 5%; margin-top: 7%; margin-left: 32%; text-transform: uppercase; font-weight: bolder; background-color: rgb(7, 133, 7);';
    } else if (props.tipo === 'transporte') {
      return 'width: 30%; min-width: fit-content; max-width: 65%; height: 40px; padding-top: 5%; margin-top: 7%; margin-left: 32%; text-transform: uppercase; font-weight: bolder; background-color: rgb(30, 30, 150);';
    } else if (props.tipo === 'reparacion limpieza deposito') {
      return 'width: 30%; min-width: fit-content; max-width: 65%; height: 40px; padding-top: 5%; margin-top: 7%; margin-left: 32%; text-transform: uppercase; font-weight: bolder; background-color: rgb(44, 44, 66);';
    }
  }}
`;

const ContenedorIDYProductoCards = styled.div`
  display: flex;
`;

const TextoDetalleProductosCards = styled.p`
  margin-left: 2%;
`;

export {
    ContenedorCards, Cards, TituloCards, ContenedorLabelsCards, LabelCards, ContenedorInformacionCards, InformacionCards, 
    DetalleProductosCards, LabelProductosCards, ContenedorIDYProductoCards, TextoDetalleProductosCards
};