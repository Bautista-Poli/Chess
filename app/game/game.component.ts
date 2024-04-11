import { Component, QueryList, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PieceComponent } from './piece/piece.component';
import { Pawn } from './Movement/Pawn'
import { Tower } from './Movement/Tower'
import { Horse } from './Movement/Horse';
import { Bishop } from './Movement/Bishop';
import { Queen } from './Movement/Queen';
import { Piece, Rows } from './Piece.interface';
import { NgFor } from '@angular/common';
import { CreateBoard } from './Create.new.board';
import { King } from './Movement/King';
import { io } from "socket.io-client";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    HeaderComponent,
    PieceComponent,
    NgFor
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  selectedPieceId: string = "";
  @ViewChildren(PieceComponent) pieceComponents!: QueryList<PieceComponent>;


  private socket: any; 
  
  
  board: Rows = {}
  private resultado;
  constructor(){
    const creatorBoard = new CreateBoard();
    this.board = creatorBoard.createBoard("black");
    this.resultado = "modal-wrapper";

    /*
    this.socket = io("http://localhost:3000");
    // Example: Handling socket events
    this.socket.on("connect", () => {
      console.log("Connected to server");
      console.log("Entro");
    });

    this.socket.on("message", (data: any) => {
      console.log("Received message:", data);
    });
    */
  }

  onPieceClicked(event: { id: string, image: string }): void {
    
    const clickedPiece = this.pieceComponents.find(piece => piece.id === event.id);
    
    if (clickedPiece && this.selectedPieceId == "") {
      clickedPiece.putColor();
    }
    // Move piece and change color
    if (this.selectedPieceId !== "") {
      const previousClickedPiece = this.pieceComponents.find(piece => piece.id === this.selectedPieceId);
      if (previousClickedPiece && clickedPiece && previousClickedPiece !== clickedPiece) {
        if(previousClickedPiece.image.includes("White") && !clickedPiece.image.includes("White")){
          this.movePiece(clickedPiece, previousClickedPiece);
        }
        previousClickedPiece.resetColor();
        clickedPiece.resetColor();
        this.selectedPieceId = ""
      }else{
        if(previousClickedPiece && clickedPiece){
          clickedPiece.resetColor();
          this.selectedPieceId = ""
        }
      }
      
    }else{
      this.selectedPieceId = event.id;
    }
  }


  movePiece(clickedPiece: PieceComponent, previousClickedPiece : PieceComponent): void {
    let ganador = false
    
    if(clickedPiece.image.slice(20,24) == "King"){
      ganador = true;
    }
    if(previousClickedPiece.clase.slice(0,4) === "pawn"){
      const pawn = new Pawn(this.pieceComponents);
      pawn.movement(previousClickedPiece,clickedPiece)
    }

    if(previousClickedPiece.clase.slice(0,5) === "tower"){
      console.log("Hola")
      const tower = new Tower(this.pieceComponents);
      
      tower.movement(previousClickedPiece,clickedPiece)
    }
    if(previousClickedPiece.clase.slice(0,5) === "horse"){
      const horse = new Horse();
      horse.movement(previousClickedPiece,clickedPiece)
    }
    if(previousClickedPiece.clase.slice(0,6) === "bishop"){
      const bishop = new Bishop(this.pieceComponents);
      bishop.movement(previousClickedPiece,clickedPiece)
    }
    if(previousClickedPiece.clase.slice(0,5) === "queen"){
      const queen = new Queen(this.pieceComponents);
      
      queen.movement(previousClickedPiece,clickedPiece)
    }
    if(previousClickedPiece.clase.slice(0,4) === "king"){
      const king = new King(this.pieceComponents);
      
      king.movement(previousClickedPiece,clickedPiece)
    }
    if(ganador){
      this.setResultado()
    }
    
  }


  setResultado(){
    this.resultado = this.resultado == 'modal-wrapper' ? 'modal-wrapper open' : 'modal-wrapper';
    console.log(this.resultado)
    
  }

  getResultado(){
    return this.resultado
  }
  

  


  toObjectKeys(input : any){
    return Object.keys(input)
  }


}



