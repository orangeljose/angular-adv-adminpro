import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valor') progreso: number = 70;
  @Input('boton') btnClass: string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor:number) {
    if (this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.valorSalida.emit(this.progreso + valor);
    return this.progreso = this.progreso + valor;
  }

  onChange( valor:number ){
    if(valor >= 100){
      this.progreso = 100;
    }else if(valor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);
  }

}
