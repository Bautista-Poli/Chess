import { NgIf , NgClass} from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.css'
})
export class PieceComponent {

  @Input() image:string = "";
  @Input() id: string = "";
  @Input() pieceRol : string = "";
  
  clase = "queen pieces";


  isClicked: boolean = false;
  @Output() pieceClicked = new EventEmitter<{ id: string, image: string }>();

  
  ngOnInit(): void {
    if (this.pieceRol) {
      this.clase = this.pieceRol; // Asignar el valor solo si está definido
    }
  }
  

  onClick(): void {
    this.pieceClicked.emit({ id: this.id, image: this.image });
  }

  

  move(imageName : string, rol : string):void{
    this.image = imageName;
    this.clase = rol
  }
  moved():void{
    this.image = ""
  }

  resetColor():void{
    this.isClicked=false;
  }
  putColor():void{
    if(this.image !== ''){
      this.isClicked=true;
    }
  }

}
