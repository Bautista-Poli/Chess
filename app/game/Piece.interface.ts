export interface Piece{
    image : string;
    class : string;
    id : string;
    pieceRol : string;
}

export interface Rows {
    [hour: string]: Piece[];
}