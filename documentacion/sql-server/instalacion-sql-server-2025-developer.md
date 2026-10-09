# Instalación de SQL Server 2025 Developer

> **Estado: guía en curso.** Se documentan los pasos confirmados hasta la selección de características del motor. La instalación completa y su verificación final quedan pendientes de recuperar y contrastar con el resultado observado en el equipo.

## Objetivo

Documentar la instalación independiente de SQL Server 2025 Developer en Windows, siguiendo las pantallas reales del Centro de instalación. Esta guía no cubre la instalación de SSMS, que cuenta con un procedimiento separado.

## Procedimiento confirmado

### 1. Iniciar la instalación

Abre el Centro de instalación de SQL Server 2025 y comienza una instalación independiente de SQL Server. La primera pantalla del asistente confirma el inicio del procedimiento.

### 2. Descargar el medio e iniciar el Centro de instalación

Continúa con la descarga del medio de instalación y abre el Centro de instalación desde el asistente. Los nombres y opciones deben seguirse tal como aparecen en la versión descargada.

### 3. Seleccionar la edición

Selecciona la edición **Developer** para el entorno de aprendizaje y desarrollo documentado aquí. Comprueba que la edición indicada en pantalla es Developer antes de continuar.

### 4. Microsoft Update

En la pantalla de Microsoft Update, deja deshabilitada la búsqueda de actualizaciones durante esta instalación. La opción se omitió en el procedimiento documentado; no se debe presentar como necesaria para completar la instalación.

### 5. Reglas de instalación y firewall

Revisa el resultado de las reglas de instalación y continúa con las opciones que correspondan al equipo. Si aparece una advertencia relacionada con el Firewall de Windows, se puede continuar sin cambiar la configuración del firewall para esta instalación local del laboratorio. No se documenta desactivar el firewall ni crear reglas manuales.

### 6. Azure

En la configuración relacionada con Azure, no habilites una integración de Azure que no forme parte del objetivo de esta instalación local.

### 7. Seleccionar características del motor

En la selección de características, el procedimiento se centra en instalar el motor de base de datos de SQL Server. Revisa la pantalla real antes de marcar componentes adicionales; no se deben seleccionar características opcionales sin una necesidad concreta.

## Punto pendiente

La secuencia recuperable llega hasta la pantalla de selección de características. Para documentar con seguridad las pantallas posteriores, hay que confirmar el resultado real de la configuración de instancia, la configuración del servidor, la preparación de la instalación, el progreso, el resultado final y las comprobaciones en Windows. La guía no afirma que SQL Server haya quedado instalado correctamente mientras esos resultados no estén verificados.

## Criterio de cierre

La guía podrá marcarse como completada cuando se confirme la instalación finalizada y se verifique que el servicio o la instancia instalada aparecen en el equipo. Si se añaden capturas, oculta nombres de equipo, usuarios, identificadores y cualquier otro dato privado que aparezca en ellas.
