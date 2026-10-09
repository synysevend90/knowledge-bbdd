# Instalación de las herramientas de administración de SQL Server

> **Estado:** instalación completada y verificada. El inicio de sesión con una cuenta de Microsoft o GitHub se omite en este procedimiento.

## Objetivo

Instalar SQL Server Management Studio (SSMS), la herramienta gráfica para conectarse a instancias y administrar SQL Server. El procedimiento se ha realizado en Windows con el Centro de instalación de SQL Server 2025 y el instalador de SSMS 22.

## Punto de partida

En el menú Inicio de Windows, busca `sql`. En la captura inicial aparecen estas aplicaciones:

- Centro de instalación de SQL Server 2025 (64 bits)
- Administrador de configuración de SQL Server 2025
- Informes de errores y de uso de SQL Server 2025
- Importación y exportación de datos (64 bits) de SQL Server 2025

Que estas aplicaciones aparezcan en la búsqueda no confirma por sí solo que SSMS esté instalado.

## Procedimiento

### 1. Abrir el Centro de instalación de SQL Server

Desde los resultados de búsqueda de Windows, abre **Centro de instalación de SQL Server 2025 (64 bits)**.

### 2. Ir a las herramientas de administración

En el panel izquierdo, selecciona **Instalación**. En la página que se abre, pulsa **Instalar las herramientas de administración de SQL Server**.

El Centro de instalación indica que este enlace abre una página de descarga para SSMS, SQL Server Profiler y el Asistente para la optimización de bases de datos. También indica que se necesita conexión a Internet.

### 3. Descargar el instalador de SSMS

En la página oficial de Microsoft **Instale SQL Server Management Studio**, pulsa el vínculo de descarga del instalador de SQL Server Management Studio 22.

La página explica que el vínculo descarga `vs_SSMS.exe`, un instalador que abre el Instalador de Visual Studio. No se ofrece un archivo MSI independiente.

> En las capturas de este procedimiento, la página muestra SSMS 22 y el instalador abierto muestra la versión **22.10.2**. Si la versión disponible cambia, sigue la versión que indique la página oficial.

### 4. Revisar los componentes y las cargas de trabajo

En el Instalador de Visual Studio, comprueba que aparece **Componentes principales de SSMS** en el panel **Detalles de la instalación**.

La pestaña **Cargas de trabajo** presenta opciones adicionales: Asistencia de IA, Inteligencia empresarial, Híbrido y migración, Herramientas de código y Database DevOps. En la captura, ninguna está seleccionada.

Para instalar SSMS con sus componentes principales, deja sin marcar las cargas de trabajo opcionales, salvo que necesites expresamente alguna de ellas. La pantalla indica **3,83 GB** de espacio necesario y muestra la ubicación predeterminada:

`C:\Program Files\Microsoft SQL Server Management Studio 22\Release`

En la opción inferior se muestra **Instalar durante la descarga**.

### 5. Iniciar y esperar la instalación

Pulsa **Instalar**. El Instalador de Visual Studio muestra por separado el progreso de descarga y el de instalación.

Espera a que termine el proceso. En este procedimiento, el instalador confirmó **Instalación finalizada** y mostró que SSMS 22.10.2 estaba actualizado.

### 6. Cerrar el aviso de finalización

Pulsa **Aceptar** en el aviso **Instalación finalizada**. El instalador recomienda reiniciar Windows para limpiar los archivos restantes.

### 7. Omitir el inicio de sesión

Al abrir SSMS por primera vez, puede aparecer la pantalla **Iniciar sesión en SQL Server Management Studio**. Para este procedimiento no se vincula ninguna cuenta: pulsa **Omitir y agregar cuentas más tarde**.

### 8. Confirmar que SSMS abre

SSMS se abre y muestra el cuadro **Conectar**. La aparición de esta ventana confirma que la aplicación está instalada y puede iniciarse.

Este artículo termina en la apertura de SSMS. La conexión a una instancia de SQL Server se documentará en un procedimiento aparte. No introduzcas un nombre de servidor hasta que vayas a realizar esa conexión.

## Verificación

- El Instalador de Visual Studio confirma **Instalación finalizada**.
- En la pestaña **Instalado** aparece **SQL Server Management Studio 22**, versión **22.10.2**.
- SSMS se inicia y muestra el cuadro **Conectar**.

## Capturas y privacidad

Las capturas de la ventana **Conectar** pueden mostrar el nombre del equipo y el usuario de Windows. No las publiques sin ocultar esos datos. El inicio de sesión con una cuenta de Microsoft o GitHub se omite.

## Referencias

- [Instale SQL Server Management Studio — Microsoft Learn](https://learn.microsoft.com/es-es/ssms/install/install)
