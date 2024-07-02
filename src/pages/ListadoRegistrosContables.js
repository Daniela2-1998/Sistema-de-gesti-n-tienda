import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams, Link } from 'react-router-dom';

// Imports Firebase
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';


// Imports styles
import { ContenedorGeneral, Header, Titulo } from '../components/InicioComponentes';
import {
    ContenedorCards, Cards, TituloCards, ContenedorLabelsCards, LabelCards, ContenedorInformacionCards, InformacionCards,
    LabelProductosCards, ContenedorAccionesCards
} from '../components/ListadoDeElementosSimilTablaComponentes';
import { BotonFormularioRegistro } from '../components/FormulariosComponentes';

// Imports de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



const ListadoRegistrosContables = () => {

    const { usuario } = useParams();
    // Variables
    const [registros, setRegistros] = useState([]);

    const navigate = useNavigate();

    const operacionesCollection = collection(db, "operaciones");


    const obtenerRegistros = async () => {
        const data = await getDocs(collection(db, "registrosContables"));
        setRegistros(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerRegistros();
    }, []);


    const eliminarRegistros = async (id) => {
        const registroContableRegistrado = doc(db, "registrosContables", id);
        await deleteDoc(registroContableRegistrado);
        obtenerRegistros();
    }

    const confirmacionEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar el registro contable?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                eliminarRegistros(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
            }
        })
    }

    const regresar = () => {
        navigate(`/admin/contabilidad/${usuario}`);
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Registros contables</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>

            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>


                <Titulo>Listado de registros contables:</Titulo>
                <ContenedorCards>
                    {registros.map((registro) => (
                        <Cards key={registro.id}>
                            <TituloCards>{registro.id}</TituloCards>
                            <ContenedorLabelsCards>
                                <LabelCards>{registro.fecha}</LabelCards>
                            </ContenedorLabelsCards>

                            <ContenedorInformacionCards>
                                <InformacionCards>Concepto: {registro.concepto}</InformacionCards>
                                <InformacionCards>Categoría: {registro.categoria}</InformacionCards>
                            </ContenedorInformacionCards>

                            {
                                registro.subCategoria === 'Compra' || registro.subCategoria === 'Importación' || registro.subCategoria === 'Compra de suministros' ?
                                    <LabelProductosCards tipo='compra'>{registro.subCategoria}</LabelProductosCards>
                                    :
                                    registro.subCategoria === 'Venta' || registro.subCategoria === 'Exportación' || registro.subCategoria === 'Devolución' ?
                                        <LabelProductosCards tipo='venta'>{registro.subCategoria}</LabelProductosCards>
                                        :
                                        registro.subCategoria === 'Transporte nacional' || registro.subCategoria === 'Transporte internacional' ?
                                            <LabelProductosCards tipo='transporte'>{registro.subCategoria}</LabelProductosCards>
                                            :
                                            registro.subCategoria === 'Deposito' || registro.subCategoria === 'Limpieza' || registro.subCategoria === 'Reparación' || registro.subCategoria === 'Pago a empleados' ?
                                                <LabelProductosCards tipo='reparacion limpieza deposito'>{registro.subCategoria}</LabelProductosCards>
                                                :
                                                <LabelProductosCards tipo='otros'>{registro.subCategoria}</LabelProductosCards>

                            }

                            <ContenedorInformacionCards>
                                <InformacionCards>Estado: {registro.estado}</InformacionCards>
                            </ContenedorInformacionCards>

                            <ContenedorInformacionCards tipo='medio y modalidad de pago'>
                                <InformacionCards>Medio de pago: {registro.medioDePago}</InformacionCards>
                                <InformacionCards>Modalidad de pago: {registro.modalidadDePago}</InformacionCards>
                            </ContenedorInformacionCards>

                            {
                                registro.subCategoria === 'Compra' || registro.subCategoria === 'Importación' || registro.subCategoria === 'Compra de suministros' ?
                                    <LabelProductosCards tipo='compra'>Total: ${registro.importe}</LabelProductosCards>
                                    :
                                    registro.subCategoria === 'Venta' || registro.subCategoria === 'Exportación' || registro.subCategoria === 'Devolución' ?
                                        <LabelProductosCards tipo='venta'>Total: ${registro.importe}</LabelProductosCards>
                                        :
                                        registro.subCategoria === 'Transporte nacional' || registro.subCategoria === 'Transporte internacional' ?
                                            <LabelProductosCards tipo='transporte'>Total: ${registro.importe}</LabelProductosCards>
                                            :
                                            registro.subCategoria === 'Deposito' || registro.subCategoria === 'Limpieza' || registro.subCategoria === 'Reparación' || registro.subCategoria === 'Pago a empleados' ?
                                                <LabelProductosCards tipo='reparacion limpieza deposito'>Total: ${registro.importe}</LabelProductosCards>
                                                :
                                                <LabelProductosCards tipo='otros'>Total: ${registro.importe}</LabelProductosCards>

                            }

                            <ContenedorAccionesCards>
                                <Link to={`/admin/contabilidad/registros/modificar/${usuario}/${registro.id}`} className="iconos-blancos"><i className="fa-solid fa-pencil"></i></Link>
                                <button onClick={() => { confirmacionEliminar(registro.id) }} className="iconos-rojos"><i className="fa-solid fa-trash"></i></button>
                            </ContenedorAccionesCards>

                        </Cards>
                    ))
                    }
                </ContenedorCards>

                <BotonFormularioRegistro tipo='regresar listado' onClick={regresar}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>

            </ContenedorGeneral>
        </>

    )
}
export default ListadoRegistrosContables;