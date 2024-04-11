import { QueryList } from "@angular/core";
import { PieceComponent } from "../piece/piece.component";


export class Pawn{

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
            const a = "G"
            //Si el peon esta en G, se puede mover 2
            if(  columna2 == columna1+1 || (columna2 == a.charCodeAt(0) && columna2 == columna1+2)){
                if(!this.checkVerticalCollision(columna2 ,columna1, fila1 )){
                    clickedPiece.move(previousClickedPiece.image,previousClickedPiece.clase);
                    previousClickedPiece.moved();
                }
            }
            
        }
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