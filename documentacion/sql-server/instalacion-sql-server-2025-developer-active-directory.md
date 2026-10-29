# Instalación de SQL Server 2025 Developer en un servidor unido a Active Directory

> **Estado: unión al dominio fallida; diagnóstico DNS/nombre pendiente.** Tras enviar las credenciales, Windows indicó que el dominio no existe o no se pudo contactar. El servidor sigue sin pertenecer al dominio. El nombre y las IP privadas se omiten en esta copia pública.

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
- Windows mostró el cuadro de credenciales y, después de enviarlas, informó que no pudo encontrar o contactar el dominio.

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

En la ventana **Cambios en el dominio o el nombre del equipo**, se seleccionó **Dominio** y se escribió el nombre del entorno. Después de enviar las credenciales, Windows mostró el error: el dominio no existe o no se pudo contactar. La unión **no se completó**.

Este mensaje no permite concluir por sí solo que la contraseña sea incorrecta. Hay que comprobar que se escribió el nombre DNS del dominio y que el DNS del servidor puede encontrar los registros de localización del controlador de dominio.

### Diagnosticar el nombre y la resolución DNS

En el controlador de dominio, abre PowerShell y consulta los nombres DNS y NetBIOS reales del dominio:

```powershell
Get-ADDomain | Select-Object DNSRoot, NetBIOSName
```

En la ventana de unión debe usarse el valor **DNSRoot**, no un nombre NetBIOS abreviado. No añadas un sufijo como `.local` por suposición; utiliza el valor devuelto por el controlador de dominio.

Después, desde el servidor SQL, comprueba si el DNS preferido devuelve el registro SRV LDAP del dominio, sustituyendo el marcador por el valor real de **DNSRoot**:

```cmd
nslookup -type=SRV _ldap._tcp.dc._msdcs.<DNSRoot>
```

La respuesta debe incluir uno o más registros SRV que señalen a un controlador de dominio. Si no aparece esa respuesta, comprueba que el DNS preferido del servidor SQL es el DNS del dominio y revisa la zona y los registros SRV en el controlador de dominio. Microsoft recomienda verificar la resolución DNS y esos registros al diagnosticar errores de unión.

**Estado:** pendiente de comprobar DNSRoot y la respuesta SRV antes de volver a intentarlo.

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
- [Solucionar errores de red al unir equipos a un dominio](https://learn.microsoft.com/es-es/troubleshoot/windows-server/active-directory/domain-join-networking-errors).
- [Comprobar los registros DNS SRV de Active Directory](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/verify-srv-dns-records-have-been-created).
- [Instalar SQL Server desde el asistente gráfico](https://learn.microsoft.com/es-es/sql/database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup?view=sql-server-ver17).
- [Configurar cuentas de servicio y permisos de SQL Server](https://learn.microsoft.com/es-es/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions?view=sql-server-ver17).
