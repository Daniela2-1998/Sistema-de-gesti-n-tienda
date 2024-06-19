import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { getDocs, getDoc, setDoc, doc, collection, query, where } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

// Imports estilos
import { ContenedorGeneral, Header, Titulo } from '../components/InicioComponentes';
import {
    ContenedorBusquedaFormulario,
    ContenedorFormularioRegistro, TituloFormularioRegistro, ContenedorCamposTriplesFormularioRegistro,
    ContenedorCampoFormularioRegistro, InputFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
    BotonFormularioRegistro, LabelInformacionCalculos
} from '../components/FormulariosComponentes';
import SelectOpciones from '../components/SelectOpciones';
import Alerta from '../components/Alerta';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FuncionesProductos from '../firebase/FuncionesProductos';


const MySwal = withReactContent(Swal);



const AgregarOperacion = () => {

    const { usuario } = useParams();

    // Variables
    const [id, setId] = useState('');
    const [participante, setParticipante] = useState('');
    const [tipoOperacion, setTipoOperacion] = useState('Compra');
    const [objeto, setObjeto] = useState('Producto propio');
    const [idObjeto, setIdObjeto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [descuento, setDescuento] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [estado, setEstado] = useState('');


    const fechaOperacion = new Date().toLocaleDateString();

    const [filtroConsulta, setFiltroConsulta] = useState('');
    const [productoConsultado, setProductoConsultado] = useState('');
    const [idConsulta, setIdConsulta] = useState('');
    const [devolucionConsulta, setDevolucionConsulta] = useState([]);

    const [funcion, setFuncion] = useState('');


    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const irAOperaciones = () => {
        navigate(`/operaciones/${usuario}`);
    }


    const productosCollection = collection(db, "productos");


    // Funciones extras
    const buscarProductoSolicitado = async (e) => {
        e.preventDefault();

        if (filtroConsulta === 'Código') {
            const datosRecuperados = await getDoc(doc(db, "productos", idConsulta));


            if (datosRecuperados.exists) {
                setIdObjeto(datosRecuperados.data().codigo);
                setValorUnitario(datosRecuperados.data().precio);
            } else {
                console.log("No existe el producto solicitado.");
            }

        } else if (filtroConsulta === 'Nombre producto') {
            const datosRecuperados = await getDocs(query(productosCollection,
                where("producto", "==", productoConsultado)
            ));

            setDevolucionConsulta(
                datosRecuperados.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );

            devolucionConsulta.map((devolucion) => (
                setIdObjeto(devolucion.codigo),
                setValorUnitario(devolucion.precio)
            ))
    
        }

    }

    
    // CREAR FUNCION PARA FILTRAR SEGUN TIPO DE OPERACION PARA LOS CALCULOS SOBRE CANTIDAD
    const devolucionFuncionARealizar = () => {
        switch (tipoOperacion) {
            case "Compra":
                setFuncion("ingresar");
                break;
            case "Venta":
                setFuncion("egresar");
                break;
            case "Importación":
                setFuncion("ingresar");
                break;
            case "Exportación":
                setFuncion("egresar");
                break;

            default:
                break;
        }
    }



    const calcularTotal = (e) => {
        e.preventDefault();
        setValorTotal(parseFloat(valorUnitario * cantidad));
        setValorTotal(parseFloat(valorTotal));
    }



    const aplicarDescuento = (e) => {
        e.preventDefault();
        const descuentoBase = parseFloat(descuento);
        const descuentoAAplicar = parseFloat(1 - descuentoBase);
        const precioConDescuento = parseFloat(valorTotal * descuentoAAplicar);
        setValorTotal(precioConDescuento);
    }




    const almacenarOperacion = async (e) => {
        e.preventDefault();

        if (participante === '' || cantidad === '' || valorUnitario === '' || valorTotal === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar los campos básicos de la operación.'
            });
            return;
        }

        setValorUnitario(parseFloat(valorUnitario));

        if (cantidad <= 0) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "La cantidad debe ser 0 o positiva."
            });
            return;
        }

        if (valorUnitario < 0 && valorTotal < 0) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "La precio debe ser positivo."
            });
            return;
        }


        devolucionFuncionARealizar();
        //FuncionesProductos(idObjeto, cantidad, funcion);

        await setDoc(doc(db, "operaciones", id),
            {
                participante: participante, tipoOperacion: tipoOperacion, objeto: objeto, idObjeto: idObjeto,
                cantidad: cantidad, valorUnitario: valorUnitario, valorTotal: valorTotal, fechaOperacion: fechaOperacion,
                fechaFinalizacion: fechaFinalizacion, descuento: descuento, empleado: empleado, estado: estado
            })

        new MySwal({
            title: "Ingreso éxitoso",
            text: "Operación ingresada al sistema.",
            icon: "success",
            button: "aceptar",
        });

        irAOperaciones();
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>System Solutions - Agregar operación</title>
                <link rel="icon" href="../images/Logo.svg" />
            </Helmet>


            <ContenedorGeneral>

                <Header>
                    <h1>Sistema de gestión comercial</h1>
                </Header>

                <Titulo>Ingresar operación al sistema:</Titulo>


                <ContenedorBusquedaFormulario tipo='agregar operacion' onSubmit={buscarProductoSolicitado}>
                    <BotonFormularioRegistro tipo='buscar' type='submit'>Buscar</BotonFormularioRegistro >
                    <InputFormularioRegistro
                        tipo='filtro-producto'
                        type="text"
                        value={filtroConsulta}
                        onChange={(e) => setFiltroConsulta(e.target.value)}
                        placeholder='Ingrese "Nombre producto" o "Código"'
                    />

                    {filtroConsulta === 'Código' ?
                        <InputFormularioRegistro
                            tipo='busqueda-producto'
                            type="text"
                            value={idConsulta}
                            onChange={(e) => setIdConsulta(e.target.value)}
                        />
                        :
                        filtroConsulta === 'Nombre producto' ?
                            <InputFormularioRegistro
                                tipo='busqueda-producto'
                                type="text"
                                value={productoConsultado}
                                onChange={(e) => setProductoConsultado(e.target.value)}
                            />
                            :
                            ''
                    }

                </ContenedorBusquedaFormulario>


                <ContenedorFormularioRegistro tipo='operacion' onSubmit={almacenarOperacion}>

                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>ID:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder='Ingrese el nombre de identificación de la operación.'
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Participante:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={participante}
                                onChange={(e) => setParticipante(e.target.value)}
                                placeholder='Ingrese nombre del participante involucrado.'
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Tipo de operación:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='tipos-operacion'
                                opciones={tipoOperacion}
                                setOpciones={setTipoOperacion}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Objeto:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='involucrado-operacion'
                                opciones={objeto}
                                setOpciones={setObjeto}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>ID del objeto:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={idObjeto}
                                onChange={(e) => setIdObjeto(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Cantidad:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>



                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Valor unitario:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="number"
                                value={valorUnitario}
                                onChange={(e) => setValorUnitario(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Empleado involucrado:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='listado-empleados'
                                opciones={empleado}
                                setOpciones={setEmpleado}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>fechaFinalizacion:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="date"
                                value={fechaFinalizacion}
                                onChange={(e) => setFechaFinalizacion(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>
                    </ContenedorCamposTriplesFormularioRegistro>


                    <ContenedorCamposTriplesFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Estado:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='estados-operacion'
                                opciones={estado}
                                setOpciones={setEstado}
                            />
                        </ContenedorCampoFormularioRegistro>


                    </ContenedorCamposTriplesFormularioRegistro>


                    <ContenedorBusquedaFormulario tipo='calculo total'>

                        <BotonFormularioRegistro tipo='calculo total' onClick={calcularTotal}>Calcular total</BotonFormularioRegistro >
                        <LabelInformacionCalculos>Total: $ {valorTotal}</LabelInformacionCalculos>
                       
                        <ContenedorCampoFormularioRegistro tipo='descuento'>
                            <TituloFormularioRegistro>Descuento:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                tipo='descuento'
                                type="text"
                                value={descuento}
                                onChange={(e) => setDescuento(e.target.value)}
                                placeholder='Ingrese cupón de descuento.'
                            />
                            <BotonFormularioRegistro tipo='calculo total' onClick={aplicarDescuento}>Aplicar descuento</BotonFormularioRegistro >

                        </ContenedorCampoFormularioRegistro>

                    </ContenedorBusquedaFormulario>

                    <ContenedorBotonesDoblesFormularioRegistro>
                        <BotonFormularioRegistro tipo='regresar' onClick={irAOperaciones}><i class="fa fa-undo" aria-hidden="true"></i>Regresar</BotonFormularioRegistro>
                        <BotonFormularioRegistro tipo='ingresar' typeof='submit'>Ingresar</BotonFormularioRegistro>
                    </ContenedorBotonesDoblesFormularioRegistro>
                </ContenedorFormularioRegistro>

            </ContenedorGeneral>

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />

        </>
    )
}

export default AgregarOperacion;