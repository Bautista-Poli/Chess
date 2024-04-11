# Chess

![image](https://github.com/Bautista-Poli/Chess/assets/111520053/91c644d9-5cce-4a22-b117-1408c23380a9)


A chess web application with functional pieces. If you eat the king, you win the game and then it restart again.
Una aplicación web de ajedrez con piezas funcionales. En caso de comer al rey, se gana la partida y se vuelve a rehiniciar.

No pude realizar el backend de la aplicacion y la conexion con una base de datos postgreSql ya que el ngx-socket-io tiene un error en su instalacion (debe ser un problema de versiones manejadas entre angular y el paquete que se quiere instalar )

Los errores en cuestion:
undici  6.0.0 - 6.11.0 Undici's fetch with integrity option is too lax when algorithm is specified but hash value is in incorrect - https://github.com/advisories/GHSA-9qxr-qj54-h672
Undici's Proxy-Authorization header not cleared on cross-origin redirect for dispatch, request

vite  5.1.0 - 5.1.6
Severity: moderate
Vite's `server.fs.deny` did not deny requests for patterns with directories. - https://github.com/advisories/GHSA-8jhw-289h-jh2g

Y el hecho de poner npm audit fix no altera el resultado (poniendo --force empeora el problema)
