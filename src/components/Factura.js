import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Tamaños ancho de columna.
const colAncho1 = 30;
const colAncho2 = 15;


// Estilos del PDF.
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
    },
    section: {
        margin: 10,
        padding: 10,
    },
    title: {
        marginTop: 5,
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        color: "#ED8936",
    },
    subtitle: {
        fontSize: 17,
        textAlign: "center",
    },
    numeroComprobante: {
        fontSize: 17,
        marginLeft: 40 + "%",
        borderStyle: "solid",
        borderWidth: 1,
    },
    detallesOperacion: {
        fontSize: 15,
        marginLeft: 7 + "%",
    },
    tabla: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: "#ED8936",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 20,
    },
    tablaFila: {
        margin: "auto",
        flexDirection: "row",
    },
    tablaColumna0: {
        width: 10 + "%",
        borderStyle: "solid",
        borderColor: "#ED8936",
        borderBottomColor: "#ED8936",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tablaColumna1: {
        width: colAncho1 + "%",
        borderStyle: "solid",
        borderColor: "#ED8936",
        borderBottomColor: "#ED8936",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tablaColumna2: {
        width: colAncho2 + "%",
        borderStyle: "solid",
        borderColor: "#ED8936",
        borderBottomColor: "#ED8936",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tablaCeldaHeader: {
        fontSize: 12,
        fontWeight: 500,
        paddingLeft: 7,
        backgroundColor: "#ED8936",
        color: "#fff",
    },
    anchoColumna0: {
        width: 10 + "%",
        borderStyle: "solid",
        borderColor: "#ED8936",
        borderBottomColor: "#ED8936",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    anchoColumna1: {
        width: colAncho1 + "%",
        borderStyle: "solid",
        borderColor: "#ED8936",
        borderBottomColor: "#ED8936",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    anchoColumna2: {
        width: colAncho2 + "%",
        borderStyle: "solid",
        borderColor: "#ED8936",
        borderBottomColor: "#ED8936",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tablaCelda: {
        margin: 5,
        fontSize: 10,
        paddingLeft: 7,
    },
    pageNumber: {
        fontSize: 12,
    },
    footer: {
        height: 70,
        width: 100 + "%",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        position: 'absolute',
        marginTop: 2,
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#ED8936",
        color: "#fff",
    },
    textoFooter: {
        fontSize: 15,
        marginTop: 2 + "%",
        marginBottom: 2 + "%",
    }
});

const Factura = ({ fechaActual, nombreEmpresa, numeroComprobante, empleado, fechaFinalizacion, participante, productos,
    tipoOperacion, total, estado, formaDePago, modalidadDePago }) => {

    return (
        <Document>
            <Page style={styles.page} size={'A4'}>

                <Text style={styles.title}>{nombreEmpresa}</Text>


                <View style={styles.section}>
                    <Text style={styles.numeroComprobante}>Comprobante de pago: {numeroComprobante}</Text>
                </View>


                <Text style={styles.detallesOperacion}>Fecha de emisión: {fechaActual}</Text>
                {
                    tipoOperacion === 'Compra' || tipoOperacion === 'Compra de suministros' || tipoOperacion === 'Importación' ?
                        <View style={styles.section}>
                            <Text style={styles.detallesOperacion}>Vendedor: {participante}</Text>
                        </View>
                        : tipoOperacion === 'Venta' || tipoOperacion === 'Exportación' ?
                            <View style={styles.section}>
                                <Text style={styles.detallesOperacion}>Cliente: {participante}</Text>
                            </View>
                            :
                            <View style={styles.section}>
                                <Text style={styles.detallesOperacion}>Cliente: {participante}</Text>
                            </View>

                }


                <View style={styles.section}>

                    <View style={styles.tabla}>

                        <View style={styles.tablaFila}>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>ID</Text>
                            </View>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tablaCeldaHeader}>Cantidad</Text>
                            </View>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tablaCeldaHeader}>Producto</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>Precio</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>Total</Text>
                            </View>
                        </View>

                        {
                            <View style={styles.tablaFila}>

                                {productos.map((p) => (
                                    <View style={styles.tablaFila} key={p.idProducto}>
                                        <View style={styles.tablaColumna2}>
                                            <Text style={styles.tablaCelda}>{p.idProducto}</Text>
                                        </View>
                                        <View style={styles.tablaColumna0}>
                                            <Text style={styles.tablaCelda}>{p.cantidad}</Text>
                                        </View>
                                        <View style={styles.tablaColumna1}>
                                            <Text style={styles.tablaCelda}>{p.producto}</Text>
                                        </View>
                                        <View style={styles.tablaColumna1}>
                                            <Text style={styles.tablaCelda}>${p.precio}</Text>
                                        </View>
                                    </View>
                                ))
                                }
                                <View style={styles.tablaColumna2}>
                                    <Text style={styles.tablaCelda}>${total}</Text>
                                </View>
                            </View>
                        }
                    </View>

                </View>


                <View style={styles.footer}>
                    <Text style={styles.textoFooter}>{fechaActual} - System Solutions</Text>
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} fixed />
                </View>

            </Page>

        </Document >
    )
}

export default Factura;