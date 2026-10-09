# Instalación de las herramientas de administración de SQL Server

> **Estado:** documentación en curso. El recorrido hasta el instalador de SQL Server Management Studio (SSMS) está comprobado en las capturas. La instalación y su verificación quedan pendientes.

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

### 5. Iniciar la instalación

Con **Componentes principales de SSMS** indicado en los detalles y las cargas de trabajo opcionales según la necesidad, pulsa **Instalar**.

**Pendiente de confirmar:** espera a que el instalador termine y registra el mensaje final y cualquier solicitud de reinicio que aparezca. No se da por completada la instalación hasta comprobar ese resultado.

## Verificación

Pendiente: comprobar que SSMS se instala correctamente y que aparece en el menú Inicio de Windows.

## Solución de problemas

Pendiente de documentar a partir de incidencias observadas durante la instalación.

## Referencias

- [Instale SQL Server Management Studio — Microsoft Learn](https://learn.microsoft.com/es-es/ssms/install/install)
