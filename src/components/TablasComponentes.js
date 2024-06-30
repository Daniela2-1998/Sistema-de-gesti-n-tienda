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
  


  @media (max-width: 1100px) {
    width: 90%;
  }

  @media (max-width: 900px) {
    width: 96%;
    margin-left: 1%;
  }

   @media (max-width: 750px) {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-evenly;
  }


  @media (max-width: 650px) {
    width: 115%;
    margin-left: 7%;
  }

`;

const ContenedorFiltroHeaderTabla = styled.form`
  width: 100%;
  display: flex;
 

  @media (max-width: 750px) {
    margin-left: 2%;
  }
`;

const BotonHeaderTabla = styled.button`
  width: 15%;
  margin-left: 1%;
  background-color: #fff;
  color: #ED8936;
  font-weight: bolder;
  font-size: 16px;
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
      return 'width: 20%; border-radius: 10px;';
    } else if (props.tipo === 'agregar-subcategoria' || props.tipo === 'descarga' || props.tipo === 'modificar') {
      return 'width: 15%; height: 50px; margin-left: 2%; border-radius: 10px;';
    } else if (props.tipo === 'regresar') {
      return 'height: 50px; margin-left: 32%; border-radius: 10px;';
    }
  }}

 
  @media(max-width: 1400px) { 
    ${(props) => {
      if(props.tipo === 'filtro'){
        return 'width: 20%;';
      } else if (props.tipo === 'agregar') {
        return 'width: 25%;';
      } else if (props.tipo === 'agregar-subcategoria' || props.tipo === 'descarga' || props.tipo === 'modificar') {
        return 'width: 22%;';
      } else if (props.tipo === 'regresar') {
        return 'margin-left: 10%;';
      }
    }}
  }

  @media(max-width: 1100px) { 
    ${(props) => {
      if(props.tipo === 'filtro'){
        return 'width: 22%;';
      } else if (props.tipo === 'agregar') {
        return 'width: 28%;';
      } else if (props.tipo === 'agregar-subcategoria' || props.tipo === 'descarga' || props.tipo === 'modificar') {
        return 'width: 22%;';
      } else if (props.tipo === 'regresar') {
        return 'margin-left: 10%;';
      }
    }}
  }

  @media(max-width: 900px) { 
    ${(props) => {
      if(props.tipo === 'filtro'){
        return 'width: 25%;';
      } else if (props.tipo === 'agregar') {
        return 'width: 32%; margin-left: -3%;';
      } else if (props.tipo === 'agregar-subcategoria' || props.tipo === 'descarga' || props.tipo === 'modificar') {
        return 'width: 25%;';
      } else if (props.tipo === 'regresar') {
        return 'margin-left: 2%;';
      }
    }}
  }

 @media(max-width: 750px) { 
   ${(props) => {
     if (props.tipo === 'agregar') {
      return 'width: 93%; height: 50px;';
      } else if (props.tipo === 'agregar-subcategoria' || props.tipo === 'descarga' || props.tipo === 'modificar' || props.tipo === 'regresar') {
        return 'width: 45%; height: 60px;';
      } else if (props.tipo === 'regresar'){
        return 'margin-bottom: 5%;';
      }
    }}
  }

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


  @media (max-width: 1100px) {
    width: 92%;
  }

  @media (max-width: 900px) {
    width: 98%;
    margin-left: 1%;
  }

  @media (max-width: 650px) {
    width: 117%;
    margin-left: 7%;
  }

`;

const EncabezadoTabla = styled.th`
  background-color: #ED8936;
  color: #fff;
`;

const RegistroTabla = styled.th`
  background-color: rgb(239, 238, 239);
  border-bottom: 2px dashed #ED8936;

  i{
    margin-right: 15%;
  }

   ${(props) => {
    if (props.tipo === 'egreso') {
      return 'color: red; font-weight: bold;';
    } else if (props.tipo === 'ingreso') {
      return 'color: green; font-weight: bold;';
    } 
  }}

`;

const ContenedorOpcionesTabla = styled.div`
  height: 70px;
  width: 87%;
  margin-left: 5%;
  padding-top: 1%;
  background-color: #ED8936;


  @media (max-width: 1100px) {
    width: 92%;
  }

  @media (max-width: 900px) {
    width: 98%;
    margin-left: 1%;
  }

  @media (max-width: 750px) {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-evenly;
  }

  @media (max-width: 650px) {
    width: 117%;
    margin-left: 7%;
  }

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





export {
  ContenedorHeaderTabla, ContenedorFiltroHeaderTabla, BotonHeaderTabla, InputHeaderTabla,

  Tabla, EncabezadoTabla, RegistroTabla, ContenedorOpcionesTabla,
  BusquedaDescargaPDF
};