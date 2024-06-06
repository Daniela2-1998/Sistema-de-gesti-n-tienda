import React, {useMemo} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import AgregarProducto from './pages/AgregarProducto';
import ModificarProducto from './pages/ModificarProducto';
import ModificarCantidad from './pages/ModificarCantidad';



function App() {

  return (
    <>
      <BrowserRouter>

          <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/inicio/:usuario' element={<Inicio />} />

            <Route path='/productos/:usuario' element={<Productos />} />
            <Route path='/productos/agregar/:usuario' element={<AgregarProducto />} />
            <Route path='/productos/modificar/:usuario/:id' element={<ModificarProducto />} />
            <Route path='/productos/modificar-cantidad/:usuario' element={<ModificarCantidad />} />


            <Route path='/proveedores/:usuario' element={<Inicio />} />
            <Route path='/clientes/:usuario' element={<Inicio />} />
          </Routes>

      </BrowserRouter >
    </>

  );
}

export default App;
