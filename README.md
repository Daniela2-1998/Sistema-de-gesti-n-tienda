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
- [ ] Opción de descargar una factura una vez registrada cada operación.
- [ ] Tabla de operaciones y la opción de bajar PDF.
- [ ] Modificación de operaciones.
- [ ] Opción de devoluciones.
- [ ] .
#### Modificar:


### :keyboard: Tecnologías usadas:
* HTML
* CSS
* Bootstrap
* Javascript
* React
* Firebase
