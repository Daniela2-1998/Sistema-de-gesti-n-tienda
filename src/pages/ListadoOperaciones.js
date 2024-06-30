import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';


// Imports styles
import { ContenedorGeneral, Header, Titulo } from '../components/InicioComponentes';
import { 
    ContenedorCards, Cards, TituloCards, ContenedorLabelsCards, LabelCards, ContenedorInformacionCards, InformacionCards,
    DetalleProductosCards, LabelProductosCards, ContenedorIDYProductoCards
 } from '../components/ListadoDeElementosSimilTablaComponentes';
import { BotonFormularioRegistro } from '../components/FormulariosComponentes';




const ListadoOperaciones = () => {

    const { usuario } = useParams();
    // Variables
    const [operaciones, setOperaciones] = useState([]);

    const navigate = useNavigate();

    const operacionesCollection = collection(db, "operaciones");

    const obtenerOperaciones = async () => {
        const data = await getDocs(query(operacionesCollection, orderBy("fechaOperacion", "desc"))) ;
        setOperaciones(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }

    useEffect(() => {
        obtenerOperaciones();
    }, []);


    const regresar = () => {
        navigate(`/operaciones/${usuario}`);
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Operaciones</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>

            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>


                <Titulo>Listado de operaciones:</Titulo>
                <ContenedorCards>
                    {operaciones.map((operacion) => (
                        <Cards key={operacion.id}>
                            <TituloCards>{operacion.id}</TituloCards>
                            <ContenedorLabelsCards>
                                <LabelCards>{operacion.fechaOperacion}</LabelCards>
                                <LabelCards>{operacion.fechaFinalizacion}</LabelCards>
                            </ContenedorLabelsCards>

                            {operacion.tipoOperacion === 'Compra' ||  operacion.tipoOperacion === 'Importación' || operacion.tipoOperacion === 'Compra de suministros' ?
                                <ContenedorInformacionCards>
                                    <InformacionCards>Comprador: {operacion.empleado}</InformacionCards>
                                    <InformacionCards>Vendedor: {operacion.participante}</InformacionCards>
                                </ContenedorInformacionCards>
                                :
                                operacion.tipoOperacion === 'Venta' || operacion.tipoOperacion === 'Exportación' || operacion.tipoOperacion === 'Devolución' ?
                                    <ContenedorInformacionCards>
                                        <InformacionCards>Vendedor: {operacion.empleado}</InformacionCards>
                                        <InformacionCards>Comprador: {operacion.participante}</InformacionCards>
                                    </ContenedorInformacionCards>
                                    :
                                    ''
                            }

                            {operacion.productos.map((p) => (
                                <DetalleProductosCards>
                                    <ContenedorIDYProductoCards>
                                        <LabelProductosCards>{p.idProducto}</LabelProductosCards>
                                        <p>{p.producto}</p>
                                    </ContenedorIDYProductoCards>

                                    <ContenedorIDYProductoCards>
                                        <LabelProductosCards tipo='precio'>${p.precio}</LabelProductosCards>
                                        <LabelProductosCards tipo='cantidad'>{p.cantidad}</LabelProductosCards>
                                    </ContenedorIDYProductoCards>
                                </DetalleProductosCards>
                            ))
                            }

                            {
                                operacion.tipoOperacion === 'Compra' || operacion.tipoOperacion === 'Importación' || operacion.tipoOperacion === 'Compra de suministros' ?
                                    <LabelProductosCards tipo='compra'>{operacion.tipoOperacion}</LabelProductosCards>
                                    :
                                    operacion.tipoOperacion === 'Venta' || operacion.tipoOperacion === 'Exportación' || operacion.tipoOperacion === 'Devolución' ?
                                        <LabelProductosCards tipo='venta'>{operacion.tipoOperacion}</LabelProductosCards>
                                        :
                                        operacion.tipoOperacion === 'Transporte nacional' || operacion.tipoOperacion === 'Transporte internacional' ?
                                            <LabelProductosCards tipo='transporte'>{operacion.tipoOperacion}</LabelProductosCards>
                                            :
                                            operacion.tipoOperacion === 'Deposito' || operacion.tipoOperacion === 'Limpieza' || operacion.tipoOperacion === 'Reparación' ?
                                                <LabelProductosCards tipo='reparacion limpieza deposito'>{operacion.tipoOperacion}</LabelProductosCards>
                                                :
                                                ''
                            }

                            <ContenedorInformacionCards>
                                <InformacionCards>Estado: {operacion.estado}</InformacionCards>
                            </ContenedorInformacionCards>

                            {
                                operacion.tipoOperacion === 'Compra' || operacion.tipoOperacion === 'Importación' || operacion.tipoOperacion === 'Compra de suministros' ?
                                    <LabelProductosCards tipo='compra'>Total: ${operacion.valorTotal}</LabelProductosCards>
                                    :
                                    operacion.tipoOperacion === 'Venta' || operacion.tipoOperacion === 'Exportación' || operacion.tipoOperacion === 'Devolución' ?
                                        <LabelProductosCards tipo='venta'>Total: ${operacion.valorTotal}</LabelProductosCards>
                                        :
                                        operacion.tipoOperacion === 'Transporte nacional' || operacion.tipoOperacion === 'Transporte internacional' ?
                                            <LabelProductosCards tipo='transporte'>Total: ${operacion.valorTotal}</LabelProductosCards>
                                            :
                                            operacion.tipoOperacion === 'Deposito' || operacion.tipoOperacion === 'Limpieza' || operacion.tipoOperacion === 'Reparación' ?
                                                <LabelProductosCards tipo='reparacion limpieza deposito'>Total: ${operacion.valorTotal}</LabelProductosCards>
                                                :
                                                ''
                            }

                        </Cards>
                    ))
                    }
                </ContenedorCards>

                <BotonFormularioRegistro tipo='regresar listado' onClick={regresar}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>

            </ContenedorGeneral>
        </>

    )
}
export default ListadoOperaciones;