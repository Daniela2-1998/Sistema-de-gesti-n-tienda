import React, {useMemo} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Login from './pages/Login';
import Inicio from './pages/Inicio';


function App() {

  //const providerValue = useMemo(() => ({ usuarioInfo, setUsuarioInfo }, [usuarioInfo, setUsuarioInfo]))


  return (
    <>
      <BrowserRouter>

          <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/inicio/:usuario' element={<Inicio />} />

            <Route path='/productos/:usuario' element={<Inicio />} />
            <Route path='/proveedores/:usuario' element={<Inicio />} />
            <Route path='/clientes/:usuario' element={<Inicio />} />
          </Routes>

      </BrowserRouter >
    </>

  );
}

export default App;
