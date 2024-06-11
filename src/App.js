import React, {useMemo} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import AgregarProducto from './pages/AgregarProducto';
import ModificarProducto from './pages/ModificarProducto';
import ModificarCantidad from './pages/ModificarCantidad';
import AgregarSubcategoria from './pages/AgregarSubcategoria';

import Administrador from './pages/Administrador';
import Sucursales from './pages/Sucursales';
import Configuracion from './pages/Configuracion';
import Usuarios from './pages/Usuarios';
import AgregarUsuario from './pages/AgregarUsuario';



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
            <Route path='/productos/agregar-subcategoria/:usuario' element={<AgregarSubcategoria />} />
           
            <Route path='/proveedores/:usuario' element={<Inicio />} />
            <Route path='/clientes/:usuario' element={<Inicio />} />

            <Route path='/administrador/:usuario' element={<Administrador />} />
            <Route path='/admin/usuarios/:usuario' element={<Usuarios />} />
            <Route path='/admin/usuarios/agregar/:usuario' element={<AgregarUsuario />} />
            <Route path='/admin/sucursales/:usuario' element={<Sucursales />} />
            <Route path='/admin/configuracion/:usuario' element={<Configuracion />} />
          </Routes>

      </BrowserRouter >
    </>

  );
}

export default App;
