# Instalación de SQL Server 2025 Developer en un servidor unido a Active Directory

> **Estado: solicitud de credenciales para unirse al dominio.** El servidor tiene una dirección DNS preferida y el DNS alternativo está vacío. Windows ha mostrado el cuadro de credenciales; la pertenencia al dominio todavía no está confirmada. Los nombres del entorno y las IP privadas se omiten en esta copia pública.

## Objetivo y alcance

Instalar SQL Server 2025 Enterprise Developer en un servidor Windows nuevo, unido como **servidor miembro** a un dominio de Active Directory existente. El controlador de dominio estará en otra máquina. El uso de Developer es para desarrollo y pruebas, no para producción.

La guía previa de instalación sin dominio se conserva como referencia independiente. Este procedimiento se completará desde la preparación del nuevo servidor hasta la conexión al motor mediante una identidad del dominio.

## Entorno observado

- Sistema operativo: Windows Server 2022 Datacenter Evaluation.
- Versión: 21H2.
- Compilación mostrada: 20348.587.
- Adaptador: Ethernet.
- En la pantalla de configuración de pertenencia se seleccionó un dominio; su nombre se omite en la copia pública.
- Se configuró manualmente IPv4. La última captura muestra un DNS preferido y el campo DNS alternativo vacío; se omiten las direcciones privadas.
- El cuadro de seguridad de Windows solicita las credenciales para continuar. No aparece aún un mensaje de unión completada.

## Procedimiento

### 1. Comprobar el sistema y cambiar el nombre del equipo

En **Configuración > Sistema > Acerca de**, se comprobó la edición de Windows Server. En esa página, selecciona **Cambiar el nombre de este equipo**, introduce el nombre elegido para el servidor y pulsa **Siguiente**. Windows ofrece reiniciar ahora o más tarde para aplicar el cambio.

La captura posterior muestra el nuevo nombre en la configuración del sistema. El nombre interno se omite aquí; se incorporará una captura anonimizada antes de publicar imágenes.

**Resultado observado:** Windows Server 2022 Datacenter Evaluation, versión 21H2, compilación 20348.587. El nombre nuevo aparece aplicado en la pantalla posterior.

### 2. Revisar la configuración de red

En **Configuración > Red e Internet > Estado > Cambiar opciones del adaptador**, abre las propiedades de **Ethernet**. Selecciona **Protocolo de Internet versión 4 (TCP/IPv4)** y pulsa **Propiedades**.

La última captura muestra una dirección DNS preferida configurada y el DNS alternativo vacío. Las direcciones concretas se omiten porque son IP privadas del laboratorio. La captura por sí sola no identifica qué servidor hay detrás de esa dirección; debe corresponder al DNS que resuelve la zona de Active Directory. La pantalla posterior, donde Windows solicita las credenciales de unión, muestra que se ha avanzado al siguiente paso.

**Resultado observado:** DNS alternativo vacío. Valores de IP anonimizados en la copia pública.

### 3. Abrir la configuración de pertenencia

En **Configuración > Sistema > Acerca de**, abre **Configuración avanzada del sistema**. En **Propiedades del sistema > Nombre de equipo**, selecciona **Cambiar**. En la ventana **Cambios en el dominio o el nombre del equipo**, selecciona **Dominio**.

En la ventana **Cambios en el dominio o el nombre del equipo**, se seleccionó **Dominio** y se escribió el nombre del dominio del laboratorio. Windows abrió después **Seguridad de Windows**, que solicita el usuario y la contraseña de una cuenta con permiso para unir equipos.

La solicitud de credenciales no confirma que la unión haya terminado. Introduce en esa ventana las credenciales autorizadas; no las compartas en el chat ni en capturas. Si la autenticación se acepta, Windows mostrará un mensaje de bienvenida o confirmación y pedirá reiniciar.

**Estado:** esperando el resultado de la autenticación.

### 4. Confirmar la unión al dominio

Cuando Windows confirme la unión, acepta el mensaje y reinicia el servidor cuando lo solicite. Tras reiniciar, inicia sesión con una cuenta autorizada del dominio y comprueba en las propiedades del sistema que el equipo pertenece al dominio.

**Estado:** pendiente de recibir confirmación de Windows y completar el reinicio.

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
