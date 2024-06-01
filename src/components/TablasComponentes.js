import styled from "styled-components";


const ContenedorHeaderTabla = styled.div`
  width: 85%;
  height: 50px;
  padding: 1%;
  margin-top: 5%;
  margin-left: 5%;
  border: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #ED8936;
  color: #fff;
  text-align: left;
  display:flex;
  justify-content: space-between;
  


  @media (max-width: 900px) {
    width: 106% !important;
    margin-left: 0.2%;
  }

  @media (max-width: 800px) {
    width: 110%;
  }
  
  @media (max-width: 500px) {
    width: 134.6%;
  }
`;

const ContenedorFiltroHeaderTabla = styled.form`
  width: 100%;
  display: flex;
`;

const BotonHeaderTabla = styled.button`
  width: 15%;
  margin-left: 1%;
  background-color: #fff;
  color: #ED8936;
  font-weight: bolder;
  border: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  &:hover{
    background: #dddcdc;
  }

  i{
    margin-right: 5%;
  }

   ${(props) => {
    if (props.tipo === 'agregar') {
      return 'border-radius: 10px';
    }
  }}
`;

const InputHeaderTabla = styled.input`
  width: 35%;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 1%;
  color: #ED8936;
`;

const Tabla = styled.table`
  width: 87%;
  margin-left: 5%;
  border: 2px solid #ED8936;


  @media(max-width: 900px) {
     margin-left: 0%;
  }
`;

const EncabezadoTabla = styled.th`
  background-color: #ED8936;
  color: #fff;
`;

const RegistroTabla = styled.th`
  background-color: rgb(239, 238, 239);
  border-bottom: 2px dashed #ED8936;
`;





const ContenedorBusquedaCompleta = styled.div`
  height: 70px;
  width: 87%;
  margin-left: 5%;
  padding-top: 1%;
  background-color: #ED8936;


  @media(max-width: 500px) {
    width: 100%;
    margin-left: 0%;
    padding-top: 3%;
  }
`;

const BusquedaCompleta = styled.button`
  width: 50%;
  margin-top: -0.3%;
  margin-left: 5%;
`;

const BusquedaDescargaPDF = styled.button`
  height: 40px;
  width: 25%;
  margin-left: 5%;
  border: none;
  border-radius: 10px;
  background-color: #55a4d8;
  color: #fff;


  &:hover {
    background-color: rgb(42, 107, 237);
    font-weight: bolder;
    box-shadow: 0px 2px 20px 0px rgb(41, 73, 133);
  }
`;



const BotonBusqueda = styled.button`
width: 40 %;
background-color: #55a4d8;
color: #fff;
border: 1px solid #0073c0;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;

  &:hover {
  background-color: rgb(42, 107, 237);
  font-weight: bolder;
  box-shadow: 0px 2px 20px 0px rgb(41, 73, 133);
}


@media(max - width: 760px) {
  width: 85 %;
  height: 70px;
  margin-left: 6 %;
  border-radius: 10px;
}
`;



export {
  ContenedorHeaderTabla, ContenedorFiltroHeaderTabla, BotonHeaderTabla, InputHeaderTabla, 
  
  Tabla, EncabezadoTabla, RegistroTabla, ContenedorBusquedaCompleta, BusquedaCompleta,
  BusquedaDescargaPDF, BotonBusqueda
};