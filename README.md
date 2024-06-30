<h1 align="center"> Sistema de gestión para tiendas y negocios. </h1>

> [!IMPORTANT]\
> Actualmente, el README y el proyecto se encuentran en desarrollo por lo que podrán encontrar funcionalidades faltantes o sin mencionar en el actual documento.

## :computer: Descripción del proyecto:
System Solutions es un sistema de gestión web desarrollado para pequeñas y medianas tiendas, locales, negocios, emprendimientos, quioscos, minimercados y todo aquel que necesite un sistema de gestión de negocio.
El proyecto surge de la necesidad de llevar un mejor control de las operaciones diarias y de la estructura y conformación del comercio, permitiendo de esta forma, gestionar el stock, todo tipo de operaciones, clientes, proveedores, empleados, usuarios, pedidos, contabilidad, sucursales, cupones y la configuración de la aplicación. 

Se trata de un sistema de gestión completo para poder facilitar y agrupar todas aquellas tareas que necesitan ser controladas diariamente para una mejor gestión.

A lo largo de la descripción encontrarás información detallada sobre los roles, funciones, tecnologías y librerías utilizadas, y sobre su uso.

## Deploy:
:hammer_and_wrench: Próximamente 

### Roles:
* **Empleado**: tiene acceso a las secciones y funcionalidades básicas detalladas en el apartado correspondiente (**FUNCIONES BÁSICAS**).
* **Administrador**: tiene acceso a las secciones y funcinalidades básicas y a las extras detalladas en el apartado correspondiente (**FUNCIONES BÁSICAS** y **FUNCIONES EXTRAS**).

