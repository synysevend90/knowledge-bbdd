# Instalación de SQL Server 2025 Enterprise Developer

> **Estado: instalación en curso.** Esta guía documenta los pasos confirmados hasta la selección de características. La instalación del motor y la verificación final siguen pendientes.

## Alcance y requisitos

- Producto: SQL Server 2025 Enterprise Developer.
- Tipo: instalación limpia del motor de base de datos en Windows.
- Topología: instancia independiente; el equipo no se une a un dominio de Active Directory como parte de este procedimiento.
- Uso: desarrollo y pruebas, fuera de producción.
- Las cuentas de servicio, la instancia, las rutas y la autenticación se decidirán según las pantallas reales, sin asumir valores de antemano.

## Procedimiento

### 1. Abrir la instalación personalizada

Ejecuta el iniciador de SQL Server 2025. En la primera pantalla aparecen Basic, Custom y Download Media; selecciona Custom para abrir el asistente detallado y revisar la configuración antes de instalar. No elijas Basic porque esta guía requiere controlar los componentes y las opciones de la instancia. El encabezado del iniciador dice “Evaluation Edition”, pero no determina la edición que se instalará; se elige en el asistente.

### 2. Elegir la ubicación de descarga

En Specify SQL Server media download target location, el idioma aparece como Spanish y la ruta propuesta es C:\\SQL2025. La pantalla indica 8752 MB de espacio libre mínimo y un tamaño de descarga de 1311 MB. Comprueba el espacio disponible y la carpeta. Pulsa Install para adquirir los archivos.

### 3. Esperar a que se adquieran los archivos

El iniciador muestra Downloading install package... y Acquiring setup files... durante la descarga. Espera a que termine la adquisición antes de continuar. La versión visible del iniciador es 17.0.1000.7.

### 4. Abrir la sección de instalación

Cuando aparezca el Centro de instalación de SQL Server, selecciona Instalación en el menú de la izquierda.

### 5. Iniciar una instalación independiente

En la página Instalación, selecciona Nueva instalación independiente de SQL Server o agregar características a una instalación existente para iniciar una instancia nueva.

### 6. Seleccionar Enterprise Developer

En Edición, cambia la selección inicial Evaluation por Enterprise Developer. La descripción del asistente indica que Developer no caduca, incluye las características de Enterprise y se licencia para desarrollo y pruebas, no para producción. Comprueba el valor antes de continuar.

### 7. Revisar y aceptar los términos de licencia

La pantalla identifica SQL Server 2025 Enterprise Developer Edition. Lee los términos y la declaración de privacidad. Acepta la casilla solo si estás de acuerdo y pulsa Siguiente.

### 8. Esperar la comprobación de reglas globales

Espera a que termine Comprobación de reglas en curso... y revisa su resultado antes de continuar.

### 9. Dejar Microsoft Update desmarcado

Deja sin marcar Usar Microsoft Update para comprobar las actualizaciones. Esta decisión omite Microsoft Update en este paso; la gestión de parches se hará después de forma controlada.

### 10. Revisar el estado de los archivos de configuración

La tabla observada mostraba Buscar actualizaciones de producto: Completado, Descargar archivos del programa de configuración: Omitido, Extraer archivos del programa de configuración: Omitido e Instalar archivos del programa de configuración: No iniciado. Conserva esos estados tal como aparecen; la comprobación de actualizaciones no demuestra que se haya instalado una actualización. Revisa la pantalla siguiente antes de avanzar.

### 11. Continuar pese a la advertencia del Firewall

El resumen observado indica 4 reglas correctas, 0 incumplidas, 1 advertencia y 0 omitidas. La advertencia corresponde a Firewall de Windows y explica que hay que abrir puertos para permitir el acceso remoto. Para esta instalación local puedes continuar sin cambiar el Firewall. No abras puertos sin necesitarlos; si posteriormente se requiere acceso remoto, configura entonces el puerto y la regla específicos.

### 12. Omitir la extensión de Azure

En Extensión de Azure para SQL Server, deja la casilla desmarcada y los campos sin completar. Esta instalación independiente no requiere conectarse a Azure. Pulsa Siguiente.

### 13. Seleccionar solo el motor de base de datos

Marca Servicios de Motor de base de datos, la característica principal del motor relacional de SQL Server. Para esta instalación limpia deja sin marcar Replication, las extensiones de lenguaje e IA, la búsqueda de texto completo, PolyBase, Analysis Services, Integration Services y las características de escalabilidad horizontal. Añádelas solo si aparece un requisito concreto. No pulses Seleccionar todo. Pulsa Siguiente y revisa la configuración de instancia y las rutas antes de continuar.

## Verificación final

