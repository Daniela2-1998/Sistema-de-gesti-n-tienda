import React, { useState } from 'react';

const GuardarUsuario = (usuario) => {
    const [usuarioGuardado] = useState({
        username: usuario.nombre,
        contraseña: usuario.contraseña,
        rol: usuario.rol,
        experiencia: usuario.experiencia,
        ventas: usuario.ventas,
        surcusal: usuario.sucursal,
        estado: usuario.estado
    });
}



export default { GuardarUsuario };