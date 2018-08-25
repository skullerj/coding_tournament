# Deliktum
### Juan Rosero

Este repositorio contiene una implementación de Deliktum por Juan Rosero

En desarrollo se deben levantar dos servidores: El backend en Loopback y el Frontend utilizando los scripts que provee `create-react-app`

Para levantar la app es necesario tener corriendo una instancia de MongoDB en el puerto 27017. Para ello utilizar el comando :

`yarn dev`

Este levantará los dos servidores automáticamente.

Algunas notas:

  - Los marcadores no se agrupan por clusters pero se muestran en el mapa.
  - La lista de eventos se muestra correctamente después de crear un evento pero el mapa no actualiza sus marcadores.
