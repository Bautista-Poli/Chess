
import { PieceComponent } from "../piece/piece.component";


export class Horse{

    
    movement(previousClickedPiece: PieceComponent, clickedPiece: PieceComponent) {
        const columna1 = clickedPiece.id.charCodeAt(5) - 65;
        const columna2 = previousClickedPiece.id.charCodeAt(5) - 65;
        const fila1 = Number(clickedPiece.id.charAt(6));
        const fila2 = Number(previousClickedPiece.id.charAt(6));
    
        // Verificar todos los posibles movimientos del caballo
        if (
            (Math.abs(columna1 - columna2) === 2 && Math.abs(fila1 - fila2) === 1) ||
            (Math.abs(columna1 - columna2) === 1 && Math.abs(fila1 - fila2) === 2)
        ) {
            console.log("Entro con ",columna2," ",columna1," ",fila2," ",fila1 )
            console.log(previousClickedPiece)
            clickedPiece.move(previousClickedPiece.image, previousClickedPiece.clase);
            previousClickedPiece.moved();
        }
    }

    
}