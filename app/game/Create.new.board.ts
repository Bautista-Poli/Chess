import { Piece, Rows } from "./Piece.interface"

export class CreateBoard{
    

    rows: Rows = {};

    createBoard(team: string): Rows {
        if (team === "white" || team === "black") {
            this.generatePieceLine(team === "black" ? "black" : "white", "row1");
            this.generatePawnLine(team === "black" ? "black" : "white", "row2");
            this.generateBoard();
            this.generatePawnLine(team === "black" ? "white" : "black", "row7");
            this.generatePieceLine(team === "black" ? "white" : "black", "row8");
        } else {
            console.log("No se indicó un equipo correcto");
        }
        return this.rows;
    }

    generateBoard(): Rows {
        for (let i = 3; i <= 6; i++) {
            const rowName = "row" + i;
            this.rows[rowName] = [];
            
            for (let j = 1; j <= 8; j++) {
                const pieceId = "piece" + String.fromCharCode(65 + i - 1) + j;
                const pieceClass = "pieces piece" + String.fromCharCode(65 + j - 1);
                this.rows[rowName].push({
                    image: "",
                    class: pieceClass,
                    id: pieceId,
                    pieceRol: ""
                });
            }
        }

        return this.rows;
    }

    generatePieceLine(color: string, rowName: string): void {
        const row: Piece[] = [];
        const l: string = this.getLetterByRow(rowName);
        const imageTower = color === "black" ? "../../assets/Pieces/TowerBlack.png" : "../../assets/Pieces/TowerWhite.png";
        const imageBishop = color === "black" ? "../../assets/Pieces/BishopBlack.png" : "../../assets/Pieces/BishopWhite.png";
        const imageHorse = color === "black" ? "../../assets/Pieces/HorseBlack.png" : "../../assets/Pieces/HorseWhite.png";
        const imageQueen = color === "black" ? "../../assets/Pieces/QueenBlack.png" : "../../assets/Pieces/QueenWhite.png";
        const imageKing = color === "black" ?  "../../assets/Pieces/KingBlack.png" : "../../assets/Pieces/KingWhite.png";

        const towerRol = "tower pieces";
        const bishopRol = "bishop pieces";
        const horseRol ="horse pieces";
        const queenRol = "queen pieces";
        const kingRol = "king pieces";
        for (let i = 1; i <= 8; i++) {
            const pieceId = "piece" + l + i;
            const pieceClass = "pieces piece" + String.fromCharCode(64 + i);
            let imagesrc , rol: string;

            if (i == 1 || i == 8) {
                imagesrc = imageTower;
                rol = towerRol;
            } else if (i == 2 || i == 7) {
                imagesrc = imageHorse;
                rol = horseRol; 
            } else if (i == 3 || i == 6) {
                imagesrc = imageBishop;
                rol = bishopRol; 
            } else if (i == 4) {
                imagesrc = imageQueen;
                rol = queenRol; 
            } else if (i == 5) {
                imagesrc = imageKing;
                rol = kingRol; 
            } else {
                imagesrc = "";
                rol = "";
            }

            row.push({
                image: imagesrc,
                class: pieceClass,
                id: pieceId,
                pieceRol : rol
            });
        }

        this.rows[rowName] = row;
    }
        
    
        
    
        

    generatePawnLine( color:string , rowName : string): void {
        const row2: Piece[] = [];
        const l : string = this.getLetterByRow(rowName);
        const imagePawn = color === "black" ? "../../assets/Pieces/PawnBlack.png" : "../../assets/Pieces/PawnWhite.png"
        for (let i = 1; i <= 8; i++) {
            const pieceId = "piece" + l + i;
            const pieceClass = "pieces piece" + String.fromCharCode(64 + i);
            row2.push({
                image: imagePawn,
                class: pieceClass,
                id: pieceId,
                pieceRol: "pawn pieces"
            });
        }
    
        this.rows[rowName] = row2;
    }

    getLetterByRow(rowName: string): string {
        let l: string;
        switch (rowName) {
            case "row1": return "A";
            case "row2": return "B";
            case "row7": return "G";
            default: return "H";
        }
    }

}