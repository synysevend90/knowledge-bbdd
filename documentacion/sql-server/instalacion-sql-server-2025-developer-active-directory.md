# SQL Server 2025 Enterprise Developer en un servidor miembro de Active Directory

> **Guía verificada:** el servidor se unió al dominio, SQL Server terminó de instalarse correctamente y SSMS conectó a la instancia. Se han anonimizado las cuentas, rutas de registro y datos internos visibles en las capturas.

## Objetivo y entorno

Instalación de SQL Server 2025 Enterprise Developer en Windows Server 2022 Datacenter Evaluation (21H2, compilación 20348.587), en un servidor miembro de un dominio cuyo controlador reside en otro equipo.

Se instaló únicamente **Servicios de Motor de base de datos**, en la instancia con nombre `MSSQLSERVERCONAD`. Se instaló SSMS 22.11.3. Developer se usa solo para desarrollo y pruebas, nunca producción.

## 1. Preparar el servidor y unirlo al dominio

### Nombre e IP

En **Configuración > Sistema > Acerca de**, cambia el nombre del servidor y reinicia. Asigna IPv4 estática y configura como DNS preferido el servidor DNS del controlador de dominio.

Ruta de red utilizada: **Configuración > Red e Internet > Estado > Cambiar opciones del adaptador > Ethernet > Propiedades > Protocolo de Internet versión 4 (TCP/IPv4) > Propiedades**.

Durante el diagnóstico, el servidor también tenía una dirección DNS IPv6 hacia otro resolvedor. Se retiró para que las consultas de Active Directory usaran el DNS del dominio. No uses un DNS público o el router como DNS preferido en el miembro.

### Verificar DNS

Desde el servidor miembro, sustituye `<dominio-dns>` por el nombre DNS real:

```cmd
nslookup -type=SRV _ldap._tcp.dc._msdcs.<dominio-dns>
nltest /dsgetdc:<dominio-dns> /force
```

La primera consulta debe devolver registros SRV del controlador; la segunda debe localizarlo. En el laboratorio, ambas respondieron correctamente después de corregir DNS.

### Completar la unión

El primer intento falló al contactar con el dominio. Más tarde apareció un error de SID duplicado. Se ejecutó Sysprep con generalización en el servidor miembro; tras reiniciarlo, se repitió la unión. No ejecutes Sysprep en el controlador de dominio.

Abre **Configuración > Sistema > Acerca de > Configuración avanzada del sistema > Nombre de equipo > Cambiar**. Selecciona **Dominio**, escribe el nombre DNS completo del dominio y proporciona credenciales autorizadas para unir equipos. Acepta la confirmación y reinicia.

**Comprobación:** el servidor SQL quedó unido como miembro. El controlador de dominio permaneció en otro equipo. El error anterior de `Get-ADDomain` (`ActiveDirectoryServer:8250`, “El servidor no es funcional”) no proporcionó DNSRoot ni NetBIOSName; la resolución DNS y `nltest` fueron las comprobaciones que confirmaron que el miembro ya localizaba el controlador.

## 2. Instalar SQL Server 2025

En el Centro de instalación de SQL Server, abre **Instalación > Nueva instalación independiente de SQL Server o agregar características a una instalación existente**.

### Edición, licencia y opciones

En **Edición**, elige **Enterprise Developer** bajo las ediciones gratuitas. Acepta los términos. Microsoft Update se dejó desactivado y la **Extensión de Azure para SQL Server** se desmarcó, porque no se configuraría administración híbrida.

### Características e instancia

En **Selección de características**, marca solo **Servicios de Motor de base de datos**. Conserva las rutas predeterminadas si son adecuadas para el almacenamiento disponible.

En **Configuración de instancia**, selecciona **Instancia con nombre** y escribe `MSSQLSERVERCONAD`. Conserva el directorio predeterminado si no dispones de una unidad de datos separada.

### Servicios y autenticación

Se conservaron las cuentas predeterminadas del instalador. El Motor de base de datos quedó en inicio automático; SQL Server Agent, en inicio manual; SQL Server Browser, deshabilitado. Se concedió al motor el privilegio de mantenimiento de volúmenes para permitir la inicialización instantánea de archivos.

En **Configuración del Motor de base de datos**, se eligió **Modo mixto (autenticación de SQL Server y de Windows)**, se definió una contraseña para `sa` y se agregó la cuenta autorizada del dominio como administradora de SQL Server. La captura de esa pantalla tiene la contraseña y la identidad de dominio ocultas. Revisa que la lista de administradores no contenga entradas duplicadas.

### Instalar y comprobar

En **Listo para instalar**, verifica edición, instancia y características, y pulsa **Instalar**. La operación terminó correctamente: el resumen marcó como correctos el Motor de base de datos, SQL Browser, el objeto de escritura de SQL y los archivos auxiliares del programa de configuración.

## 3. Instalar SSMS

Descarga SSMS desde [Microsoft Learn](https://learn.microsoft.com/es-es/ssms/install/install). El instalador de SSMS 22 abre Visual Studio Installer. Conserva los componentes principales; en esta instalación se desmarcó la carga opcional **Híbrido y migración**. Se instaló SSMS 22.11.3.

## 4. Conectar y verificar

En SSMS, selecciona **Conectar > Motor de base de datos** e introduce:

- **Nombre del servidor:** `localhost\\MSSQLSERVERCONAD`
- **Autenticación:** SQL Server
- **Usuario:** `sa`
- **Contraseña:** la establecida durante la instalación
- **Cifrar:** obligatorio
- **Certificado de servidor de confianza:** activado para esta conexión local de laboratorio

Pulsa **Conectar**. La contraseña aparece enmascarada en la captura. También se puede usar autenticación de Windows con la cuenta de dominio agregada a los administradores del motor.

**Resultado comprobado:** SSMS conectó a `localhost\\MSSQLSERVERCONAD` y el Explorador de objetos mostró las bases de datos, la seguridad y los objetos del servidor.

## Incidencias y notas

- **No se encuentra el dominio:** comprueba el DNS preferido, los registros SRV y la localización con `nltest`. El mensaje no demuestra por sí solo que las credenciales sean incorrectas.
- **SID duplicado:** se resolvió generalizando con Sysprep el miembro y repitiendo la unión. No se hizo en el controlador.
- **Certificado de SSMS:** confiar en el certificado se usó para el laboratorio local. En producción, configura un certificado válido y valida la identidad del servidor.
- **SQL Server Agent con XPs deshabilitadas:** el servicio quedó en inicio manual; actívalo si necesitas trabajos programados.
- **Developer:** licencia de desarrollo y pruebas, no producción.

## Referencias

- [Unir un equipo a un dominio](https://learn.microsoft.com/es-es/windows-server/identity/ad-ds/manage/join-computer-to-domain)
- [Recomendaciones DNS para clientes](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/best-practices-for-dns-client-settings)
- [Comprobar registros SRV de Active Directory](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/verify-srv-dns-records-have-been-created)
- [Instalar SQL Server desde el asistente](https://learn.microsoft.com/es-es/sql/database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup?view=sql-server-ver17)
- [Configurar cuentas de servicio de SQL Server](https://learn.microsoft.com/es-es/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions?view=sql-server-ver17)
- [Instalar SSMS](https://learn.microsoft.com/es-es/ssms/install/install)
