# Instalación de SQL Server 2025 Developer en un servidor unido a Active Directory

> **Estado: preparación del servidor documentada; unión al dominio pendiente.** Las capturas muestran Windows Server 2022 y la configuración inicial del equipo. Antes de unirlo, hay que corregir y comprobar DNS. Las pantallas compartidas contienen identificadores internos e IP privadas; no se publican en la versión pública sin anonimizar.

## Objetivo y alcance

Instalar SQL Server 2025 Enterprise Developer en un servidor Windows nuevo, unido como **servidor miembro** a un dominio de Active Directory existente. El controlador de dominio estará en otra máquina. El uso de Developer es para desarrollo y pruebas, no para producción.

La guía previa de instalación sin dominio se conserva como referencia independiente. Este procedimiento se completará desde la preparación del nuevo servidor hasta la conexión al motor mediante una identidad del dominio.

## Entorno observado

- Sistema operativo: Windows Server 2022 Datacenter Evaluation.
- Versión: 21H2.
- Compilación mostrada: 20348.587.
- Adaptador: Ethernet.
- El equipo todavía aparece en el grupo de trabajo `WORKGROUP`; no se ha unido al dominio.
- Se configuró manualmente IPv4. Los valores de IP, máscara, puerta de enlace y DNS se omiten en la copia pública.
- El nombre DNS del dominio, el nombre del controlador de dominio y la identidad autorizada para unir equipos quedan pendientes de registrar.

## Procedimiento

### 1. Comprobar el sistema y cambiar el nombre del equipo

En **Configuración > Sistema > Acerca de**, se comprobó la edición de Windows Server. En esa página, selecciona **Cambiar el nombre de este equipo**, introduce el nombre elegido para el servidor y pulsa **Siguiente**. Windows ofrece reiniciar ahora o más tarde para aplicar el cambio.

La captura posterior muestra el nuevo nombre en la configuración del sistema. El nombre interno se omite aquí; se incorporará una captura anonimizada antes de publicar imágenes.

**Resultado observado:** Windows Server 2022 Datacenter Evaluation, versión 21H2, compilación 20348.587. El nombre nuevo aparece aplicado en la pantalla posterior.

### 2. Revisar la configuración de red

En **Configuración > Red e Internet > Estado > Cambiar opciones del adaptador**, abre las propiedades de **Ethernet**. Selecciona **Protocolo de Internet versión 4 (TCP/IPv4)** y pulsa **Propiedades**.

La pantalla compartida muestra una configuración IPv4 manual. Los valores concretos se conservan fuera de la página pública porque son direcciones internas del laboratorio.

Antes de unir el servidor al dominio, configura como DNS preferido un servidor DNS que aloje o pueda resolver la zona DNS de Active Directory. Para un servidor miembro, Microsoft recomienda usar los DNS que hospedan la zona del dominio. No asumas que la puerta de enlace también presta DNS; compruébalo en el servidor controlador de dominio.

En la captura, el DNS alternativo está configurado como `127.0.0.1`. Esa dirección apunta al propio servidor SQL. Como este equipo será miembro del dominio y no el servidor DNS, elimina ese valor; si existe un segundo DNS que resuelve la zona de Active Directory, usa su dirección. Si solo hay un DNS disponible para el dominio, deja el campo alternativo vacío.

**Estado:** pendiente de corregir y verificar la configuración DNS antes de continuar.

### 3. Abrir la configuración de pertenencia

En **Configuración > Sistema > Acerca de**, abre **Configuración avanzada del sistema**. En **Propiedades del sistema > Nombre de equipo**, selecciona **Cambiar**. En la ventana **Cambios en el dominio o el nombre del equipo**, selecciona **Dominio**.

La última captura muestra esta ventana, pero el campo del dominio está vacío. No se ha confirmado ninguna unión. Cuando DNS esté corregido, escribe el nombre DNS completo del dominio existente y continúa con las credenciales autorizadas para unir equipos. Windows confirmará la pertenencia y solicitará reiniciar.

**Estado:** preparado, todavía sin ejecutar la unión.

### 4. Confirmar la unión al dominio

Después del reinicio, inicia sesión con una cuenta autorizada y comprueba en las propiedades del sistema que el servidor pertenece al dominio correcto. Se documentarán el resultado y la identidad usada sin publicar contraseñas ni datos privados.

**Estado:** pendiente.

### 5. Instalar SQL Server y verificar el acceso de dominio

La instalación de SQL Server 2025 Developer, la selección de la cuenta o grupo de Active Directory como administrador del motor, la instalación de SSMS y la conexión con autenticación de Windows se documentarán cuando se realicen en este servidor.

**Estado:** pendiente.

## Criterios para dar la guía por finalizada

- El equipo SQL consta como miembro del dominio correcto; no se convierte en controlador de dominio.
- DNS permite localizar el controlador de dominio.
- La instalación del motor termina correctamente y la instancia queda identificada.
- Una identidad de dominio autorizada puede iniciar sesión en SQL Server mediante autenticación de Windows.
- Las imágenes publicadas están anonimizadas y no exponen contraseñas, identificadores de dispositivo, nombres internos ni direcciones privadas del laboratorio.
- Cada paso está respaldado por una pantalla o una comprobación confirmada.

## Referencias oficiales

- [Unir un equipo a un dominio](https://learn.microsoft.com/es-es/windows-server/identity/ad-ds/manage/join-computer-to-domain).
- [Recomendaciones para la configuración de clientes DNS](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/best-practices-for-dns-client-settings).
- [Instalar SQL Server desde el asistente gráfico](https://learn.microsoft.com/es-es/sql/database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup?view=sql-server-ver17).
- [Configurar cuentas de servicio y permisos de SQL Server](https://learn.microsoft.com/es-es/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions?view=sql-server-ver17).
