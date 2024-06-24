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


  ${(props) => {
    if (props.tipo === 'operacion') {
      return 'height: 300px;';
    } else if (props.tipo === 'operacion productos') {
      return 'height: 400px; margin-bottom: 5%;';
    } 
  }}

  @media(max-width: 900px){
    height: 1300px;

  ${(props) => {
    if (props.tipo === 'operacion') {
      return 'height: 800px;';
    } else if (props.tipo === 'operacion productos') {
      return 'height: 850px;';
    } 
  }}
  }

  
  @media(max-width: 800px){
  ${(props) => {
    if (props.tipo === 'operacion') {
      return 'height: 750px';
    } else if (props.tipo === 'operacion productos') {
      return 'height: 850px';
    } 
  }}
  }

  @media(max-width: 700px){
    margin-bottom: 8%;
  }

  @media(max-width: 600px){
  ${(props) => {
    if (props.tipo === 'operacion productos') {
      return 'margin-top: 15%;';
    } 
  }}
  }
`;

const ContenedorCamposTriplesFormularioRegistro = styled.div`
  width: 95%;
  height: 120px;
  margin-left: 4%;
  margin-bottom: 3%;
  display: flex;


  @media(max-width: 900px){
    width: 100%;
    flex-direction: column;
    height: 360px;
  }
`;

const ContenedorCampoFormularioRegistro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;


  ${(props) => {
    if (props.tipo === 'configuracion') {
      return 'margin-left: 4%;';
    } else if (props.tipo === 'descuento'){
      return 'margin-left: 5%;';
    }

  }}

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
    } else if (props.tipo === 'agregar subcategoria') {
      return 'height: 45px; margin-top: 4%; margin-left: 5%; width: 60%;';
    } else if (props.tipo === 'cantidad') {
      return 'width: 35%; height: 45px; margin-top: 5%; margin-left: 7%; border-top-right-radius: 0px; border-bottom-right-radius: 0px;';
    } else if (props.tipo === 'filtro-producto') {
      return 'width: 25%; height: 38px; margin-top: 4%; border-radius: 0px; border-left: 1px solid #ED8936; border-right: 1px solid #ED8936;';
    } else if (props.tipo === 'busqueda-producto') {
      return 'width: 35%; height: 38px; margin-top: 4%; border-left: 1px solid #ED8936; border-top-left-radius: 0px; border-bottom-left-radius: 0px;';
    } else if (props.tipo === 'descuento') {
      return 'width: 72%; height: 50px; border: none; border-radius: 10px;';
    } 
  }}

  @media(max-width: 1400px){
    ${(props) => {
      if (props.tipo === 'filtro-producto') {
        return 'width: 35%; height: 41px;';
      } else if (props.tipo === 'busqueda-producto') {
        return 'width: 35%; height: 45px;';
      } else if (props.tipo === 'descuento') {
        return 'width: 75%;';
      }
    }
  }

    @media(max-width: 1100px){
    ${(props) => {
      if (props.tipo === 'descuento') {
        return 'width: 88%;';
      } 
    }
  }


  @media(max-width: 1000px){
    ${(props) => {
      if (props.tipo === 'filtro-producto') {
        return 'width: 38%; height: 45px;';
      } else if (props.tipo === 'busqueda-producto') {
        return 'width: 35%; height: 45px;';
      }
    }
  }


  @media(max-width: 600px){
    ${(props) => {
      if (props.tipo === 'buscar-codigo') {
        return 'width: 87%; height: 45px; margin-top:-2%; margin-left: 5%; border-radius: 10px;';
      } else if (props.tipo === 'agregar subcategoria') {
        return 'width: 87%;';
      } else if (props.tipo === 'filtro-producto') {
        return 'width: 87%; margin-left: 5%; padding-left: 2%; margin-bottom: 15%; border: none; border-radius: 10px;';
      } else if (props.tipo === 'busqueda-producto') {
        return 'width: 87%; margin-left: 5%; border: none; border-radius: 10px;';
      }
    }
  }

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


  @media(max-width: 1100px){
    margin-top: 6%;
  }

  @media(max-width: 900px){
    width: 90%;
    position: relative;
    margin-top: 0%;
  }
`;

