import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';

// Imports Firebase
import { getDocs, getDoc, setDoc, doc, collection, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../firebase/FirebaseConfig';

// Imports estilos
import styled from 'styled-components';
import { ContenedorGeneral, Header, Titulo } from '../components/InicioComponentes';
import {
    ContenedorBusquedaFormulario,
    ContenedorFormularioRegistro, TituloFormularioRegistro, ContenedorCamposTriplesFormularioRegistro,
    ContenedorCampoFormularioRegistro, InputFormularioRegistro, ContenedorBotonesDoblesFormularioRegistro,
    BotonFormularioRegistro, LabelInformacionCalculos
} from '../components/FormulariosComponentes';
import SelectOpciones from '../components/SelectOpciones';
import ListadoDeProductosOperacion from '../components/ListadoDeProductosOperacion';

// Imports Alertas
import Alerta from '../components/Alerta';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';





const MySwal = withReactContent(Swal);



const AgregarOperacion = () => {

    const { usuario } = useParams();

    // Variables
    const [id, setId] = useState('');

    const [productos, setProductos] = useState([]);

    // Contenedor de tipo de objeto, id, producto, cantidad y valor unitario
    const [objeto, setObjeto] = useState('Producto propio');
    const [idObjeto, setIdObjeto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');

    // Contenedor información general
    const [participante, setParticipante] = useState('');
    const [tipoOperacion, setTipoOperacion] = useState('Compra');
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [estado, setEstado] = useState('');

    // Contenedor de valor total + descuentos
    const [descuento, setDescuento] = useState('');
    const [tipoDescuento, setTipoDescuento] = useState('%');
    const [valorTotal, setValorTotal] = useState('');

    const fechaOperacion = new Date().toLocaleDateString();

    // Contenedor filtros de busqueda
    const [filtroConsulta, setFiltroConsulta] = useState('');
    const [productoConsultado, setProductoConsultado] = useState('');
    const [productoRecuperado, setProductoRecuperado] = useState('');
    const [idConsulta, setIdConsulta] = useState('');
    const [devolucionConsulta, setDevolucionConsulta] = useState([]);

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');


    const irAOperaciones = () => {
        navigate(`/operaciones/${usuario}`);
    }


    const productosCollection = collection(db, "productos");
    const cuponesCollection = collection(db, "cupones");


    // Contenedor busqueda
    const buscarProductoSolicitado = async (e) => {
        e.preventDefault();

        if (filtroConsulta === 'Código') {
            const datosRecuperados = await getDoc(doc(db, "productos", idConsulta));

            if (datosRecuperados.exists) {
                setProductoRecuperado(datosRecuperados.data().producto);
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
                setProductoRecuperado(devolucion.producto),
                setIdObjeto(devolucion.codigo),
                setValorUnitario(devolucion.precio)
            ))

        }

    }

    // Contenedor productos
    const sumarAlListadoProductos = (idActual, productoActual, cantidadActual, valorUnitarioActual) => {
        productos.push({
            idProducto: idActual,
            producto: productoActual,
            precio: valorUnitarioActual,
            cantidad: cantidadActual,
        });
        setValorTotal(parseFloat(valorTotal + (cantidadActual * valorUnitarioActual)))
        console.log(productos);
    }


    const generarListadoProductos = (e) => {
        e.preventDefault();

        const idActual = idObjeto;
        const productoActual = productoRecuperado;
        const cantidadActual = cantidad;
        const valorUnitarioActual = valorUnitario;

        sumarAlListadoProductos(idActual, productoActual, cantidadActual, valorUnitarioActual);
    }



    const actualizarStockFirebase = async () => {

    }


    // Modificar stock
    const modificiarCantidadProductosFirebase = async (funcion) => {
        const productosCollection = collection(db, "productos");
        const productoFirebase = await getDoc(doc(productosCollection, idObjeto));

        if (productoFirebase.exists) {
            const productoAModificar = productoFirebase.data().producto;
            const cantidadFirebase = parseInt(productoFirebase.data().cantidad);

            const cantidadCarrito = productos.map().filter(prod => {
                if (prod.producto === productoAModificar) {
                    return prod.cantidad;
                    console.log(prod.cantidad)
                }
            })
            console.log(cantidadCarrito)

            let cantidadModificada = 0;

            switch (funcion) {
                case "ingreso":
                    return cantidadModificada = parseInt(cantidadFirebase + cantidadCarrito);
                    break;
                case "ingreso":
                    return cantidadModificada = parseInt(cantidadFirebase - cantidadCarrito);
                    break;
                default:
                    break;
            }

            console.log(cantidadModificada)

            const dataActualizada = { cantidad: cantidadModificada };
            await updateDoc(productoAModificar, dataActualizada);

            new MySwal({
                title: "Modificación éxitosa",
                text: "Se modificó la cantidad éxitosamente.",
                icon: "success",
                button: "aceptar",
            });

        } else {
            new MySwal({
                title: "Producto no encontrado",
                text: "No existe el producto solicitado.",
                icon: "warning",
                button: "aceptar",
            });
        }
    }


    // Contenedor total y descuento
    const aplicarDescuento = async (e) => {
        e.preventDefault();

        if (tipoDescuento === '%') {
            const descuentoBase = parseFloat(descuento);
            const descuentoAAplicar = parseFloat(1 - descuentoBase);
            const precioConDescuento = parseFloat(valorTotal * descuentoAAplicar);
            setValorTotal(precioConDescuento);
        } else if (tipoDescuento === 'cupon') {
            const cupon = descuento.toString();
            const cuponRecuperado = await getDoc(doc(db, "cupones", cupon));

            if (cuponRecuperado.exists) {
                const estadoCupon = cuponRecuperado.data().estado;
                const tipoOperacionCupon = cuponRecuperado.data().operacion;
                const valorCupon = cuponRecuperado.data().valor;

                if (estadoCupon === 'sin usar' || estadoCupon === 'activo') {
                    switch (tipoOperacionCupon) {
                        case "multiplicar":
                            const descuentoBase = parseFloat(valorCupon);
                            const descuentoAAplicar = parseFloat(1 - descuentoBase);
                            const precioConDescuento = parseFloat(valorTotal * descuentoAAplicar);
                            setValorTotal(precioConDescuento);
                            break;

                        case "restar":
                            const precioADescontar = parseFloat(valorCupon);
                            setValorTotal(valorTotal - precioADescontar);
                            break;
                        default:
                            break;
                    }
                } else {
                    new MySwal({
                        title: "El cupón no disponible.",
                        text: "Por favor ingresa un cupón que este activo o sin usar.",
                        icon: "warning",
                        button: "aceptar",
                    });
                }
            } else {
                new MySwal({
                    title: "El cupón no existe.",
                    text: "Por favor ingresa un cupón válido.",
                    icon: "warning",
                    button: "aceptar",
                });
            }
        }
    }

    // Cupones
    const modificarEstadoCupon = async () => {
        const cuponRecuperado = doc(cuponesCollection, descuento)
        const dataActualizada = { estado: "utilizado" };
        await updateDoc(cuponRecuperado, dataActualizada);
    }

    const eliminarCupon = async () => {
        const cuponRecuperado = doc(cuponesCollection, descuento);
        await deleteDoc(cuponRecuperado);
    }

    const darDeBajaCupon = async () => {
        MySwal.fire({
            title: '¿Desea eliminar el cupón de la base de datos?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: "mantener inactivo",
            confirmButtonText: 'eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCupon();
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El cupón fue eliminado.',
                    'success'
                )
                irAOperaciones();
            } else if (result.isDismissed) {
                modificarEstadoCupon();
                irAOperaciones();
            }
        })
    }


    // Sumar ventas correspondientes al empleado
    const modificiarVentasEmpleadoFirebase = async () => {
        const empleadoCollection = collection(db, "empleados");
        const dataEmpleado = await getDocs(query(empleadoCollection, where("nombre", '==', empleado)));

        let ventas = 0;
        let idEmpleado = "";

        const empleadoRecuperado = (
            dataEmpleado.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    
        empleadoRecuperado.map((empleado) => {
            ventas = parseInt(empleado.ventas);
            idEmpleado = empleado.id;
        });
    
        ventas = ventas + 1;

        const empleadoFirebase = doc(db, "empleados", idEmpleado)
        const dataActualizada = { ventas: ventas };
        await updateDoc(empleadoFirebase, dataActualizada);

        new MySwal({
            title: "Venta agregada al empleado",
            text: "Se incremento el número de ventas del empleado.",
            icon: "success",
            button: "aceptar",
        });

    }



    // Guardar registro de operación
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

        let funcion = "";

        switch (tipoOperacion) {
            case "Compra":
                funcion = "ingresar";
                break;
            case "Venta":
                funcion = "egresar";
                break;
            case "Importación":
                funcion = "ingresar";
                break;
            case "Exportación":
                funcion = "egresar";
                break;
            default:
                break;
        }



        // modificiarCantidadProductosFirebase(funcion);
        modificiarVentasEmpleadoFirebase();

        await setDoc(doc(db, "operaciones", id),
            {
                participante: participante, tipoOperacion: tipoOperacion, productos: productos, valorTotal: valorTotal,
                fechaOperacion: fechaOperacion, fechaFinalizacion: fechaFinalizacion, descuento: descuento, empleado: empleado, estado: estado
            })

        new MySwal({
            title: "Ingreso éxitoso",
            text: "Operación ingresada al sistema.",
            icon: "success",
            button: "aceptar",
        });

        if(descuento.length > 0){
            darDeBajaCupon();
        }
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



                <ContenedorFormularioRegistro tipo='operacion productos'>

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
                            <TituloFormularioRegistro>Nombre del producto:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="text"
                                value={productoRecuperado}
                                onChange={(e) => setProductoRecuperado(e.target.value)}
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
                            <TituloFormularioRegistro>Cantidad:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

                    </ContenedorCamposTriplesFormularioRegistro>

                    <BotonFormularioRegistro tipo='sumar productos a operacion' onClick={generarListadoProductos}>+</BotonFormularioRegistro>
                </ContenedorFormularioRegistro>

                {
                    productos ?
                        <ListadoDeProductosOperacion
                            productos={productos}
                            fechaActual={fechaOperacion}
                            fechaFinalizacion={fechaFinalizacion}
                            operacion={tipoOperacion}
                            empleado={empleado}
                            participante={participante}
                            total={valorTotal}
                            descuento={descuento}
                            estado={estado}
                        />
                        : ''
                }


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
                            <TituloFormularioRegistro>Empleado involucrado:</TituloFormularioRegistro>
                            <SelectOpciones
                                tipo='listado-empleados'
                                opciones={empleado}
                                setOpciones={setEmpleado}
                            />
                        </ContenedorCampoFormularioRegistro>

                        <ContenedorCampoFormularioRegistro>
                            <TituloFormularioRegistro>Fecha de finalización:</TituloFormularioRegistro>
                            <InputFormularioRegistro
                                type="date"
                                value={fechaFinalizacion}
                                onChange={(e) => setFechaFinalizacion(e.target.value)}
                            />
                        </ContenedorCampoFormularioRegistro>

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
                        <ContenedorDescuento>
                            <ContenedorCampoFormularioRegistro tipo='descuento'>
                                <TituloFormularioRegistro>Descuento:</TituloFormularioRegistro>
                                <InputFormularioRegistro
                                    tipo='descuento'
                                    type="text"
                                    value={descuento}
                                    onChange={(e) => setDescuento(e.target.value)}
                                    placeholder='Ingrese código o descuento, ej: 0.30.'
                                />
                            </ContenedorCampoFormularioRegistro>
                            <ContenedorBotonesDoblesFormularioRegistro tipo='% usar cupon'>
                                <BotonFormularioRegistro tipo='%' onClick={(e) => { e.preventDefault(); setTipoDescuento("%") }}>%</BotonFormularioRegistro >
                                <BotonFormularioRegistro tipo='usar cupon' onClick={(e) => { e.preventDefault(); setTipoDescuento("cupon") }}>Usar cupon</BotonFormularioRegistro >
                                <label>Dar doble click</label>
                            </ContenedorBotonesDoblesFormularioRegistro>
                        </ContenedorDescuento>

                        <ContenedorDescuento>
                            <BotonFormularioRegistro tipo='aplicar descuento' onClick={aplicarDescuento}>Aplicar descuento</BotonFormularioRegistro >
                            <LabelInformacionCalculos>Total: $ {valorTotal}</LabelInformacionCalculos>
                        </ContenedorDescuento>

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

const ContenedorDescuento = styled.div`
  display: flex;
  flex-direction: row;


  @media(max-width: 1000px){
    height: 550px; 
    flex-direction: column;
  }
`;



export default AgregarOperacion;