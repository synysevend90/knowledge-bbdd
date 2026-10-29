# Instalación de SQL Server 2025 Developer en un servidor unido a Active Directory

> **Estado: guía iniciada.** El objetivo y la topología están definidos; el recorrido paso a paso se documentará según se configure el servidor nuevo y se aporten capturas. No se da por completada ninguna pantalla ni validación todavía.

## Objetivo y alcance

Instalar SQL Server 2025 Enterprise Developer en un servidor Windows nuevo, unido como **servidor miembro** a un dominio de Active Directory existente. El controlador de dominio estará en otra máquina. El uso de Developer es para desarrollo y pruebas, no para producción.

Esta guía documentará el proceso completo desde la preparación de la máquina hasta la conexión al motor mediante una identidad del dominio. La guía previa de instalación sin dominio se conserva como referencia independiente.

## Datos del entorno que se anotarán durante la práctica

No sustituir estos datos por ejemplos: registrar los valores visibles en el entorno cuando se creen las máquinas.

- Sistema operativo y versión: pendiente de confirmar.
- Nombre del servidor SQL: pendiente.
- Nombre DNS del dominio: pendiente.
- Nombre del controlador de dominio: pendiente.
- Dirección DNS configurada en el servidor SQL: pendiente.
- Nombre de instancia de SQL Server: pendiente.
- Cuenta o grupo de dominio que administrará SQL Server: pendiente.
- Método de autenticación y resultado de conexión: pendiente.

## Recorrido previsto

Los apartados siguientes son hitos de documentación, no pasos ya verificados. En cada hito se incorporarán las instrucciones exactas, el resultado observado y las capturas del proceso.

1. Preparar el servidor Windows nuevo y comprobar sus valores iniciales.
2. Configurar la red y la resolución DNS necesarias para localizar el dominio.
3. Unir el servidor como miembro al dominio existente y reiniciarlo si Windows lo solicita.
4. Iniciar sesión con una cuenta autorizada del dominio y comprobar la pertenencia al dominio.
5. Descargar e iniciar la instalación personalizada de SQL Server 2025 Developer.
6. Seleccionar las características y configurar la instancia según lo observado en el asistente.
7. Elegir la identidad administradora del motor durante la instalación. Se registrará si se añade un usuario o un grupo de Active Directory.
8. Completar la instalación y comprobar el resultado del asistente.
9. Instalar SQL Server Management Studio si forma parte del entorno de práctica.
10. Conectarse al motor con autenticación de Windows usando la identidad de dominio añadida y verificar el acceso.
11. Registrar incidencias, comprobaciones y el estado final.

## Criterios para dar la guía por finalizada

- El equipo SQL consta como miembro del dominio correcto; no se convierte en controlador de dominio.
- La instalación del motor termina correctamente y la instancia observada queda identificada en la guía.
- Una identidad de dominio autorizada puede iniciar sesión en SQL Server mediante autenticación de Windows.
- Las capturas corresponden al servidor nuevo y no muestran contraseñas, secretos ni información que no deba publicarse.
- Cada paso está respaldado por una pantalla, una comprobación ejecutada o una confirmación explícita del resultado.

## Referencias oficiales

- [Instalar SQL Server desde el asistente gráfico](https://learn.microsoft.com/es-es/sql/database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup?view=sql-server-ver17).
- [Configurar cuentas de servicio y permisos de SQL Server](https://learn.microsoft.com/es-es/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions?view=sql-server-ver17).
- [Consideraciones de seguridad para una instalación de SQL Server](https://learn.microsoft.com/es-es/sql/sql-server/install/security-considerations-for-a-sql-server-installation?view=sql-server-ver17).