const ContenedorBotonesDoblesFormularioRegistro = styled.div`
  height: 60px;
  width: 100%;-
  display: flex;


  ${(props) => {
    if (props.tipo === 'configuracion') {
      return 'margin-left: 5%;';
    }
  }}

  @media(max-width: 1000px){
    ${(props) => {
      if (props.tipo === '% usar cupon') {
        return 'width: 100%; margin-left: 5%;';
      }
    }}
  }


  @media(max-width: 600px){
    ${(props) => {
      if (props.tipo === 'configuracion') {
        return 'margin-left: 1%;';
      }
    }}
  }
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
    } else if (props.tipo === 'ingresar') {
      return 'width: 25%; margin-left: 21%;';
    } else if (props.tipo === 'a-inicio') {
      return 'width: 15%; margin-top: 2%; margin-left: 10%;';
    } else if (props.tipo === 'buscar') {
      return 'width: 15%; margin-top: 4%; margin-left: 5%; background-color: #fff; color: #ED8936; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-right: 1px solid';
    } else if (props.tipo === 'sumar-restar') {
      return 'width: 10%; background-color: #ED8936; color: #fff; margin-top: 5%; border-radius: 0%; font-size: 45px;';
    } else if (props.tipo === 'modificar-cantidad') {
      return 'width: 20%; background-color: #ED8936; color: #fff; margin-top: 5%; margin-left: 8%;';
    } else if (props.tipo === 'agregar subcategoria'){
      return 'width: 20%; margin-top: 4%; margin-left: 10%;';
    } else if (props.tipo === 'regresar-configuracion') {
      return 'width: 15%; margin-left: 5%;';
    } else if (props.tipo === 'calculo total' || props.tipo === 'aplicar descuento') {
      return 'width: 35%; background-color: #fff; color: #ED8936; margin-top: 5%; margin-left: 5%;';
    } else if (props.tipo === 'generar cupon') {
      return 'width: 20%; margin-left: 2%; margin-top: 4%;';
    } else if (props.tipo === 'generar aleatorio') {
      return 'width: 12%; margin-left: 25%;';
    } else if (props.tipo === 'sumar productos a operacion'){
      return 'width: 7%; background-color: #ED8936; color: #fff; margin-top: 0%; margin-left: 42%; border-radius: 10px; font-size: 45px;';
    } else if (props.tipo === '%'){
      return 'width: 15%; background-color: #ED8936; color: #fff; border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-right: 2px solid #fff;';
    } else if (props.tipo === 'usar cupon'){
      return 'width: 35%; background-color: #ED8936; color: #fff; border-top-left-radius: 0px; border-bottom-left-radius: 0px;';
    }
  }}


  @media(max-width: 1400px){
    ${(props) => {
      if (props.tipo === 'regresar' || props.tipo === 'ingresar' || props.tipo === 'regresar-configuracion') {
        return 'width: 20%; margin-top: 15%;';
      } else if (props.tipo === 'aplicar descuento'){
        return 'width: 36.5%; margin-left: 5%;';      
      } else if (props.tipo === 'generar aleatorio') {
        return 'width: 20%; margin-top: 15%;';
      }
    }}
  }

  @media(max-width: 1100px){
    ${(props) => {
      if (props.tipo === 'regresar' || props.tipo === 'ingresar' || props.tipo === 'regresar-configuracion') {
        return 'margin-top: 20%;';
      } else if (props.tipo === 'a-inicio') {
        return 'margin-left: 5%;';
      } else if (props.tipo === 'generar aleatorio') {
        return 'margin-top: 25%;';
      } else if (props.tipo === '%'){
        return 'width: 35%;';
      } else if (props.tipo === 'usar cupon'){
        return 'width: 55%; ';
      } else if (props.tipo === 'aplicar descuento') {
        return 'width: 90%;';
      } 
    }}
  }

    @media(max-width: 900px){
      ${(props) => {
        if (props.tipo === 'regresar' || props.tipo === 'ingresar' || props.tipo === 'regresar-configuracion') {
          return 'width: 25%; margin-top: 5%;';
        } else if (props.tipo === 'sumar productos a operacion'){
          return 'width: 25%; margin-top: -5%; margin-left: 38%;';
        } 
      }}
    }

    @media(max-width: 800px){
      ${(props) => {
        if (props.tipo === 'a-inicio'  || props.tipo === 'generar aleatorio') {
          return 'width: 90%; height: 70px; margin-left: 5%;';
        } else if (props.tipo === 'sumar productos a operacion'){
          return 'width: 94%; margin-top: -5%; margin-left: 3%;';
        } else if (props.tipo === 'calculo total') {
          return 'width: 77%; margin-left: 10%;';
        } 
      }}
    }

    @media(max-width: 700px){
      ${(props) => {
        if (props.tipo === 'regresar' || props.tipo === 'ingresar' || props.tipo === 'regresar-configuracion'  || props.tipo === 'generar aleatorio') {
          return 'margin-top: 10%;';
        } else if (props.tipo === 'calculo total') {
          return 'width: 80%; margin-left: 10%;';
        } 
      }}
    }
  
    @media(max-width: 600px){
      ${(props) => {
        if (props.tipo === 'buscar') {
          return 'width: 90%; height: 50px; border-radius: 10px;';
        } else if (props.tipo === 'agregar subcategoria'){
          return 'width: 88%; margin-top: 10%; margin-left: 5%;';
        }
      }}
      }}
    }


    @media(max-width: 500px){
      ${(props) => {
        if (props.tipo === 'regresar' || props.tipo === 'ingresar' || props.tipo === 'regresar-configuracion') {
          return 'width: 35%;';
        }
      }}
    }


`;


