import { QueryList } from "@angular/core";
import { PieceComponent } from "../piece/piece.component";


export class King{

    pieceComponents : QueryList<PieceComponent>
    constructor(pieceComponents: QueryList<PieceComponent>){
        this.pieceComponents = pieceComponents
    }
    
    movement(previousClickedPiece: PieceComponent, clickedPiece: PieceComponent) {
        const columna1 = clickedPiece.id.charCodeAt(5);
        const columna2 = previousClickedPiece.id.charCodeAt(5);
        const fila1 = Number(clickedPiece.id.slice(6));
        const fila2 = Number(previousClickedPiece.id.slice(6));
    
        // Check if the movement is within one square in any direction
        if (
            Math.abs(columna1 - columna2) <= 1 &&
            Math.abs(fila1 - fila2) <= 1
        ) {
            console.log("Valid movement for the king");
            // Move the king piece
            clickedPiece.move(previousClickedPiece.image, previousClickedPiece.clase);
            previousClickedPiece.moved();
        } else {
            console.log("Invalid movement for the king");
            // Handle invalid movement
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