import { PieceComponent } from "../piece/piece.component";
import { GameComponent } from "../game.component";
import { QueryList } from "@angular/core";

export class Queen{
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
        if( fila1 == fila2){
            
            //console.log(this.checkVerticalCollision(columna2 ,columna1, fila1 ))
            if(!this.checkVerticalCollision(columna2 ,columna1, fila1 )){
                clickedPiece.move(previousClickedPiece.image,previousClickedPiece.clase);
                previousClickedPiece.moved();
            }
        }else if( columna1 == columna2){
            console.log(this.checkCollisionHorizontal(String.fromCharCode(columna1),fila2,fila1))
            if(!this.checkCollisionHorizontal(String.fromCharCode(columna1),fila2,fila1)){
                clickedPiece.move(previousClickedPiece.image,previousClickedPiece.clase);
                previousClickedPiece.moved();
            }
        }else if ( Math.abs(columna1 - columna2) == Math.abs(fila1 - fila2)){
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
    
    checkCollisionHorizontal(previousColumn: string, previousRow: number, targetRow: number): boolean {
        // Determinar el sentido de la iteración
        const rowIncrement = previousRow < targetRow ? 1 : -1;
    
        // Iterar sobre las posiciones entre la posición inicial y la final
        for (let row = previousRow + rowIncrement; row !== targetRow; row += rowIncrement) {
            // Construir la posición actual
            const position = previousColumn + row;
    
            // Verificar si hay una pieza en la posición actual
            const pieceAtPosition = this.pieceComponents.find(piece => piece.id === "piece" + position);
            if (pieceAtPosition && pieceAtPosition.image !== "") {
                return true; // Colisión detectada
            }
        }
    
        return false; // No se detectó ninguna colisión
    }

    checkVerticalCollision(previousColumn: number, targetColumn: number , row : number):boolean{
        for(let col = targetColumn+1 ; col < previousColumn ; col++) {
            
            const position = String.fromCharCode(col) + row; // Convert back to letter+number format
            console.log(position)
            const pieceAtPosition = this.pieceComponents.find(piece => piece.id === "piece" + position);

            
            if (pieceAtPosition && pieceAtPosition.image !== "") {
                console.log(pieceAtPosition)
                return true; // Collision detected
            }
            
        }
        return false;
    }
    
}