// Modificar cantidad y agregar subcategoría
const ContenedorGeneralBusquedaFormulario = styled.div`
  width: 100%;
  height: 120px;
  display: flex;


  @media(max-width: 800px){
    height: 350px;
    flex-direction: column;
  }

  
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
    } else if (props.tipo === 'configuracion') {
      return 'height: 850px; margin-top: 5%; display: flex; flex-direction: column;';
    } else if (props.tipo === 'agregar operacion') {
      return 'width: 70%; margin-left: 15%; padding-bottom: 2%;';
    } else if (props.tipo === 'calculo total') {
      return 'width: 80%; height: 250px; margin-top: 5%; margin-left: 10%; display: flex; flex-direction: column;';
    } else if (props.tipo === 'cupon') {
      return 'height: 250px; flex-direction: column;';
    }
  }}


  @media(max-width: 1400px){
    ${(props) => {
      if (props.tipo === 'calculo total') {
        return 'margin-top: 10%;';
      }
    }}
  }


  @media(max-width: 1100px){
    width: 70%;
    margin-left: 5%;


    ${(props) => {
      if (props.tipo === 'agregar operacion') {
        return 'width: 90%;';
      } else if (props.tipo === 'calculo total') {
        return 'width: 90%; margin-left: 5%; margin-top: 15%;';
      } 
    }}
  }


  @media(max-width: 1000px){
    ${(props) => {
      if (props.tipo === 'calculo total') {
        return 'height: 550px; display: flex; flex-direction: column;';
      } 
    }}
  }

  @media(max-width: 800px){
    width: 90%;

    
    ${(props) => {
      if (props.tipo === 'calculo total') {
        return 'height: 550px; display: flex; flex-direction: column;';
      } else if (props.tipo === 'cupon') {
        return 'height: 650px;';
      } 
    }}
  }

  @media(max-width: 600px){
    height: 450px;
    flex-direction: column;


    ${(props) => {
      if (props.tipo === 'configuracion') {
        return 'height: 750px;';
      }
    }}
  }


`;

const ContenedorBuscadorFormulario = styled.div`
  display: flex;
`;

const TituloBuscadorFormulario = styled.h3`
  color: #ED8936;
  font-weight: bolder;
  margin-left: 35%;


 @media(max-width: 600px){
  margin-left: 22%;
  text-align: left;
 }
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
  }}
  }


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



  
 @media(max-width: 600px){
  p{ ${(props) => {
    if (props.tipo === 'sin-stock' || props.tipo === 'stock' || props.tipo === 'preventa' || props.tipo === 'próximo ingreso') {
      return 'margin-left: 12%;';
    } 
  }}
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

const LabelInformacionCalculos = styled.label`
  width: 38%;
  color: #ED8936;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5%;
  margin-left: 13%;
  margin-right: 5%;


  @media(max-width: 1100px){
    width: 70%;
    font-size: 20px;
    margin-left: 30%;
    margin-bottom: 10%;
  }
`;




export {
  ContenedorGeneralLogin, ContenedorEspacioBlancoLogin, ContenedorFormularioLogin, LogoLoginEstilos,
  TituloLogin, FormularioLogin, LabelLogin, InputLogin, BotonIngresoLogin,

  ContenedorFormularioRegistro, TituloFormularioRegistro, ContenedorCamposTriplesFormularioRegistro,
  ContenedorCampoFormularioRegistro, InputFormularioRegistro, TextAreaFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
  BotonFormularioRegistro,


  ContenedorGeneralBusquedaFormulario, ContenedorBusquedaFormulario, ContenedorBuscadorFormulario,
  TituloBuscadorFormulario, CartelAvisoColorFormulario, ContenedorCantidadFormularioRegistro,
  LabelFormularioRegistro, LabelInformacionCalculos

};