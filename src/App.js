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
import ModificarUsuario from './pages/ModificarUsuario';
import Empleados from './pages/Empleados';
import AgregarEmpleado from './pages/AgregarEmpleado';
import ModificarEmpleado from './pages/ModificarEmpleado';
import Proveedores from './pages/Proveedores';
import AgregarProveedor from './pages/AgregarProveedor';
import ModificarProveedor from './pages/ModificarProveedor';
import Clientes from './pages/Clientes';
import AgregarCliente from './pages/AgregarCliente';
import ModificarCliente from './pages/ModificarCliente';
import Operaciones from './pages/Operaciones';
import AgregarOperacion from './pages/AgregarOperacion';
import ListadoOperaciones from './pages/ListadoOperaciones';
import GenerarCupon from './pages/GenerarCupon';


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
           
            <Route path='/proveedores/:usuario' element={<Proveedores />} />
            <Route path='/proveedores/agregar/:usuario' element={<AgregarProveedor />} />
            <Route path='/proveedores/modificar/:usuario/:id' element={<ModificarProveedor />} />

            <Route path='/clientes/:usuario' element={<Clientes />} />
            <Route path='/clientes/agregar/:usuario' element={<AgregarCliente />} />
            <Route path='/clientes/modificar/:usuario' element={<ModificarCliente />} />

            <Route path='/operaciones/:usuario' element={<Operaciones />} />
            <Route path='/operaciones/agregar/:usuario' element={<AgregarOperacion />} />
            <Route path='/operaciones/listado/:usuario' element={<ListadoOperaciones />} />

            <Route path='/administrador/:usuario' element={<Administrador />} />
            <Route path='/admin/usuarios/:usuario' element={<Usuarios />} />
            <Route path='/admin/usuarios/agregar/:usuario' element={<AgregarUsuario />} />
            <Route path='/admin/usuarios/modificar/:usuario/:id' element={<ModificarUsuario />} />
           
            <Route path='/empleados/:usuario' element={<Empleados />} />
            <Route path='/admin/empleados/:usuario' element={<Empleados />} />
            <Route path='/admin/empleados/agregar/:usuario' element={<AgregarEmpleado />} />
            <Route path='/admin/empleados/modificar/:usuario/:id' element={<ModificarEmpleado />} />
          
            <Route path='/admin/sucursales/:usuario' element={<Sucursales />} />
            <Route path='/admin/configuracion/:usuario' element={<Configuracion />} />
            <Route path='/admin/cupones/:usuario' element={<GenerarCupon />} />
          </Routes>

      </BrowserRouter >
    </>

  );
}

export default App;
