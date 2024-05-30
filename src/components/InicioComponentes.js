import styled from 'styled-components';

// COMPONENTES GENERALES
const ContenedorGeneral = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 1.5%;
  text-align: center;
  background-color: #ED8936;

  h1{
    color: #fff;
    background-color: transparent;
    font-weight: bolder;
  }
`;

const ContenedorCards = styled.div`
  width: 100%;
  height: 800px;
  margin-top: 5%;
  justify-content: space-evenly;
  display: grid;
  grid-gap: 0%;
  grid-template-columns: 20% 20% 20%;
  grid-template-rows: fit-content;


  @media (max-width: 1400px) {
    grid-template-columns: 22% 22% 22%;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 27% 27% 27%;
  }
  
  @media (max-width: 950px) {
    height: 2500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Cards = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  border: none;
  background-color: #EAEAEA;
  display: flex;
  flex-direction: column;


  @media (max-width: 950px) {
    width: 50%;
    height: 380px;
    margin-left: 25%;
  }

  @media (max-width: 600px) {
    width: 60%;
    height: 330px;
    margin-left: 20%;
  }
`;

const ImagenesCards = styled.img`
  width: 95%;
  height: 120px;
  margin-top: 7%;
  margin-left: 3%;
  border: none;
  border-radius: 10px;


  @media (max-width: 950px) {
    width: 98%;
    height: 180px;
    margin-left: 2%;
    flex-direction: row;
    border: none;
  }

  @media (max-width: 800px) {
    width: 95%;
    height: 150px;
  }

  @media (max-width: 700px) {
    height: 130px;
  }

  @media (max-width: 600px) {
    width: 92%;
    margin-left: 4%;
  }

  @media (max-width: 500px) {
    height: 110px;
  }

`;

const BotonesCards = styled.button`
  width: 70%;
  height: 50px;
  margin-top: 25%;
  margin-left: 15%;
  background-color: #ED8936;
  color: #fff;
  border: none;
  border-radius: 10px;

  
  @media (max-width: 950px) {
    height: 70px;
    margin-top: 20%;
  }

  @media (max-width: 500px) {
    width: 80%;
    height: 60px;
    margin-top: 25%;
    margin-left: 10%;
  }
`;




export { ContenedorGeneral, Header, ContenedorCards, Cards, ImagenesCards, BotonesCards};