Pendiente. Cuando termine el asistente, comprueba la edición instalada, el nombre de la instancia y una conexión local al motor. No marques la guía como completada hasta verificar esas comprobaciones.

## Referencias oficiales

- [Descargas de SQL Server de Microsoft](https://www.microsoft.com/es-es/sql-server/sql-server-downloads).
- [Instalar SQL Server desde el asistente gráfico](https://learn.microsoft.com/es-es/sql/database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup?view=sql-server-ver17).
- [Ediciones y características de SQL Server 2025](https://learn.microsoft.com/es-es/sql/sql-server/editions-and-components-of-sql-server-2025?view=sql-server-ver17).
- [Configurar el Firewall de Windows para el acceso al motor de base de datos](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-a-windows-firewall-for-database-engine-access?view=sql-server-ver17).
- [Instalar el motor de base de datos de SQL Server](https://learn.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server-database-engine?view=sql-server-ver17).


## Continuación: configuración de instancia y del motor

La documentación queda cerrada hasta la pantalla **Listo para instalar**. Estas capturas completan la configuración previa; no muestran la instalación ejecutada ni su verificación final. Tres capturas repetidas del mismo aviso de validación se han consolidado en una sola imagen.

### 13. Confirmar la selección del motor

En la pantalla de características queda seleccionada **Servicios de Motor de base de datos** y las características opcionales permanecen sin marcar.

![Servicios de Motor de base de datos seleccionado](../../pages-overlay/site/sql-server/instalacion-sql-server-2025-developer/configuracion-instancia/images/13-seleccion-motor.png)

### 14. Configurar una instancia con nombre

Selecciona **Instancia con nombre** y comprueba que el nombre y el identificador muestran `ServidorSinAD`. El asistente propone una ruta asociada a `MSSQL17.ServidorSinAD`.

![Configuración de la instancia con nombre ServidorSinAD](../../pages-overlay/site/sql-server/instalacion-sql-server-2025-developer/configuracion-instancia/images/14-configuracion-instancia.png)

### 15. Revisar las cuentas de servicio

La captura muestra el Agente SQL Server con inicio **Manual**, el Motor de base de datos con inicio **Automático** y SQL Server Browser **Deshabilitado**. Los nombres de cuenta se ven truncados. La opción para conceder el privilegio de mantenimiento de volúmenes aparece desmarcada.

![Tipos de inicio observados para los servicios de SQL Server](../../pages-overlay/site/sql-server/instalacion-sql-server-2025-developer/configuracion-instancia/images/15-cuentas-de-servicio.png)

### 16. Añadir al menos una cuenta administradora

El asistente impide continuar si la lista de administradores de SQL Server está vacía. Añade la cuenta local actual u otra cuenta que deba administrar el motor.

![Validación que exige una cuenta administradora de SQL Server](../../pages-overlay/site/sql-server/instalacion-sql-server-2025-developer/configuracion-instancia/images/16-falta-administrador-sql.png)

En esta instalación se eligió el modo mixto y se añadió la cuenta local actual a la lista de administradores. Los campos de contraseña aparecen enmascarados. La imagen publicada oculta el identificador del equipo y no contiene la contraseña.

![Modo mixto y cuenta local administradora con la identidad del equipo oculta](../../pages-overlay/site/sql-server/instalacion-sql-server-2025-developer/configuracion-instancia/images/17-configuracion-del-motor-administrador-anonimizado.png)

### 17. Esperar las reglas de configuración de características

Espera a que termine la comprobación y revisa el resultado. La captura disponible muestra la comprobación en curso, no el resultado final.

![Reglas de configuración de características en curso](../../pages-overlay/site/sql-server/instalacion-sql-server-2025-developer/configuracion-instancia/images/18-reglas-de-caracteristicas.png)

### 18. Revisar el resumen antes de instalar

El resumen indica la edición **Desarrollador empresarial**, la acción **Instalar**, la característica **Servicios de Motor de base de datos** y la instancia `SERVIDORSINAD`. Revisa la configuración antes de pulsar **Instalar**.

![Resumen del instalador en la pantalla Listo para instalar](../../pages-overlay/site/sql-server/instalacion-sql-server-2025-developer/configuracion-instancia/images/19-listo-para-instalar.png)

En ese resumen aparece **Actualización habilitada: Verdadero** y **Origen de actualización: MU**, aunque anteriormente se dejó sin marcar **Usar Microsoft Update para comprobar las actualizaciones**. Conservamos ambos estados tal como aparecen; el resumen no demuestra que se haya descargado o instalado una actualización.

### Estado al cerrar el capítulo

La documentación del asistente queda completa hasta **Listo para instalar**. Las capturas no muestran que se haya pulsado **Instalar**, que el proceso haya finalizado ni que el motor se haya verificado; por eso no se afirma que SQL Server esté instalado.
