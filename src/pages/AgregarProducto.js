import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { setDoc, doc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';


const AgregarProducto = () => {

    const { usuario } = useParams();

    // Variables
    const [producto, setProductos] = useState('');
    const [codigo, setCodigo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tipo, setTipo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [descuento, setDescuento] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [promocion, setPromocion] = useState('');




    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Productos</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>
        </>
    )
}

export default AgregarProducto;