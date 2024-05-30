import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { collection, getDocs, getDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

// Imports de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Imports PDF.
import { PDFDownloadLink} from '@react-pdf/renderer';
import PDFTablaDemo from '../components/PDFTablaDemo';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




const Productos = () => {

    // Variables
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const { usuario } = useParams();
}

export default Productos;