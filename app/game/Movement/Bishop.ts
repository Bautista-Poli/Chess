import { QueryList } from "@angular/core";
import { PieceComponent } from "../piece/piece.component";


export class Bishop{
    pieceComponents : QueryList<PieceComponent>
    constructor(pieceComponents: QueryList<PieceComponent>){
        this.pieceComponents = pieceComponents
    }
    
    movement( previousClickedPiece : PieceComponent, clickedPiece: PieceComponent){

        const columna1 = clickedPiece.id.slice(5,6).charCodeAt(0)
        const columna2 = previousClickedPiece.id.slice(5,6).charCodeAt(0)
        const fila1 = Number(clickedPiece.id.slice(6))
        const fila2 = Number(previousClickedPiece.id.slice(6))
        
        //charCodeAt(0) devuelve el numero Ascii

        /* Movimiento vertical */
        if ( Math.abs(columna1 - columna2) == Math.abs(fila1 - fila2)){
            if(!this.checkCollisionDiagonal(columna2 ,columna1, fila2 ,fila1)){
                clickedPiece.move(previousClickedPiece.image,previousClickedPiece.clase);
                previousClickedPiece.moved();
            }
        }
    }

    
    checkCollisionDiagonal(previousColumn: number, targetColumn: number, previousRow: number, targetRow: number): boolean {
        // Determinar el incremento de fila y columna
        const rowIncrement = previousRow < targetRow ? 1 : -1;
        const colIncrement = previousColumn < targetColumn ? 1 : -1;
    
        // Inicializar fila y columna
        let row = previousRow + rowIncrement;
        let col = previousColumn + colIncrement;
    
        // Iterar mientras no se alcance la posición final
        while (row !== targetRow || col !== targetColumn) {
            // Construir la posición actual
            const position = String.fromCharCode(col) + row;
            console.log(position)
    
            // Verificar si hay una pieza en la posición actual
            const pieceAtPosition = this.pieceComponents.find(piece => piece.id === "piece" + position);
            if (pieceAtPosition && pieceAtPosition.image !== "") {
                console.log(pieceAtPosition)
                return true; // Colisión detectada
            }
            
            
            row += rowIncrement;
            col += colIncrement;
        }
    
        return false; 
    }

}