## Funciones:
### Funciones básicas:
* **Productos**: ingreso, modificación, eliminación, visualización en tabla junto con una busqueda por filtro (busqueda por: ID o código de producto, nombre de producto, disponibilidad, descuento, tipo de producto y categorías). Se pueden registrar nuevas categorías en el sistema. Se puede modificar la cantidad de un producto en concreto ingresando su ID y la cantidad a sumar o restar del stock actual. También es posible descargar un PDF con el listado de los productos ingresados al sistema. 
* **Proveedores y clientes**: registro, modificación, eliminación y visualización en tabla junto con una busqueda por filtro (busqueda por: ID, proveedor, cliente, nombre de contacto, mail, número, estado, fecha de nacimiento, tipo de cliente y rango o categoría del cliente.
* **Empleados y usuarios**: cada usuario podrá modificar la información sobre él mismo. Respecto a los empleados, los usuarios podrán visualizar en tabla y filtrar por información básica y limitada, como: nombre, sucursal y estado.
* **Operaciones**: registro, eliminación y visualización en tabla y en listado junto a una busqueda por filtro (busqueda por: ID, nombre de producto, nombre de cliente o proveedor, nombre de empleado, tipo de operación, tipo de producto y estado). Es posible registrar operaciones de los siguientes tipos: compras, ventas, compras de suministros, importación, exportación, transporte nacional e internacional, depósito, limpieza, reparación y devolución de productos. También se diferencian las operaciones por productos o servicios propios y/o de terceros para un control más específicos. El registro de las operaciones contiene 4 paneles: el primero permite realizar busquedas por ID o nombre de producto para obtener automáticamente detalles básicos del producto en concreto, tales como precio, ID y nombre para mayor comodidad. El segundo panel contiene detalles específicos del producto, y por debajo, se genera automáticamente un listado con todos los detalles de la operación para que el usuario/empleado pueda verificar que la información ingresada sea correcta, pudiendo borrar un producto del carrito en caso de arrepentimiento o error; el tercero, cuenta con la información relativa a la operación en específico, es decir, detalles como nombre del empleado, cliente, estado, etc; y por último, un panel con el precio total, el descuento (pudiendo elegir entre % o código de cupón) y aplicación del descuento. Las ventas realizadas por un cliente se suman a su número de ventas registrado en la base de datos. Las compras y ventas se verán afectadas en el stock de los productos involucrados.
##### Sistema de cupones en operaciones: el sistema de cupones utilizado para las operaciones permite diferenciar entre un descuento manual ingresado en porcentaje (ej: 0.30) y uno con código, el cuál está relacionado con un valor y un tipo de descuento, el cuál puede ser de dinero descontado o en porcentaje (más información en la sección correspondiente a **cupones**.


### Funciones extras:
* **Empleados y usuarios**: registro, modificación, eliminación y visualización en tabla junto con filtros de busqueda e información más detallada, incluyendo la posibilidad de cambiar la contraseña de un empleado en caso de olvido, DNI, experiencia, ventas y estado.
* **Sucursales**: se agrega una sucursal a la base de datos. Está información se puede ver en listados para selección de sucursal en el momento de registro de empleados.
* **Configuración**: configurar el sistema con el nombre de la empresa, el nombre del administrador principal del sistema de gestión, casa central, sitio web y sector al que se dedica el negocio.
* **Cupones**: generar cupones de forma automática pudiendo elegir letras o números y la cantidad de caractéres que se desee, o bien generar un cupón aleatorio de 6 dígitos con letras (mayúsculas y minúsculas) y números. Estos cupones estarán asociados con un valor en porcentaje o de descuento numérico específicados dentro de un listado de opciones posibles. Una vez utilizados estos cupones en una operación, se los puede inhabilitar o eliminar de la base de datos.


### :hammer_and_wrench: Próximas funciones:
#### Agregar:
##### Operaciones:
- [ ] Opción de descargar una factura una vez registrada cada operación.
- [ ] Tabla de operaciones y la opción de bajar PDF.
- [ ] Modificación de operaciones.
- [ ] Opción de devoluciones.
- [ ] Opción de sumar a la base de datos de gastos e ingresos.
##### Empleados:
- [ ] Sección empleados limitado para empleados.
##### Contabilidad:
- [ ] Opción de agregar un nuevo registro de gastos e ingresos personalizados.
- [ ] Tabla de contabilidad y la opción de bajar PDF.
- [ ] Modificar y eliminar contabilidad.
- [ ] Listado de gastos con identificadores.
##### Pedidos:
- [ ] Registro, modificación, visualización en tabla y en listado de los pedidos realizados junto con información esencial como horario de solicitud y de recepción esperada, medio de transporte, día, productos, etc.
##### Generales:
- [ ] Seguridad a las rutas privadas.
- [ ] Permanencia de sesión de usuario y cierre de sesión.


#### Modificar:
- [ ] X.

### Imágenes:
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/23577a34-5000-4f8d-9450-62aed596cc38)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/896e445f-2bce-4a16-81bc-919d85eb4bd5)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/78e3fcb4-0dc9-4835-aab4-146e58a34678)
#### Sección productos:
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/7ceba025-eca3-4d5b-8634-d863fdc96684)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/aa38b5da-546e-4ee9-9d92-4f3cfe96c452)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/a9f8816d-405d-40d4-b78d-1b16b15f1fdd)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/f8154c17-9059-4e60-9e61-05d7ce524f98)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/dc21ce83-ea43-451f-a978-05e3baf5be1b)
#### Secciones de proveedores y clientes (sólo imágenes de registro): 
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/2c811c62-c2a4-4ce9-968e-f10cbf408f2b)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/f4f002f2-71ec-4a18-801f-160b69e776b6)
#### Sección de operaciones (sólo imágenes de registro):
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/b6a58411-90cb-458c-a463-d8abc8300bb0)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/8f73ac68-47eb-48ff-826f-060284dd0ac5)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/04176865-291e-43ba-a714-fbfd5ff5519c)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/bda6657f-4d70-46f3-ba11-823ceaf9b1b8)
#### Sección de administrador:
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/e9931e9a-e63c-40fa-b58c-66f57bbed85c)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/b51ad081-0d6d-4e7d-a454-6378358d6f2b)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/c5b09e64-722b-4827-8132-44241e849971)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/6af5113a-49eb-4d51-bbd9-c6cb2bc992d5)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/13a19951-c860-4eb5-8b09-35ce5e60206d)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/be6f8055-2c5c-458d-8f98-62cb13100888)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/65aa25f3-be68-4a84-b43c-f48d02321dd8)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/9b4b510e-eca5-49a6-aec4-e041e3e7ba7b)
![image](https://github.com/Daniela2-1998/SistemaDeGestionTienda/assets/108192404/c7cd7ba6-ba81-4be5-a474-16d401fecbbe)

### :keyboard: Tecnologías usadas:
* HTML
* CSS
* Bootstrap
* Javascript
* React
* Firebase

#### Librerías usadas:
```
// Instalación de Firebase.
npm install firebase

// Instalación del React Router Dom.
npm react-router-dom

// Instalación de Bootstrap para el uso de estilos con React.
npm i bootstrap

// Instalación de Styled-components para crear componentes con estilos personalizados.
npm i styled-components

// Instalación de SweetAlert2 para la creación de mensajes de alerta.
npm install -- save sweetalert2 sweetalert2-react-content

// Instalación de Helmet para poder crear títulos para el navegador.
npm i helmet

// Instalación de React PDF para crear pdfs.
npm i @react-pdf/renderer

// Instalación de Date fns para la personalización de fechas (aún no utilizado)
npm i date-fns

```
Adicionalmente, se creó un link para poder tener acceso a iconos y logos de FontAwesome, el cuál se colocó dentro de la ruta **"/public/index.html"**, en la parte correspondiente a la etiqueta <head></head>. El código utilizado es el siguiente:

```
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

```
Por otro lado, para mantener la privacidad de la conexión a la base de datos de Firebase, se utilizó un archivo **.env.local** que es utilizado por el archivo **FirebaseConfig.js** para realizar la conexión a la base de datos correspondiente.

#### Creación de un proyecto React: 
Para crear un proyecto React, siempre hay que pararnos en la carpeta en donde queremos ubicar el proyecto, hacemos click derecho en ella, abrimos en términal y colocamos la siguiente línea de código:
```
npx create-react-app nombreApp
```
Una vez ingresada, damos enter y comenzarán a descargarse todos los paquetes para crear el proyecto. También se recomienda bajar aquellas librerías que utilizaremos para ya tenerlas preparadas antes de coemnzar. 
> [!IMPORTANT]\
> **Recordatorio:** siempre podrás pausar el proyecto con CTRL + C para instalar una nueva librería o eliminar alguna de las existentes, y luégo volver a iniciarlo con **npm start**.



### Uso local:
Primeramente, es necesario descargar el archivo. Se puede hacer clonándolo desde Github o bien descargándolo como ZIP. Una vez descargado, si se quiere probar localmente, se debe abrir la consola de comandos desde dentro de la carpeta del proyecto y para correr el proyecto se debe poner el comando:

```
npm start
```

Posteriormente, se debería abrir una nueva pestaña en su buscador predeterminado junto con el **http://localhost:3000/**, el cuál contiene el proyecto. Si por algún motivo, se hacen modificaciones en el código, la página se recargará automáticamente. Esta función es sumamente útil para detectar errores en la ejecuçión del proyecto que puedan ser visualizados en la página o en la consola.

