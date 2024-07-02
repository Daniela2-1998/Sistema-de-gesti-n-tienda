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

// Visual del PDF con tabla de productos.
function PDFRegistrosContables({ registros, fechaActual, nombreEmpresa }) {

    return (
        <Document>
            <Page style={styles.page}>

                <Text style={styles.title}>{nombreEmpresa}</Text>


                <View style={styles.section}>
                    <Text style={styles.subtitle}>Listado de registros contables:</Text>


                    <View style={styles.tabla}>

                        <View style={styles.tablaFila}>
                            <View style={styles.tablaColumna0}>
                                <Text style={styles.tablaCeldaHeader}>Fecha</Text>
                            </View>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tablaCeldaHeader}>Importe</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>Concepto</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tablaCeldaHeader}>Subcategoría</Text>
                            </View>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tablaCeldaHeader}>Medio de pago</Text>
                            </View>
                        </View>

                        {registros.map((registro) => (
                            <View style={styles.tablaFila} key={registro.id}>
                                <View style={styles.tablaColumna0}>
                                    <Text style={styles.tablaCelda}>{registro.fecha}</Text>
                                </View>
                                <View style={styles.tablaColumna1}>
                                    <Text style={styles.tablaCelda}>{registro.importe}</Text>
                                </View>
                                <View style={styles.tablaColumna2}>
                                    <Text style={styles.tablaCelda}>{registro.concepto}</Text>
                                </View>
                                <View style={styles.tablaColumna2}>
                                    <Text style={styles.tablaCelda}>{registro.subCategoria}</Text>
                                </View>
                                <View style={styles.tablaColumna1}>
                                    <Text style={styles.tablaCelda}>{registro.medioDePago}  -  {registro.modalidadDePago}</Text>
                                </View>
                            </View>
                        ))}

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

export default PDFRegistrosContables;