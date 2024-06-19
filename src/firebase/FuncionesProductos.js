import React, {useState, useEffect} from 'react';

// Imports Firebase
import { getDoc, getDocs, doc, updateDoc, collection } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

// Alertas
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';




const MySwal = withReactContent(Swal);


function FuncionesProductos ( codigo, cantidad, funcion ) {

    const [productoAModificar, setProductoAModificar] = useState('');
    const [cantidadFirebase, setCantidadFirebase] = useState('');
    const [cantidadModificada, setCantidadModificada] = useState('');

    const productosCollection = collection(db, "productos");
    

    // Recupero de Firebase
    const obtenerProductoByCodigo = async () => {
        const productoFirebase = await getDoc( doc(db, "productos", codigo) );

        if (productoFirebase.exists) {
            setProductoAModificar(productoFirebase.data().producto);
            setCantidadFirebase(productoFirebase.data().cantidad);
        } else {
            console.log("No existe el producto solicitado.");
        }
    }

    // Funciones de manipulación del stock
    const ingresoStock = () => {
        setCantidadModificada(parseInt(cantidadFirebase + cantidad));
    }

    const egresoStock = () => {
        setCantidadModificada(parseInt(cantidadFirebase - cantidad));
    }

    // Función central
    const modificarInformacionFirebase = async () => {

        switch (funcion) {
            case "ingresar":
                ingresoStock();
                break;
            case "egresar":
                egresoStock();
                break;
            default:
                break;
        }

        const productoRecuperado = doc(db, "productos", codigo)
        const dataActualizada = { cantidad: cantidadModificada };
        await updateDoc(productoRecuperado, dataActualizada);

        new MySwal({
            title: "Modificación éxitosa",
            text: "Se modificó la cantidad éxitosamente.",
            icon: "success",
            button: "aceptar",
        });


    }



    useEffect( () => {
        obtenerProductoByCodigo();
        modificarInformacionFirebase();
    }, []);

}

export default FuncionesProductos;